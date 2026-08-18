// Provider configurations
const providers = {
  groq: {
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: {
      'llama-3.3-70b-versatile': { name: 'Llama 3.3 70B', context: 128000 },
      'llama-3.1-8b-instant': { name: 'Llama 3.1 8B', context: 128000 },
      'mixtral-8x7b-32768': { name: 'Mixtral 8x7B', context: 32768 },
    }
  },
  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: {
      'qwen/qwen3-coder:free': { name: 'Qwen3 Coder (Free)', context: 262144 },
      'minimax/minimax-m2.5:free': { name: 'MiniMax M2.5 (Free)', context: 196608 },
      'deepseek/deepseek-chat:free': { name: 'DeepSeek Chat (Free)', context: 64000 },
    }
  },
  google: {
    name: 'Google AI Studio',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    models: {
      'gemini-2.0-flash': { name: 'Gemini 2.0 Flash', context: 1048576 },
      'gemini-2.0-flash-lite': { name: 'Gemini 2.0 Flash Lite', context: 1048576 },
    }
  }
};

module.exports = providers;
