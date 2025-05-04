/**
 * Servicio para gestionar eventos del calendario
 */

import { supabase } from './supabase';
import { 
  getCachedValue, 
  setCachedValue, 
  removeCachedValue, 
  withCache 
} from './advancedCacheService';
import { 
  saveToIndexedDB, 
  getFromIndexedDB, 
  deleteFromIndexedDB,
  addToSyncQueue,
  checkOnlineStatus
} from './offlineStorage';

/**
 * Obtiene todos los eventos del calendario del usuario actual
 * @returns {Promise<Array>} - Lista de eventos
 */
export const getEvents = async () => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    // Si no hay usuario, devolver un array vacío
    if (!user) {
      console.error('No authenticated user found');
      return [];
    }

    // Clave de caché basada en el ID del usuario
    const cacheKey = `events_${user.id}`;
    
    // Función para obtener datos de Supabase
    const fetchFromSupabase = async () => {
      console.log('Fetching events from Supabase');
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Error fetching events from Supabase:', error);
        throw error;
      }

      // Guardar en IndexedDB para acceso offline
      const result = data || [];
      await saveToIndexedDB('events', result);
      
      return result;
    };
    
    // Función para obtener datos de IndexedDB
    const fetchFromIndexedDB = async () => {
      console.log('Fetching events from IndexedDB');
      const localData = await getFromIndexedDB('events');
      return localData.filter(e => e.user_id === user.id);
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
        console.error('Error fetching from Supabase with cache:', error);
        // Si hay error, intentar obtener datos de IndexedDB
        return await fetchFromIndexedDB();
      }
    } else {
      // Si no hay conexión, obtener datos de IndexedDB
      console.log('Offline mode: using IndexedDB');
      const localData = await fetchFromIndexedDB();
      
      // Almacenar en caché con TTL más largo para modo offline
      setCachedValue(cacheKey, localData, 10 * 60 * 1000, { priority: true });
      
      return localData;
    }
  } catch (error) {
    console.error('Error in getEvents:', error);
    
    // Intentar obtener datos de IndexedDB en caso de error
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const localData = await getFromIndexedDB('events');
        return localData.filter(e => e.user_id === user.id);
      }
    } catch (err) {
      console.error('Error fetching from IndexedDB:', err);
    }
    
    return [];
  }
};

/**
 * Obtiene un evento por su ID
 * @param {string} id - ID del evento
 * @returns {Promise<Object|null>} - Evento encontrado o null
 */
export const getEventById = async (id) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Clave de caché
    const cacheKey = `event_${id}`;
    
    // Función para obtener datos de Supabase
    const fetchFromSupabase = async () => {
      const { data, error } = await supabase
        .from('events')
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
        return await getFromIndexedDB('events', id);
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
        console.error('Error fetching event from Supabase:', error);
        // Si hay error, intentar obtener datos de IndexedDB
        return await fetchFromIndexedDB();
      }
    } else {
      // Si no hay conexión, obtener datos de IndexedDB
      return await fetchFromIndexedDB();
    }
  } catch (error) {
    console.error('Error in getEventById:', error);
    return null;
  }
};

/**
 * Crea un nuevo evento
 * @param {Object} eventData - Datos del evento
 * @returns {Promise<Object|null>} - Evento creado o null
 */
export const createEvent = async (eventData) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Preparar los datos del evento
    const event = {
      ...eventData,
      user_id: user.id,
      created_at: new Date().toISOString(),
      // Generar un ID temporal para uso offline
      id: eventData.id || `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, crear el evento en Supabase
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select();

      if (error) {
        console.error('Error creating event in Supabase:', error);
        
        // Si hay error, guardar localmente y agregar a la cola de sincronización
        await saveToIndexedDB('events', event);
        await addToSyncQueue({
          type: 'CREATE',
          storeName: 'events',
          data: event,
        });
        
        // Invalidar la caché
        removeCachedValue(`events_${user.id}`);
        
        return event;
      }

      // Si se creó correctamente, guardar en IndexedDB
      const createdEvent = data?.[0] || null;
      if (createdEvent) {
        await saveToIndexedDB('events', createdEvent);
      }
      
      // Invalidar la caché
      removeCachedValue(`events_${user.id}`);
      
      console.log('Event created successfully in Supabase:', createdEvent);
      return createdEvent;
    } else {
      // Si no hay conexión, guardar localmente y agregar a la cola de sincronización
      await saveToIndexedDB('events', event);
      await addToSyncQueue({
        type: 'CREATE',
        storeName: 'events',
        data: event,
      });
      
      // Invalidar la caché
      removeCachedValue(`events_${user.id}`);
      
      console.log('Event created locally (offline mode):', event);
      return event;
    }
  } catch (error) {
    console.error('Error in createEvent:', error);
    throw error;
  }
};

/**
 * Actualiza un evento existente
 * @param {string} id - ID del evento
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<Object|null>} - Evento actualizado o null
 */
export const updateEvent = async (id, updates) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Obtener el evento actual
    const currentEvent = await getEventById(id);
    if (!currentEvent) {
      throw new Error('Event not found');
    }

    // Verificar que el evento pertenece al usuario
    if (currentEvent.user_id !== user.id) {
      throw new Error('You do not have permission to update this event');
    }

    // Preparar los datos actualizados
    const updatedEvent = {
      ...currentEvent,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, actualizar en Supabase
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select();

      if (error) {
        console.error('Error updating event in Supabase:', error);
        
        // Si hay error, actualizar localmente y agregar a la cola de sincronización
        await saveToIndexedDB('events', updatedEvent);
        await addToSyncQueue({
          type: 'UPDATE',
          storeName: 'events',
          data: updatedEvent,
        });
        
        // Invalidar la caché
        removeCachedValue(`events_${user.id}`);
        removeCachedValue(`event_${id}`);
        
        return updatedEvent;
      }

      // Si se actualizó correctamente, actualizar en IndexedDB
      const result = data?.[0] || null;
      if (result) {
        await saveToIndexedDB('events', result);
      }
      
      // Invalidar la caché
      removeCachedValue(`events_${user.id}`);
      removeCachedValue(`event_${id}`);
      
      console.log('Event updated successfully in Supabase:', result);
      return result;
    } else {
      // Si no hay conexión, actualizar localmente y agregar a la cola de sincronización
      await saveToIndexedDB('events', updatedEvent);
      await addToSyncQueue({
        type: 'UPDATE',
        storeName: 'events',
        data: updatedEvent,
      });
      
      // Invalidar la caché
      removeCachedValue(`events_${user.id}`);
      removeCachedValue(`event_${id}`);
      
      console.log('Event updated locally (offline mode):', updatedEvent);
      return updatedEvent;
    }
  } catch (error) {
    console.error('Error in updateEvent:', error);
    throw error;
  }
};

/**
 * Elimina un evento
 * @param {string} id - ID del evento
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 */
export const deleteEvent = async (id) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Obtener el evento para verificar permisos
    const event = await getEventById(id);
    if (!event) {
      throw new Error('Event not found');
    }

    // Verificar que el evento pertenece al usuario
    if (event.user_id !== user.id) {
      throw new Error('You do not have permission to delete this event');
    }

    // Verificar si hay conexión a Internet
    if (checkOnlineStatus()) {
      // Si hay conexión, eliminar en Supabase
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting event from Supabase:', error);
        
        // Si hay error, marcar como eliminado localmente y agregar a la cola de sincronización
        await deleteFromIndexedDB('events', id);
        await addToSyncQueue({
          type: 'DELETE',
          storeName: 'events',
          data: { id, user_id: user.id },
        });
        
        // Invalidar la caché
        removeCachedValue(`events_${user.id}`);
        removeCachedValue(`event_${id}`);
        
        return true;
      }

      // Si se eliminó correctamente, eliminar de IndexedDB
      await deleteFromIndexedDB('events', id);
      
      // Invalidar la caché
      removeCachedValue(`events_${user.id}`);
      removeCachedValue(`event_${id}`);
      
      console.log('Event deleted successfully');
      return true;
    } else {
      // Si no hay conexión, marcar como eliminado localmente y agregar a la cola de sincronización
      await deleteFromIndexedDB('events', id);
      await addToSyncQueue({
        type: 'DELETE',
        storeName: 'events',
        data: { id, user_id: user.id },
      });
      
      // Invalidar la caché
      removeCachedValue(`events_${user.id}`);
      removeCachedValue(`event_${id}`);
      
      console.log('Event marked for deletion locally (offline mode)');
      return true;
    }
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    throw error;
  }
};

/**
 * Obtiene eventos por rango de fechas
 * @param {string} startDate - Fecha de inicio (YYYY-MM-DD)
 * @param {string} endDate - Fecha de fin (YYYY-MM-DD)
 * @returns {Promise<Array>} - Lista de eventos en el rango
 */
export const getEventsByDateRange = async (startDate, endDate) => {
  try {
    // Obtener todos los eventos
    const events = await getEvents();
    
    // Filtrar por rango de fechas
    return events.filter(event => {
      const eventDate = new Date(event.start_date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Ajustar las fechas para ignorar la hora
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      
      return eventDate >= start && eventDate <= end;
    });
  } catch (error) {
    console.error('Error in getEventsByDateRange:', error);
    return [];
  }
};
