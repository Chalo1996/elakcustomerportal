import "./index.css";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import MainLayout from "./layout/main-layout/MainLayout";
import store from "./store/redux/store";
import Home from "./pages/Home";
import PortalLayout from "./layout/PortalLayout";
import Education from "./components/Education/Education";
import GroupLifeAssurance from "./components/Group Life/GroupLife";
import NotFound from "./pages/NotFound";

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
            <Routes>
              <Route
                path="/"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route path="home" element={<Home />} />
              {/*'group-life-assurance'*/}

              <Route
                path="landing-page"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route
                path="Education"
                element={
                  <PortalLayout>
                    <Education />
                  </PortalLayout>
                }
              />
              <Route
                path="group-credit"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route
                path="funeral-expense"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route
                path="goal-based"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route
                path="critical-illness"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route
                path='group-life-assurance'
                element={
                  <PortalLayout>
                    <GroupLifeAssurance />
                  </PortalLayout>
                }
              />
              <Route
                path="group-term-life"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </ConfigProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
