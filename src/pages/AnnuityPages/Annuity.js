import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons/";
import { Steps, Button, Form } from "antd";
import dayjs from "dayjs";
import CustomerDetailsForm from "../../components/Annuity/CustomerDetails";
import CallBackForm from "../../components/Funeral Expense/CallBack";
import CallBackModal from "../../components/Funeral Expense/modals/CallBackModal";
import ProductParametersForm from "../../components/Annuity/ProductParameters";

const { Step } = Steps;

const getInitialFormData = () => {
  const savedFormData = localStorage.getItem("yourAnnuityData");
  return savedFormData
    ? JSON.parse(savedFormData)
    : {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: null,
        gender: "",
        phoneArea: "+254",
        phoneNo: "",
        country: "Kenya",
        spouseDob: null,
        spouseGender: "",
        targetType: "Pre-determined Purchase Price",
        annuityType: "Deferred Annuity",
        paymentFrequency: "Monthly",
        frequencyValue: 12,
        isDeferredAnnuity: true,
        startDate: null,
        deferrementPeriod: 180,
        purchasePrice: 1000000,
        isPurchasePrice: true,
        annuityPerMonth: 50000,
        segment: "Joint Life",
        isSingleLife: false,
        spouseReversion: 25,
        guaranteedPeriod: 10,
        residualPremium: "Yes",
        longTermCare: "Yes",
        criticalIllness: "Yes",
        totalDisability: "Yes",
        funeralExpense: "Yes",
        displayFrequency: "Month",
        initialized: false,
        terms: false,
      };
};

const AnnuityPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState(() => {
    const initialData = getInitialFormData();
    return {
      ...initialData,
      birthDate: initialData.birthDate ? dayjs(initialData.birthDate) : null,
      startDate: initialData.startDate ? dayjs(initialData.startDate) : null,
      spouseDob: initialData.spouseDob ? dayjs(initialData.spouseDob) : null,
    };
  });
  const [showCallback, setShowCallback] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("yourAnnuityData", JSON.stringify(formData));
  }, [formData]);

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const forms = [form2, form3];

  const handleNavigate = () => {
    navigate("/home");
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
      setShowCallback(true);
    }
  };

  const handleCallBack = () => {
    setShowCallback(false);
  };

  const handleSubmitCallback = () => {
    console.log("clicked");
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(forms.map((form) => form.validateFields()));
      console.log("Success:", formData);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <CustomerDetailsForm
          form={form2}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Product Preferences",
      content: (
        <ProductParametersForm
          form={form3}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
  ];

  return (
    <div className="pt-5 pl-4">
      {showCallback ? (
        <>
          <div className="mb-4">
            <span>
              <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
                <LeftOutlined className="w-8 h-8" onClick={handleCallBack} />
              </button>
            </span>
            <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
              Request Callback
            </span>
          </div>
          <CallBackForm
            form={form1}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="steps-action">
            <Button
              type="primary"
              onClick={handleSubmitCallback}
              className="h-full px-4 py-2 shadow-none text-center mr-3"
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <span>
              <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
                <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
              </button>
            </span>
            <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
              Get Annuity Cover
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
                  Generate Quotation
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      <CallBackModal
        isModalOpen={isModalVisible}
        onClose={handleModalClose}
        onContinue={handleModalContinue}
      />
    </div>
  );
};

export default AnnuityPage;
