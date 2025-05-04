import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
`;

const AuthHeader = styled.div`
  margin-bottom: 24px;
  text-align: center;
  
  h2 {
    font-size: 1.8rem;
    color: var(--text-dark);
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-medium);
  }
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-medium);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-speed);
  margin-top: 8px;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  background-color: rgba(239, 68, 68, 0.1);
  padding: 12px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
  color: var(--secondary-color);
  background-color: rgba(16, 185, 129, 0.1);
  padding: 12px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  margin-bottom: 16px;
`;

const AuthLink = styled.p`
  text-align: center;
  margin-top: 16px;
  color: var(--text-medium);
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await resetPassword(email);
      
      if (result) {
        setSuccess(true);
      } else {
        setError('Error al enviar el correo de recuperación. Inténtalo de nuevo.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContainer>
      <AuthHeader>
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo electrónico para recibir un enlace de recuperación</p>
      </AuthHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>
          Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña. Por favor revisa tu bandeja de entrada.
        </SuccessMessage>
      )}
      
      <AuthForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading || success}>
          {loading ? 'Enviando...' : 'Enviar Correo de Recuperación'}
        </SubmitButton>
      </AuthForm>
      
      <AuthLink>
        <a href="/signin">Volver a Iniciar Sesión</a>
      </AuthLink>
    </AuthContainer>
  );
};

export default ResetPassword;
