import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

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

  svg {
    font-size: 1.1rem;
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

const SwitchText = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 0.9rem;
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

const ForgotPasswordContainer = styled.div`
  text-align: right;
  margin-top: 8px;
  font-size: 0.9rem;
`;

const ForgotPasswordLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = ({ onSwitchToRegister, onSwitchToReset }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!email.trim()) {
      setFormError('Por favor ingresa tu email');
      return;
    }

    if (!password) {
      setFormError('Por favor ingresa tu contraseña');
      return;
    }

    // Intentar iniciar sesión
    const { error } = await login(email, password);

    if (error) {
      setFormError(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Iniciar Sesión</FormTitle>

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

        <FormGroup>
          <Label htmlFor="password">Contraseña</Label>
          <InputGroup>
            <FiLock />
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </InputGroup>
          <ForgotPasswordContainer>
            <ForgotPasswordLink
              href="#"
              onClick={onSwitchToReset}
            >
              ¿Olvidaste tu contraseña?
            </ForgotPasswordLink>
          </ForgotPasswordContainer>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : (
            <>
              <FiLogIn />
              Iniciar Sesión
            </>
          )}
        </SubmitButton>

        {(formError || error) && (
          <ErrorMessage>
            {formError || error}
          </ErrorMessage>
        )}
      </form>

      <SwitchText>
        ¿No tienes una cuenta? <a href="#" onClick={onSwitchToRegister}>Regístrate</a>
      </SwitchText>
    </FormContainer>
  );
};

export default LoginForm;
