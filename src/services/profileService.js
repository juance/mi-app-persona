import { supabase } from './supabase';

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} Perfil del usuario o null si no existe
 */
export const getUserProfile = async () => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Obtener el perfil del usuario
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 es el código de error cuando no se encuentra un registro
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};

/**
 * Crea o actualiza el perfil del usuario
 * @param {Object} profile Datos del perfil a crear o actualizar
 * @returns {Promise<Object>} Perfil creado o actualizado
 */
export const upsertUserProfile = async (profile) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Crear o actualizar el perfil
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...profile,
        updated_at: new Date()
      })
      .select();
      
    if (error) {
      console.error('Error upserting user profile:', error);
      throw error;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error in upsertUserProfile:', error);
    throw error;
  }
};

/**
 * Actualiza el avatar del usuario
 * @param {File} file Archivo de imagen
 * @returns {Promise<string>} URL del avatar
 */
export const updateUserAvatar = async (file) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Generar un nombre de archivo único
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    // Subir el archivo
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      throw uploadError;
    }
    
    // Obtener la URL pública del archivo
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    // Actualizar el perfil con la URL del avatar
    await upsertUserProfile({ avatar_url: publicUrl });
    
    return publicUrl;
  } catch (error) {
    console.error('Error in updateUserAvatar:', error);
    throw error;
  }
};

/**
 * Obtiene las preferencias del usuario
 * @returns {Promise<Object>} Preferencias del usuario
 */
export const getUserPreferences = async () => {
  try {
    const profile = await getUserProfile();
    return profile?.preferences || {};
  } catch (error) {
    console.error('Error in getUserPreferences:', error);
    return {};
  }
};

/**
 * Actualiza las preferencias del usuario
 * @param {Object} preferences Preferencias a actualizar
 * @returns {Promise<Object>} Perfil actualizado
 */
export const updateUserPreferences = async (preferences) => {
  try {
    const profile = await getUserProfile();
    const updatedPreferences = {
      ...(profile?.preferences || {}),
      ...preferences
    };
    
    return await upsertUserProfile({
      preferences: updatedPreferences
    });
  } catch (error) {
    console.error('Error in updateUserPreferences:', error);
    throw error;
  }
};
