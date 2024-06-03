import "./index.css";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "./store/context/theme-context";

import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#800000",
          },
        }}
      >
        <MainLayout />
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
