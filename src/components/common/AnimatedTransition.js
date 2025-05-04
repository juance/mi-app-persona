import React from 'react';
import { useTransition, animated } from 'react-spring';

/**
 * Componente para animar la transición de elementos
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.items - Elementos a animar
 * @param {Function} props.renderItem - Función para renderizar cada elemento
 * @param {string} props.keyExtractor - Función para extraer la clave de cada elemento
 * @param {Object} props.config - Configuración de la animación
 * @returns {JSX.Element} - Componente de transición animada
 */
const AnimatedTransition = ({ 
  items, 
  renderItem, 
  keyExtractor = (item) => item.id,
  config = { tension: 125, friction: 20, precision: 0.1 }
}) => {
  // Configuración de la transición
  const transitions = useTransition(items, {
    keys: keyExtractor,
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    config
  });

  return (
    <>
      {transitions((style, item) => (
        <animated.div style={style}>
          {renderItem(item)}
        </animated.div>
      ))}
    </>
  );
};

export default AnimatedTransition;
