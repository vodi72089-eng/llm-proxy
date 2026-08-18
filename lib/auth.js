const { getApiKey } = require('./supabase');

async function authenticate(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const key = authHeader.replace('Bearer ', '');
  const apiKey = await getApiKey(key);
  return apiKey;
}

module.exports = { authenticate };
