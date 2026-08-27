import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccentTheme } from '../types';
import { haptics } from '../utils/haptics';

interface ThemeContextType {
  theme: 'dark' | 'light';
  accentTheme: AccentTheme;
  toggleTheme: () => void;
  setAccent: (accent: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'meta_theme_v13';
const ACCENT_STORAGE_KEY = 'meta_accent_v13';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [accentTheme, setAccentTheme] = useState<AccentTheme>('classic');

  useEffect(() => {
    // Initial theme detection
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as 'dark' | 'light' | null;
    const savedAccent = localStorage.getItem(ACCENT_STORAGE_KEY) as AccentTheme | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (savedAccent) {
      setAccentTheme(savedAccent);
      document.documentElement.setAttribute('data-accent', savedAccent);
    } else {
      document.documentElement.setAttribute('data-accent', 'classic');
    }
  }, []);

  const toggleTheme = () => {
    haptics.tap();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  const setAccent = (accent: AccentTheme) => {
    haptics.tap();
    setAccentTheme(accent);
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  };

  return (
    <ThemeContext.Provider value={{ theme, accentTheme, toggleTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
