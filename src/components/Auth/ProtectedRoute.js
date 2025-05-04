import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Para fines de demostración, permitimos el acceso sin autenticación
  // Esto es temporal para que puedas acceder a la aplicación desplegada
  const allowDemoAccess = true;

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

  if (!user && !allowDemoAccess) {
    // Redirigir al usuario a la página de autenticación si no está autenticado
    // y no estamos en modo demostración
    return <Navigate to="/auth" replace />;
  }

  // Renderizar las rutas hijas si el usuario está autenticado o estamos en modo demostración
  return <Outlet />;
};

export default ProtectedRoute;
