import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../redux/features/authSlice";

const ThemeContext = createContext();

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? savedTheme : "light";
};

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    if (theme === "dark") {
      dispatch(changeTheme("dark"));
      document.body.classList.add("dark");
    } else {
      dispatch(changeTheme("light"));
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
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
