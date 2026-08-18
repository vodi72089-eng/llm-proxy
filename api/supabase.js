const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;

function getSupabase() {
  if (!supabase && supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

async function getApiKey(key) {
  const db = getSupabase();
  if (!db) return null;
  
  const { data, error } = await db
    .from('api_keys')
    .select('*')
    .eq('key', key)
    .eq('active', true)
    .single();
  
  if (error || !data) return null;
  return data;
}

async function getProviderKeys(apiKeyId) {
  const db = getSupabase();
  if (!db) return [];
  
  const { data, error } = await db
    .from('provider_keys')
    .select('*')
    .eq('api_key_id', apiKeyId)
    .eq('active', true);
  
  if (error) return [];
  return data || [];
}

module.exports = { getSupabase, getApiKey, getProviderKeys };
