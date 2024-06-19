import { useTheme } from "../../store/context/theme-context";
import ProductsList from "../../components/InsuranceProducts/ProductsList";

const ContentTrial = ({ selectedKey }) => {
  const { theme } = useTheme();

  const renderContent = () => {
    switch (selectedKey) {
      case "home":
        return <ProductsList />;
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
    <div
      className={`min-h-[100vh] h-[100%] ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-[#f5f5f5]"
      }`}
    >
      {renderContent()}
    </div>
  );
};

export default ContentTrial;
