import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { initDatabase } from '../../services/offlineStorage';
import { initSyncService, syncAllUserData } from '../../services/syncService';
import { registerServiceWorker, checkScheduledNotifications } from '../../services/notificationService';
import { showInfo, showError } from './Notification';
import styled from 'styled-components';

// Estilos para el indicador de inicialización
const InitializerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 1000;
  display: ${props => props.visible ? 'block' : 'none'};
  animation: fadeOut 0.5s 3s forwards;
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

/**
 * Componente para inicializar la aplicación
 * @returns {JSX.Element} - Componente de inicialización
 */
const AppInitializer = () => {
  const { user } = useAuth();
  const [initializing, setInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
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
          showNotifications: true,
          interval: 30000 // 30 segundos
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
    const syncUserData = async () => {
      if (!user || !initialized) return;
      
      try {
        console.log('Sincronizando datos del usuario...');
        showInfo('Sincronizando datos...');
        
        // Sincronizar todos los datos del usuario
        const result = await syncAllUserData(user.id);
        
        if (result.success) {
          console.log('Datos sincronizados correctamente:', result);
          showInfo('Datos sincronizados correctamente');
        } else {
          console.warn('Advertencia al sincronizar datos:', result);
          showInfo('Algunos datos no pudieron sincronizarse');
        }
      } catch (error) {
        console.error('Error al sincronizar datos del usuario:', error);
        showError('Error al sincronizar datos');
      }
    };
    
    syncUserData();
  }, [user, initialized]);
  
  return (
    <InitializerContainer visible={initializing}>
      Inicializando aplicación...
    </InitializerContainer>
  );
};

export default AppInitializer;
