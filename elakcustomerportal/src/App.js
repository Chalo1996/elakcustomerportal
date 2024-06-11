import { ConfigProvider } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import MainLayout from "./layout/main-layout/MainLayout";
import store from "./store/redux/store";
import Home from "./pages/Home";
import PortalLayout from "./layout/PortalLayout";
import Education from "./components/Education/Education";
import GroupLifeAssurance from "./components/Group Life/GroupLife";
import NotFound from "./pages/NotFound";
import FuneralExpensePage from "./pages/FuneralExpense";
import GroupTermLife from "./components/Group Term Life/TermLife";
import GroupTermLifeQuote from "./components/Group Term Life/TermLifeQuote";
import Welcome from "./components/Group Term Life/Welcome";
import TermLife from "./components/Group Term Life/TermLife";

 


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#A32A29",
              },
            }}
          >
            <Routes>
              {/* Redirect to /home */}
              <Route path="/" element={<Navigate to="/home" />} />

              {/* Home route */}
              <Route
                path="/home"
                element={
                  <PortalLayout>
                    <Home />
                  </PortalLayout>
                }
              />

              {/* Routes under /home */}
              <Route
                path="/home/*"
                element={
                  <PortalLayout>
                    <Routes>
                      <Route path="education" element={<Education />} />
                      <Route
                        path="funeral-expense"
                        element={<FuneralExpensePage />}
                      />
                      <Route
                        path="group-life-assurance"
                        element={<GroupLifeAssurance />}
                      />
                      {/* Add more routes here */}
                      <Route path="*" element={<NotFound />} />
                      <Route path="term-life" element={<GroupTermLife/>}/>
                      <Route path="term-life-quote" element={<GroupTermLifeQuote/>}/>
                      <Route path="welcome" element={<Welcome/>}/>
                      <Route path="termlife" element={<TermLife/>}/>
                      
                    </Routes>
                  </PortalLayout>
                }
              />

              {/* Routes outside of /home */}
              <Route path="landing-page" element={<MainLayout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ConfigProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
