import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiBell, FiBellOff, FiInfo } from 'react-icons/fi';
import { 
  requestNotificationPermission, 
  getNotificationPermissionStatus,
  registerServiceWorker,
  checkScheduledNotifications
} from '../../services/notificationService';
import AnimatedButton from './AnimatedButton';
import { showInfo } from './Notification';

// Estilos
const NotificationContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-dark);
`;

const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => 
    props.status === 'granted' ? 'rgba(var(--success-color-rgb), 0.1)' : 
    props.status === 'denied' ? 'rgba(var(--danger-color-rgb), 0.1)' : 
    'rgba(var(--info-color-rgb), 0.1)'
  };
  color: ${props => 
    props.status === 'granted' ? 'var(--success-color)' : 
    props.status === 'denied' ? 'var(--danger-color)' : 
    'var(--info-color)'
  };
  font-size: 1.2rem;
`;

const NotificationContent = styled.div`
  margin-bottom: 16px;
  color: var(--text-medium);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

/**
 * Componente para gestionar las notificaciones push
 * @returns {JSX.Element} - Componente de gestión de notificaciones
 */
const NotificationManager = () => {
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false);
  
  // Verificar el estado de los permisos y registrar el service worker al montar el componente
  useEffect(() => {
    const initNotifications = async () => {
      // Verificar el estado de los permisos
      const status = getNotificationPermissionStatus();
      setPermissionStatus(status);
      
      // Registrar el service worker si los permisos están concedidos
      if (status === 'granted') {
        const registration = await registerServiceWorker();
        setServiceWorkerRegistered(!!registration);
        
        // Verificar notificaciones programadas pendientes
        checkScheduledNotifications();
      }
    };
    
    initNotifications();
  }, []);
  
  // Solicitar permiso para notificaciones
  const handleRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermissionStatus(status);
    
    if (status === 'granted') {
      showInfo('¡Notificaciones activadas! Ahora recibirás recordatorios importantes.');
      
      // Registrar el service worker
      const registration = await registerServiceWorker();
      setServiceWorkerRegistered(!!registration);
      
      // Verificar notificaciones programadas pendientes
      checkScheduledNotifications();
    } else if (status === 'denied') {
      showInfo('Has denegado el permiso para notificaciones. Puedes cambiar esto en la configuración de tu navegador.');
    }
  };
  
  // Renderizar contenido según el estado de los permisos
  const renderContent = () => {
    switch (permissionStatus) {
      case 'granted':
        return (
          <>
            <NotificationContent>
              Las notificaciones están activadas. Recibirás alertas sobre:
              <ul>
                <li>Recordatorios de tareas pendientes</li>
                <li>Eventos próximos en tu calendario</li>
                <li>Alertas de movimientos financieros importantes</li>
              </ul>
            </NotificationContent>
            <NotificationActions>
              <AnimatedButton
                variant="outline"
                onClick={() => setPermissionStatus('default')}
              >
                <FiBellOff /> Desactivar notificaciones
              </AnimatedButton>
            </NotificationActions>
          </>
        );
      
      case 'denied':
        return (
          <>
            <NotificationContent>
              Has bloqueado las notificaciones para esta aplicación. Para activarlas, debes cambiar la configuración en tu navegador.
            </NotificationContent>
            <NotificationActions>
              <AnimatedButton
                variant="primary"
                onClick={() => {
                  window.open('chrome://settings/content/notifications', '_blank');
                }}
              >
                <FiInfo /> Abrir configuración del navegador
              </AnimatedButton>
            </NotificationActions>
          </>
        );
      
      case 'not-supported':
        return (
          <NotificationContent>
            Tu navegador no soporta notificaciones. Para recibir notificaciones, por favor utiliza un navegador moderno como Chrome, Firefox, Safari o Edge.
          </NotificationContent>
        );
      
      default:
        return (
          <>
            <NotificationContent>
              Activa las notificaciones para recibir recordatorios de tareas pendientes, eventos próximos y alertas financieras importantes.
            </NotificationContent>
            <NotificationActions>
              <AnimatedButton
                variant="primary"
                onClick={handleRequestPermission}
              >
                <FiBell /> Activar notificaciones
              </AnimatedButton>
            </NotificationActions>
          </>
        );
    }
  };
  
  return (
    <NotificationContainer>
      <NotificationHeader>
        <NotificationIcon status={permissionStatus}>
          {permissionStatus === 'granted' ? <FiBell /> : 
           permissionStatus === 'denied' ? <FiBellOff /> : 
           <FiInfo />}
        </NotificationIcon>
        <NotificationTitle>Notificaciones</NotificationTitle>
      </NotificationHeader>
      
      {renderContent()}
    </NotificationContainer>
  );
};

export default NotificationManager;
