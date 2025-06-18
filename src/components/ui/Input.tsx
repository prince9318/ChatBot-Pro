import React from "react";
// import { DivideIcon } from "lucide-react";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIconType;
  iconPosition?: "left" | "right";
}

export function Input({
  label,
  error,
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}: InputProps) {
  const inputId = React.useId();

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        <input
          id={inputId}
          className={`
            block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
            placeholder-gray-400 shadow-sm transition-colors duration-200
            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
            disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
            dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:disabled:bg-gray-900
            ${Icon && iconPosition === "left" ? "pl-10" : ""}
            ${Icon && iconPosition === "right" ? "pr-10" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : ""
            }
            ${className}
          `}
          {...props}
        />
        {Icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
