import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../redux/features/authSlice";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      dispatch(changeTheme("dark"));
      document.body.classList.add("dark");
    } else {
      dispatch(changeTheme("light"));
      document.body.classList.remove("dark");
    }
  }, [theme, dispatch]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
