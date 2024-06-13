import { useLocation } from "react-router-dom";
import GroupCustomerPage from "./GroupCustomer";
import IndividualCustomerPage from "./IndividualCustomer";

const HandleCustomerSelection = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerType = searchParams.get("customer");

  return (
    <>
      {customerType === "individual" && <IndividualCustomerPage />}
      {customerType === "group" && <GroupCustomerPage />}
    </>
  );
};

export default HandleCustomerSelection;
