/**
 * Servicio para almacenamiento local independiente
 * Este servicio proporciona funciones para guardar y recuperar datos
 * localmente sin depender de la autenticación o la base de datos
 */

// Prefijo para las claves de almacenamiento
const STORAGE_PREFIX = 'mi_app_personal_local_';

// ID de usuario para modo demo
export const DEMO_USER_ID = 'demo_user';

/**
 * Guardar datos en localStorage
 * @param {string} key - Clave
 * @param {*} data - Datos a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveLocalData = (key, data) => {
  if (!key) {
    console.error('Se requiere key para guardar en localStorage');
    return false;
  }
  
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    const dataToSave = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(fullKey, JSON.stringify(dataToSave));
    console.log(`Datos guardados en localStorage con clave ${key}`);
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
export const getLocalData = (key, defaultValue = null) => {
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
    
    const parsedData = JSON.parse(storedData);
    console.log(`Datos recuperados de localStorage con clave ${key} (guardados hace ${Math.round((Date.now() - parsedData.timestamp) / 1000 / 60)} minutos)`);
    return parsedData.data;
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
export const removeLocalData = (key) => {
  if (!key) {
    console.error('Se requiere key para eliminar de localStorage');
    return false;
  }
  
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(fullKey);
    console.log(`Datos eliminados de localStorage con clave ${key}`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar ${key} de localStorage:`, error);
    return false;
  }
};

/**
 * Guardar transacciones en localStorage
 * @param {Array} transactions - Transacciones a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveTransactions = (transactions) => {
  return saveLocalData('transactions', transactions);
};

/**
 * Obtener transacciones de localStorage
 * @returns {Array} - Transacciones guardadas o array vacío
 */
export const getTransactions = () => {
  return getLocalData('transactions', []);
};

/**
 * Agregar una transacción a las existentes
 * @param {Object} transaction - Transacción a agregar
 * @returns {boolean} - true si se guardó correctamente
 */
export const addTransaction = (transaction) => {
  try {
    // Generar ID si no tiene
    const transactionWithId = {
      ...transaction,
      id: transaction.id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: transaction.user_id || DEMO_USER_ID,
      created_at: transaction.created_at || new Date().toISOString()
    };
    
    // Obtener transacciones actuales
    const currentTransactions = getTransactions();
    
    // Agregar la nueva transacción al principio
    const updatedTransactions = [transactionWithId, ...currentTransactions];
    
    // Guardar transacciones actualizadas
    return saveTransactions(updatedTransactions);
  } catch (error) {
    console.error('Error al agregar transacción:', error);
    return false;
  }
};

/**
 * Actualizar una transacción existente
 * @param {string} id - ID de la transacción
 * @param {Object} updates - Datos a actualizar
 * @returns {boolean} - true si se actualizó correctamente
 */
export const updateTransaction = (id, updates) => {
  try {
    // Obtener transacciones actuales
    const currentTransactions = getTransactions();
    
    // Buscar la transacción
    const index = currentTransactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      console.error(`No se encontró la transacción con ID ${id}`);
      return false;
    }
    
    // Actualizar la transacción
    const updatedTransactions = [...currentTransactions];
    updatedTransactions[index] = {
      ...updatedTransactions[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    // Guardar transacciones actualizadas
    return saveTransactions(updatedTransactions);
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    return false;
  }
};

/**
 * Eliminar una transacción
 * @param {string} id - ID de la transacción
 * @returns {boolean} - true si se eliminó correctamente
 */
export const deleteTransaction = (id) => {
  try {
    // Obtener transacciones actuales
    const currentTransactions = getTransactions();
    
    // Filtrar la transacción a eliminar
    const updatedTransactions = currentTransactions.filter(t => t.id !== id);
    
    // Si no se eliminó ninguna transacción, retornar false
    if (updatedTransactions.length === currentTransactions.length) {
      console.error(`No se encontró la transacción con ID ${id}`);
      return false;
    }
    
    // Guardar transacciones actualizadas
    return saveTransactions(updatedTransactions);
  } catch (error) {
    console.error('Error al eliminar transacción:', error);
    return false;
  }
};

/**
 * Guardar tareas en localStorage
 * @param {Array} tasks - Tareas a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveTasks = (tasks) => {
  return saveLocalData('tasks', tasks);
};

/**
 * Obtener tareas de localStorage
 * @returns {Array} - Tareas guardadas o array vacío
 */
export const getTasks = () => {
  return getLocalData('tasks', []);
};

/**
 * Guardar eventos en localStorage
 * @param {Array} events - Eventos a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveEvents = (events) => {
  return saveLocalData('events', events);
};

/**
 * Obtener eventos de localStorage
 * @returns {Array} - Eventos guardados o array vacío
 */
export const getEvents = () => {
  return getLocalData('events', []);
};

/**
 * Guardar inversiones en localStorage
 * @param {Array} investments - Inversiones a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveInvestments = (investments) => {
  return saveLocalData('investments', investments);
};

/**
 * Obtener inversiones de localStorage
 * @returns {Array} - Inversiones guardadas o array vacío
 */
export const getInvestments = () => {
  return getLocalData('investments', []);
};

/**
 * Guardar metas financieras en localStorage
 * @param {Array} goals - Metas financieras a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveFinancialGoals = (goals) => {
  return saveLocalData('financial_goals', goals);
};

/**
 * Obtener metas financieras de localStorage
 * @returns {Array} - Metas financieras guardadas o array vacío
 */
export const getFinancialGoals = () => {
  return getLocalData('financial_goals', []);
};

/**
 * Guardar categorías en localStorage
 * @param {Array} categories - Categorías a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const saveCategories = (categories) => {
  return saveLocalData('categories', categories);
};

/**
 * Obtener categorías de localStorage
 * @returns {Array} - Categorías guardadas o array vacío
 */
export const getCategories = () => {
  return getLocalData('categories', []);
};

/**
 * Guardar plataformas en localStorage
 * @param {Array} platforms - Plataformas a guardar
 * @returns {boolean} - true si se guardó correctamente
 */
export const savePlatforms = (platforms) => {
  return saveLocalData('platforms', platforms);
};

/**
 * Obtener plataformas de localStorage
 * @returns {Array} - Plataformas guardadas o array vacío
 */
export const getPlatforms = () => {
  return getLocalData('platforms', []);
};
