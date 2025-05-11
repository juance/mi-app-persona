import { supabase } from './supabase';

/**
 * Registra un nuevo usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{user: Object, error: Object}>} - Usuario registrado o error
 */
export const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { user: null, error };
  }
};

/**
 * Inicia sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{user: Object, error: Object}>} - Usuario autenticado o error
 */
export const signIn = async (email, password) => {
  try {
    // Validar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      throw new Error('El email y la contraseña son requeridos');
    }

    // Limpiar cualquier sesión anterior que pudiera quedar
    await supabase.auth.signOut();

    // Intentar iniciar sesión
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Verificar que tenemos un usuario válido
    if (!data?.user) {
      throw new Error('No se pudo iniciar sesión. Por favor, verifica tus credenciales.');
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { 
      user: null, 
      error: {
        message: error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.'
      }
    };
  }
};

/**
 * Cierra la sesión del usuario actual
 * @returns {Promise<{error: Object}>} - Error si ocurre alguno
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

/**
 * Obtiene el usuario actual
 * @returns {Promise<{user: Object, error: Object}>} - Usuario actual o error
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null, error };
  }
};

/**
 * Obtiene la sesión actual
 * @returns {Promise<{session: Object, error: Object}>} - Sesión actual o error
 */
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    console.error('Error getting session:', error);
    return { session: null, error };
  }
};

/**
 * Actualiza el usuario actual
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<{user: Object, error: Object}>} - Usuario actualizado o error
 */
export const updateUser = async (updates) => {
  try {
    const { data, error } = await supabase.auth.updateUser(updates);
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { user: null, error };
  }
};

/**
 * Envía un enlace de restablecimiento de contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<{data: Object, error: Object}>} - Datos o error
 */
export const resetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { data: null, error };
  }
};

/**
 * Configura un listener para cambios en la autenticación
 * @param {Function} callback - Función a llamar cuando cambia la autenticación
 * @returns {Function} - Función para eliminar el listener
 */
export const onAuthStateChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  
  return data.subscription.unsubscribe;
};
