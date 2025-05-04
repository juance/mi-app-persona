import { supabase } from './supabase';

export const getInvestments = async () => {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .order('purchase_date', { ascending: false });

  if (error) {
    console.error('Error fetching investments:', error);
    return [];
  }

  return data || [];
};

export const getInvestmentById = async (id) => {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching investment:', error);
    return null;
  }

  return data;
};

export const createInvestment = async (investment) => {
  // Asegurarse de que el usuario actual sea el propietario de la inversión
  const { data: { user } } = await supabase.auth.getUser();

  // Asegurarse de que la moneda sea válida (ARS o USD)
  const currency = investment.currency && ['ARS', 'USD'].includes(investment.currency.toUpperCase())
    ? investment.currency.toUpperCase()
    : 'ARS';

  const { data, error } = await supabase
    .from('investments')
    .insert([{
      ...investment,
      user_id: user.id,
      currency: currency
    }])
    .select();

  if (error) {
    console.error('Error creating investment:', error);
    return null;
  }

  return data?.[0] || null;
};

export const updateInvestment = async (id, updates) => {
  // Asegurarse de que la moneda sea válida (ARS o USD) si se está actualizando
  if (updates.currency) {
    updates.currency = ['ARS', 'USD'].includes(updates.currency.toUpperCase())
      ? updates.currency.toUpperCase()
      : 'ARS';
  }

  const { data, error } = await supabase
    .from('investments')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating investment:', error);
    return null;
  }

  return data?.[0] || null;
};

export const deleteInvestment = async (id) => {
  const { error } = await supabase
    .from('investments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting investment:', error);
    return false;
  }

  return true;
};

export const updateInvestmentValue = async (id, currentValue) => {
  const { data, error } = await supabase
    .from('investments')
    .update({ current_value: currentValue, updated_at: new Date() })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating investment value:', error);
    return null;
  }

  return data?.[0] || null;
};

export const getInvestmentsByType = async (type) => {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('type', type)
    .order('purchase_date', { ascending: false });

  if (error) {
    console.error(`Error fetching investments of type ${type}:`, error);
    return [];
  }

  return data || [];
};

export const getInvestmentsByPlatform = async (platform) => {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('platform', platform)
    .order('purchase_date', { ascending: false });

  if (error) {
    console.error(`Error fetching investments for platform ${platform}:`, error);
    return [];
  }

  return data || [];
};

export const getInvestmentsByCurrency = async (currency) => {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('currency', currency.toUpperCase())
    .order('purchase_date', { ascending: false });

  if (error) {
    console.error(`Error fetching investments for currency ${currency}:`, error);
    return [];
  }

  return data || [];
};
