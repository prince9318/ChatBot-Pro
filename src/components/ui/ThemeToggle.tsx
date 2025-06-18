import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: "light" as const, icon: Sun, label: "Light" },
    { key: "dark" as const, icon: Moon, label: "Dark" },
    { key: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
      {themes.map(({ key, icon: Icon, label }) => (
        <Button
          key={key}
          variant={theme === key ? "primary" : "ghost"}
          size="sm"
          icon={Icon}
          onClick={() => setTheme(key)}
          className={`${
            theme === key ? "" : "text-gray-600 dark:text-gray-400"
          }`}
          title={`Switch to ${label} theme`}
        >
          <span className="sr-only">{label}</span>
        </Button>
      ))}
    </div>
  );
}
