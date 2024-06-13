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
import { GroupCredit } from "./components/GroupCredit/GroupCredit";
import FuneralExpenseQuotation from "./pages/FuneralExpensePages/Quotation";
import CriticalIllnessQuotation from "./components/Group Critical Illness/CriticalIllnessQuotation";
import {
  authenticateUser,
  setStatus,
  setToken,
} from "./store/redux/features/authSlice";
import HandleCustomerSelection from "./pages/FuneralExpensePages/HandleCustomerSelection";
import GroupTermLifeQuote from "./components/Group Term Life/TermLifeQuote";
import Welcome from "./components/Group Term Life/Welcome";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const authStatus = localStorage.getItem("authStatus");

    if (authToken) {
      dispatch(setToken(authToken));
    }

    if (authStatus) {
      dispatch(setStatus(authStatus));
    } else {
      dispatch(authenticateUser());
    }
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
                      path="/funeral-expense"
                      element={<HandleCustomerSelection />}
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
                    <Route path="welcome" element={<Welcome />} />
                    <Route
                      path="term-life-quote"
                      element={<GroupTermLifeQuote />}
                    />
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
