import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación de rotación
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Animación de pulso
const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

// Contenedor del spinner
const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' ? '16px' : '40px'};
  color: var(--text-medium);
`;

// Spinner circular
const Spinner = styled.div`
  width: ${props => props.size === 'small' ? '24px' : '48px'};
  height: ${props => props.size === 'small' ? '24px' : '48px'};
  border: ${props => props.size === 'small' ? '3px' : '5px'} solid rgba(var(--primary-color-rgb), 0.2);
  border-top: ${props => props.size === 'small' ? '3px' : '5px'} solid var(--primary-color);
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin-bottom: ${props => props.size === 'small' ? '8px' : '16px'};
`;

// Texto del spinner
const SpinnerText = styled.div`
  font-size: ${props => props.size === 'small' ? '0.9rem' : '1.1rem'};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

/**
 * Componente de spinner de carga
 * @param {Object} props - Propiedades del componente
 * @param {string} props.text - Texto a mostrar debajo del spinner
 * @param {string} props.size - Tamaño del spinner (small, medium, large)
 * @returns {JSX.Element} - Componente de spinner de carga
 */
const LoadingSpinner = ({ text = 'Cargando...', size = 'medium' }) => {
  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} />
      {text && <SpinnerText size={size}>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
