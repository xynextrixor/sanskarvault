import { createClient } from '@supabase/supabase-js';

// Use the proxy route we set up in server.ts to bypass any Network/CORS/Adblocker issues.
const supabaseUrl = typeof window !== 'undefined' ? `${window.location.origin}/supabase-api` : 'http://localhost:3000/supabase-api';
// The user explicitly provided this valid publishable key.
const supabaseAnonKey = 'sb_publishable_mOJygyL8vPHWBnd8ltTl8Q_M27DgOhU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
