import { ConfigProvider } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

//import MainLayout from "./layout/main-layout/MainLayout";
import store from "./store/redux/store";
import Home from "./pages/Home";
import PortalLayout from "./layout/PortalLayout";
import Education from "./components/Education/Education";
import GoalBased from "./components/Goal Based/GoalBased";
import GroupLifeAssurance from "./components/Group Life/GroupLife";
import GroupCriticalIllness from "./components/Group Critical Illness/CriticalIlness";
import NotFound from "./pages/NotFound";
import CustomerTypePage from "./pages/FuneralExpensePages/CustomerType";
import LandingPage from "./pages/landingPage";
import IndividualCustomer from "./pages/FuneralExpensePages/IndividualCustomer";
import GroupCustomerPage from "./pages/FuneralExpensePages/GroupCustomer";
import Quotation from "./components/Group Critical Illness/Quotation";

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
              {/* Landing Page Route */}
              <Route path="/landing-page" element={<LandingPage />} />
              {/* Redirect to /landing-page */}
              <Route path="/" element={<Navigate to="/landing-page" />} />

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
                      <Route path="goal-based" element={<GoalBased />} />
                      <Route
                        path="funeral-expense/select-customer-type"
                        element={<CustomerTypePage />}
                      />
                      <Route
                        path="funeral-expense/individual-customer"
                        element={<IndividualCustomer />}
                      />
                      <Route
                        path="funeral-expense/group-customer"
                        element={<GroupCustomerPage />}
                      />
                      <Route
                        path="group-life-assurance"
                        element={<GroupLifeAssurance />}
                      />
                      <Route
                        path="critical-illness"
                        element={<GroupCriticalIllness />}
                      />
                      <Route
                        path="critical-illness/quotation"
                        element={<Quotation />}
                      />
                      {/* Add more routes here */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PortalLayout>
                }
              />

              {/* Routes outside of /home */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ConfigProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
