import { supabase } from './supabase';

// Clave para almacenar las categorías de objetivos financieros en localStorage
const FINANCIAL_GOALS_CATEGORIES_KEY = 'financial_goals_categories';

// Categorías predeterminadas para objetivos financieros
const DEFAULT_FINANCIAL_GOALS_CATEGORIES = [
  { name: 'Ahorros', value: 'savings' },
  { name: 'Inversión', value: 'investment' },
  { name: 'Compra', value: 'purchase' },
  { name: 'Viaje', value: 'travel' },
  { name: 'Educación', value: 'education' },
  { name: 'Hogar', value: 'home' },
  { name: 'Otro', value: 'other' }
];

/**
 * Obtiene todas las categorías
 * @returns {Promise<Array>} - Lista de categorías
 */
export const getCategories = async () => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    // Construir la consulta
    let query = supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    // Obtener categorías del usuario actual y categorías globales (user_id es null)
    const { data, error } = await query.or(`user_id.is.null,user_id.eq.${user?.id}`);

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
};

/**
 * Obtiene categorías por tipo
 * @param {string} type - Tipo de categoría
 * @returns {Promise<Array>} - Lista de categorías
 */
export const getCategoriesByType = async (type) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    // Construir la consulta
    let query = supabase
      .from('categories')
      .select('*')
      .eq('type', type)
      .order('name', { ascending: true });

    // Obtener categorías del usuario actual y categorías globales (user_id es null)
    const { data, error } = await query.or(`user_id.is.null,user_id.eq.${user?.id}`);

    if (error) {
      console.error(`Error fetching ${type} categories:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error in getCategoriesByType for type ${type}:`, error);
    return [];
  }
};

/**
 * Crea una nueva categoría
 * @param {Object} category - Datos de la categoría
 * @returns {Promise<Object>} - Categoría creada
 */
export const createCategory = async (category) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Crear la categoría
    const { data, error } = await supabase
      .from('categories')
      .insert([{ ...category, user_id: user.id }])
      .select();

    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in createCategory:', error);
    throw error;
  }
};

/**
 * Actualiza una categoría existente
 * @param {number} id - ID de la categoría
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<Object>} - Categoría actualizada
 */
export const updateCategory = async (id, updates) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Verificar que la categoría pertenece al usuario
    const { data: category } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!category) {
      throw new Error('Category not found or you do not have permission to update it');
    }

    // Actualizar la categoría
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating category:', error);
      throw error;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
};

/**
 * Elimina una categoría
 * @param {number} id - ID de la categoría
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 */
export const deleteCategory = async (id) => {
  try {
    // Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Verificar que la categoría pertenece al usuario
    const { data: category } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!category) {
      throw new Error('Category not found or you do not have permission to delete it');
    }

    // Eliminar la categoría
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
};

/**
 * Obtiene las categorías de objetivos financieros
 * @returns {Array} - Lista de categorías
 */
export const getFinancialGoalsCategories = () => {
  try {
    const categoriesJson = localStorage.getItem(FINANCIAL_GOALS_CATEGORIES_KEY);

    if (!categoriesJson) {
      return DEFAULT_FINANCIAL_GOALS_CATEGORIES;
    }

    return JSON.parse(categoriesJson);
  } catch (error) {
    console.error('Error al obtener categorías de objetivos financieros:', error);
    return DEFAULT_FINANCIAL_GOALS_CATEGORIES;
  }
};

/**
 * Guarda las categorías de objetivos financieros
 * @param {Array} categories - Lista de categorías
 * @returns {boolean} - Indica si se guardaron correctamente
 */
export const saveFinancialGoalsCategories = (categories) => {
  try {
    localStorage.setItem(FINANCIAL_GOALS_CATEGORIES_KEY, JSON.stringify(categories));
    return true;
  } catch (error) {
    console.error('Error al guardar categorías de objetivos financieros:', error);
    return false;
  }
};
