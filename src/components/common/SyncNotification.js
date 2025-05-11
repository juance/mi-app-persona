import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiCloud, FiCloudOff, FiRefreshCw } from 'react-icons/fi';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 12px;
  box-shadow: var(--card-shadow);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--card-shadow-hover);
  }
`;

const Status = styled.span`
  font-size: 0.9rem;
  color: ${props => props.isOnline ? 'var(--success-color)' : 'var(--danger-color)'};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.isOnline ? 'var(--success-color)' : 'var(--danger-color)'};
  
  svg {
    animation: ${props => props.isSyncing ? 'spin 2s linear infinite' : 'none'};
  }
  
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SyncNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    const handleSyncStart = () => setIsSyncing(true);
    const handleSyncComplete = () => {
      setIsSyncing(false);
      setLastSync(new Date());
    };
    const handleSyncFailed = () => setIsSyncing(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('sync-start', handleSyncStart);
    window.addEventListener('sync-completed', handleSyncComplete);
    window.addEventListener('sync-failed', handleSyncFailed);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('sync-start', handleSyncStart);
      window.removeEventListener('sync-completed', handleSyncComplete);
      window.removeEventListener('sync-failed', handleSyncFailed);
    };
  }, []);

  return (
    <Container>
      <Icon isOnline={isOnline} isSyncing={isSyncing}>
        {isOnline ? (
          isSyncing ? <FiRefreshCw /> : <FiCloud />
        ) : (
          <FiCloudOff />
        )}
      </Icon>
      <Status isOnline={isOnline}>
        {isOnline ? (
          isSyncing ? 'Sincronizando...' : 'Conectado'
        ) : (
          'Sin conexión'
        )}
      </Status>
    </Container>
  );
};

export default SyncNotification;