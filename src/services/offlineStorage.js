/**
 * Servicio para gestionar el almacenamiento local y la sincronización offline
 */

// Prefijo para las claves de almacenamiento
const STORAGE_PREFIX = 'mi_app_personal_';

// Nombre de la base de datos IndexedDB
const DB_NAME = 'mi_app_personal_db';
const DB_VERSION = 1;

// Almacenes de objetos (tablas)
const STORES = {
  TRANSACTIONS: 'transactions',
  TASKS: 'tasks',
  EVENTS: 'events',
  INVESTMENTS: 'investments',
  FINANCIAL_GOALS: 'financial_goals',
  SYNC_QUEUE: 'sync_queue',
};

// Estado de la conexión
let isOnline = navigator.onLine;

// Referencia a la base de datos
let db = null;

/**
 * Inicializar la base de datos IndexedDB
 * @returns {Promise<IDBDatabase>} - Instancia de la base de datos
 */
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    
    // Abrir la base de datos
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    // Manejar errores
    request.onerror = (event) => {
      console.error('Error al abrir la base de datos:', event.target.error);
      reject(event.target.error);
    };
    
    // Manejar actualización de versión
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      
      // Crear almacenes de objetos si no existen
      if (!database.objectStoreNames.contains(STORES.TRANSACTIONS)) {
        database.createObjectStore(STORES.TRANSACTIONS, { keyPath: 'id' });
      }
      
      if (!database.objectStoreNames.contains(STORES.TASKS)) {
        database.createObjectStore(STORES.TASKS, { keyPath: 'id' });
      }
      
      if (!database.objectStoreNames.contains(STORES.EVENTS)) {
        database.createObjectStore(STORES.EVENTS, { keyPath: 'id' });
      }
      
      if (!database.objectStoreNames.contains(STORES.INVESTMENTS)) {
        database.createObjectStore(STORES.INVESTMENTS, { keyPath: 'id' });
      }
      
      if (!database.objectStoreNames.contains(STORES.FINANCIAL_GOALS)) {
        database.createObjectStore(STORES.FINANCIAL_GOALS, { keyPath: 'id' });
      }
      
      if (!database.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        database.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
      }
    };
    
    // Manejar éxito
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
  });
};

/**
 * Guardar datos en IndexedDB
 * @param {string} storeName - Nombre del almacén
 * @param {Object|Array} data - Datos a guardar
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const saveToIndexedDB = async (storeName, data) => {
  try {
    const database = await initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      // Si es un array, guardar cada elemento
      if (Array.isArray(data)) {
        const results = [];
        
        data.forEach((item) => {
          const request = store.put(item);
          
          request.onsuccess = (event) => {
            results.push(event.target.result);
          };
          
          request.onerror = (event) => {
            console.error(`Error al guardar en ${storeName}:`, event.target.error);
          };
        });
        
        transaction.oncomplete = () => {
          resolve(results);
        };
        
        transaction.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        // Si es un objeto, guardarlo directamente
        const request = store.put(data);
        
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        
        request.onerror = (event) => {
          reject(event.target.error);
        };
      }
    });
  } catch (error) {
    console.error(`Error al guardar en ${storeName}:`, error);
    throw error;
  }
};

/**
 * Obtener datos de IndexedDB
 * @param {string} storeName - Nombre del almacén
 * @param {string|number} id - ID del elemento (opcional)
 * @returns {Promise<Object|Array>} - Datos obtenidos
 */
export const getFromIndexedDB = async (storeName, id = null) => {
  try {
    const database = await initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      
      if (id) {
        // Obtener un elemento específico
        const request = store.get(id);
        
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        
        request.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        // Obtener todos los elementos
        const request = store.getAll();
        
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        
        request.onerror = (event) => {
          reject(event.target.error);
        };
      }
    });
  } catch (error) {
    console.error(`Error al obtener de ${storeName}:`, error);
    throw error;
  }
};

/**
 * Eliminar datos de IndexedDB
 * @param {string} storeName - Nombre del almacén
 * @param {string|number} id - ID del elemento
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 */
export const deleteFromIndexedDB = async (storeName, id) => {
  try {
    const database = await initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error al eliminar de ${storeName}:`, error);
    throw error;
  }
};

/**
 * Limpiar un almacén de IndexedDB
 * @param {string} storeName - Nombre del almacén
 * @returns {Promise<boolean>} - true si se limpió correctamente
 */
export const clearIndexedDBStore = async (storeName) => {
  try {
    const database = await initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error(`Error al limpiar ${storeName}:`, error);
    throw error;
  }
};

/**
 * Agregar una operación a la cola de sincronización
 * @param {Object} operation - Operación a sincronizar
 * @param {string} operation.type - Tipo de operación (CREATE, UPDATE, DELETE)
 * @param {string} operation.storeName - Nombre del almacén
 * @param {Object} operation.data - Datos de la operación
 * @returns {Promise<number>} - ID de la operación en la cola
 */
export const addToSyncQueue = async (operation) => {
  try {
    const syncOperation = {
      ...operation,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    return await saveToIndexedDB(STORES.SYNC_QUEUE, syncOperation);
  } catch (error) {
    console.error('Error al agregar a la cola de sincronización:', error);
    throw error;
  }
};

/**
 * Obtener operaciones pendientes de la cola de sincronización
 * @returns {Promise<Array>} - Operaciones pendientes
 */
export const getPendingSyncOperations = async () => {
  try {
    const operations = await getFromIndexedDB(STORES.SYNC_QUEUE);
    return operations.filter(op => op.status === 'pending');
  } catch (error) {
    console.error('Error al obtener operaciones pendientes:', error);
    throw error;
  }
};

/**
 * Marcar una operación como completada en la cola de sincronización
 * @param {number} id - ID de la operación
 * @returns {Promise<boolean>} - true si se actualizó correctamente
 */
export const markSyncOperationComplete = async (id) => {
  try {
    const operation = await getFromIndexedDB(STORES.SYNC_QUEUE, id);
    
    if (!operation) {
      throw new Error(`Operación no encontrada: ${id}`);
    }
    
    operation.status = 'completed';
    operation.syncedAt = Date.now();
    
    await saveToIndexedDB(STORES.SYNC_QUEUE, operation);
    return true;
  } catch (error) {
    console.error('Error al marcar operación como completada:', error);
    throw error;
  }
};

/**
 * Marcar una operación como fallida en la cola de sincronización
 * @param {number} id - ID de la operación
 * @param {string} error - Mensaje de error
 * @returns {Promise<boolean>} - true si se actualizó correctamente
 */
export const markSyncOperationFailed = async (id, error) => {
  try {
    const operation = await getFromIndexedDB(STORES.SYNC_QUEUE, id);
    
    if (!operation) {
      throw new Error(`Operación no encontrada: ${id}`);
    }
    
    operation.status = 'failed';
    operation.error = error;
    operation.lastAttempt = Date.now();
    
    await saveToIndexedDB(STORES.SYNC_QUEUE, operation);
    return true;
  } catch (error) {
    console.error('Error al marcar operación como fallida:', error);
    throw error;
  }
};

/**
 * Verificar si hay conexión a Internet
 * @returns {boolean} - true si hay conexión
 */
export const checkOnlineStatus = () => {
  return navigator.onLine;
};

/**
 * Configurar listeners para cambios en el estado de la conexión
 * @param {Function} onOnline - Función a ejecutar cuando se recupera la conexión
 * @param {Function} onOffline - Función a ejecutar cuando se pierde la conexión
 */
export const setupConnectivityListeners = (onOnline, onOffline) => {
  window.addEventListener('online', () => {
    isOnline = true;
    if (onOnline) onOnline();
  });
  
  window.addEventListener('offline', () => {
    isOnline = false;
    if (onOffline) onOffline();
  });
};

/**
 * Guardar datos en localStorage
 * @param {string} key - Clave
 * @param {*} value - Valor
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, serializedValue);
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

/**
 * Obtener datos de localStorage
 * @param {string} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*} - Valor obtenido
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error al obtener de localStorage:', error);
    return defaultValue;
  }
};

/**
 * Eliminar datos de localStorage
 * @param {string} key - Clave
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
};
