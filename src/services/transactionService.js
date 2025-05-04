import { supabase } from './supabase';
import { validateTransaction } from '../utils/validation';
import {
  getCachedValue,
  setCachedValue,
  removeCachedValue,
  withCache,
  prefetchCache
} from './advancedCacheService';
import {
  saveToIndexedDB,
  getFromIndexedDB,
  deleteFromIndexedDB,
  addToSyncQueue,
  checkOnlineStatus
} from './offlineStorage';
import {
  saveTransactionsToLocalStorage,
  getTransactionsFromLocalStorage
} from './localPersistenceService';
import {
  getTransactions as getLocalTransactions,
  addTransaction as addLocalTransaction,
  updateTransaction as updateLocalTransaction,
  deleteTransaction as deleteLocalTransaction,
  DEMO_USER_ID
} from './localDataService';

export const getTransactions = async () => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    // Si no hay usuario, usar el almacenamiento local independiente
    if (!user) {
      console.log('No authenticated user found, using local storage');
      const localTransactions = getLocalTransactions();
      console.log(`Obtenidas ${localTransactions.length} transacciones del almacenamiento local independiente`);
      return localTransactions;
    }

    // Clave de caché basada en el ID del usuario
    const cacheKey = `transactions_${user.id}`;

    // Primero, intentar obtener datos del localStorage (persistencia directa)
    const localStorageData = getTransactionsFromLocalStorage(user.id);

    // Si hay datos en localStorage, usarlos mientras se cargan los datos actualizados
    let initialData = localStorageData.length > 0 ? localStorageData : [];

    // Función para obtener datos de Supabase
    const fetchFromSupabase = async () => {
      console.log('Fetching transactions from Supabase');
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions from Supabase:', error);
        throw error;
      }

      // Guardar en IndexedDB para acceso offline
      const result = data || [];
      if (result.length > 0) {
        console.log(`Guardando ${result.length} transacciones en IndexedDB`);
        await saveToIndexedDB('transactions', result);

        // Guardar también en localStorage para persistencia directa
        saveTransactionsToLocalStorage(user.id, result);
      } else {
        console.log('No hay transacciones para guardar en IndexedDB');
      }

      return result;
    };

    // Función para obtener datos de IndexedDB
    const fetchFromIndexedDB = async () => {
      console.log('Fetching transactions from IndexedDB');
      try {
        const localData = await getFromIndexedDB('transactions');
        console.log(`Obtenidas ${localData.length} transacciones de IndexedDB`);
        const userTransactions = localData.filter(t => t.user_id === user.id);
        console.log(`Filtradas ${userTransactions.length} transacciones del usuario ${user.id}`);

        // Si hay datos en IndexedDB, guardarlos también en localStorage
        if (userTransactions.length > 0) {
          saveTransactionsToLocalStorage(user.id, userTransactions);
        }

        return userTransactions;
      } catch (err) {
        console.error('Error al obtener transacciones de IndexedDB:', err);
        return initialData; // Usar datos de localStorage si hay error
      }
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, intentar obtener datos con caché
      try {
        // Primero verificar si hay datos en IndexedDB
        const localData = await fetchFromIndexedDB();

        // Si no hay datos en IndexedDB o son pocos, forzar obtención desde Supabase
        if (localData.length < 5) {
          console.log('Pocos datos en IndexedDB, obteniendo desde Supabase');
          const onlineData = await fetchFromSupabase();

          // Almacenar en caché
          setCachedValue(cacheKey, onlineData, 5 * 60 * 1000, { priority: true });

          return onlineData;
        }

        // Si hay suficientes datos en IndexedDB, usar caché normal
        const result = await withCache(
          fetchFromSupabase,
          cacheKey,
          5 * 60 * 1000, // 5 minutos de TTL
          { priority: true } // Prioridad alta para evitar evicción
        );

        return result;
      } catch (error) {
        console.error('Error fetching from Supabase with cache:', error);
        // Si hay error, intentar obtener datos de IndexedDB
        const indexedDBData = await fetchFromIndexedDB();

        // Si no hay datos en IndexedDB, usar datos de localStorage
        return indexedDBData.length > 0 ? indexedDBData : initialData;
      }
    } else {
      // Si no hay conexión, obtener datos de IndexedDB
      console.log('Offline mode: using IndexedDB');
      const localData = await fetchFromIndexedDB();

      // Si no hay datos en IndexedDB, usar datos de localStorage
      const finalData = localData.length > 0 ? localData : initialData;

      // Almacenar en caché con TTL más largo para modo offline
      setCachedValue(cacheKey, finalData, 30 * 60 * 1000, { priority: true });

      return finalData;
    }
  } catch (error) {
    console.error('Error in getTransactions:', error);

    // Intentar obtener datos de IndexedDB en caso de error
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Primero intentar IndexedDB
        try {
          const localData = await getFromIndexedDB('transactions');
          const userTransactions = localData.filter(t => t.user_id === user.id);
          if (userTransactions.length > 0) {
            return userTransactions;
          }
        } catch (err) {
          console.error('Error fetching from IndexedDB:', err);
        }

        // Si falla IndexedDB, intentar localStorage
        const localStorageData = getTransactionsFromLocalStorage(user.id);
        if (localStorageData.length > 0) {
          return localStorageData;
        }
      }
    } catch (err) {
      console.error('Error fetching user or local data:', err);
    }

    // Si todo falla, usar el almacenamiento local independiente
    console.log('Fallback to local storage');
    return getLocalTransactions();
  }
};

// Prefetch de transacciones para mejorar la experiencia del usuario
export const prefetchTransactions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const cacheKey = `transactions_${user.id}`;

    // Función para obtener datos
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      // Guardar en IndexedDB
      await saveToIndexedDB('transactions', data || []);

      return data || [];
    };

    // Prefetch con TTL de 5 minutos
    return await prefetchCache(fetchData, cacheKey, 5 * 60 * 1000);
  } catch (error) {
    console.error('Error in prefetchTransactions:', error);
    return false;
  }
};

/**
 * Obtiene una transacción por su ID
 * @param {number} id - ID de la transacción
 * @returns {Promise<Object>} - Transacción encontrada o null
 */
export const getTransactionById = async (id) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Clave de caché
    const cacheKey = `transaction_${id}`;

    // Función para obtener datos de Supabase
    const fetchFromSupabase = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    };

    // Función para obtener datos de IndexedDB
    const fetchFromIndexedDB = async () => {
      try {
        return await getFromIndexedDB('transactions', id);
      } catch (err) {
        return null;
      }
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, intentar obtener datos con caché
      try {
        // Usar withCache para manejar automáticamente la caché
        return await withCache(
          fetchFromSupabase,
          cacheKey,
          5 * 60 * 1000, // 5 minutos de TTL
          { priority: true } // Prioridad alta para evitar evicción
        );
      } catch (error) {
        console.error('Error fetching transaction from Supabase:', error);
        // Si hay error, intentar obtener datos de IndexedDB
        return await fetchFromIndexedDB();
      }
    } else {
      // Si no hay conexión, obtener datos de IndexedDB
      return await fetchFromIndexedDB();
    }
  } catch (error) {
    console.error('Error in getTransactionById:', error);
    return null;
  }
};

// Alias para mantener compatibilidad
export const getTransaction = getTransactionById;

export const createTransaction = async (transaction) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    // Validar la transacción
    const validationResult = validateTransaction(transaction);
    if (!validationResult.isValid) {
      throw new Error(`Validation error: ${validationResult.errors.join(', ')}`);
    }

    // Eliminar el id si está presente para que Supabase lo genere automáticamente
    // y manejar el campo platformType
    const { id, platformType, ...transactionData } = transaction;

    // Si no hay usuario, usar el almacenamiento local independiente
    if (!user) {
      console.log('No authenticated user found, using local storage');

      // Preparar la transacción para almacenamiento local
      const localTransaction = {
        ...transactionData,
        platform: platformType && transactionData.platform ?
          `${platformType}:${transactionData.platform}` :
          transactionData.platform,
        user_id: DEMO_USER_ID,
        id: id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString()
      };

      // Guardar en el almacenamiento local independiente
      const success = addLocalTransaction(localTransaction);

      if (success) {
        console.log('Transaction saved to local storage:', localTransaction);
        return localTransaction;
      } else {
        throw new Error('Error saving transaction to local storage');
      }
    }

    console.log('Current user:', user);

    // Agregar el ID del usuario a la transacción
    // No usamos platform_type para evitar problemas con el caché de esquema
    const transactionWithUserId = {
      ...transactionData,
      // Almacenamos el tipo de plataforma como parte del nombre de la plataforma
      // Formato: "TIPO:PLATAFORMA" (ej. "cash:Efectivo" o "virtual:Mercado Pago")
      platform: platformType && transactionData.platform ?
        `${platformType}:${transactionData.platform}` :
        transactionData.platform,
      user_id: user.id,
      // Generar un ID temporal para uso offline si no hay conexión
      id: id || `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    console.log('Final transaction data:', transactionWithUserId);

    // Función para actualizar el almacenamiento local
    const updateLocalStorage = async (newTransaction) => {
      try {
        // Obtener transacciones actuales de localStorage
        const currentTransactions = getTransactionsFromLocalStorage(user.id);

        // Agregar la nueva transacción
        const updatedTransactions = [newTransaction, ...currentTransactions];

        // Guardar en localStorage
        saveTransactionsToLocalStorage(user.id, updatedTransactions);

        console.log('Transaction added to localStorage');
      } catch (err) {
        console.error('Error updating localStorage:', err);
      }
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, crear la transacción en Supabase
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionWithUserId])
        .select();

      if (error) {
        console.error('Error creating transaction:', error);
        console.error('Error details:', error.details, error.hint, error.message);

        // Si el error es de clave foránea, es posible que el usuario no exista en la tabla auth.users
        if (error.message.includes('violates foreign key constraint')) {
          // Intentar crear un perfil para el usuario
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert([
              {
                id: user.id,
                first_name: user.user_metadata?.first_name || user.user_metadata?.name?.split(' ')[0] || 'Usuario',
                last_name: user.user_metadata?.last_name || user.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
                avatar_url: user.user_metadata?.avatar_url || null,
                preferences: {}
              }
            ]);

          if (profileError) {
            console.error('Error creating profile:', profileError);

            // Si hay error, guardar localmente y agregar a la cola de sincronización
            await saveToIndexedDB('transactions', transactionWithUserId);
            await addToSyncQueue({
              type: 'CREATE',
              storeName: 'transactions',
              data: transactionWithUserId,
            });

            // Actualizar localStorage
            await updateLocalStorage(transactionWithUserId);

            // También guardar en el almacenamiento local independiente como respaldo
            addLocalTransaction(transactionWithUserId);

            // Invalidar la caché
            removeCachedValue(`transactions_${user.id}`);

            console.log('Transaction saved locally due to profile error:', transactionWithUserId);
            return transactionWithUserId;
          }

          // Intentar nuevamente la inserción de la transacción
          const { data: retryData, error: retryError } = await supabase
            .from('transactions')
            .insert([transactionWithUserId])
            .select();

          if (retryError) {
            console.error('Error creating transaction (retry):', retryError);

            // Si hay error en el reintento, guardar localmente
            await saveToIndexedDB('transactions', transactionWithUserId);
            await addToSyncQueue({
              type: 'CREATE',
              storeName: 'transactions',
              data: transactionWithUserId,
            });

            // Actualizar localStorage
            await updateLocalStorage(transactionWithUserId);

            // También guardar en el almacenamiento local independiente como respaldo
            addLocalTransaction(transactionWithUserId);

            // Invalidar la caché
            removeCachedValue(`transactions_${user.id}`);

            console.log('Transaction saved locally after retry error:', transactionWithUserId);
            return transactionWithUserId;
          }

          console.log('Transaction created successfully (after profile creation):', retryData?.[0]);

          // Guardar en IndexedDB para acceso offline
          if (retryData?.[0]) {
            await saveToIndexedDB('transactions', retryData[0]);

            // Actualizar localStorage
            await updateLocalStorage(retryData[0]);

            // También guardar en el almacenamiento local independiente como respaldo
            addLocalTransaction(retryData[0]);
          }

          // Invalidar la caché
          removeCachedValue(`transactions_${user.id}`);

          return retryData?.[0] || null;
        }

        // Para otros errores, guardar localmente
        await saveToIndexedDB('transactions', transactionWithUserId);
        await addToSyncQueue({
          type: 'CREATE',
          storeName: 'transactions',
          data: transactionWithUserId,
        });

        // Actualizar localStorage
        await updateLocalStorage(transactionWithUserId);

        // También guardar en el almacenamiento local independiente como respaldo
        addLocalTransaction(transactionWithUserId);

        // Invalidar la caché
        removeCachedValue(`transactions_${user.id}`);

        console.log('Transaction saved locally due to error:', transactionWithUserId);
        return transactionWithUserId;
      }

      console.log('Transaction created successfully in Supabase:', data?.[0]);

      // Guardar en IndexedDB para acceso offline
      if (data?.[0]) {
        await saveToIndexedDB('transactions', data[0]);

        // Actualizar localStorage
        await updateLocalStorage(data[0]);

        // También guardar en el almacenamiento local independiente como respaldo
        addLocalTransaction(data[0]);
      }

      // Invalidar la caché
      removeCachedValue(`transactions_${user.id}`);

      return data?.[0] || null;
    } else {
      // Si no hay conexión, guardar localmente y agregar a la cola de sincronización
      await saveToIndexedDB('transactions', transactionWithUserId);
      await addToSyncQueue({
        type: 'CREATE',
        storeName: 'transactions',
        data: transactionWithUserId,
      });

      // Actualizar localStorage
      await updateLocalStorage(transactionWithUserId);

      // También guardar en el almacenamiento local independiente como respaldo
      addLocalTransaction(transactionWithUserId);

      // Invalidar la caché
      removeCachedValue(`transactions_${user.id}`);

      console.log('Transaction created locally (offline mode):', transactionWithUserId);
      return transactionWithUserId;
    }
  } catch (error) {
    console.error('Error in createTransaction:', error);

    // Si hay un error, intentar guardar en el almacenamiento local independiente como último recurso
    try {
      if (transaction) {
        const localTransaction = {
          ...transaction,
          id: transaction.id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          user_id: DEMO_USER_ID,
          created_at: new Date().toISOString()
        };

        const success = addLocalTransaction(localTransaction);

        if (success) {
          console.log('Transaction saved to local storage as fallback:', localTransaction);
          return localTransaction;
        }
      }
    } catch (err) {
      console.error('Error saving to local storage as fallback:', err);
    }

    throw error;
  }
};

export const updateTransaction = async (id, updates) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    // Si no hay usuario, lanzar un error
    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Obtener la transacción actual para validarla con los cambios
    // Primero intentar obtenerla de IndexedDB
    let currentTransaction;

    try {
      currentTransaction = await getFromIndexedDB('transactions', id);
    } catch (err) {
      console.log('Transaction not found in IndexedDB, trying Supabase');
    }

    // Si no se encuentra en IndexedDB, intentar obtenerla de Supabase
    if (!currentTransaction) {
      currentTransaction = await getTransaction(id);
    }

    if (!currentTransaction) {
      throw new Error('Transaction not found');
    }

    // Verificar que la transacción pertenece al usuario
    if (currentTransaction.user_id !== user.id) {
      throw new Error('You do not have permission to update this transaction');
    }

    // Crear una transacción completa para validación
    const transactionToValidate = {
      ...currentTransaction,
      ...updates
    };

    // Validar la transacción
    const validationResult = validateTransaction(transactionToValidate);
    if (!validationResult.isValid) {
      throw new Error(`Validation error: ${validationResult.errors.join(', ')}`);
    }

    // Manejar el campo platformType
    const { platformType, ...updateData } = updates;

    // No usamos platform_type para evitar problemas con el caché de esquema
    // En su lugar, almacenamos el tipo de plataforma como parte del nombre de la plataforma
    const finalUpdates = (platformType && updateData.platform)
      ? {
          ...updateData,
          // Formato: "TIPO:PLATAFORMA" (ej. "cash:Efectivo" o "virtual:Mercado Pago")
          platform: `${platformType}:${updateData.platform}`
        }
      : updateData;

    console.log('Updating transaction with data:', finalUpdates);

    // Función para actualizar el almacenamiento local
    const updateLocalStorage = async (updatedTransaction) => {
      try {
        // Obtener transacciones actuales de localStorage
        const currentTransactions = getTransactionsFromLocalStorage(user.id);

        // Reemplazar la transacción actualizada
        const updatedTransactions = currentTransactions.map(t =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        );

        // Guardar en localStorage
        saveTransactionsToLocalStorage(user.id, updatedTransactions);

        console.log('Transaction updated in localStorage');
      } catch (err) {
        console.error('Error updating localStorage:', err);
      }
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, actualizar en Supabase
      const { data, error } = await supabase
        .from('transactions')
        .update(finalUpdates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating transaction in Supabase:', error);
        console.error('Error details:', error.details, error.hint, error.message);

        // Si hay error, actualizar localmente y agregar a la cola de sincronización
        const updatedTransaction = {
          ...currentTransaction,
          ...finalUpdates
        };

        await saveToIndexedDB('transactions', updatedTransaction);
        await addToSyncQueue({
          type: 'UPDATE',
          storeName: 'transactions',
          data: updatedTransaction,
        });

        // Actualizar localStorage
        await updateLocalStorage(updatedTransaction);

        // Invalidar la caché
        removeCachedValue(`transactions_${user.id}`);

        console.log('Transaction updated locally due to error:', updatedTransaction);
        return updatedTransaction;
      }

      console.log('Transaction updated successfully in Supabase:', data?.[0]);

      // Actualizar en IndexedDB para acceso offline
      if (data?.[0]) {
        await saveToIndexedDB('transactions', data[0]);

        // Actualizar localStorage
        await updateLocalStorage(data[0]);
      }

      // Invalidar la caché
      removeCachedValue(`transactions_${user.id}`);

      return data?.[0] || null;
    } else {
      // Si no hay conexión, actualizar localmente y agregar a la cola de sincronización
      const updatedTransaction = {
        ...currentTransaction,
        ...finalUpdates
      };

      await saveToIndexedDB('transactions', updatedTransaction);
      await addToSyncQueue({
        type: 'UPDATE',
        storeName: 'transactions',
        data: updatedTransaction,
      });

      // Actualizar localStorage
      await updateLocalStorage(updatedTransaction);

      // Invalidar la caché
      removeCachedValue(`transactions_${user.id}`);

      console.log('Transaction updated locally (offline mode):', updatedTransaction);
      return updatedTransaction;
    }
  } catch (error) {
    console.error('Error in updateTransaction:', error);
    throw error;
  }
};

/**
 * Elimina una transacción
 * @param {number} id - ID de la transacción
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 */
export const deleteTransaction = async (id) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Verificar que la transacción pertenece al usuario
    // Primero intentar obtenerla de IndexedDB
    let transaction;

    try {
      transaction = await getFromIndexedDB('transactions', id);
    } catch (err) {
      console.log('Transaction not found in IndexedDB, trying Supabase');
    }

    // Si no se encuentra en IndexedDB, intentar obtenerla de Supabase
    if (!transaction) {
      transaction = await getTransactionById(id);
    }

    if (!transaction) {
      throw new Error('Transaction not found or you do not have permission to delete it');
    }

    // Verificar que la transacción pertenece al usuario
    if (transaction.user_id !== user.id) {
      throw new Error('You do not have permission to delete this transaction');
    }

    // Función para actualizar el almacenamiento local
    const updateLocalStorage = async () => {
      try {
        // Obtener transacciones actuales de localStorage
        const currentTransactions = getTransactionsFromLocalStorage(user.id);

        // Filtrar la transacción eliminada
        const updatedTransactions = currentTransactions.filter(t => t.id !== id);

        // Guardar en localStorage
        saveTransactionsToLocalStorage(user.id, updatedTransactions);

        console.log('Transaction removed from localStorage');
      } catch (err) {
        console.error('Error updating localStorage:', err);
      }
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, eliminar en Supabase
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting transaction from Supabase:', error);

        // Si hay error, marcar como eliminada localmente y agregar a la cola de sincronización
        await deleteFromIndexedDB('transactions', id);
        await addToSyncQueue({
          type: 'DELETE',
          storeName: 'transactions',
          data: { id, user_id: user.id },
        });

        // Actualizar localStorage
        await updateLocalStorage();

        // Invalidar la caché
        removeCachedValue(`transactions_${user.id}`);

        console.log('Transaction marked for deletion locally due to error');
        return true;
      }

      // Si se eliminó correctamente, eliminar también de IndexedDB
      await deleteFromIndexedDB('transactions', id);

      // Actualizar localStorage
      await updateLocalStorage();

      // Invalidar la caché
      removeCachedValue(`transactions_${user.id}`);

      console.log('Transaction deleted successfully from Supabase and IndexedDB');
      return true;
    } else {
      // Si no hay conexión, marcar como eliminada localmente y agregar a la cola de sincronización
      await deleteFromIndexedDB('transactions', id);
      await addToSyncQueue({
        type: 'DELETE',
        storeName: 'transactions',
        data: { id, user_id: user.id },
      });

      // Actualizar localStorage
      await updateLocalStorage();

      // Invalidar la caché
      removeCachedValue(`transactions_${user.id}`);

      console.log('Transaction marked for deletion locally (offline mode)');
      return true;
    }
  } catch (error) {
    console.error('Error in deleteTransaction:', error);
    throw error;
  }
};

export const getTransactionsByType = async (type) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('type', type)
    .order('date', { ascending: false });

  if (error) {
    console.error(`Error fetching ${type} transactions:`, error);
    return [];
  }

  return data || [];
};

export const getTransactionsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('category', category)
    .order('date', { ascending: false });

  if (error) {
    console.error(`Error fetching transactions for category ${category}:`, error);
    return [];
  }

  return data || [];
};

export const getTransactionsByDateRange = async (startDate, endDate) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  if (error) {
    console.error(`Error fetching transactions for date range:`, error);
    return [];
  }

  return data || [];
};

/**
 * Obtiene transacciones con paginación para carga progresiva
 * @param {Object} options - Opciones de paginación y filtrado
 * @param {number} options.start - Índice de inicio
 * @param {number} options.end - Índice de fin
 * @param {Object} options.filters - Filtros a aplicar
 * @param {Object} options.sort - Configuración de ordenamiento
 * @returns {Promise<Object>} - Datos paginados y metadatos
 */
export const getTransactionsPaginated = async ({ start = 0, end = 10, filters = {}, sort = { column: 'date', direction: 'desc' } }) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Construir clave de caché basada en parámetros
    const filterKey = JSON.stringify(filters);
    const sortKey = JSON.stringify(sort);
    const cacheKey = `transactions_paginated_${user.id}_${start}_${end}_${filterKey}_${sortKey}`;

    // Función para obtener datos de Supabase
    const fetchFromSupabase = async () => {
      // Construir consulta base
      let query = supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id);

      // Aplicar filtros
      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }

      if (filters.startDate) {
        query = query.gte('date', filters.startDate);
      }

      if (filters.endDate) {
        query = query.lte('date', filters.endDate);
      }

      if (filters.minAmount) {
        query = query.gte('amount', filters.minAmount);
      }

      if (filters.maxAmount) {
        query = query.lte('amount', filters.maxAmount);
      }

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      // Aplicar ordenamiento
      query = query.order(sort.column, { ascending: sort.direction === 'asc' });

      // Aplicar paginación
      query = query.range(start, end - 1);

      // Ejecutar consulta
      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      return {
        data: data || [],
        count: count || 0,
        hasMore: (count || 0) > end
      };
    };

    // Función para obtener datos de IndexedDB
    const fetchFromIndexedDB = async () => {
      try {
        // Obtener todos los datos
        const allData = await getFromIndexedDB('transactions');

        // Filtrar por usuario
        let filteredData = allData.filter(t => t.user_id === user.id);

        // Aplicar filtros
        if (filters.type) {
          filteredData = filteredData.filter(t => t.type === filters.type);
        }

        if (filters.category) {
          filteredData = filteredData.filter(t => t.category === filters.category);
        }

        if (filters.platform) {
          filteredData = filteredData.filter(t => t.platform === filters.platform);
        }

        if (filters.startDate) {
          filteredData = filteredData.filter(t => t.date >= filters.startDate);
        }

        if (filters.endDate) {
          filteredData = filteredData.filter(t => t.date <= filters.endDate);
        }

        if (filters.minAmount) {
          filteredData = filteredData.filter(t => t.amount >= filters.minAmount);
        }

        if (filters.maxAmount) {
          filteredData = filteredData.filter(t => t.amount <= filters.maxAmount);
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(t =>
            t.title && t.title.toLowerCase().includes(searchLower)
          );
        }

        // Aplicar ordenamiento
        filteredData.sort((a, b) => {
          const aValue = a[sort.column];
          const bValue = b[sort.column];

          if (sort.direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });

        // Aplicar paginación
        const paginatedData = filteredData.slice(start, end);

        return {
          data: paginatedData,
          count: filteredData.length,
          hasMore: filteredData.length > end
        };
      } catch (err) {
        console.error('Error fetching from IndexedDB:', err);
        return { data: [], count: 0, hasMore: false };
      }
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, intentar obtener datos con caché
      try {
        // Usar withCache para manejar automáticamente la caché
        return await withCache(
          fetchFromSupabase,
          cacheKey,
          2 * 60 * 1000, // 2 minutos de TTL
          { priority: false } // Prioridad normal
        );
      } catch (error) {
        console.error('Error fetching paginated transactions from Supabase:', error);
        // Si hay error, intentar obtener datos de IndexedDB
        return await fetchFromIndexedDB();
      }
    } else {
      // Si no hay conexión, obtener datos de IndexedDB
      return await fetchFromIndexedDB();
    }
  } catch (error) {
    console.error('Error in getTransactionsPaginated:', error);
    return { data: [], count: 0, hasMore: false };
  }
};
