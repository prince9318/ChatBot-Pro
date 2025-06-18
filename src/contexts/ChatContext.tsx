import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS, BOT_RESPONSES } from "../utils/constants";
import { generateId, downloadFile } from "../utils/helpers";
import type { ChatContextType, Message } from "../types";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useLocalStorage<Message[]>(
    STORAGE_KEYS.CHAT_HISTORY,
    []
  );
  const [inputHistory, setInputHistory] = useLocalStorage<string[]>(
    STORAGE_KEYS.INPUT_HISTORY,
    []
  );
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string): Promise<void> => {
    const userMessage: Message = {
      id: generateId(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    // Add to input history (avoid duplicates)
    if (!inputHistory.includes(content)) {
      setInputHistory((prev) => [content, ...prev.slice(0, 49)]); // Keep last 50 entries
    }
    setHistoryIndex(-1);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const botResponse =
      BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
    const botMessage: Message = {
      id: generateId(),
      content: botResponse,
      sender: "bot",
      timestamp: new Date().toISOString(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const exportChat = (format: "json" | "text") => {
    if (messages.length === 0) return;

    const timestamp = new Date().toISOString().split("T")[0];

    if (format === "json") {
      const data = JSON.stringify(messages, null, 2);
      downloadFile(data, `chat-export-${timestamp}.json`, "application/json");
    } else {
      const text = messages
        .map(
          (msg) =>
            `[${new Date(
              msg.timestamp
            ).toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.content}`
        )
        .join("\n\n");
      downloadFile(text, `chat-export-${timestamp}.txt`, "text/plain");
    }
  };

  const rateMessage = (messageId: string, rating: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg))
    );
  };

  const navigateHistory = (direction: "up" | "down"): string => {
    if (inputHistory.length === 0) return "";

    let newIndex = historyIndex;

    if (direction === "up") {
      newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
    } else {
      newIndex = Math.max(historyIndex - 1, -1);
    }

    setHistoryIndex(newIndex);
    return newIndex >= 0 ? inputHistory[newIndex] : "";
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        clearChat,
        exportChat,
        rateMessage,
        isTyping,
        inputHistory,
        historyIndex,
        navigateHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
