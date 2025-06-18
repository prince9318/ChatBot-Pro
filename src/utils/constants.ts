export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'chatbot_auth_token',
  USER_DATA: 'chatbot_user_data',
  THEME: 'chatbot_theme',
  CHAT_HISTORY: 'chatbot_chat_history',
  INPUT_HISTORY: 'chatbot_input_history',
} as const;

export const PROMPT_TEMPLATES = [
  {
    id: '1',
    title: 'Explain Simply',
    prompt: 'Explain this concept in simple terms that a beginner can understand:',
    category: 'Education'
  },
  {
    id: '2',
    title: 'Code Review',
    prompt: 'Please review this code and provide suggestions for improvement:',
    category: 'Development'
  },
  {
    id: '3',
    title: 'Creative Writing',
    prompt: 'Help me write a creative story about:',
    category: 'Writing'
  },
  {
    id: '4',
    title: 'Problem Solving',
    prompt: 'Help me brainstorm solutions for this problem:',
    category: 'Business'
  },
  {
    id: '5',
    title: 'Learning Plan',
    prompt: 'Create a learning plan to help me master:',
    category: 'Education'
  },
  {
    id: '6',
    title: 'Email Draft',
    prompt: 'Help me write a professional email for:',
    category: 'Business'
  }
];

export const BOT_RESPONSES = [
  "I understand what you're asking. Let me think about this carefully and provide you with a comprehensive response.",
  "That's an interesting question! Here's my take on it, based on the information you've provided.",
  "I can help you with that. Let me break this down into manageable parts for better understanding.",
  "Great question! This is something that many people wonder about. Here's what I think:",
  "I appreciate you sharing this with me. Based on your input, here are some thoughts and suggestions:",
  "This is definitely worth exploring further. Let me provide you with some insights and practical advice.",
  "I can see why this might be challenging. Here's how I'd approach this situation:",
  "That's a thoughtful inquiry. Let me share some perspectives that might be helpful for your situation."
];

export const SPEECH_RECOGNITION_CONFIG = {
  continuous: false,
  interimResults: true,
  lang: 'en-US',
  maxAlternatives: 1
};