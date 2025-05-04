import { useCallback } from 'react';
import useDeepMemo from './useDeepMemo';

/**
 * Hook personalizado para memoización profunda de funciones
 * Similar a useCallback, pero realiza una comparación profunda de las dependencias
 * @param {Function} callback - Función a memoizar
 * @param {Array} deps - Array de dependencias
 * @returns {Function} - Función memoizada
 */
const useDeepCallback = (callback, deps) => {
  // Usar useDeepMemo para memoizar la función
  return useDeepMemo(() => callback, deps);
};

export default useDeepCallback;
