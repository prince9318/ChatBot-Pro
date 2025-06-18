import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Lightbulb, X } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { PROMPT_TEMPLATES } from "../../utils/constants";
import { Button } from "../ui/Button";

export function MessageInput() {
  const { sendMessage, navigateHistory } = useChat();
  const [input, setInput] = useState("");
  const [showPrompts, setShowPrompts] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported: speechSupported,
    error: speechError,
  } = useSpeechRecognition();

  // Handle speech recognition results
  useEffect(() => {
    if (transcript) {
      setInput((prevInput) => prevInput + (prevInput ? " " : "") + transcript);
    }
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = input.trim();
    setInput("");
    setShowPrompts(false);
    await sendMessage(message);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "ArrowUp" && !input && e.ctrlKey) {
      e.preventDefault();
      const historicalInput = navigateHistory("up");
      if (historicalInput) setInput(historicalInput);
    } else if (e.key === "ArrowDown" && e.ctrlKey) {
      e.preventDefault();
      const historicalInput = navigateHistory("down");
      setInput(historicalInput);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt + " ");
    setShowPrompts(false);
    inputRef.current?.focus();
  };

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "44px";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className="relative">
      {/* Prompt Templates */}
      {showPrompts && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Prompt Templates
            </h3>
            <Button
              variant="ghost"
              size="sm"
              icon={X}
              onClick={() => setShowPrompts(false)}
              className="h-6 w-6 p-0"
            >
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="p-2 space-y-1">
            {PROMPT_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => handlePromptSelect(template.prompt)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="font-medium text-sm text-gray-900 dark:text-white">
                  {template.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {template.category}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                  {template.prompt}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Speech Error */}
      {speechError && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            {speechError}
          </p>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="flex items-end space-x-3 max-w-4xl mx-auto">
          {/* Prompt Templates Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={Lightbulb}
            onClick={() => setShowPrompts(!showPrompts)}
            className={`flex-shrink-0 ${
              showPrompts ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20" : ""
            }`}
            title="Show prompt templates"
          >
            <span className="sr-only">Show prompt templates</span>
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Ctrl+↑/↓ for history)"
              className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:text-gray-100"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>

          {/* Voice Input Button */}
          {speechSupported && (
            <Button
              type="button"
              variant={isListening ? "danger" : "ghost"}
              size="sm"
              icon={isListening ? MicOff : Mic}
              onClick={handleVoiceToggle}
              className="flex-shrink-0"
              title={isListening ? "Stop recording" : "Start voice input"}
            >
              <span className="sr-only">
                {isListening ? "Stop recording" : "Start voice input"}
              </span>
            </Button>
          )}

          {/* Send Button */}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            icon={Send}
            disabled={!input.trim()}
            className="flex-shrink-0"
            title="Send message (Enter)"
          >
            <span className="sr-only">Send</span>
          </Button>
        </div>

        {/* Voice Input Status */}
        {isListening && (
          <div className="mt-2 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">
              🎙️ Listening... Speak now
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
