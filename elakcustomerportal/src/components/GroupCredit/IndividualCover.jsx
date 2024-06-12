import React, { useState } from "react";
import { Steps, Button } from "antd";
import { connect } from "react-redux";
import { updateUserDetails } from "../../redux/actions/groupCreditActions";
import ClientDetailsForm from "./ClientDetailsForm";

const { Step } = Steps;

const IndividualCover = ({ userDetails, dispatch }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormChange = (field, value) => {
    dispatch(updateUserDetails(field, value));
  };

  const steps = [
    {
      title: "Client Details",
      message: "Please enter your client details.",
      content: (
        <ClientDetailsForm
          formData={userDetails}
          handleFormChange={handleFormChange}
        />
      ),
    },
    {
      title: "Step 2",
      message: "Please enter the details for step 2.",
      content: <div>Content for Step 2</div>,
    },
    {
      title: "Step 3",
      message: "Please enter the details for step 3.",
      content: <div>Content for Step 3</div>,
    },
  ];

  return (
    <div className='p-4'>
      <Steps current={currentStep} className='mb-8'>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className='mb-2'>{steps[currentStep].message}</div>
      <div className='steps-content mb-8'>{steps[currentStep].content}</div>
      <div className='steps-action flex justify-end'>
        {currentStep > 0 && (
          <Button className='mr-2' onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type='primary' onClick={next}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type='primary' onClick={() => alert("Done!")}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.groupCredit,
});

export default connect(mapStateToProps)(IndividualCover);
