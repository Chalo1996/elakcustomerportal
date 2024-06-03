import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "../store/theme-context";

const Content = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const { theme } = useTheme();

  const handleMenuSelect = (key) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <div className="p-4">Content for Tom</div>;
      case "2":
        return <div className="p-4">Content for Bill</div>;
      case "3":
        return <div className="p-4">Content for Alex</div>;
      case "4":
        return <div className="p-4">Content for Team 1</div>;
      case "5":
        return <div className="p-4">Content for Team 2</div>;
      case "6":
        return <div className="p-4">Content for Message 1</div>;
      case "7":
        return <div className="p-4">Content for Message 2</div>;
      case "8":
        return <div className="p-4">Content for Message 3</div>;
      default:
        return <div className="p-4">Select an item from the sidebar</div>;
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
