import React from "react";
import { ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import { formatTimestamp } from "../../utils/helpers";
import { Button } from "../ui/Button";
import type { Message as MessageType } from "../../types";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const { rateMessage } = useChat();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  const handleRate = (rating: "positive" | "negative") => {
    rateMessage(message.id, rating);
  };

  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start space-x-3`}
      >
        {/* Avatar */}
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Message Content */}
        <div className={`space-y-2 ${isUser ? "mr-3" : "ml-3"}`}>
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? "bg-blue-600 text-white rounded-br-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>

          {/* Message Actions */}
          <div
            className={`flex items-center space-x-2 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimestamp(message.timestamp)}
            </span>

            {!isUser && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={copied ? Check : Copy}
                  onClick={handleCopy}
                  className="h-6 w-6 p-0"
                  title="Copy message"
                >
                  <span className="sr-only">Copy message</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ThumbsUp}
                  onClick={() => handleRate("positive")}
                  className={`h-6 w-6 p-0 ${
                    message.rating === "positive"
                      ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                      : ""
                  }`}
                  title="Rate positive"
                >
                  <span className="sr-only">Rate positive</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ThumbsDown}
                  onClick={() => handleRate("negative")}
                  className={`h-6 w-6 p-0 ${
                    message.rating === "negative"
                      ? "text-red-600 bg-red-50 dark:bg-red-900/20"
                      : ""
                  }`}
                  title="Rate negative"
                >
                  <span className="sr-only">Rate negative</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
