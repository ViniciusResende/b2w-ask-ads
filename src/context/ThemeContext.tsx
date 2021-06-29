import { createContext, useState } from 'react';

type ThemeContextType = {
  isInDarkTheme: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

type ThemeCOntextProviderProps = {
  children: React.ReactNode;
};

export function ThemeContextProvider({ children }: ThemeCOntextProviderProps) {
  const [isInDarkTheme, setIsInDarkTheme] = useState(
    localStorage.getItem('@AskAds:Theme') === 'dark',
  );

  const toggleTheme = () => {
    localStorage.setItem('@AskAds:Theme', !isInDarkTheme ? 'dark' : 'light');
    setIsInDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isInDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
