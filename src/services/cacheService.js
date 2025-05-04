/**
 * Servicio de caché para mejorar el rendimiento
 */

// Almacén de caché
const cacheStore = new Map();

// Tiempo de expiración predeterminado (5 minutos)
const DEFAULT_EXPIRATION = 5 * 60 * 1000;

/**
 * Obtiene un valor de la caché
 * @param {string} key - Clave del valor
 * @returns {*} - Valor almacenado o null si no existe o ha expirado
 */
export const getCachedValue = (key) => {
  if (!cacheStore.has(key)) {
    return null;
  }
  
  const cachedItem = cacheStore.get(key);
  
  // Verificar si el valor ha expirado
  if (cachedItem.expiration < Date.now()) {
    cacheStore.delete(key);
    return null;
  }
  
  return cachedItem.value;
};

/**
 * Almacena un valor en la caché
 * @param {string} key - Clave del valor
 * @param {*} value - Valor a almacenar
 * @param {number} expiration - Tiempo de expiración en milisegundos
 */
export const setCachedValue = (key, value, expiration = DEFAULT_EXPIRATION) => {
  cacheStore.set(key, {
    value,
    expiration: Date.now() + expiration,
  });
};

/**
 * Elimina un valor de la caché
 * @param {string} key - Clave del valor
 */
export const removeCachedValue = (key) => {
  cacheStore.delete(key);
};

/**
 * Limpia toda la caché
 */
export const clearCache = () => {
  cacheStore.clear();
};

/**
 * Limpia los valores expirados de la caché
 */
export const cleanExpiredCache = () => {
  const now = Date.now();
  
  for (const [key, item] of cacheStore.entries()) {
    if (item.expiration < now) {
      cacheStore.delete(key);
    }
  }
};

/**
 * Obtiene estadísticas de la caché
 * @returns {Object} - Estadísticas de la caché
 */
export const getCacheStats = () => {
  const now = Date.now();
  let validItems = 0;
  let expiredItems = 0;
  
  for (const item of cacheStore.values()) {
    if (item.expiration < now) {
      expiredItems++;
    } else {
      validItems++;
    }
  }
  
  return {
    totalItems: cacheStore.size,
    validItems,
    expiredItems,
  };
};

/**
 * Función para envolver una función asíncrona con caché
 * @param {Function} fn - Función a envolver
 * @param {Function} keyFn - Función para generar la clave de caché
 * @param {number} expiration - Tiempo de expiración en milisegundos
 * @returns {Function} - Función envuelta con caché
 */
export const withCache = (fn, keyFn, expiration = DEFAULT_EXPIRATION) => {
  return async (...args) => {
    const key = keyFn(...args);
    const cachedValue = getCachedValue(key);
    
    if (cachedValue !== null) {
      return cachedValue;
    }
    
    const result = await fn(...args);
    setCachedValue(key, result, expiration);
    
    return result;
  };
};

// Limpiar la caché expirada cada 5 minutos
setInterval(cleanExpiredCache, 5 * 60 * 1000);
