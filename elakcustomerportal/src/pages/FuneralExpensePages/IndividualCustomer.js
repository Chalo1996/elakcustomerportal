import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Steps, Button, Form } from "antd";
import PersonalDetailsForm from "../../components/Funeral Expense/PersonalDetails";
import CallBackModal from "../../components/Funeral Expense/modals/CallBackModal";
import BeneficiaryMembersForm from "../../components/Funeral Expense/BeneficiaryMembers";
import ProductPackagesForm from "../../components/Funeral Expense/ProductPackages";

const { Step } = Steps;

const IndividualCustomer = () => {
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const forms = [form1, form2, form3];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    phoneArea: "+254",
    country: "Kenya",
    birthDate: null,
    terms: false,
    spouse: false,
    spouseNumber: 0,
    parentsNumber: 0,
    childrenNumber: 0,
    parentsInLawNumber: 0,
    productName: "",
    benefitAmount: 0,
  });

  const handleNavigate = () => {
    navigate("/home/funeral-expense/select-customer-type");
  };

  const handleNext = async () => {
    try {
      await forms[current].validateFields();
      if (current === 0) {
        setIsModalVisible(true);
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalContinue = (selectedOption) => {
    setIsModalVisible(false);
    if (selectedOption === "generateQuote") {
      setCurrent(current + 1);
    } else if (selectedOption === "requestCallback") {
      navigate("/home/funeral-expense/request-callback");
    }
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(forms.map((form) => form.validateFields()));
      console.log("Collected data:", formData);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <PersonalDetailsForm
          form={form1}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Beneficiary Members",
      content: (
        <BeneficiaryMembersForm
          form={form2}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Select Package",
      content: (
        <ProductPackagesForm
          form={form3}
          formData={formData}
          setFormData={setFormData}
        />
      ),
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
          {current > 0 && (
            <Button
              onClick={handlePrev}
              className="h-full px-4 py-2 shadow-none text-center mr-3"
            >
              Go back
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleNext}
              className="h-full px-4 py-2 shadow-none text-center"
            >
              Continue
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              className="h-full px-4 py-2 shadow-none text-center"
            >
              Done
            </Button>
          )}
        </div>
      </div>

      <CallBackModal
        isModalOpen={isModalVisible}
        onClose={handleModalClose}
        onContinue={handleModalContinue}
      />
    </div>
  );
};

export default IndividualCustomer;
