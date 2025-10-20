import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './Button';

export interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'outline',
  size = 'icon',
  showLabel = false,
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
    }
    return theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (theme === 'system') {
      return `System (${resolvedTheme})`;
    }
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  if (showLabel && size !== 'icon') {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={toggleTheme}
        className="gap-2"
      >
        {getIcon()}
        <span>{getLabel()}</span>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      title={`Current theme: ${getLabel()}. Click to toggle.`}
    >
      {getIcon()}
    </Button>
  );
};