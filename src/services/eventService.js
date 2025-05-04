import { supabase } from './supabase';

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
    
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data || [];
};

export const getEventById = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }
  
  return data;
};

export const createEvent = async (event) => {
  // Asegurarse de que el usuario actual sea el propietario del evento
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('events')
    .insert([{ ...event, user_id: user.id }])
    .select();
    
  if (error) {
    console.error('Error creating event:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const updateEvent = async (id, updates) => {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating event:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const deleteEvent = async (id) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting event:', error);
    return false;
  }
  
  return true;
};

export const getEventsByDate = async (date) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('date', date)
    .order('start_time', { ascending: true });
    
  if (error) {
    console.error(`Error fetching events for date ${date}:`, error);
    return [];
  }
  
  return data || [];
};

export const getEventsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', category)
    .order('date', { ascending: true });
    
  if (error) {
    console.error(`Error fetching events for category ${category}:`, error);
    return [];
  }
  
  return data || [];
};

export const getEventsByDateRange = async (startDate, endDate) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
    
  if (error) {
    console.error(`Error fetching events for date range:`, error);
    return [];
  }
  
  return data || [];
};
