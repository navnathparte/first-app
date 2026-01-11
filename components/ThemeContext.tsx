import { createContext, useState, useContext } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [dark, setDark] = useState(true);

  const theme = {
    dark,
    bg: dark ? "#020617" : "#ffffff",
    text: dark ? "#ffffff" : "#020617",
  };

  return (
    <ThemeContext.Provider value={{ theme, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
