import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { resetPassword } from '../../services/authService';

const FormContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`;

const FormDescription = styled.p`
  color: var(--text-medium);
  font-size: 0.95rem;
  margin-bottom: 24px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`;

const InputGroup = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 16px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: var(--success-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const ResetPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        setError(resetError.message || 'Error al enviar el correo de recuperación');
      } else {
        setSuccess('Se ha enviado un correo de recuperación a tu dirección de email');
        setEmail('');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('Error al enviar el correo de recuperación');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <FormContainer>
      <FormTitle>Recuperar Contraseña</FormTitle>
      <FormDescription>
        Ingresa tu dirección de email y te enviaremos un enlace para restablecer tu contraseña.
      </FormDescription>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <InputGroup>
            <FiMail />
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </InputGroup>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
        </SubmitButton>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </form>
      
      <BackButton onClick={onSwitchToLogin}>
        <FiArrowLeft /> Volver al inicio de sesión
      </BackButton>
    </FormContainer>
  );
};

export default ResetPasswordForm;
