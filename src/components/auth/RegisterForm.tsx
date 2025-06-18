import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { validatePassword } from "../../utils/helpers";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface RegisterFormProps {
  onToggleMode: () => void;
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    }
  };

  const passwordStrength = validatePassword(formData.password);
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    !passwordStrength &&
    formData.password === formData.confirmPassword;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create account
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Get started with ChatBot Pro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Full Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          icon={User}
          placeholder="Enter your full name"
          required
          autoComplete="name"
        />

        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          icon={Mail}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            icon={Lock}
            placeholder="Create a password"
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <Input
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          icon={Lock}
          placeholder="Confirm your password"
          required
          autoComplete="new-password"
          error={
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
              ? "Passwords do not match"
              : ""
          }
        />

        {/* Password Requirements */}
        {formData.password && (
          <div className="text-xs space-y-1">
            <div
              className={`flex items-center space-x-2 ${
                formData.password.length >= 6
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <span>{formData.password.length >= 6 ? "✓" : "○"}</span>
              <span>At least 6 characters</span>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                /(?=.*[a-z])/.test(formData.password)
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <span>{/(?=.*[a-z])/.test(formData.password) ? "✓" : "○"}</span>
              <span>One lowercase letter</span>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                /(?=.*[A-Z])/.test(formData.password)
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <span>{/(?=.*[A-Z])/.test(formData.password) ? "✓" : "○"}</span>
              <span>One uppercase letter</span>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                /(?=.*\d)/.test(formData.password)
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <span>{/(?=.*\d)/.test(formData.password) ? "✓" : "○"}</span>
              <span>One number</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          disabled={!isFormValid}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onToggleMode}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
