import { supabase } from './supabase';

export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
  
  return data || [];
};

export const getTaskById = async (id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching task:', error);
    return null;
  }
  
  return data;
};

export const createTask = async (task) => {
  // Asegurarse de que el usuario actual sea el propietario de la tarea
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...task, user_id: user.id }])
    .select();
    
  if (error) {
    console.error('Error creating task:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating task:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const deleteTask = async (id) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting task:', error);
    return false;
  }
  
  return true;
};
