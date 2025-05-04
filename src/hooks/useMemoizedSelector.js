import { useMemo } from 'react';

/**
 * Hook personalizado para memoizar selectores
 * Útil para derivar datos de un estado complejo
 * @param {Function} selector - Función que selecciona datos del estado
 * @param {Array} inputs - Estado y otros inputs para el selector
 * @param {Array} deps - Dependencias adicionales
 * @returns {any} - Resultado memoizado del selector
 */
const useMemoizedSelector = (selector, inputs, deps = []) => {
  return useMemo(() => selector(...inputs), [...inputs, ...deps]);
};

export default useMemoizedSelector;
