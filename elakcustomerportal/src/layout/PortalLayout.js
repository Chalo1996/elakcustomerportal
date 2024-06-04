import { useTheme } from "../store/context/theme-context";

const PortalLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex ${theme === "dark" ? "dark" : ""}`}>
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
