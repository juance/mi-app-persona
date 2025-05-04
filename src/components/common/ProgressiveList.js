import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FiLoader } from 'react-icons/fi';
import useProgressiveLoading from '../../hooks/useProgressiveLoading';

// Estilos
const ListContainer = styled.div`
  position: relative;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--text-medium);
  
  svg {
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadMoreButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 16px auto;
  display: block;
  transition: all 0.3s;
  
  &:hover {
    background-color: var(--primary-color-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  text-align: center;
  padding: 16px;
  margin: 16px 0;
  background-color: rgba(255, 99, 132, 0.1);
  border-radius: var(--border-radius);
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: var(--text-medium);
`;

/**
 * Componente para carga progresiva de listas
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.fetchFunction - Función para obtener datos
 * @param {Function} props.renderItem - Función para renderizar cada elemento
 * @param {string} props.keyExtractor - Función para extraer la clave de cada elemento
 * @param {number} props.initialPageSize - Tamaño inicial de página
 * @param {number} props.incrementSize - Incremento de tamaño en cada carga
 * @param {boolean} props.useInfiniteScroll - Usar scroll infinito en lugar de botón
 * @param {string} props.emptyMessage - Mensaje cuando no hay datos
 * @param {string} props.loadingMessage - Mensaje durante la carga
 * @param {string} props.errorMessage - Mensaje de error
 * @param {string} props.loadMoreText - Texto del botón de cargar más
 * @param {Array} props.dependencies - Dependencias para recargar datos
 * @returns {JSX.Element} - Componente de lista progresiva
 */
const ProgressiveList = ({
  fetchFunction,
  renderItem,
  keyExtractor,
  initialPageSize = 10,
  incrementSize = 10,
  useInfiniteScroll = true,
  emptyMessage = 'No hay elementos para mostrar',
  loadingMessage = 'Cargando...',
  errorMessage = 'Error al cargar los datos',
  loadMoreText = 'Cargar más',
  dependencies = [],
  ...props
}) => {
  // Referencia al elemento observado para scroll infinito
  const observerTarget = useRef(null);
  
  // Usar hook de carga progresiva
  const {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    totalCount,
    loadedCount
  } = useProgressiveLoading(fetchFunction, {
    initialPageSize,
    incrementSize,
    loadOnMount: true,
    dependencies
  });
  
  // Configurar observer para scroll infinito
  useEffect(() => {
    if (!useInfiniteScroll || !observerTarget.current || loading || !hasMore) {
      return;
    }
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(observerTarget.current);
    
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [useInfiniteScroll, loading, hasMore, loadMore]);
  
  // Renderizar elementos de la lista
  const renderItems = useCallback(() => {
    if (data.length === 0 && !loading) {
      return <EmptyMessage>{emptyMessage}</EmptyMessage>;
    }
    
    return data.map((item, index) => (
      <React.Fragment key={keyExtractor ? keyExtractor(item) : index}>
        {renderItem(item, index)}
      </React.Fragment>
    ));
  }, [data, loading, emptyMessage, renderItem, keyExtractor]);
  
  return (
    <ListContainer {...props}>
      {renderItems()}
      
      {error && (
        <ErrorMessage>
          {errorMessage}: {error.message}
        </ErrorMessage>
      )}
      
      {loading && (
        <LoadingIndicator>
          <FiLoader /> {loadingMessage}
        </LoadingIndicator>
      )}
      
      {!useInfiniteScroll && hasMore && !loading && (
        <LoadMoreButton onClick={loadMore} disabled={loading}>
          {loadMoreText}
        </LoadMoreButton>
      )}
      
      {useInfiniteScroll && hasMore && (
        <div ref={observerTarget} style={{ height: '20px' }} />
      )}
      
      {totalCount > 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem', margin: '8px 0' }}>
          Mostrando {loadedCount} de {totalCount} elementos
        </div>
      )}
    </ListContainer>
  );
};

export default ProgressiveList;
