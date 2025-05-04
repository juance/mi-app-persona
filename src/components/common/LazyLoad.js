import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

/**
 * Componente para cargar componentes de forma perezosa
 * @param {Object} props - Propiedades del componente
 * @param {React.LazyExoticComponent} props.component - Componente a cargar de forma perezosa
 * @param {Object} props.fallback - Componente a mostrar mientras se carga
 * @param {Object} props.props - Propiedades a pasar al componente
 * @returns {JSX.Element} - Componente cargado de forma perezosa
 */
const LazyLoad = ({ component: Component, fallback = <LoadingSpinner text="Cargando..." />, ...props }) => {
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoad;
