import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ngxoayeumtnpvcowmfxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neG9heWV1bXRucHZjb3dtZnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTA1MDgsImV4cCI6MjA2MTg2NjUwOH0.Ub_u6Vgp62cTiSJqyBrdwGgp6QZV39NAJcUTDGkZRoE';

let supabaseInstance = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

const createSupabaseClient = () => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'supabase.auth.token',
        debug: process.env.NODE_ENV === 'development'
      },
      realtime: false // Desactivar WebSocket
    });
  } catch (error) {
    console.error('Error al crear cliente Supabase:', error);
    return null;
  }
};

const initSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }
  return supabaseInstance;
};

const getSupabase = async () => {
  if (!supabaseInstance) {
    supabaseInstance = initSupabase();
  }

  // Verificar si hay conexión
  try {
    const { error } = await supabaseInstance.from('health_check').select('count').single();
    if (error) throw error;
    reconnectAttempts = 0; // Resetear intentos si hay éxito
    return supabaseInstance;
  } catch (error) {
    console.error('Error de conexión con Supabase:', error);
    
    // Intentar reconexión si no se alcanzó el límite
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      supabaseInstance = createSupabaseClient();
      return getSupabase(); // Intentar nuevamente
    }
    
    throw new Error('No se pudo establecer conexión con Supabase');
  }
};

export const supabase = supabaseInstance || initSupabase();
export { getSupabase };
