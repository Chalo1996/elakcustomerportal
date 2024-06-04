import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "../store/context/theme-context";

const PortalLayout = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState("1");
  const { theme } = useTheme();

  const handleMenuSelect = (key) => {
    if (key === "theme") return;
    setSelectedKey(key);
  };

  return (
    <div className={`flex ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar onSelect={handleMenuSelect} />
      <div
        className={`flex-1 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default PortalLayout;
