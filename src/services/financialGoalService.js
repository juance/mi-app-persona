import { supabase } from './supabase';

export const getFinancialGoals = async () => {
  const { data, error } = await supabase
    .from('financial_goals')
    .select('*')
    .order('target_date', { ascending: true });
    
  if (error) {
    console.error('Error fetching financial goals:', error);
    return [];
  }
  
  return data || [];
};

export const getFinancialGoalById = async (id) => {
  const { data, error } = await supabase
    .from('financial_goals')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching financial goal:', error);
    return null;
  }
  
  return data;
};

export const createFinancialGoal = async (goal) => {
  // Asegurarse de que el usuario actual sea el propietario de la meta
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('financial_goals')
    .insert([{ ...goal, user_id: user.id }])
    .select();
    
  if (error) {
    console.error('Error creating financial goal:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const updateFinancialGoal = async (id, updates) => {
  const { data, error } = await supabase
    .from('financial_goals')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating financial goal:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const deleteFinancialGoal = async (id) => {
  const { error } = await supabase
    .from('financial_goals')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting financial goal:', error);
    return false;
  }
  
  return true;
};

export const updateGoalProgress = async (id, amount) => {
  // Primero obtenemos la meta actual
  const { data: goal, error: fetchError } = await supabase
    .from('financial_goals')
    .select('*')
    .eq('id', id)
    .single();
    
  if (fetchError) {
    console.error('Error fetching financial goal for progress update:', fetchError);
    return null;
  }
  
  // Calculamos el nuevo monto actual
  const newAmount = goal.current_amount + amount;
  
  // Actualizamos la meta
  const { data, error } = await supabase
    .from('financial_goals')
    .update({ current_amount: newAmount, updated_at: new Date() })
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating financial goal progress:', error);
    return null;
  }
  
  return data?.[0] || null;
};
