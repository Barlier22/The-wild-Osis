import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jbvybzdrfblvbxpvxglu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidnliemRyZmJsdmJ4cHZ4Z2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMDkyNzcsImV4cCI6MjAwODY4NTI3N30.UPezKPHQM3x34jWsOlO-a4n7OGyJ-19_eVZUrs_hFME";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
