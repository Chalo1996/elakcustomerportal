import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { GroupCredit } from "./components/GroupCredit/GroupCredit";
import FuneralExpenseQuotation from "./pages/FuneralExpensePages/Quotation";
import GroupTermLifeQuote from "./components/Group Term Life/TermLifeQuote";
import Welcome from "./components/Group Term Life/Welcome";
import CriticalIllnessQuotation from "./components/Group Critical Illness/CriticalIllnessQuotation";
import { authenticateUser } from "./store/redux/features/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return (
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
                      path="funeral-expense/quotation-details"
                      element={<FuneralExpenseQuotation />}
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
                      path="critical-illness/critical-illness-quotation"
                      element={<CriticalIllnessQuotation />}
                    />
                    {/* Add more routes here */}
                    <Route path="group-credit/*" element={<GroupCredit />} />
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
  );
}

export default App;
