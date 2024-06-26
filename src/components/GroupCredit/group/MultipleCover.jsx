import React, { useState, useEffect } from "react";
import { Steps, Button, Form, Typography } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {
  updateUserDetails,
  generateQuotation,
} from "../../../store/redux/actions/groupCreditActions";
import ClientDetailsForm from "../forms/ClientDetailsForm";
import ProductDetailsForm from "../forms/group/ProductDetailsForm";
import ConfirmDetailsForm from "../forms/group/ConfirmDetailsForm";

const { Step } = Steps;
const { Title } = Typography;

const MultipleCover = ({ userDetails, quotationData, dispatch }) => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleFormChange = (key, value) => {
    dispatch(updateUserDetails(key, value));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleGenerateQuotation = () => {
    dispatch(generateQuotation(contextObject));
    setIsQuotationGenerated(true);
  };

  useEffect(() => {
    if (isQuotationGenerated && quotationData) {
      navigate("/home/group-credit/group/quotation");
    }
  }, [isQuotationGenerated, quotationData, navigate]);

  const contextObject = {
    userInfo: {
      memberName: `${userDetails.firstname} ${userDetails.lastname}`,
      sumAssured: userDetails.sumAssured,
      termsInMonths: userDetails.termsInMonths,
      individualRetrenchmentCover:
        userDetails.retrenchment === true ? "Yes" : "No",
      annuitantDoB: userDetails.dob,
      numberOfPartners: userDetails.numOfPartners,
      partnersDatesOfBirths: userDetails.partnerDates,
      coverType: "Multiple",
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
      message: <Title level={5}>Please enter your client details.</Title>,
      content: (
        <ClientDetailsForm
          formData={userDetails}
          handleFormChange={handleFormChange}
          form={form}
        />
      ),
    },
    {
      title: "Product Details",
      message: <Title level={5}>Please enter or select product details.</Title>,
      content: (
        <ProductDetailsForm
          formData={userDetails}
          handleFormChange={handleFormChange}
          form={form}
        />
      ),
    },
    {
      title: "Review",
      message: (
        <Title level={5}>
          To continue, please confirm your insurance purchase details.
        </Title>
      ),
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
          Get Credit Cover(Group)
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
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && userDetails.loading ? (
          <Button type='primary' loading iconPosition='end'>
            Loading
          </Button>
        ) : (
          currentStep === steps.length - 1 && (
            <Button
              className='h-full px-4 py-2 shadow-none text-center'
              type='primary'
              onClick={handleGenerateQuotation}
            >
              Generate Quotation
            </Button>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.groupCredit,
  quotationData: state.groupCredit.quotationData,
});

export default connect(mapStateToProps)(MultipleCover);
