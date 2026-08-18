const { authenticate } = require('./auth');
const { getProviderKeys } = require('./supabase');
const providers = require('./providers');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authenticate
  const apiKey = await authenticate(req);
  if (!apiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  // Get provider keys
  const providerKeys = await getProviderKeys(apiKey.id);
  
  // Build models list
  const models = [];
  for (const pk of providerKeys) {
    const provider = providers[pk.provider];
    if (provider) {
      for (const [id, info] of Object.entries(provider.models)) {
        models.push({
          id,
          object: 'model',
          created: Math.floor(Date.now() / 1000),
          owned_by: pk.provider,
          name: info.name,
          context_window: info.context
        });
      }
    }
  }

  return res.status(200).json({ object: 'list', data: models });
};
