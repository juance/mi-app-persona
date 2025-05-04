/**
 * Servicio para persistencia local directa
 * Este servicio proporciona una capa adicional de persistencia
 * para asegurar que los datos críticos no se pierdan
 */

// Prefijo para las claves de almacenamiento
const STORAGE_PREFIX = 'mi_app_personal_direct_';

/**
 * Guardar transacciones en localStorage
 * @param {string} userId - ID del usuario
 * @param {Array} transactions - Transacciones a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveTransactionsToLocalStorage = (userId, transactions) => {
  if (!userId || !transactions) {
    console.error('Se requiere userId y transactions para guardar en localStorage');
    return false;
  }
  
  try {
    // Guardar con timestamp para saber cuándo se guardaron
    const data = {
      transactions,
      timestamp: Date.now(),
      count: transactions.length
    };
    
    const key = `${STORAGE_PREFIX}transactions_${userId}`;
    localStorage.setItem(key, JSON.stringify(data));
    
    console.log(`Guardadas ${transactions.length} transacciones en localStorage para el usuario ${userId}`);
    return true;
  } catch (error) {
    console.error('Error al guardar transacciones en localStorage:', error);
    return false;
  }
};

/**
 * Obtener transacciones de localStorage
 * @param {string} userId - ID del usuario
 * @returns {Array} - Transacciones guardadas o array vacío
 */
export const getTransactionsFromLocalStorage = (userId) => {
  if (!userId) {
    console.error('Se requiere userId para obtener transacciones de localStorage');
    return [];
  }
  
  try {
    const key = `${STORAGE_PREFIX}transactions_${userId}`;
    const storedData = localStorage.getItem(key);
    
    if (!storedData) {
      console.log(`No hay transacciones guardadas en localStorage para el usuario ${userId}`);
      return [];
    }
    
    const data = JSON.parse(storedData);
    console.log(`Recuperadas ${data.transactions.length} transacciones de localStorage para el usuario ${userId} (guardadas hace ${Math.round((Date.now() - data.timestamp) / 1000 / 60)} minutos)`);
    
    return data.transactions || [];
  } catch (error) {
    console.error('Error al obtener transacciones de localStorage:', error);
    return [];
  }
};

/**
 * Guardar datos en localStorage
 * @param {string} key - Clave
 * @param {*} data - Datos a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveToLocalStorage = (key, data) => {
  if (!key) {
    console.error('Se requiere key para guardar en localStorage');
    return false;
  }
  
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.setItem(fullKey, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error al guardar ${key} en localStorage:`, error);
    return false;
  }
};

/**
 * Obtener datos de localStorage
 * @param {string} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*} - Datos guardados o valor por defecto
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  if (!key) {
    console.error('Se requiere key para obtener de localStorage');
    return defaultValue;
  }
  
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    const storedData = localStorage.getItem(fullKey);
    
    if (!storedData) {
      return defaultValue;
    }
    
    return JSON.parse(storedData);
  } catch (error) {
    console.error(`Error al obtener ${key} de localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Eliminar datos de localStorage
 * @param {string} key - Clave
 * @returns {boolean} - true si se eliminó correctamente
 */
export const removeFromLocalStorage = (key) => {
  if (!key) {
    console.error('Se requiere key para eliminar de localStorage');
    return false;
  }
  
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(fullKey);
    return true;
  } catch (error) {
    console.error(`Error al eliminar ${key} de localStorage:`, error);
    return false;
  }
};
