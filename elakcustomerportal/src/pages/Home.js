// import React, { useState } from "react";
import { useTheme } from "../store/context/theme-context";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex ${theme === "dark" ? "dark" : ""}`}>
      <div
        className={`flex-1 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
        }`}
      >
        Home
      </div>
    </div>
  );
};

export default Home;
