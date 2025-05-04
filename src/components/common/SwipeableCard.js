import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import useGestures from '../../hooks/useGestures';

// Contenedor principal
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
`;

// Tarjeta animada
const AnimatedCard = styled(animated.div)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

// Acciones a la izquierda (aparecen al deslizar a la derecha)
const LeftActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  background-color: var(--success-color);
  border-radius: var(--border-radius);
`;

// Acciones a la derecha (aparecen al deslizar a la izquierda)
const RightActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  background-color: var(--danger-color);
  border-radius: var(--border-radius);
`;

/**
 * Componente de tarjeta deslizable
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {React.ReactNode} props.leftAction - Contenido de la acción izquierda
 * @param {React.ReactNode} props.rightAction - Contenido de la acción derecha
 * @param {Function} props.onSwipeLeft - Función a ejecutar al deslizar a la izquierda
 * @param {Function} props.onSwipeRight - Función a ejecutar al deslizar a la derecha
 * @param {Function} props.onTap - Función a ejecutar al tocar
 * @param {Object} props.style - Estilos adicionales
 * @returns {JSX.Element} - Componente de tarjeta deslizable
 */
const SwipeableCard = ({
  children,
  leftAction,
  rightAction,
  onSwipeLeft,
  onSwipeRight,
  onTap,
  style,
  ...props
}) => {
  const [swiped, setSwiped] = useState(false);
  
  // Configurar animación con react-spring
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 20 },
  }));
  
  // Configurar gestos
  const { gestureHandlers } = useGestures({
    threshold: 80,
    velocityThreshold: 0.5,
    onSwipeLeft: () => {
      if (rightAction && onSwipeLeft) {
        api.start({ x: -200 });
        setSwiped(true);
        setTimeout(() => {
          onSwipeLeft();
        }, 300);
      } else {
        api.start({ x: 0 });
      }
    },
    onSwipeRight: () => {
      if (leftAction && onSwipeRight) {
        api.start({ x: 200 });
        setSwiped(true);
        setTimeout(() => {
          onSwipeRight();
        }, 300);
      } else {
        api.start({ x: 0 });
      }
    },
    onTap: () => {
      if (onTap) {
        onTap();
      }
    },
  });
  
  // Manejar el movimiento del dedo
  const handleTouchMove = (e) => {
    if (swiped) return;
    
    gestureHandlers.onTouchMove(e);
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - gestureHandlers.touchStart.x;
    
    // Limitar el desplazamiento
    if (
      (deltaX > 0 && !leftAction) ||
      (deltaX < 0 && !rightAction) ||
      Math.abs(deltaX) > 200
    ) {
      return;
    }
    
    api.start({ x: deltaX });
  };
  
  return (
    <CardContainer {...props}>
      {leftAction && <LeftActions>{leftAction}</LeftActions>}
      {rightAction && <RightActions>{rightAction}</RightActions>}
      
      <AnimatedCard
        style={{
          ...style,
          transform: x.to(x => `translateX(${x}px)`),
        }}
        {...gestureHandlers}
        onTouchMove={handleTouchMove}
      >
        {children}
      </AnimatedCard>
    </CardContainer>
  );
};

export default SwipeableCard;
