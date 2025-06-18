import {
  MessageCircle,
  LogOut,
  Download,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react"; // Add this import
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  const { user, logout } = useAuth();
  const { messages, clearChat, exportChat } = useChat();

  const handleExport = (format: "json" | "text") => {
    exportChat(format);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              ChatBot Pro
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI Assistant
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Export Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {messages.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Download as LucideIcon} // Type assertion here
                  onClick={() => handleExport("text")}
                  title="Export as text"
                >
                  TXT
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Download as LucideIcon} // Type assertion here
                  onClick={() => handleExport("json")}
                  title="Export as JSON"
                >
                  JSON
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2 as LucideIcon} // Type assertion here
                  onClick={clearChat}
                  title="Clear chat"
                >
                  Clear
                </Button>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full font-semibold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={LogOut as LucideIcon} // Type assertion here
              onClick={logout}
              title="Sign out"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Actions */}
      {messages.length > 0 && (
        <div className="md:hidden flex items-center justify-center space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            icon={Download as LucideIcon} // Type assertion here
            onClick={() => handleExport("text")}
          >
            Export TXT
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Download as LucideIcon} // Type assertion here
            onClick={() => handleExport("json")}
          >
            Export JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Trash2 as LucideIcon} // Type assertion here
            onClick={clearChat}
          >
            Clear Chat
          </Button>
        </div>
      )}
    </header>
  );
}
