import { create } from 'zustand';

// Simple localStorage persistence
const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  return stored || 'light';
};

const setStoredTheme = (theme) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};

const useThemeStore = create((set) => {
  // Initialize theme from localStorage
  const initialTheme = getStoredTheme();
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    theme: initialTheme,
    
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        // Apply theme to document
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        setStoredTheme(newTheme);
        return { theme: newTheme };
      });
    },
    
    setTheme: (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setStoredTheme(theme);
      set({ theme });
    },
  };
});

export default useThemeStore;

