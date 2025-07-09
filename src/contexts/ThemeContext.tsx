import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from '../types';

interface ThemeContextType {
  theme: ThemeConfig;
  toggleTheme: () => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const defaultTheme: ThemeConfig = {
  mode: 'theatrical',
  primaryColor: '#FFD700',
  backgroundVideo: 'https://cdn.pixabay.com/vimeo/356372759/spotlight-38840.mp4?width=1280&hash=b7b5bf5b4b0c1b8f8b3d7e8f9c6a2d1b',
  particleConfig: {
    count: 50,
    speed: 1,
    color: '#FFD700',
    connections: true,
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [currentSection, setCurrentSection] = useState('hero');

  const toggleTheme = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'theatrical' ? 'tech' : 'theatrical',
      primaryColor: prev.mode === 'theatrical' ? '#00F5FF' : '#FFD700',
      backgroundVideo: prev.mode === 'theatrical' 
        ? 'https://cdn.pixabay.com/vimeo/409711865/matrix-42195.mp4?width=1280&hash=b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3'
        : 'https://cdn.pixabay.com/vimeo/356372759/spotlight-38840.mp4?width=1280&hash=b7b5bf5b4b0c1b8f8b3d7e8f9c6a2d1b',
      particleConfig: {
        ...prev.particleConfig,
        color: prev.mode === 'theatrical' ? '#00F5FF' : '#FFD700',
      },
    }));
  };

  useEffect(() => {
    // Update CSS custom properties when theme changes
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--particle-color', theme.particleConfig.color);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentSection, setCurrentSection }}>
      {children}
    </ThemeContext.Provider>
  );
};