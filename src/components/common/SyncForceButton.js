import React, { useState } from 'react';
import styled from 'styled-components';
import { FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { syncAllUserData } from '../../services/syncService';
import { showInfo, showError } from './Notification';

const SyncButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${props => props.syncing ? 'var(--bg-medium)' : 'var(--primary-color)'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.syncing ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.syncing ? 'var(--bg-medium)' : 'var(--primary-dark)'};
  }

  svg {
    animation: ${props => props.syncing ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SyncForceButton = () => {
  const [syncing, setSyncing] = useState(false);
  const { user } = useAuth();

  const handleSync = async () => {
    if (syncing || !user) return;

    setSyncing(true);
    showInfo('Iniciando sincronización forzada...');

    try {
      const result = await syncAllUserData(user.id, true);

      if (result.success) {
        showInfo(`Sincronización completada: ${result.succeeded} almacenes sincronizados`);
      } else {
        showError(`Sincronización parcial: ${result.succeeded} sincronizados, ${result.failed} fallidos`);
      }
    } catch (error) {
      console.error('Error al forzar sincronización:', error);
      showError('Error al sincronizar datos');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <SyncButton
      onClick={handleSync}
      syncing={syncing}
      disabled={syncing}
      className="sync-force-button"
    >
      <FiRefreshCw size={16} />
      {syncing ? 'Sincronizando...' : 'Sincronizar datos'}
    </SyncButton>
  );
};

export default SyncForceButton;
