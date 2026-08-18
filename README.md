# LLM Proxy

Proxy OpenAI-compatible qui agrège plusieurs providers gratuits (Groq, OpenRouter, Google AI Studio) derrière un seul endpoint.

## Setup

### 1. Créer un compte Supabase

1. Va sur https://supabase.com
2. Crée un nouveau projet
3. Note l'URL et la clé service_role

### 2. Configurer la base de données

1. Va dans Supabase → SQL Editor
2. Copie-colle le contenu de `schema.sql`
3. Exécute le script

### 3. Déployer sur Vercel

1. Pousse le code sur GitHub
2. Va sur https://vercel.com
3. Importe le repo GitHub
4. Ajoute les variables d'environnement :

| Variable | Valeur |
|----------|--------|
| `SUPABASE_URL` | URL de ton projet Supabase |
| `SUPABASE_SERVICE_KEY` | Clé service_role de Supabase |

5. Clique "Deploy"

### 4. Ajouter les clés providers

Dans Supabase → Table Editor → `api_keys` :

1. Insère une nouvelle ligne avec une clé API unifiée

Dans Supabase → Table Editor → `provider_keys` :

1. Insère les clés pour chaque provider :
   - `provider`: 'groq', 'openrouter', ou 'google'
   - `api_key`: ta clé API du provider

### 5. Utiliser le proxy

```bash
curl https://ton-app.vercel.app/api/chat/completions \
  -H "Authorization: Bearer ta_clé_unifiée" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.3-70b-versatile",
    "messages": [{"role": "user", "content": "Salut"}]
  }'
```

## Endpoints

- `POST /api/chat/completions` - Chat completions (OpenAI-compatible)
- `GET /api/models` - Liste des modèles disponibles
- `GET /api/health` - Health check
