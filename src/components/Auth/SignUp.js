import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await signUp(email, password);
      
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      } else {
        setError('Error al registrarse. Inténtalo de nuevo.');
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
        <h2>Crear Cuenta</h2>
        <p>Regístrate para comenzar a usar la aplicación</p>
      </AuthHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>
          ¡Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta. Serás redirigido en unos segundos...
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
        
        <FormGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading || success}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </SubmitButton>
      </AuthForm>
      
      <AuthLink>
        ¿Ya tienes una cuenta? <a href="/signin">Inicia sesión</a>
      </AuthLink>
    </AuthContainer>
  );
};

export default SignUp;
