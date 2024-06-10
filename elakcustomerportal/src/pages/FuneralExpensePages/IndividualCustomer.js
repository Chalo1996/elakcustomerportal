import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Steps, Form, Button } from "antd";
import PersonalDetailsForm from "../../components/Funeral Expense/PersonalDetails";

const { Step } = Steps;

const IndividualCustomer = () => {
  const [current, setCurrent] = useState(0);
  const [form1] = Form.useForm();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home/funeral-expense/select-customer-type");
  };

  const [formData, setFormData] = useState({});

  const forms = [form1];

  const handleNext = async () => {
    try {
      await forms[current].validateFields();
      // Save current form data to state
      setFormData({
        ...formData,
        ...forms[current].getFieldsValue(),
      });
      setCurrent(current + 1);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(forms.map((form) => form.validateFields()));
      // Collect data from all forms
      const data = {
        ...formData,
        ...forms[current].getFieldsValue(),
      };
      console.log("Collected data:", data);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const steps = [
    {
      title: "Personal Information",
      content: <PersonalDetailsForm form={form1} />,
    },
  ];

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

      <div>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={handleNext} className="shadow-none">
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              className="shadow-none"
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={handlePrev}
              className="shadow-none"
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualCustomer;
