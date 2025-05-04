import { useState, useEffect, useRef } from 'react';

/**
 * Hook personalizado para detectar gestos táctiles
 * @param {Object} options - Opciones de configuración
 * @param {number} options.threshold - Umbral de distancia para considerar un gesto (px)
 * @param {number} options.velocityThreshold - Umbral de velocidad para considerar un gesto (px/ms)
 * @param {Function} options.onSwipeLeft - Función a ejecutar al deslizar hacia la izquierda
 * @param {Function} options.onSwipeRight - Función a ejecutar al deslizar hacia la derecha
 * @param {Function} options.onSwipeUp - Función a ejecutar al deslizar hacia arriba
 * @param {Function} options.onSwipeDown - Función a ejecutar al deslizar hacia abajo
 * @param {Function} options.onTap - Función a ejecutar al tocar
 * @param {Function} options.onDoubleTap - Función a ejecutar al tocar dos veces
 * @param {Function} options.onLongPress - Función a ejecutar al mantener presionado
 * @returns {Object} - Propiedades y métodos para manejar gestos
 */
const useGestures = ({
  threshold = 50,
  velocityThreshold = 0.3,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onSwipeUp = () => {},
  onSwipeDown = () => {},
  onTap = () => {},
  onDoubleTap = () => {},
  onLongPress = () => {},
} = {}) => {
  // Estado para seguir los eventos táctiles
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, time: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0, time: 0 });
  const [isTouching, setIsTouching] = useState(false);
  
  // Referencias para manejar doble toque y toque largo
  const lastTap = useRef(0);
  const longPressTimer = useRef(null);
  const longPressThreshold = 500; // ms
  const doubleTapThreshold = 300; // ms
  
  // Limpiar el temporizador de toque largo al desmontar
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);
  
  // Manejar el inicio del toque
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const now = Date.now();
    
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: now,
    });
    
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: now,
    });
    
    setIsTouching(true);
    
    // Iniciar temporizador para toque largo
    longPressTimer.current = setTimeout(() => {
      onLongPress(e);
    }, longPressThreshold);
  };
  
  // Manejar el movimiento del toque
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const now = Date.now();
    
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: now,
    });
    
    // Si el usuario mueve el dedo, cancelar el toque largo
    if (
      Math.abs(touch.clientX - touchStart.x) > 10 ||
      Math.abs(touch.clientY - touchStart.y) > 10
    ) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  };
  
  // Manejar el fin del toque
  const handleTouchEnd = (e) => {
    const now = Date.now();
    setIsTouching(false);
    
    // Cancelar el temporizador de toque largo
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // Calcular distancias y velocidad
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const timeElapsed = touchEnd.time - touchStart.time || 1; // Evitar división por cero
    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / timeElapsed;
    
    // Detectar gestos de deslizamiento
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold || velocity > velocityThreshold) {
      // Determinar la dirección del deslizamiento
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Deslizamiento horizontal
        if (deltaX > 0) {
          onSwipeRight(e);
        } else {
          onSwipeLeft(e);
        }
      } else {
        // Deslizamiento vertical
        if (deltaY > 0) {
          onSwipeDown(e);
        } else {
          onSwipeUp(e);
        }
      }
    } else {
      // Detectar toque o doble toque
      const timeSinceLastTap = now - lastTap.current;
      
      if (timeSinceLastTap < doubleTapThreshold) {
        // Doble toque
        onDoubleTap(e);
        lastTap.current = 0; // Reiniciar para evitar triples toques
      } else {
        // Toque simple
        onTap(e);
        lastTap.current = now;
      }
    }
  };
  
  // Manejar la cancelación del toque
  const handleTouchCancel = () => {
    setIsTouching(false);
    
    // Cancelar el temporizador de toque largo
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };
  
  // Propiedades para adjuntar a un elemento
  const gestureHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
  };
  
  return {
    gestureHandlers,
    touchStart,
    touchEnd,
    isTouching,
  };
};

export default useGestures;
