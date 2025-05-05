import {
  getPendingSyncOperations,
  markSyncOperationComplete,
  markSyncOperationFailed,
  checkOnlineStatus,
  setupConnectivityListeners,
  getFromIndexedDB,
  saveToIndexedDB,
  clearIndexedDBStore
} from './offlineStorage';
import { supabase } from './supabase';
import { showInfo, showError } from '../components/common/Notification';

// Estado de la sincronización
let isSyncing = false;
let syncInterval = null;
const SYNC_INTERVAL = 30000; // 30 segundos

/**
 * Iniciar el servicio de sincronización
 * @param {Object} options - Opciones de configuración
 * @param {boolean} options.showNotifications - Mostrar notificaciones
 * @param {number} options.interval - Intervalo de sincronización en ms
 * @returns {Object} - Métodos para controlar la sincronización
 */
export const initSyncService = (options = {}) => {
  const {
    showNotifications = true,
    interval = SYNC_INTERVAL
  } = options;

  // Configurar listeners para cambios en el estado de la conexión
  setupConnectivityListeners(
    // Cuando se recupera la conexión
    () => {
      if (showNotifications) {
        showInfo('Conexión a Internet restablecida. Sincronizando datos...');
      }
      syncData();
    },
    // Cuando se pierde la conexión
    () => {
      if (showNotifications) {
        showInfo('Sin conexión a Internet. Los cambios se guardarán localmente.');
      }
    }
  );

  // Iniciar sincronización periódica
  if (syncInterval) {
    clearInterval(syncInterval);
  }

  syncInterval = setInterval(() => {
    if (checkOnlineStatus() && !isSyncing) {
      syncData();
    }
  }, interval);

  // Realizar sincronización inicial
  if (checkOnlineStatus()) {
    syncData();
  }

  // Devolver métodos para controlar la sincronización
  return {
    syncNow: syncData,
    stopSync: () => {
      if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
      }
    },
    resumeSync: () => {
      if (!syncInterval) {
        syncInterval = setInterval(() => {
          if (checkOnlineStatus() && !isSyncing) {
            syncData();
          }
        }, interval);
      }
    },
    getStatus: () => ({
      isSyncing,
      isOnline: checkOnlineStatus(),
      syncInterval: syncInterval ? interval : null,
    }),
  };
};

/**
 * Sincronizar datos con el servidor
 * @returns {Promise<Object>} - Resultado de la sincronización
 */
export const syncData = async () => {
  if (isSyncing || !checkOnlineStatus()) {
    return { success: false, message: 'Ya hay una sincronización en curso o no hay conexión' };
  }

  isSyncing = true;

  try {
    // Obtener operaciones pendientes
    const pendingOperations = await getPendingSyncOperations();

    if (pendingOperations.length === 0) {
      isSyncing = false;
      return { success: true, message: 'No hay operaciones pendientes', synced: 0 };
    }

    // Procesar operaciones pendientes
    const results = await Promise.allSettled(
      pendingOperations.map(processOperation)
    );

    // Contar resultados
    const succeeded = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.filter(r => r.status === 'rejected' || !r.value.success).length;

    isSyncing = false;

    return {
      success: failed === 0,
      message: `Sincronización completada: ${succeeded} operaciones exitosas, ${failed} fallidas`,
      synced: succeeded,
      failed,
      total: pendingOperations.length,
    };
  } catch (error) {
    console.error('Error durante la sincronización:', error);
    isSyncing = false;

    return {
      success: false,
      message: `Error durante la sincronización: ${error.message}`,
      synced: 0,
      failed: 0,
      total: 0,
    };
  }
};

/**
 * Procesar una operación pendiente
 * @param {Object} operation - Operación a procesar
 * @returns {Promise<Object>} - Resultado del procesamiento
 */
const processOperation = async (operation) => {
  try {
    let result;

    // Procesar según el tipo de operación
    switch (operation.type) {
      case 'CREATE':
        result = await handleCreateOperation(operation);
        break;
      case 'UPDATE':
        result = await handleUpdateOperation(operation);
        break;
      case 'DELETE':
        result = await handleDeleteOperation(operation);
        break;
      default:
        throw new Error(`Tipo de operación desconocido: ${operation.type}`);
    }

    // Si la operación fue exitosa, marcarla como completada
    if (result.success) {
      await markSyncOperationComplete(operation.id);
    } else {
      await markSyncOperationFailed(operation.id, result.error);
    }

    return result;
  } catch (error) {
    console.error(`Error al procesar operación ${operation.id}:`, error);
    await markSyncOperationFailed(operation.id, error.message);

    return {
      success: false,
      error: error.message,
      operation,
    };
  }
};

/**
 * Manejar operación de creación
 * @param {Object} operation - Operación a procesar
 * @returns {Promise<Object>} - Resultado del procesamiento
 */
const handleCreateOperation = async (operation) => {
  try {
    const { storeName, data } = operation;

    // Mapear nombre de almacén a tabla de Supabase
    const tableName = mapStoreNameToTable(storeName);

    // Insertar en Supabase
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();

    if (error) {
      throw error;
    }

    // Actualizar datos locales con los datos del servidor
    if (result && result.length > 0) {
      await saveToIndexedDB(storeName, result[0]);
    }

    return {
      success: true,
      result,
      operation,
    };
  } catch (error) {
    console.error('Error en operación CREATE:', error);
    return {
      success: false,
      error: error.message,
      operation,
    };
  }
};

/**
 * Manejar operación de actualización
 * @param {Object} operation - Operación a procesar
 * @returns {Promise<Object>} - Resultado del procesamiento
 */
const handleUpdateOperation = async (operation) => {
  try {
    const { storeName, data } = operation;

    // Mapear nombre de almacén a tabla de Supabase
    const tableName = mapStoreNameToTable(storeName);

    // Actualizar en Supabase
    const { data: result, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', data.id)
      .select();

    if (error) {
      throw error;
    }

    // Actualizar datos locales con los datos del servidor
    if (result && result.length > 0) {
      await saveToIndexedDB(storeName, result[0]);
    }

    return {
      success: true,
      result,
      operation,
    };
  } catch (error) {
    console.error('Error en operación UPDATE:', error);
    return {
      success: false,
      error: error.message,
      operation,
    };
  }
};

/**
 * Manejar operación de eliminación
 * @param {Object} operation - Operación a procesar
 * @returns {Promise<Object>} - Resultado del procesamiento
 */
const handleDeleteOperation = async (operation) => {
  try {
    const { storeName, data } = operation;

    // Mapear nombre de almacén a tabla de Supabase
    const tableName = mapStoreNameToTable(storeName);

    // Eliminar en Supabase
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', data.id);

    if (error) {
      throw error;
    }

    return {
      success: true,
      operation,
    };
  } catch (error) {
    console.error('Error en operación DELETE:', error);
    return {
      success: false,
      error: error.message,
      operation,
    };
  }
};

/**
 * Mapear nombre de almacén a tabla de Supabase
 * @param {string} storeName - Nombre del almacén
 * @returns {string} - Nombre de la tabla
 */
const mapStoreNameToTable = (storeName) => {
  // En este caso, los nombres coinciden, pero podría ser diferente
  return storeName;
};

/**
 * Sincronizar transacciones con soporte para moneda
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Resultado de la sincronización
 */
export const syncTransactionsWithCurrency = async (userId) => {
  try {
    if (!checkOnlineStatus()) {
      return { success: false, message: 'No hay conexión a Internet' };
    }

    if (!userId) {
      return { success: false, message: 'No se proporcionó ID de usuario' };
    }

    // Obtener transacciones locales
    const localTransactions = await getFromIndexedDB('transactions');

    // Obtener transacciones del servidor
    const { data: serverTransactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    // Crear mapa de transacciones del servidor por ID
    const serverTransactionsMap = {};
    serverTransactions.forEach(transaction => {
      serverTransactionsMap[transaction.id] = transaction;
    });

    // Actualizar transacciones locales con moneda
    const updatedTransactions = localTransactions.map(transaction => {
      // Si la transacción no tiene moneda, establecer ARS por defecto
      if (!transaction.currency) {
        transaction.currency = 'ARS';
      }

      // Si la transacción existe en el servidor y tiene moneda, usar la del servidor
      if (serverTransactionsMap[transaction.id] && serverTransactionsMap[transaction.id].currency) {
        transaction.currency = serverTransactionsMap[transaction.id].currency;
      }

      return transaction;
    });

    // Guardar transacciones actualizadas
    await saveToIndexedDB('transactions', updatedTransactions);

    // Sincronizar con el servidor
    return await syncFromServer('transactions', null, {
      userId,
      clearBeforeSync: false
    });
  } catch (error) {
    console.error('Error al sincronizar transacciones con moneda:', error);
    return {
      success: false,
      message: `Error al sincronizar transacciones: ${error.message}`,
      error
    };
  }
};

/**
 * Sincronizar datos desde el servidor
 * @param {string} storeName - Nombre del almacén
 * @param {string} tableName - Nombre de la tabla
 * @param {Object} options - Opciones adicionales
 * @param {string} options.userId - ID del usuario para filtrar datos
 * @param {boolean} options.clearBeforeSync - Limpiar almacén antes de sincronizar
 * @returns {Promise<Object>} - Resultado de la sincronización
 */
export const syncFromServer = async (storeName, tableName = null, options = {}) => {
  try {
    if (!checkOnlineStatus()) {
      return { success: false, message: 'No hay conexión a Internet' };
    }

    // Si no se proporciona nombre de tabla, usar el nombre del almacén
    const table = tableName || mapStoreNameToTable(storeName);

    // Construir consulta
    let query = supabase.from(table).select('*');

    // Filtrar por usuario si se proporciona ID
    if (options.userId) {
      query = query.eq('user_id', options.userId);
    }

    // Obtener datos del servidor
    const { data: serverData, error } = await query;

    if (error) {
      throw error;
    }

    // Limpiar almacén si se solicita
    if (options.clearBeforeSync) {
      await clearIndexedDBStore(storeName);
    }

    // Guardar datos en IndexedDB
    if (serverData && serverData.length > 0) {
      await saveToIndexedDB(storeName, serverData);
      console.log(`Sincronizados ${serverData.length} registros de ${storeName} desde el servidor`);
    } else {
      console.log(`No se encontraron datos para sincronizar de ${storeName}`);
    }

    return {
      success: true,
      message: `Sincronización completada: ${serverData ? serverData.length : 0} registros`,
      count: serverData ? serverData.length : 0,
    };
  } catch (error) {
    console.error(`Error al sincronizar desde el servidor (${storeName}):`, error);
    return {
      success: false,
      message: `Error al sincronizar: ${error.message}`,
      error,
    };
  }
};

/**
 * Sincronizar todos los datos del usuario desde el servidor
 * @param {string} userId - ID del usuario
 * @param {boolean} force - Forzar sincronización completa
 * @returns {Promise<Object>} - Resultado de la sincronización
 */
export const syncAllUserData = async (userId, force = false) => {
  if (!userId) {
    console.error('No se proporcionó ID de usuario para sincronización');
    return { success: false, message: 'No se proporcionó ID de usuario' };
  }

  console.log(`Iniciando sincronización completa para el usuario ${userId}${force ? ' (forzada)' : ''}`);

  try {
    // Lista de almacenes a sincronizar
    const stores = [
      'tasks',
      'events',
      'investments',
      'financial_goals',
      'categories',
      'platforms'
    ];

    // Si es una sincronización forzada, primero intentamos enviar los datos locales al servidor
    if (force) {
      console.log('Sincronización forzada: enviando datos locales al servidor primero');

      try {
        // Obtener datos del almacenamiento local simple
        const { getTransactions, getTasks, getInvestments, getFinancialGoals, getEvents } = await import('./simpleStorage');

        // Transacciones
        const localTransactions = getTransactions();
        if (localTransactions && localTransactions.length > 0) {
          console.log(`Enviando ${localTransactions.length} transacciones al servidor...`);

          // Asegurarse de que todas las transacciones tengan user_id
          const transactionsWithUserId = localTransactions.map(t => ({
            ...t,
            user_id: t.user_id || userId
          }));

          // Usar upsert para insertar o actualizar
          const { error } = await supabase
            .from('transactions')
            .upsert(transactionsWithUserId, {
              onConflict: 'id',
              ignoreDuplicates: false
            });

          if (error) {
            console.error('Error al sincronizar transacciones con el servidor:', error);
          } else {
            console.log('Transacciones sincronizadas con el servidor correctamente');
          }
        }

        // Tareas
        const localTasks = getTasks();
        if (localTasks && localTasks.length > 0) {
          console.log(`Enviando ${localTasks.length} tareas al servidor...`);

          // Asegurarse de que todas las tareas tengan user_id
          const tasksWithUserId = localTasks.map(t => ({
            ...t,
            user_id: t.user_id || userId
          }));

          // Usar upsert para insertar o actualizar
          const { error } = await supabase
            .from('tasks')
            .upsert(tasksWithUserId, {
              onConflict: 'id',
              ignoreDuplicates: false
            });

          if (error) {
            console.error('Error al sincronizar tareas con el servidor:', error);
          } else {
            console.log('Tareas sincronizadas con el servidor correctamente');
          }
        }

        // Inversiones
        const localInvestments = getInvestments();
        if (localInvestments && localInvestments.length > 0) {
          console.log(`Enviando ${localInvestments.length} inversiones al servidor...`);

          // Asegurarse de que todas las inversiones tengan user_id
          const investmentsWithUserId = localInvestments.map(i => ({
            ...i,
            user_id: i.user_id || userId
          }));

          // Usar upsert para insertar o actualizar
          const { error } = await supabase
            .from('investments')
            .upsert(investmentsWithUserId, {
              onConflict: 'id',
              ignoreDuplicates: false
            });

          if (error) {
            console.error('Error al sincronizar inversiones con el servidor:', error);
          } else {
            console.log('Inversiones sincronizadas con el servidor correctamente');
          }
        }

        // Metas financieras
        const localGoals = getFinancialGoals();
        if (localGoals && localGoals.length > 0) {
          console.log(`Enviando ${localGoals.length} metas financieras al servidor...`);

          // Asegurarse de que todas las metas tengan user_id
          const goalsWithUserId = localGoals.map(g => ({
            ...g,
            user_id: g.user_id || userId
          }));

          // Usar upsert para insertar o actualizar
          const { error } = await supabase
            .from('financial_goals')
            .upsert(goalsWithUserId, {
              onConflict: 'id',
              ignoreDuplicates: false
            });

          if (error) {
            console.error('Error al sincronizar metas financieras con el servidor:', error);
          } else {
            console.log('Metas financieras sincronizadas con el servidor correctamente');
          }
        }

        // Eventos
        const localEvents = getEvents();
        if (localEvents && localEvents.length > 0) {
          console.log(`Enviando ${localEvents.length} eventos al servidor...`);

          // Asegurarse de que todos los eventos tengan user_id
          const eventsWithUserId = localEvents.map(e => ({
            ...e,
            user_id: e.user_id || userId
          }));

          // Usar upsert para insertar o actualizar
          const { error } = await supabase
            .from('events')
            .upsert(eventsWithUserId, {
              onConflict: 'id',
              ignoreDuplicates: false
            });

          if (error) {
            console.error('Error al sincronizar eventos con el servidor:', error);
          } else {
            console.log('Eventos sincronizados con el servidor correctamente');
          }
        }
      } catch (error) {
        console.error('Error al enviar datos locales al servidor:', error);
      }
    }

    // Sincronizar cada almacén
    const results = await Promise.allSettled([
      // Sincronizar transacciones con soporte para moneda
      syncTransactionsWithCurrency(userId),
      // Sincronizar otros almacenes
      ...stores.map(store =>
        syncFromServer(store, null, {
          userId,
          clearBeforeSync: force // Solo limpiar si se fuerza la sincronización
        })
      )
    ]);

    // Contar resultados
    const succeeded = results.filter(r => r.status === 'fulfilled' && r.value && r.value.success).length;
    const failed = results.filter(r => r.status === 'rejected' || !r.value || !r.value.success).length;

    // Preparar resultados detallados
    const detailedResults = results.map((r, i) => {
      // El primer resultado es para transacciones con moneda
      const store = i === 0 ? 'transactions' : stores[i - 1];
      return {
        store,
        success: r.status === 'fulfilled' && r.value && r.value.success,
        message: r.status === 'fulfilled' && r.value ? r.value.message : (r.reason ? r.reason.message : 'Error desconocido')
      };
    });

    // Actualizar datos en el almacenamiento local simple
    try {
      // Obtener datos de IndexedDB y guardarlos en el almacenamiento simple
      const { getFromIndexedDB } = await import('./offlineStorage');
      const { saveTransactions, saveTasks, saveInvestments, saveFinancialGoals, saveEvents } = await import('./simpleStorage');

      // Transacciones
      const transactions = await getFromIndexedDB('transactions');
      if (transactions && transactions.length > 0) {
        saveTransactions(transactions);
        console.log('Transacciones sincronizadas con almacenamiento simple:', transactions.length);
      }

      // Tareas
      const tasks = await getFromIndexedDB('tasks');
      if (tasks && tasks.length > 0) {
        saveTasks(tasks);
        console.log('Tareas sincronizadas con almacenamiento simple:', tasks.length);
      }

      // Inversiones
      const investments = await getFromIndexedDB('investments');
      if (investments && investments.length > 0) {
        saveInvestments(investments);
        console.log('Inversiones sincronizadas con almacenamiento simple:', investments.length);
      }

      // Metas financieras
      const goals = await getFromIndexedDB('financial_goals');
      if (goals && goals.length > 0) {
        saveFinancialGoals(goals);
        console.log('Metas financieras sincronizadas con almacenamiento simple:', goals.length);
      }

      // Eventos
      const events = await getFromIndexedDB('events');
      if (events && events.length > 0) {
        saveEvents(events);
        console.log('Eventos sincronizados con almacenamiento simple:', events.length);
      }
    } catch (storageError) {
      console.error('Error al sincronizar con almacenamiento simple:', storageError);
    }

    return {
      success: failed === 0,
      message: `Sincronización completa: ${succeeded} almacenes sincronizados, ${failed} fallidos`,
      results: detailedResults,
      succeeded,
      failed
    };
  } catch (error) {
    console.error('Error durante la sincronización completa:', error);
    return {
      success: false,
      message: `Error durante la sincronización completa: ${error.message}`
    };
  }
};
