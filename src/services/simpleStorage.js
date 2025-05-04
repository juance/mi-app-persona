/**
 * Servicio de almacenamiento local simple
 * Este servicio proporciona funciones básicas para guardar y recuperar datos
 * del localStorage de manera directa y sencilla
 */

// Prefijo para las claves de almacenamiento
const STORAGE_PREFIX = 'mi_app_personal_simple_';

/**
 * Guardar datos en localStorage
 * @param {string} key - Clave
 * @param {*} data - Datos a guardar
 */
export const saveData = (key, data) => {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.setItem(fullKey, JSON.stringify(data));
    console.log(`Datos guardados en localStorage con clave ${key}:`, data);
    return true;
  } catch (error) {
    console.error(`Error al guardar datos en localStorage con clave ${key}:`, error);
    return false;
  }
};

/**
 * Obtener datos de localStorage
 * @param {string} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*} - Datos guardados o valor por defecto
 */
export const getData = (key, defaultValue = null) => {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    const storedData = localStorage.getItem(fullKey);

    if (!storedData) {
      return defaultValue;
    }

    const parsedData = JSON.parse(storedData);
    console.log(`Datos recuperados de localStorage con clave ${key}:`, parsedData);
    return parsedData;
  } catch (error) {
    console.error(`Error al obtener datos de localStorage con clave ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Eliminar datos de localStorage
 * @param {string} key - Clave
 */
export const removeData = (key) => {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(fullKey);
    console.log(`Datos eliminados de localStorage con clave ${key}`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar datos de localStorage con clave ${key}:`, error);
    return false;
  }
};

// Función genérica para generar un ID único
const generateId = () => `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// ==================== TRANSACCIONES ====================

/**
 * Guardar transacciones en localStorage
 * @param {Array} transactions - Transacciones a guardar
 */
export const saveTransactions = (transactions) => {
  return saveData('transactions', transactions);
};

/**
 * Obtener transacciones de localStorage
 * @returns {Array} - Transacciones guardadas o array vacío
 */
export const getTransactions = () => {
  return getData('transactions', []);
};

/**
 * Agregar una transacción
 * @param {Object} transaction - Transacción a agregar
 */
export const addTransaction = (transaction) => {
  try {
    // Generar ID si no tiene
    const transactionWithId = {
      ...transaction,
      id: transaction.id || generateId()
    };

    // Obtener transacciones actuales
    const currentTransactions = getTransactions();

    // Agregar la nueva transacción al principio
    const updatedTransactions = [transactionWithId, ...currentTransactions];

    // Guardar transacciones actualizadas
    saveTransactions(updatedTransactions);

    return transactionWithId;
  } catch (error) {
    console.error('Error al agregar transacción:', error);
    return null;
  }
};

/**
 * Actualizar una transacción
 * @param {string} id - ID de la transacción
 * @param {Object} updates - Datos a actualizar
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
      ...updates
    };

    // Guardar transacciones actualizadas
    saveTransactions(updatedTransactions);

    return updatedTransactions[index];
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    return null;
  }
};

/**
 * Eliminar una transacción
 * @param {string} id - ID de la transacción
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
    saveTransactions(updatedTransactions);

    return true;
  } catch (error) {
    console.error('Error al eliminar transacción:', error);
    return false;
  }
};

// ==================== TAREAS ====================

/**
 * Guardar tareas en localStorage
 * @param {Array} tasks - Tareas a guardar
 */
export const saveTasks = (tasks) => {
  return saveData('tasks', tasks);
};

/**
 * Obtener tareas de localStorage
 * @returns {Array} - Tareas guardadas o array vacío
 */
export const getTasks = () => {
  return getData('tasks', []);
};

/**
 * Agregar una tarea
 * @param {Object} task - Tarea a agregar
 */
export const addTask = (task) => {
  try {
    // Generar ID si no tiene
    const taskWithId = {
      ...task,
      id: task.id || generateId(),
      created_at: task.created_at || new Date().toISOString().split('T')[0]
    };

    // Obtener tareas actuales
    const currentTasks = getTasks();

    // Agregar la nueva tarea
    const updatedTasks = [...currentTasks, taskWithId];

    // Guardar tareas actualizadas
    saveTasks(updatedTasks);

    return taskWithId;
  } catch (error) {
    console.error('Error al agregar tarea:', error);
    return null;
  }
};

/**
 * Actualizar una tarea
 * @param {string} id - ID de la tarea
 * @param {Object} updates - Datos a actualizar
 */
export const updateTask = (id, updates) => {
  try {
    // Obtener tareas actuales
    const currentTasks = getTasks();

    // Buscar la tarea
    const index = currentTasks.findIndex(t => t.id === id);

    if (index === -1) {
      console.error(`No se encontró la tarea con ID ${id}`);
      return false;
    }

    // Actualizar la tarea
    const updatedTasks = [...currentTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      ...updates
    };

    // Guardar tareas actualizadas
    saveTasks(updatedTasks);

    return updatedTasks[index];
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    return null;
  }
};

/**
 * Eliminar una tarea
 * @param {string} id - ID de la tarea
 */
export const deleteTask = (id) => {
  try {
    // Obtener tareas actuales
    const currentTasks = getTasks();

    // Filtrar la tarea a eliminar
    const updatedTasks = currentTasks.filter(t => t.id !== id);

    // Si no se eliminó ninguna tarea, retornar false
    if (updatedTasks.length === currentTasks.length) {
      console.error(`No se encontró la tarea con ID ${id}`);
      return false;
    }

    // Guardar tareas actualizadas
    saveTasks(updatedTasks);

    return true;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    return false;
  }
};

/**
 * Cambiar el estado de completado de una tarea
 * @param {string} id - ID de la tarea
 * @param {boolean} completed - Estado de completado
 */
export const toggleTaskComplete = (id) => {
  try {
    // Obtener tareas actuales
    const currentTasks = getTasks();

    // Buscar la tarea
    const index = currentTasks.findIndex(t => t.id === id);

    if (index === -1) {
      console.error(`No se encontró la tarea con ID ${id}`);
      return false;
    }

    // Actualizar el estado de completado
    const updatedTasks = [...currentTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed
    };

    // Guardar tareas actualizadas
    saveTasks(updatedTasks);

    return updatedTasks[index];
  } catch (error) {
    console.error('Error al cambiar estado de tarea:', error);
    return null;
  }
};

// ==================== INVERSIONES ====================

/**
 * Guardar inversiones en localStorage
 * @param {Array} investments - Inversiones a guardar
 */
export const saveInvestments = (investments) => {
  return saveData('investments', investments);
};

/**
 * Obtener inversiones de localStorage
 * @returns {Array} - Inversiones guardadas o array vacío
 */
export const getInvestments = () => {
  return getData('investments', []);
};

/**
 * Agregar una inversión
 * @param {Object} investment - Inversión a agregar
 */
export const addInvestment = (investment) => {
  try {
    // Generar ID si no tiene
    const investmentWithId = {
      ...investment,
      id: investment.id || generateId()
    };

    // Obtener inversiones actuales
    const currentInvestments = getInvestments();

    // Agregar la nueva inversión
    const updatedInvestments = [...currentInvestments, investmentWithId];

    // Guardar inversiones actualizadas
    saveInvestments(updatedInvestments);

    return investmentWithId;
  } catch (error) {
    console.error('Error al agregar inversión:', error);
    return null;
  }
};

/**
 * Actualizar una inversión
 * @param {string} id - ID de la inversión
 * @param {Object} updates - Datos a actualizar
 */
export const updateInvestment = (id, updates) => {
  try {
    // Obtener inversiones actuales
    const currentInvestments = getInvestments();

    // Buscar la inversión
    const index = currentInvestments.findIndex(i => i.id === id);

    if (index === -1) {
      console.error(`No se encontró la inversión con ID ${id}`);
      return false;
    }

    // Actualizar la inversión
    const updatedInvestments = [...currentInvestments];
    updatedInvestments[index] = {
      ...updatedInvestments[index],
      ...updates
    };

    // Guardar inversiones actualizadas
    saveInvestments(updatedInvestments);

    return updatedInvestments[index];
  } catch (error) {
    console.error('Error al actualizar inversión:', error);
    return null;
  }
};

/**
 * Eliminar una inversión
 * @param {string} id - ID de la inversión
 */
export const deleteInvestment = (id) => {
  try {
    // Obtener inversiones actuales
    const currentInvestments = getInvestments();

    // Filtrar la inversión a eliminar
    const updatedInvestments = currentInvestments.filter(i => i.id !== id);

    // Si no se eliminó ninguna inversión, retornar false
    if (updatedInvestments.length === currentInvestments.length) {
      console.error(`No se encontró la inversión con ID ${id}`);
      return false;
    }

    // Guardar inversiones actualizadas
    saveInvestments(updatedInvestments);

    return true;
  } catch (error) {
    console.error('Error al eliminar inversión:', error);
    return false;
  }
};

// ==================== METAS FINANCIERAS ====================

/**
 * Guardar metas financieras en localStorage
 * @param {Array} goals - Metas financieras a guardar
 */
export const saveFinancialGoals = (goals) => {
  return saveData('financial_goals', goals);
};

/**
 * Obtener metas financieras de localStorage
 * @returns {Array} - Metas financieras guardadas o array vacío
 */
export const getFinancialGoals = () => {
  return getData('financial_goals', []);
};

/**
 * Agregar una meta financiera
 * @param {Object} goal - Meta financiera a agregar
 */
export const addFinancialGoal = (goal) => {
  try {
    // Generar ID si no tiene
    const goalWithId = {
      ...goal,
      id: goal.id || generateId()
    };

    // Obtener metas actuales
    const currentGoals = getFinancialGoals();

    // Agregar la nueva meta
    const updatedGoals = [...currentGoals, goalWithId];

    // Guardar metas actualizadas
    saveFinancialGoals(updatedGoals);

    return goalWithId;
  } catch (error) {
    console.error('Error al agregar meta financiera:', error);
    return null;
  }
};

/**
 * Actualizar una meta financiera
 * @param {string} id - ID de la meta
 * @param {Object} updates - Datos a actualizar
 */
export const updateFinancialGoal = (id, updates) => {
  try {
    // Obtener metas actuales
    const currentGoals = getFinancialGoals();

    // Buscar la meta
    const index = currentGoals.findIndex(g => g.id === id);

    if (index === -1) {
      console.error(`No se encontró la meta financiera con ID ${id}`);
      return false;
    }

    // Actualizar la meta
    const updatedGoals = [...currentGoals];
    updatedGoals[index] = {
      ...updatedGoals[index],
      ...updates
    };

    // Guardar metas actualizadas
    saveFinancialGoals(updatedGoals);

    return updatedGoals[index];
  } catch (error) {
    console.error('Error al actualizar meta financiera:', error);
    return null;
  }
};

/**
 * Eliminar una meta financiera
 * @param {string} id - ID de la meta
 */
export const deleteFinancialGoal = (id) => {
  try {
    // Obtener metas actuales
    const currentGoals = getFinancialGoals();

    // Filtrar la meta a eliminar
    const updatedGoals = currentGoals.filter(g => g.id !== id);

    // Si no se eliminó ninguna meta, retornar false
    if (updatedGoals.length === currentGoals.length) {
      console.error(`No se encontró la meta financiera con ID ${id}`);
      return false;
    }

    // Guardar metas actualizadas
    saveFinancialGoals(updatedGoals);

    return true;
  } catch (error) {
    console.error('Error al eliminar meta financiera:', error);
    return false;
  }
};
