const { authenticate } = require('../auth');
const { getProviderKeys } = require('../supabase');
const providers = require('../providers');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authenticate
  const apiKey = await authenticate(req);
  if (!apiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  const { model, messages, stream, ...params } = req.body;

  // Get provider keys for this user
  const providerKeys = await getProviderKeys(apiKey.id);
  
  // Find which provider has this model
  let selectedProvider = null;
  let providerKey = null;
  
  for (const pk of providerKeys) {
    const provider = providers[pk.provider];
    if (provider && provider.models[model]) {
      selectedProvider = provider;
      providerKey = pk.api_key;
      break;
    }
  }

  if (!selectedProvider || !providerKey) {
    return res.status(400).json({ 
      error: 'Model not available',
      available_models: getAvailableModels(providerKeys)
    });
  }

  // Forward request to provider
  try {
    const response = await fetch(`${selectedProvider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${providerKey}`
      },
      body: JSON.stringify({ model, messages, stream, ...params })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Provider error:', error);
    return res.status(500).json({ error: 'Provider request failed' });
  }
};

function getAvailableModels(providerKeys) {
  const models = [];
  for (const pk of providerKeys) {
    const provider = providers[pk.provider];
    if (provider) {
      for (const [id, info] of Object.entries(provider.models)) {
        models.push({ id, name: info.name, provider: pk.provider });
      }
    }
  }
  return models;
}
