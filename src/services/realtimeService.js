import { supabase } from './supabase';

/**
 * Suscribe a cambios en tiempo real en una tabla
 * @param {string} table - Nombre de la tabla
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToTable = (table, callback, options = {}) => {
  const { event = '*', filter = '' } = options;

  const subscription = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', {
      event,
      schema: 'public',
      table,
      filter
    }, (payload) => {
      callback(payload);
    })
    .subscribe();

  return subscription;
};

/**
 * Suscribe a cambios en tiempo real en la tabla de transacciones
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToTransactions = async (callback, userId = null) => {
  // Si no se proporciona un ID de usuario, obtener el usuario actual
  if (!userId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  // Si hay un ID de usuario, filtrar por ese usuario
  if (userId) {
    return subscribeToTable('transactions', callback, {
      filter: `user_id=eq.${userId}`
    });
  }

  // Si no hay ID de usuario, suscribirse a todos los cambios
  return subscribeToTable('transactions', callback);
};

/**
 * Suscribe a cambios en tiempo real en la tabla de tareas
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToTasks = async (callback, userId = null) => {
  // Si no se proporciona un ID de usuario, obtener el usuario actual
  if (!userId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  // Si hay un ID de usuario, filtrar por ese usuario
  if (userId) {
    return subscribeToTable('tasks', callback, {
      filter: `user_id=eq.${userId}`
    });
  }

  // Si no hay ID de usuario, suscribirse a todos los cambios
  return subscribeToTable('tasks', callback);
};

/**
 * Suscribe a cambios en tiempo real en la tabla de inversiones
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToInvestments = async (callback, userId = null) => {
  // Si no se proporciona un ID de usuario, obtener el usuario actual
  if (!userId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  // Si hay un ID de usuario, filtrar por ese usuario
  if (userId) {
    return subscribeToTable('investments', callback, {
      filter: `user_id=eq.${userId}`
    });
  }

  // Si no hay ID de usuario, suscribirse a todos los cambios
  return subscribeToTable('investments', callback);
};

/**
 * Suscribe a cambios en tiempo real en la tabla de metas financieras
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToFinancialGoals = async (callback, userId = null) => {
  // Si no se proporciona un ID de usuario, obtener el usuario actual
  if (!userId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  // Si hay un ID de usuario, filtrar por ese usuario
  if (userId) {
    return subscribeToTable('financial_goals', callback, {
      filter: `user_id=eq.${userId}`
    });
  }

  // Si no hay ID de usuario, suscribirse a todos los cambios
  return subscribeToTable('financial_goals', callback);
};

/**
 * Suscribe a cambios en tiempo real en la tabla de eventos
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToEvents = async (callback, userId = null) => {
  // Si no se proporciona un ID de usuario, obtener el usuario actual
  if (!userId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  // Si hay un ID de usuario, filtrar por ese usuario
  if (userId) {
    return subscribeToTable('events', callback, {
      filter: `user_id=eq.${userId}`
    });
  }

  // Si no hay ID de usuario, suscribirse a todos los cambios
  return subscribeToTable('events', callback);
};

/**
 * Suscribe a cambios en tiempo real en la tabla de perfiles
 * @param {string} userId - ID del usuario
 * @param {Function} callback - Función a llamar cuando hay cambios
 * @returns {Object} - Objeto de suscripción
 */
export const subscribeToProfile = (userId, callback) => {
  return subscribeToTable('profiles', callback, {
    filter: `id=eq.${userId}`
  });
};

/**
 * Cancela una suscripción
 * @param {Object} subscription - Objeto de suscripción
 */
export const unsubscribe = (subscription) => {
  if (subscription) {
    supabase.removeChannel(subscription);
  }
};
