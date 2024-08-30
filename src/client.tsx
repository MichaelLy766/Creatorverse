import { createClient } from '@supabase/supabase-js';
const URL = 'https://jtbbzlehijkdjnrtgqkd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0YmJ6bGVoaWprZGpucnRncWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1NzIyNjAsImV4cCI6MjA0MDE0ODI2MH0.lbhCkLidByZTHvZeZVbZqS3OrW8LvUsIaRbFlZKqiPA';
export const supabase = createClient(URL, API_KEY);