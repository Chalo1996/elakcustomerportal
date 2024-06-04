import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "../../store/context/theme-context";

const Content = () => {
  const [selectedKey, setSelectedKey] = useState("home");
  const { theme } = useTheme();

  const handleMenuSelect = (key) => {
    if (key === "theme") return;
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "home":
        return <div>Home</div>;
      case "more":
        return <div>More</div>;
      case "english":
        return <div>English</div>;
      case "signout":
        return <div>Sign Out</div>;
      case "theme":
        return;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <div className={`flex ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar onSelect={handleMenuSelect} />
      <div
        className={`flex-1 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Content;
