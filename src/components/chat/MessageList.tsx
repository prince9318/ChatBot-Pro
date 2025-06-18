import { useEffect, useRef } from "react";
import { useChat } from "../../contexts/ChatContext";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";

export function MessageList() {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Welcome to ChatBot Pro
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Start a conversation with our AI assistant. Ask questions, get help,
            or just chat!
          </p>
          <div className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
            <p>💡 Try voice input with the microphone button</p>
            <p>📝 Use prompt templates for quick starts</p>
            <p>⬆️ Navigate input history with arrow keys</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
