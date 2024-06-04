import "./index.css";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainLayout from "./layout/main-layout/MainLayout";
import store from "./store/redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "maroon",
              },
            }}
          >
            <MainLayout />
          </ConfigProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
