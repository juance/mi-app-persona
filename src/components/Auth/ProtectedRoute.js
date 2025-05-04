import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Cargando...
      </div>
    );
  }

  if (!user) {
    // Redirigir al usuario a la página de autenticación si no está autenticado
    return <Navigate to="/auth" replace />;
  }

  // Renderizar las rutas hijas si el usuario está autenticado
  return <Outlet />;
};

export default ProtectedRoute;
