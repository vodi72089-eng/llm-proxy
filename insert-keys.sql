-- Insérer une clé API unifiée
INSERT INTO api_keys (key, name) 
VALUES ('proxy-key-123', 'Ma clé');

-- Insérer la clé Groq
INSERT INTO provider_keys (api_key_id, provider, api_key)
SELECT id, 'groq', 'TA_CLE_GROQ_ICI'
FROM api_keys WHERE key = 'proxy-key-123';

-- Insérer la clé OpenRouter
INSERT INTO provider_keys (api_key_id, provider, api_key)
SELECT id, 'openrouter', 'TA_CLE_OPENROUTER_ICI'
FROM api_keys WHERE key = 'proxy-key-123';
