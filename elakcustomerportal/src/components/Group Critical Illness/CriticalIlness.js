import React from "react";
import { Steps } from "antd";

const { Step } = Steps;



const GroupCriticalIllness = () => {

  return (
    <>
      <Steps >
        <Step title="1" description="Select." />
        <Step title="2" description="Enter your details." />
        <Step title="3" description="Insurance Details" />
        <Step title="4" description="Get Quotation." />
      </Steps>
    </>
  );
}

export default GroupCriticalIllness;
