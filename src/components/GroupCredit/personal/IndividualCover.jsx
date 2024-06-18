import React, { useState, useEffect } from "react";
import { Steps, Button, Form } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {
  updateUserDetails,
  generateQuotation,
} from "../../../store/redux/actions/groupCreditActions";
import ClientDetailsForm from "../forms/ClientDetailsForm";
import ProductDetailsForm from "../forms/ProductDetailsForm";
import ConfirmDetailsForm from "../forms/ConfirmDetailsForm";

const { Step } = Steps;

const IndividualCover = ({ userDetails, quotationData, dispatch }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isQuotationGenerated, setIsQuotationGenerated] = useState(false);

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.error("Failed:", errorInfo);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormChange = (field, value) => {
    setHasInteracted(true);
    dispatch(updateUserDetails(field, value));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleGenerateQuotation = () => {
    dispatch(generateQuotation(contextObject));
    setIsQuotationGenerated(true);
    isQuotationGenerated &&
      quotationData &&
      navigate("/home/group-credit/quotation");
  };

  useEffect(() => {
    const validateForm = async () => {
      if (!hasInteracted) return;
      try {
        await form.validateFields();
        setIsNextDisabled(false);
      } catch {
        setIsNextDisabled(true);
      }
    };
    validateForm();
  }, [form, userDetails, hasInteracted]);

  const contextObject = {
    userInfo: {
      memberName: `${userDetails.firstname}${userDetails.lastname}`,
      sumAssured: userDetails.sumAssured,
      termsInMonths: userDetails.termsInMonths,
      individualRetrenchmentCover:
        userDetails.retrenchment === true ? "Yes" : "No",
      annuitantDoB: userDetails.dob,
      numberOfPartners: 1,
      partnersDatesOfBirths: [],
      coverType: "Single",
      frequency: userDetails.frequency,
      retRate: userDetails.retRate,
      gcRate: userDetails.gcRate,
      discount: userDetails.discount,
      freeCoverLimit: userDetails.freeCoverLimit,
    },
    memberDetails: [],
  };

  const steps = [
    {
      title: "Client Details",
      message: "Please enter your client details.",
      content: (
        <ClientDetailsForm
          formData={userDetails}
          handleFormChange={handleFormChange}
          form={form}
          validateTrigger='onSubmit'
        />
      ),
    },
    {
      title: "Product Details",
      message: "Please enter or select product details.",
      content: (
        <ProductDetailsForm
          formData={userDetails}
          handleFormChange={handleFormChange}
          form={form}
          validateTrigger='onSubmit'
        />
      ),
    },
    {
      title: "Review",
      message: "To continue, please confirm your insurance purchase details.",
      content: <ConfirmDetailsForm formData={userDetails} form={form} />,
    },
  ];

  return (
    <div className='pt-5 pl-4'>
      <div className='mb-4'>
        <span>
          <button className='mb-2 focus:outline-none hover:text-[#A32A29]'>
            <LeftOutlined className='w-8 h-8' onClick={handleNavigate} />
          </button>
        </span>
        <span className='font-open-sans text-[16px] font-semibold leading-[24px] text-left'>
          Get Group Credit Cover
        </span>
      </div>

      <Steps current={currentStep} className='mb-8'>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className='mb-2'>{steps[currentStep].message}</div>
      <div className='steps-content mb-8'>{steps[currentStep].content}</div>
      <div className='steps-action flex'>
        {currentStep > 0 && (
          <Button
            className='h-full px-4 py-2 shadow-none text-center mr-2'
            onClick={prev}
          >
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button
            className='h-full px-4 py-2 shadow-none text-center'
            type='primary'
            onClick={next}
            disabled={isNextDisabled}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            className='h-full px-4 py-2 shadow-none text-center'
            type='primary'
            onClick={handleGenerateQuotation}
          >
            Generate Quotation
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.groupCredit,
  quotationData: state.groupCredit.quotationData,
});

export default connect(mapStateToProps)(IndividualCover);
