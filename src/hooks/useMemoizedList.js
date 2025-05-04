import { useMemo } from 'react';

/**
 * Hook personalizado para memoizar listas de elementos
 * Útil para evitar re-renderizados innecesarios en listas
 * @param {Array} list - Lista de elementos
 * @param {Function} getItemKey - Función para obtener la clave única de cada elemento
 * @param {Function} mapItem - Función para transformar cada elemento
 * @param {Array} deps - Dependencias adicionales
 * @returns {Array} - Lista memoizada
 */
const useMemoizedList = (list, getItemKey, mapItem, deps = []) => {
  // Memoizar las claves de los elementos
  const keys = useMemo(() => {
    return list.map(item => getItemKey(item));
  }, [list, getItemKey]);
  
  // Memoizar la lista transformada
  return useMemo(() => {
    return list.map(item => mapItem(item));
  }, [list, mapItem, keys, ...deps]);
};

export default useMemoizedList;
