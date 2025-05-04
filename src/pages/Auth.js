import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import ResetPasswordForm from '../components/Auth/ResetPasswordForm';
import { useAuth } from '../contexts/AuthContext';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-medium) 100%);
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  color: var(--text-medium);
`;

const Auth = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'reset'
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSwitchToRegister = (e) => {
    e.preventDefault();
    setAuthMode('register');
  };

  const handleSwitchToLogin = (e) => {
    e.preventDefault();
    setAuthMode('login');
  };

  const handleSwitchToReset = (e) => {
    e.preventDefault();
    setAuthMode('reset');
  };

  if (loading) {
    return (
      <AuthContainer>
        <div>Cargando...</div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthHeader>
        <Logo>Mi App Personal</Logo>
        <Tagline>Gestiona tus finanzas, tareas e inversiones en un solo lugar</Tagline>
      </AuthHeader>

      {authMode === 'login' && (
        <LoginForm
          onSwitchToRegister={handleSwitchToRegister}
          onSwitchToReset={handleSwitchToReset}
        />
      )}

      {authMode === 'register' && (
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      )}

      {authMode === 'reset' && (
        <ResetPasswordForm onSwitchToLogin={handleSwitchToLogin} />
      )}
    </AuthContainer>
  );
};

export default Auth;
