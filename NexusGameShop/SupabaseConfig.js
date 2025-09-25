import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hbvrzkzggrvocqkzbdmt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidnJ6a3pnZ3J2b2Nxa3piZG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MTIyMjgsImV4cCI6MjA3NDM4ODIyOH0.BTW72yywJ-qXfJ0z8c7T4h-_GlomhyX_wN8785m_iUA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
