import { useRef, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * Hook personalizado para memoización profunda
 * Similar a useMemo, pero realiza una comparación profunda de las dependencias
 * @param {Function} factory - Función que crea el valor memoizado
 * @param {Array} deps - Array de dependencias
 * @returns {any} - Valor memoizado
 */
const useDeepMemo = (factory, deps) => {
  const ref = useRef({
    deps: undefined,
    value: undefined,
    initialized: false
  });

  // Verificar si las dependencias han cambiado mediante comparación profunda
  const depsChanged = !ref.current.initialized || !isEqual(deps, ref.current.deps);

  // Si las dependencias cambiaron, recalcular el valor
  if (depsChanged) {
    ref.current.deps = deps;
    ref.current.value = factory();
    ref.current.initialized = true;
  }

  return ref.current.value;
};

export default useDeepMemo;
