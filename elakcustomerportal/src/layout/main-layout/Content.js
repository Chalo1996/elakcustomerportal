import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "../../store/context/theme-context";
import Product from "../../components/InsuranceProducts/Product";

const Content = () => {
  const [selectedKey, setSelectedKey] = useState("home");
  const { theme } = useTheme();

  const handleMenuSelect = (key) => {
    if (key === "theme" || key === "expanded" || key === "collapsed") return;
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "home":
        return <Product />;
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
          theme === "dark" ? "bg-gray-800 text-white" : "bg-[#f5f5f5]"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Content;
