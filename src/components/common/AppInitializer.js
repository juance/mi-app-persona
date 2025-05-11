import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { initDatabase, checkOnlineStatus } from '../../services/offlineStorage';
import { initSyncService, syncAllUserData, syncFromServer } from '../../services/syncService';
import { registerServiceWorker, checkScheduledNotifications } from '../../services/notificationService';
import { showInfo, showError, showSuccess } from './Notification';
import styled from 'styled-components';
import { FiRefreshCw, FiWifi, FiWifiOff, FiCheck, FiAlertTriangle } from 'react-icons/fi';

// Estilos para el indicador de sincronización
const SyncContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  max-width: 300px;
  opacity: ${props => props.$isOnline ? 1 : 0.7};

  ${props => props.$isSyncing && `
    animation: pulse 2s infinite;
  `}

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }

  &.hidden {
    transform: translateY(100px);
    opacity: 0;
    pointer-events: none;
  }

  &.success {
    background-color: rgba(34, 139, 34, 0.9);
  }

  &.warning {
    background-color: rgba(255, 165, 0, 0.9);
  }

  &.error {
    background-color: rgba(220, 53, 69, 0.9);
  }
`;

const SyncButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  margin-left: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    animation: ${props => props.$spinning ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const SyncStatus = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .sync-title {
    font-weight: 600;
    margin-bottom: 2px;
  }

  .sync-message {
    font-size: 0.8rem;
    opacity: 0.9;
  }
`;

/**
 * Componente para inicializar la aplicación y sincronizar datos
 * @returns {JSX.Element} - Componente de inicialización y sincronización
 */
const AppInitializer = () => {
  const { user } = useAuth();
  const [initializing, setInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    visible: false,
    status: 'idle', // 'idle', 'syncing', 'success', 'warning', 'error'
    title: '',
    message: '',
    lastSync: null
  });
  const [isOnline, setIsOnline] = useState(checkOnlineStatus());

  // Función para sincronizar datos
  const syncData = useCallback(async (force = false) => {
    if (!user || !initialized) return;

    // Si no está en línea, mostrar mensaje
    if (!checkOnlineStatus()) {
      setSyncStatus({
        visible: true,
        status: 'warning',
        title: 'Sin conexión',
        message: 'No se pueden sincronizar datos sin conexión a Internet',
        lastSync: syncStatus.lastSync
      });

      // Ocultar después de 3 segundos
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, visible: false }));
      }, 3000);

      return;
    }

    try {
      // Mostrar estado de sincronización
      setSyncStatus({
        visible: true,
        status: 'syncing',
        title: 'Sincronizando datos...',
        message: force ? 'Sincronización completa en progreso' : 'Obteniendo datos más recientes',
        lastSync: syncStatus.lastSync
      });

      // Sincronizar todos los datos del usuario
      const result = await syncAllUserData(user.id, force);

      if (result.success) {
        console.log('Datos sincronizados correctamente:', result);

        // Actualizar estado de sincronización
        setSyncStatus({
          visible: true,
          status: 'success',
          title: 'Sincronización completada',
          message: `${result.succeeded} almacenes sincronizados`,
          lastSync: new Date()
        });

        // Disparar evento personalizado para notificar a los componentes
        window.dispatchEvent(new CustomEvent('data-synced', {
          detail: {
            success: true,
            stores: result.results ? result.results.map(r => r.store) : []
          }
        }));

        // Ocultar después de 3 segundos
        setTimeout(() => {
          setSyncStatus(prev => ({ ...prev, visible: false }));
        }, 3000);
      } else {
        console.warn('Advertencia al sincronizar datos:', result);

        // Actualizar estado de sincronización
        setSyncStatus({
          visible: true,
          status: 'warning',
          title: 'Sincronización parcial',
          message: `${result.succeeded} sincronizados, ${result.failed} fallidos`,
          lastSync: new Date()
        });

        // Disparar evento personalizado para notificar a los componentes
        window.dispatchEvent(new CustomEvent('data-synced', {
          detail: {
            success: false,
            partial: true,
            stores: result.results ? result.results.filter(r => r.success).map(r => r.store) : []
          }
        }));

        // Ocultar después de 5 segundos
        setTimeout(() => {
          setSyncStatus(prev => ({ ...prev, visible: false }));
        }, 5000);
      }
    } catch (error) {
      console.error('Error al sincronizar datos del usuario:', error);

      // Actualizar estado de sincronización
      setSyncStatus({
        visible: true,
        status: 'error',
        title: 'Error de sincronización',
        message: error.message || 'No se pudieron sincronizar los datos',
        lastSync: syncStatus.lastSync
      });

      // Disparar evento personalizado para notificar a los componentes
      window.dispatchEvent(new CustomEvent('data-synced', {
        detail: {
          success: false,
          error: error.message
        }
      }));

      // Ocultar después de 5 segundos
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, visible: false }));
      }, 5000);
    }
  }, [user, initialized, syncStatus.lastSync]);

  // Monitorear el estado de la conexión
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Intentar sincronizar cuando vuelve a estar en línea
      if (user && initialized) {
        syncData();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus({
        visible: true,
        status: 'warning',
        title: 'Sin conexión',
        message: 'Trabajando en modo offline',
        lastSync: syncStatus.lastSync
      });

      // Ocultar después de 3 segundos
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, visible: false }));
      }, 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user, initialized, syncData, syncStatus.lastSync]);

  // Inicializar la aplicación
  useEffect(() => {
    const initApp = async () => {
      if (initializing || initialized) return;

      setInitializing(true);

      try {
        console.log('Inicializando la aplicación...');

        // Inicializar la base de datos IndexedDB
        await initDatabase();
        console.log('Base de datos IndexedDB inicializada');

        // Inicializar el servicio de sincronización
        const syncService = initSyncService({
          showNotifications: false, // Usamos nuestras propias notificaciones
          interval: 60000 // 1 minuto
        });
        console.log('Servicio de sincronización inicializado');

        // Registrar el service worker
        await registerServiceWorker();
        console.log('Service worker registrado');

        // Verificar notificaciones programadas pendientes
        checkScheduledNotifications();
        console.log('Notificaciones verificadas');

        // Guardar el servicio de sincronización en window para acceso global
        window.syncService = syncService;

        // Configurar callback para sincronización
        syncService.onSync = (result) => {
          if (result.success) {
            setSyncStatus({
              visible: true,
              status: 'success',
              title: 'Sincronización automática',
              message: `${result.succeeded} almacenes sincronizados`,
              lastSync: new Date()
            });

            // Ocultar después de 3 segundos
            setTimeout(() => {
              setSyncStatus(prev => ({ ...prev, visible: false }));
            }, 3000);
          }
        };

        setInitialized(true);
        console.log('Aplicación inicializada correctamente');
      } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        showError('Error al inicializar la aplicación');
      } finally {
        setInitializing(false);
      }
    };

    initApp();

    // Limpiar al desmontar
    return () => {
      if (window.syncService) {
        window.syncService.stopSync();
      }
    };
  }, [initializing, initialized]);

  // Sincronizar datos del usuario cuando inicia sesión
  useEffect(() => {
    if (user && initialized && isOnline) {
      syncData();
    }
  }, [user, initialized, isOnline, syncData]);

  // Formatear fecha
  const formatDate = (date) => {
    if (!date) return 'Nunca';

    return new Date(date).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Renderizar icono según el estado
  const renderIcon = () => {
    switch (syncStatus.status) {
      case 'syncing':
        return <FiRefreshCw size={18} />;
      case 'success':
        return <FiCheck size={18} />;
      case 'warning':
        return <FiAlertTriangle size={18} />;
      case 'error':
        return <FiAlertTriangle size={18} />;
      default:
        return isOnline ? <FiWifi size={18} /> : <FiWifiOff size={18} />;
    }
  };

  // Determinar la clase CSS según el estado
  const getContainerClass = () => {
    if (!syncStatus.visible) return 'hidden';

    switch (syncStatus.status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return '';
    }
  };

  return (
    <SyncContainer 
      className={getContainerClass()} 
      $isOnline={isOnline}
      $isSyncing={syncStatus.status === 'syncing'}
    >
      {renderIcon()}

      <SyncStatus>
        <div className="sync-title">{syncStatus.title}</div>
        <div className="sync-message">
          {syncStatus.message}
          {syncStatus.lastSync && ` • Última: ${formatDate(syncStatus.lastSync)}`}
        </div>
      </SyncStatus>
      
      <SyncButton
        onClick={() => syncData(true)}
        disabled={syncStatus.status === 'syncing' || !isOnline}
        $spinning={syncStatus.status === 'syncing'}
        title="Forzar sincronización"
        aria-label="Forzar sincronización"
      >
        <FiRefreshCw size={16} />
      </SyncButton>
    </SyncContainer>
  );
};

export default AppInitializer;
