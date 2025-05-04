/**
 * Servicio de caché avanzado para optimizar consultas a la base de datos
 */

// Caché en memoria
const memoryCache = new Map();

// Configuración de caché
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos
const MAX_CACHE_SIZE = 100; // Máximo número de entradas en caché
const CACHE_CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutos

// Estadísticas de caché
let cacheHits = 0;
let cacheMisses = 0;
let cacheEvictions = 0;

/**
 * Obtener valor de la caché
 * @param {string} key - Clave de caché
 * @returns {any|null} - Valor almacenado o null si no existe o expiró
 */
export const getCachedValue = (key) => {
  const cacheEntry = memoryCache.get(key);
  
  if (!cacheEntry) {
    cacheMisses++;
    return null;
  }
  
  // Verificar si el valor ha expirado
  if (cacheEntry.expiresAt && Date.now() > cacheEntry.expiresAt) {
    memoryCache.delete(key);
    cacheMisses++;
    return null;
  }
  
  // Actualizar estadísticas de acceso
  cacheEntry.lastAccessed = Date.now();
  cacheEntry.accessCount++;
  cacheHits++;
  
  return cacheEntry.value;
};

/**
 * Almacenar valor en la caché
 * @param {string} key - Clave de caché
 * @param {any} value - Valor a almacenar
 * @param {number} ttl - Tiempo de vida en milisegundos (opcional)
 * @param {Object} options - Opciones adicionales
 * @param {boolean} options.priority - Prioridad alta (no se eliminará en limpiezas automáticas)
 * @returns {boolean} - true si se almacenó correctamente
 */
export const setCachedValue = (key, value, ttl = DEFAULT_TTL, options = {}) => {
  // Verificar si es necesario limpiar la caché
  if (memoryCache.size >= MAX_CACHE_SIZE) {
    evictCacheEntries();
  }
  
  // Calcular tiempo de expiración
  const expiresAt = ttl > 0 ? Date.now() + ttl : null;
  
  // Almacenar valor en caché
  memoryCache.set(key, {
    value,
    expiresAt,
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    accessCount: 0,
    priority: options.priority || false
  });
  
  return true;
};

/**
 * Eliminar valor de la caché
 * @param {string} key - Clave de caché
 * @returns {boolean} - true si se eliminó correctamente
 */
export const removeCachedValue = (key) => {
  return memoryCache.delete(key);
};

/**
 * Limpiar toda la caché
 * @returns {boolean} - true si se limpió correctamente
 */
export const clearCache = () => {
  memoryCache.clear();
  return true;
};

/**
 * Ejecutar función con caché
 * @param {Function} fn - Función a ejecutar
 * @param {string} key - Clave de caché
 * @param {number} ttl - Tiempo de vida en milisegundos (opcional)
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<any>} - Resultado de la función
 */
export const withCache = async (fn, key, ttl = DEFAULT_TTL, options = {}) => {
  // Verificar si el valor está en caché
  const cachedValue = getCachedValue(key);
  
  if (cachedValue !== null) {
    return cachedValue;
  }
  
  // Ejecutar función
  const result = await fn();
  
  // Almacenar resultado en caché
  setCachedValue(key, result, ttl, options);
  
  return result;
};

/**
 * Eliminar entradas de caché según política de evicción
 * @private
 */
const evictCacheEntries = () => {
  // No eliminar si la caché no está llena
  if (memoryCache.size < MAX_CACHE_SIZE) {
    return;
  }
  
  // Convertir Map a Array para ordenar
  const entries = Array.from(memoryCache.entries());
  
  // Filtrar entradas con prioridad alta
  const normalEntries = entries.filter(([_, entry]) => !entry.priority);
  
  // Si no hay entradas normales, no eliminar nada
  if (normalEntries.length === 0) {
    return;
  }
  
  // Ordenar por último acceso (más antiguo primero)
  normalEntries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
  
  // Eliminar el 20% de las entradas más antiguas
  const entriesToRemove = Math.max(1, Math.floor(normalEntries.length * 0.2));
  
  for (let i = 0; i < entriesToRemove; i++) {
    if (i < normalEntries.length) {
      memoryCache.delete(normalEntries[i][0]);
      cacheEvictions++;
    }
  }
};

/**
 * Obtener estadísticas de caché
 * @returns {Object} - Estadísticas de caché
 */
export const getCacheStats = () => {
  return {
    size: memoryCache.size,
    hits: cacheHits,
    misses: cacheMisses,
    evictions: cacheEvictions,
    hitRatio: cacheHits + cacheMisses > 0 ? cacheHits / (cacheHits + cacheMisses) : 0
  };
};

/**
 * Prefetch de datos en caché
 * @param {Function} fn - Función para obtener datos
 * @param {string} key - Clave de caché
 * @param {number} ttl - Tiempo de vida en milisegundos (opcional)
 * @returns {Promise<boolean>} - true si se completó correctamente
 */
export const prefetchCache = async (fn, key, ttl = DEFAULT_TTL) => {
  try {
    const result = await fn();
    setCachedValue(key, result, ttl);
    return true;
  } catch (error) {
    console.error('Error en prefetch de caché:', error);
    return false;
  }
};

// Iniciar limpieza periódica de caché
setInterval(() => {
  const now = Date.now();
  
  // Eliminar entradas expiradas
  for (const [key, entry] of memoryCache.entries()) {
    if (entry.expiresAt && now > entry.expiresAt) {
      memoryCache.delete(key);
    }
  }
}, CACHE_CLEANUP_INTERVAL);
