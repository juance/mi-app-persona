import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import AnimatedButton from './AnimatedButton';

// Fondo oscuro
const Overlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

// Contenedor del diálogo
const DialogContainer = styled(animated.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

// Título del diálogo
const DialogTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--text-dark);
  font-size: 1.3rem;
  font-weight: 600;
`;

// Contenido del diálogo
const DialogContent = styled.div`
  margin-bottom: 24px;
  color: var(--text-medium);
  font-size: 1rem;
  line-height: 1.5;
`;

// Acciones del diálogo
const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

/**
 * Componente de diálogo de confirmación
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Si el diálogo está abierto
 * @param {Function} props.onClose - Función a ejecutar al cerrar el diálogo
 * @param {Function} props.onConfirm - Función a ejecutar al confirmar
 * @param {string} props.title - Título del diálogo
 * @param {React.ReactNode} props.children - Contenido del diálogo
 * @param {string} props.confirmText - Texto del botón de confirmación
 * @param {string} props.cancelText - Texto del botón de cancelación
 * @param {string} props.confirmVariant - Variante del botón de confirmación
 * @returns {JSX.Element} - Componente de diálogo de confirmación
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar',
  children,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary'
}) => {
  // Animación del fondo
  const overlayAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 20 }
  });
  
  // Animación del diálogo
  const dialogAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 300, friction: 20 }
  });
  
  // Si el diálogo no está abierto, no renderizar nada
  if (!isOpen) {
    return null;
  }
  
  return (
    <Overlay style={overlayAnimation} onClick={onClose}>
      <DialogContainer 
        style={dialogAnimation} 
        onClick={e => e.stopPropagation()}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <AnimatedButton 
            variant="outline" 
            onClick={onClose}
            fullWidth={window.innerWidth <= 480}
          >
            {cancelText}
          </AnimatedButton>
          <AnimatedButton 
            variant={confirmVariant} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            fullWidth={window.innerWidth <= 480}
          >
            {confirmText}
          </AnimatedButton>
        </DialogActions>
      </DialogContainer>
    </Overlay>
  );
};

export default ConfirmDialog;
