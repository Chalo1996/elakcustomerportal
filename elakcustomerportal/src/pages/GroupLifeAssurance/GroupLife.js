import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Steps, Button, Typography, message, Form } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import ContactDetails from "../../components/Group Life/ContactDetails";
import CompanyDetails from '../../components/Group Life/CompanyDetails';
import PolicyCoverage from '../../components/Group Life/PolicyCoverage';
import ReviewAndConfirm from '../../components/Group Life/ReviewAndConfirm';
import ToDoModal from "../../components/Group Life/Modals/ToDoModal";
import CallBackForm from "../../components/Group Life/CallBackForm";
import { fetchData } from "../../store/redux/features/glaSlice";

const { Step } = Steps;
const { Title } = Typography;

const GroupLifeAssurance = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.groupLifeAssurance.isLoading);
  const data = useSelector((state) => state.groupLifeAssurance.glaData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneArea: "+254",
    currencySymbol: "KES",
    mobileNumber: "",
    dateOfBirth: null,
    selectedOption: "",
    nameOfClient: "",
    industry: "",
    intermediaryName: "",
    totalAnnualSalaries: "",
    totalNumberOfStaff: "",
    averageAge: "",
    policyStartDate: null,
    policyEndDate: null,
    glaAsMultipleofAnnualSalary: 4,
    criticalIllnessBenefitPercentage: 30,
    typeOfCriticalIllnessCover: "nil",
    mainMemberLastExpense: "",
    typeOfMainMemberLastExpense: "nil",
    spouseLastExpense: null,
    childLastExpense: null,
    parentsLastExpense: null,
    totalNumberOfSpouses: null,
    totalNumberOfChilidren: null,
    totalNumberOfParentsAndParentsInLaw: null,
    deathBenefitMultiplier: null,
    permananentTotalDisability: null,
    temporaryTotalDisability: 104,
    negotiatedFreeCoverLimit: null,
    negotiatedMaxCriticalIllnessCover: null,
    medicalReimbursment: 500000,
    lifeAssistantBenefit: 0,
    occupationalIllness: 0,
    accidentalOccupationalLastExpense: null,
    schemeLossRatio: 0,
    discountOnRate: 0,
  };

  const [formData, setFormData] = useState(() => ({
    ...initialData,
    dateOfBirth: initialData.dateOfBirth ? dayjs(initialData.dateOfBirth) : null,
    policyStartDate: initialData.policyStartDate ? dayjs(initialData.policyStartDate) : null,
    policyEndDate: initialData.policyEndDate ? dayjs(initialData.policyEndDate) : null,
  }));

  const dataToPost = {
    ContactDetails: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneArea: formData.phoneArea,
      mobileNumber: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      selectedOption: formData.selectedOption,
    },
    proposedClientDetails: {
      nameOfClient: formData.companyName,
      industry: formData.industry,
      intermediaryName: "Direct Customer",
      benefitType: "multipleOfSalary",
      totalAnnualSalaries: formData.annualSalaries,
      totalNumberOfStaff: formData.numberOfEmployees,
      averageAge: formData.averageAge,
      policyStartDate: formData.policyStartDate,
      policyEndDate: formData.policyEndDate,
    },
    illnessNaturalCausesAccidents: {
      glaAsMultipleofAnnualSalary: formData.multipleOfAnnualSalary,
      criticalIllnessBenefitPercentage: 30,
      typeOfCriticalIllnessCover: "nil",
      mainMemberLastExpense: formData.mainMemberLastExpense,
      typeOfMainMemberLastExpense: "nil",
      spouseLastExpense: formData.spouseLastExpense,
      childLastExpense: formData.childLastExpense,
      parentsLastExpense: formData.parentsLastExpense,
      totalNumberOfSpouses: formData.totalNumberOfSpouses,
      totalNumberOfChilidren: formData.totalNumberOfChilidren,
      totalNumberOfParentsAndParentsInLaw: formData.totalNumberOfParentsAndParentsInLaw,
    },
    accidentalOccupationalCausesOnly: {
      deathBenefitMultiplier: formData.multipleOfAnnualSalary,
      permananentTotalDisability: formData.multipleOfAnnualSalary,
      temporaryTotalDisability: 104,
      negotiatedFreeCoverLimit: null,
      negotiatedMaxCriticalIllnessCover: null,
      medicalReimbursment: 500000,
      lifeAssistantBenefit: 0,
      occupationalIllness: 0,
      accidentalOccupationalLastExpense: formData.mainMemberLastExpense,
      schemeLossRatio: 0,
      discountOnRate: 0,
    },
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const onNextStep = async () => {
    try {
      await form.validateFields();
      if (currentStep === 0) {
        setIsModalOpen(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      message.error("Please complete the form before proceeding.");
    }
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleModalContinue = (selectedOption) => {
    setAction(selectedOption);
    setIsModalOpen(false);
    if (selectedOption === 'generateQuote') {
      setCurrentStep(currentStep + 1);
    } else if (selectedOption === 'requestCallback') {
      setCurrentStep('callbackForm');
    }
  };

  const handleSubmitCallback = () => {
    console.log("clicked");
  };

  const handleSubmit = async () => {
    // ... your existing logic
    if (authStatus === "succeeded") {
      try {
        await dispatch(fetchData(dataToPost)).unwrap();
        message.success('Quote generated successfully!');
        setIsFormSubmitted(true);
      } catch (error) {
        message.error('Failed to submit form data.');
      }
    } else {
      message.error('Authentication failed.');
    }
  };

  useEffect(() => {
    if (isFormSubmitted && !isLoading) {
      navigate("quotation-details", {
        state: { formData, data },
      });
    }
  }, [isFormSubmitted, isLoading, navigate, formData, data]);

  const steps = [
    {
      title: "Contact Details",
      content: <ContactDetails form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Company Details",
      content: <CompanyDetails form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Coverage",
      content: <PolicyCoverage form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Review",
      content: <ReviewAndConfirm formDataToSubmit={formData} />,
    },
  ];

  return (
    <div>
      <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
        </button>
        <Title level={4} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Group Life Assurance Cover
        </Title>
      </div>
      <br />
      {currentStep !== 'callbackForm' ? (
        <>
          <Steps current={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[currentStep].content}</div>
          <div className="steps-action mt-8">
            {currentStep > 0 && (
              <Button className="mr-4" onClick={onPrevStep}>
                Go Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={onNextStep}>
                {action === 'callback' ? 'Submit' : 'Continue'}
              </Button>
            )}
            {currentStep > 2 && (
              <Button type="primary" onClick={handleSubmit}>
                Generate Quote
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <CallBackForm
            form={form}
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

      )}
      <ToDoModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleModalContinue}
      />
    </div>
  );
};

export default GroupLifeAssurance;
