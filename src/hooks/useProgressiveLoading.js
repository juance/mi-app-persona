import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook personalizado para carga progresiva de datos
 * @param {Function} fetchFunction - Función para obtener datos
 * @param {Object} options - Opciones de configuración
 * @param {number} options.initialPageSize - Tamaño inicial de página
 * @param {number} options.incrementSize - Incremento de tamaño en cada carga
 * @param {number} options.maxItems - Número máximo de elementos a cargar
 * @param {boolean} options.loadOnMount - Cargar datos al montar el componente
 * @param {Array} options.dependencies - Dependencias para recargar datos
 * @returns {Object} - Estado y funciones para manejar la carga progresiva
 */
const useProgressiveLoading = (
  fetchFunction,
  {
    initialPageSize = 10,
    incrementSize = 10,
    maxItems = 100,
    loadOnMount = true,
    dependencies = []
  } = {}
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalCount, setTotalCount] = useState(0);
  
  // Referencia para evitar cargas duplicadas
  const loadingRef = useRef(false);
  
  // Función para cargar datos
  const loadData = useCallback(async (reset = false) => {
    // Evitar cargas duplicadas
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);
      
      // Si es reset, reiniciar el estado
      if (reset) {
        setData([]);
        setPageSize(initialPageSize);
        setHasMore(true);
      }
      
      // Calcular parámetros de paginación
      const start = reset ? 0 : data.length;
      const end = reset ? initialPageSize : data.length + pageSize;
      
      // Llamar a la función de obtención de datos
      const result = await fetchFunction({ start, end });
      
      // Actualizar estado
      if (reset) {
        setData(result.data || []);
      } else {
        setData(prevData => [...prevData, ...(result.data || [])]);
      }
      
      // Actualizar contador total si está disponible
      if (result.count !== undefined) {
        setTotalCount(result.count);
      }
      
      // Verificar si hay más datos para cargar
      const loadedCount = reset ? (result.data || []).length : data.length + (result.data || []).length;
      const hasMoreData = result.hasMore !== undefined 
        ? result.hasMore 
        : (result.count !== undefined ? loadedCount < result.count : (result.data || []).length > 0);
      
      setHasMore(hasMoreData && loadedCount < maxItems);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchFunction, data.length, pageSize, initialPageSize, maxItems]);
  
  // Función para cargar más datos
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPageSize(prevSize => prevSize + incrementSize);
      loadData();
    }
  }, [loading, hasMore, incrementSize, loadData]);
  
  // Función para recargar datos
  const refresh = useCallback(() => {
    return loadData(true);
  }, [loadData]);
  
  // Cargar datos al montar el componente o cuando cambian las dependencias
  useEffect(() => {
    if (loadOnMount) {
      refresh();
    }
  }, [loadOnMount, refresh, ...dependencies]);
  
  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    totalCount,
    loadedCount: data.length
  };
};

export default useProgressiveLoading;
