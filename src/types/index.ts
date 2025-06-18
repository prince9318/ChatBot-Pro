export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
  isLoading?: boolean;
  rating?: "positive" | "negative";
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  exportChat: (format: "json" | "text") => void;
  rateMessage: (messageId: string, rating: "positive" | "negative") => void;
  isTyping: boolean;
  inputHistory: string[];
  historyIndex: number;
  navigateHistory: (direction: "up" | "down") => string;
}

export interface ThemeContextType {
  theme: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  setTheme: (theme: "light" | "dark" | "system") => void;
}
