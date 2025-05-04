import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ngxoayeumtnpvcowmfxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neG9heWV1bXRucHZjb3dtZnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTA1MDgsImV4cCI6MjA2MTg2NjUwOH0.Ub_u6Vgp62cTiSJqyBrdwGgp6QZV39NAJcUTDGkZRoE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
