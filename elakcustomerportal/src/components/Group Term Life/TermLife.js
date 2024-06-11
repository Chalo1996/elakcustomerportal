import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, Select, Steps, Modal, Radio, Checkbox } from 'antd';
import Title from 'antd/es/skeleton/Title';

function TermLife() {
  const { Option } = Select;
  const { Step } = Steps;
  const [generateQuoteChecked, setGenerateQuoteChecked] = useState(false);
  const [requestCallbackChecked, setRequestCallbackChecked] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    country: '',
    phoneNumber: '',
    premiumType: '',
    selectedItems: [],
    loanType: '',
    singleOrJoint: '',
    termInYears: '',
    principal: '',
    installmentsPerAnnum: ''
  });
  
  const countryCodes = {
    Kenya: '+254',
    Uganda: '+256',
    Tanzania: '+255',
    Rwanda: '+250',
    'South Sudan': '+211',
    DRC: '+243'
  };

  const handleChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleNext = () => {
    if(currentStep === 0){
      setShowModal(true);
    }
    else{
      form.validateFields().then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((error) => {
        Modal.error({
          title: 'Form Incomplete',
          content: 'Please Ensure All Fields are Filled.',
        });
      });
    }  
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const termInYearsOptions = Array.from({ length: 50 }, (_, i) => i + 1);
  const installmentsPerAnnumOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const nonLoanTermInYearsOptions = Array.from({length:15}, (_, i) =>i +1);

  const handleGenerateQuote =() =>{
    setCurrentStep(currentStep + 1);
    setShowModal(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'generateQuote') {
      setGenerateQuoteChecked(checked);
      setRequestCallbackChecked(!checked);
    } else if (name === 'requestCallback') {
      setRequestCallbackChecked(checked);
      setGenerateQuoteChecked(!checked);
    }
  };
   
  
  return (
    <div>  
       <Modal
      title="What would you like to do?"
      visible={showModal}
      onCancel={() => setShowModal(false)}
      footer={[
      <Button
       key="continue" 
       type="primary" 
       disabled={!generateQuoteChecked && !requestCallbackChecked}
       onClick={handleGenerateQuote}>Continue
       </Button>
      ]}>
        <Row gutter={[16, 16]}>      
        <Checkbox name="generateQuote"
          onChange={handleCheckboxChange}
          style={{ fontSize: '18px' }}
          checked={generateQuoteChecked}> Generate Quote
        </Checkbox>
        </Row>
        <Row gutter={[16, 16]}>
        <Checkbox name="requestCallback"
          onChange={handleCheckboxChange}
          style={{ fontSize: '18px' }}
          checked={requestCallbackChecked}> Request a Callback
        </Checkbox>
        </Row>      
      </Modal>

     
    <Steps current={currentStep}>
        <Step title="Personal Details"/>
        <Step title="Cover Details"/>
        <Step title="Optional Details"/>
      </Steps>
       






















    </div>
  );
}
export default TermLife;
