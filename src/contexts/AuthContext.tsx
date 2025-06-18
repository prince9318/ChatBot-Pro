import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";
import {
  generateId,
  generateAuthToken,
  validateEmail,
  validatePassword,
} from "../utils/helpers";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, removeToken] = useLocalStorage<string | null>(
    STORAGE_KEYS.AUTH_TOKEN,
    null
  );
  const [userData, setUserData, removeUserData] = useLocalStorage<User | null>(
    STORAGE_KEYS.USER_DATA,
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Simulate user database
  const [users, setUsers] = useLocalStorage<User[]>("demo_users", []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      if (!validateEmail(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!password) {
        throw new Error("Password is required");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user in demo database
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // In a real app, you'd verify the password hash
      // For demo, we'll just check if it exists
      const authToken = generateAuthToken();

      setToken(authToken);
      setUserData(user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    setIsLoading(true);

    try {
      if (!validateEmail(email)) {
        throw new Error("Please enter a valid email address");
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        throw new Error(passwordError);
      }

      if (!name.trim()) {
        throw new Error("Name is required");
      }

      // Check if user already exists
      if (users.some((u) => u.email === email)) {
        throw new Error("An account with this email already exists");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: generateId(),
        email,
        name: name.trim(),
        createdAt: new Date().toISOString(),
      };

      // Add to demo database
      setUsers([...users, newUser]);

      const authToken = generateAuthToken();
      setToken(authToken);
      setUserData(newUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    removeToken();
    removeUserData();
  };

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        token,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
