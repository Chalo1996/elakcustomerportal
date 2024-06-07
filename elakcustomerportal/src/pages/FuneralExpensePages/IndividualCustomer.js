import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { Steps, Button, Form, Input } from "antd";

// const { Step } = Steps;

const IndividualCustomer = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home/funeral-expense/select-customer-type");
  };

  return (
    <div className="pt-5 pl-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Get Funeral Expense Cover
        </span>
      </div>
    </div>
  );
};

export default IndividualCustomer;
