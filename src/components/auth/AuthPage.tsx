import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ThemeToggle } from "../ui/ThemeToggle";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ChatBot Pro
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your intelligent AI assistant
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            {isLogin ? (
              <LoginForm onToggleMode={toggleMode} />
            ) : (
              <RegisterForm onToggleMode={toggleMode} />
            )}
          </div>

          {/* Features */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Features included:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <span>🎙️</span>
                <span>Voice Input</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>📝</span>
                <span>Prompt Templates</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>💾</span>
                <span>Chat Export</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🌙</span>
                <span>Dark Mode</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
