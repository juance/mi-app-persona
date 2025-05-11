import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiRefreshCw } from 'react-icons/fi';
import { syncAllUserData } from '../../services/syncService';
import { showInfo, showError } from './Notification';
import { supabase } from '../../services/supabase';

const SyncButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${props => props.$syncing ? 'var(--bg-medium)' : props.disabled ? 'var(--bg-medium)' : 'var(--primary-color)'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.$syncing || props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.$syncing || props.disabled ? 'var(--bg-medium)' : 'var(--primary-dark)'};
  }

  svg {
    animation: ${props => props.$syncing ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SyncForceButton = () => {
  const [syncing, setSyncing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener el usuario actual directamente de Supabase
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error al obtener la sesión:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Suscribirse a cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSync = async () => {
    if (syncing || !user) return;

    setSyncing(true);
    showInfo('Iniciando sincronización forzada...');

    try {
      // Usar un ID de usuario temporal si no hay usuario autenticado
      const userId = user?.id || 'guest_user';
      const result = await syncAllUserData(userId, true);

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

  // Mostrar un botón deshabilitado mientras se carga o si no hay usuario
  const isDisabled = loading || !user;

  return (
    <SyncButton
      onClick={handleSync}
      $syncing={syncing}
      disabled={isDisabled}
      className="sync-force-button"
    >
      <FiRefreshCw size={16} />
      {syncing ? 'Sincronizando...' : isDisabled ? 'Inicia sesión para sincronizar' : 'Sincronizar datos'}
    </SyncButton>
  );
};

export default SyncForceButton;
