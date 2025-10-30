import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://elhgavegurywmaelnzrd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaGdhdmVndXJ5d21hZWxuenJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2Njc0OTQsImV4cCI6MjA3NzI0MzQ5NH0.YKsqTu-MGoRA0wwASb_QsOR0Gb-PkSfybU25Z2GktHo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
