import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

// Estilos para el botón
const ButtonContainer = styled(animated.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  border: none;
  outline: none;
  gap: 8px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.variant === 'primary' && `
    background-color: var(--primary-color);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--primary-color-dark);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: var(--secondary-color);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--secondary-color-dark);
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background-color: var(--danger-color);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--danger-color-dark);
    }
  `}
  
  ${props => props.variant === 'outline' && `
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover:not(:disabled) {
      background-color: rgba(var(--primary-color-rgb), 0.1);
    }
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
`;

/**
 * Componente de botón con animación
 * @param {Object} props - Propiedades del componente
 * @param {string} props.variant - Variante del botón (primary, secondary, danger, outline)
 * @param {boolean} props.fullWidth - Si el botón debe ocupar todo el ancho disponible
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {Function} props.onClick - Función a ejecutar al hacer clic en el botón
 * @param {React.ReactNode} props.children - Contenido del botón
 * @returns {JSX.Element} - Componente de botón animado
 */
const AnimatedButton = ({ 
  variant = 'primary', 
  fullWidth = false, 
  disabled = false, 
  onClick, 
  children,
  ...rest 
}) => {
  // Animación al pasar el mouse por encima
  const [springs, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 }
  }));
  
  // Manejadores de eventos
  const handleMouseEnter = () => {
    if (!disabled) {
      api.start({ scale: 1.05 });
    }
  };
  
  const handleMouseLeave = () => {
    api.start({ scale: 1 });
  };
  
  const handleClick = (e) => {
    if (!disabled && onClick) {
      // Animación al hacer clic
      api.start({
        scale: 0.95,
        onRest: () => {
          api.start({ scale: 1 });
          onClick(e);
        }
      });
    }
  };
  
  return (
    <ButtonContainer
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={springs}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
};

export default AnimatedButton;
