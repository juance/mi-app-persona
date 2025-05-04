import { supabase } from './supabase';

/**
 * Obtiene todas las plataformas
 * @param {string} type - Tipo de plataforma (opcional)
 * @returns {Promise<Array>} - Lista de plataformas
 */
export const getPlatforms = async (type = null) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    // Construir la consulta
    let query = supabase
      .from('platforms')
      .select('*')
      .order('name', { ascending: true });
    
    // Filtrar por tipo si se proporciona
    if (type) {
      query = query.eq('type', type);
    }
    
    // Obtener plataformas del usuario actual y plataformas globales (user_id es null)
    const { data, error } = await query.or(`user_id.is.null,user_id.eq.${user?.id}`);
    
    if (error) {
      console.error('Error fetching platforms:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getPlatforms:', error);
    return [];
  }
};

/**
 * Obtiene plataformas por tipo
 * @param {string} type - Tipo de plataforma
 * @returns {Promise<Array>} - Lista de plataformas
 */
export const getPlatformsByType = async (type) => {
  return getPlatforms(type);
};

/**
 * Crea una nueva plataforma
 * @param {Object} platform - Datos de la plataforma
 * @returns {Promise<Object>} - Plataforma creada
 */
export const createPlatform = async (platform) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Crear la plataforma
    const { data, error } = await supabase
      .from('platforms')
      .insert([{ ...platform, user_id: user.id }])
      .select();
    
    if (error) {
      console.error('Error creating platform:', error);
      throw error;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error in createPlatform:', error);
    throw error;
  }
};

/**
 * Actualiza una plataforma existente
 * @param {number} id - ID de la plataforma
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<Object>} - Plataforma actualizada
 */
export const updatePlatform = async (id, updates) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Verificar que la plataforma pertenece al usuario
    const { data: platform } = await supabase
      .from('platforms')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
    
    if (!platform) {
      throw new Error('Platform not found or you do not have permission to update it');
    }
    
    // Actualizar la plataforma
    const { data, error } = await supabase
      .from('platforms')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating platform:', error);
      throw error;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error in updatePlatform:', error);
    throw error;
  }
};

/**
 * Elimina una plataforma
 * @param {number} id - ID de la plataforma
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 */
export const deletePlatform = async (id) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Verificar que la plataforma pertenece al usuario
    const { data: platform } = await supabase
      .from('platforms')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
    
    if (!platform) {
      throw new Error('Platform not found or you do not have permission to delete it');
    }
    
    // Eliminar la plataforma
    const { error } = await supabase
      .from('platforms')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting platform:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deletePlatform:', error);
    throw error;
  }
};
