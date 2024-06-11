import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, Select, Steps, Modal, Radio, Checkbox } from 'antd';

const TermLifeQuote = () => {
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
    

    <div style={{ textAlign: 'left' }}>
      <h2 style={{ marginLeft: '0px', fontSize: '24px' }} level={3}>
      Please Enter Your  Details
    </h2>
    </div>
      <Steps current={currentStep}>
        <Step title="Personal Details"/>
        <Step title="Cover Details"/>
        <Step title="Optional Details"/>
      </Steps>

      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onValuesChange={handleChange}
        onFinish={handleNext}>

        {currentStep === 0 && (
        <div>    
        <Row gutter={16}>
        <Col span={12}>
          <Form.Item 
          name="name" 
          style={{ width: '100%'}}
          rules={[{ required: true, message: 'Enter First Name' }]}
          label="First Name">
          <Input/>
          </Form.Item>

          </Col>
          <Col span={12}>
          <Form.Item 
            name="secondname" 
            style={{ width: '100%' }}
            rules={[{ required: true, message: 'Enter Last Name' }]}
            label="Last Name">
            <Input />
          </Form.Item>
         </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
          <Form.Item name="dateOfBirth" label="Date of Birth">
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="2006-12-31"
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Date of Birth is Mandatory' }]}  
              disabledDate={(current) => {
              const minDate = new Date();
              minDate.setFullYear(minDate.getFullYear() - 18);
              return current && current > minDate;
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" 
           rules={[{ required: true, message: 'Please input your Email' }]}  
           label="Email">
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Select Country Code!' }]}>
            <Select placeholder="Kenya">
              {Object.keys(countryCodes).map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
          </Form.Item>

      <Form.Item
      style={{ marginTop: '60px', marginLeft: '0px' }}
      name="termsAndConditions"
      valuePropName="checked">
      <Checkbox style={{ color: '#8B4513', checkboxStyle: { color: '#8B4513' } }}>I accept the Terms and Conditions</Checkbox>
      </Form.Item>

       </Col>
        <Col span={12}>
          <Form.Item
            label="Phone No"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]} >
            <Input placeholder="712345678" />
          </Form.Item>
        </Col>
        </Row>
        </div>    
        )}

{currentStep === 1 && (
  <> 
  <Row gutter={16}>
  <Col span={12}>
  <Form.Item 
      label="What type of cover premium would you like?" 
      name="premiumType" 
      rules={[{ required: true, message: 'Please select a premium type!' }]}>
      <Select
      style={{ width: '100%', maxWidth: '100%' }}
      placeholder="Select premium type">
        <Select.Option value="loanPremium">
         Loan - Premium
        </Select.Option>
        <Select.Option value="nonLoanPremium">
          Non-Loan Premium
        </Select.Option>
      </Select>
    </Form.Item>
    </Col>

    <Col span={12}>
    <Form.Item 
      label="Do you want a cover for individual protection?" 
      name="coverType" 
      rules={[{ required: true, message: 'Please select a cover type!' }]}>
      <Select 
        style={{ width: '100%', maxWidth: '100%' }}
        placeholder="Select cover type">
        <Select.Option value="individual">
         Individual Cover
        </Select.Option>
        <Select.Option value="keyManRisk">
         Cover For another Key Person
        </Select.Option>
      </Select>
      </Form.Item>
    </Col>
    </Row>

    
 
    {formData.premiumType === 'loanPremium' && (
  <div>
     <Row gutter={16}>
     <Col span={12}>
    <Form.Item label="Principal Amount" name="principal" rules={[{ required: true, message: 'Please enter the principal amount!' }]}>
      <Input type="number" placeholder="Principal Amount" />
    </Form.Item>

    <Form.Item label="Years The Cover will take" name="termInYears" rules={[{ required: true, message: 'Please select a term in years!' }]}>
      <Select placeholder="Select Term">
        {termInYearsOptions.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
    </Form.Item>
    
    <Form.Item label="Installments per Annum" name="installmentsPerAnnum" rules={[{ required: true, message: 'Please select the number of installments per annum!' }]}>
      <Select placeholder="Select Installments">
        {installmentsPerAnnumOptions.map((installment) => (
          <Option key={installment} value={installment}>
            {installment}
          </Option>
        ))}
      </Select>
    </Form.Item>
    </Col>
   

      <Col span={12}>
      <Form.Item 
      label="Is the Cover for a Single person or a Joint" 
      name="singleOrJoint" 
      rules={[{ required: true, message: 'Please select single or joint cover!' }]}>
      <Select placeholder="Select single or joint cover">
      <Select.Option value="single">Single - Coverage for yourself only</Select.Option>
      <Select.Option value="joint">Joint - Coverage for yourself and another person (e.g., spouse)</Select.Option>
      </Select>
      </Form.Item>

      <Form.Item 
      label="Preferred Repayment Schedule" 
      name="loanType"  
      rules={[{ required: true, message: 'Please select a loan type!' }]}>
      <Select placeholder="Select loan type">
        <Select.Option value="bullet">Pay  Loan at Term End</Select.Option>
        <Select.Option value="amortization">Pay gradually over time</Select.Option>
      </Select>
    </Form.Item> 
    </Col>  
    </Row>         
 </div>
 )}
        
              {formData.premiumType === 'nonLoanPremium' && (
                <div>
                  <Row gutter={16}>
                  <Col span={12}>
                  <Form.Item label="Sum Assured" name="sumAssured" rules={[{ required: true, message: 'Please enter the sum assured!' }]}>
                    <Input type="number" placeholder="Sum Assured" />
                  </Form.Item>
        
                  <Form.Item label="Years Cover Will Take" name="nonLoanTermInYears" rules={[{ required: true, message: 'Please select a term in years!' }]}>
                    <Select placeholder="Select Term">
                      {nonLoanTermInYearsOptions.map((year) => (
                        <Option key={year} value={year}>
                          {year}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  </Col> 
        
                  <Col span={12}>
                  <Form.Item 
                  label="Choose how the benefits changes over time " 
                  name="benefitEscalation" 
                  rules={[{ required: true, message: 'Please select benefit escalation!' }]}>
                  <Select placeholder="Choose how the benefit changes">
                    <Select.Option value="level">Stay the same over time (Level)</Select.Option>
                    <Select.Option value="increasing">Get bigger over time (Increasing)</Select.Option>
                  </Select>
                </Form.Item>

                  </Col> 
                  </Row>  
                </div>
              )}
           
        </>  
        )}


        {currentStep === 2 && (
         <>
         <Row gutter={16}>
           <Col span={12}>
           <Form.Item
            label="Have you been diagnosed with any Critical illness?"
            name="acceleratedCriticalIllness"
            rules={[{ required: true, message: 'Please select whether you want Accelerated Critical Illness!' }]}>
            <Select placeholder="Select option">
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

       
             <Form.Item
               label="What Percentage would you like refunded if you don't need to use the insurance?"
               name="percentageOfPremium"
               rules={[{ required: true, message: 'Please select the percentage of premium to be returned!' }]}>
               <Select placeholder="Select Percentage">
                 <Option value="20">20%</Option>
                 <Option value="50">50%</Option>
                 <Option value="80">80%</Option>
                 <Option value="100">100%</Option>
               </Select>
             </Form.Item>
           </Col>
       
           <Col span={12}>
           <Form.Item
            label="Would you like your insurance premiums back if you survive till end of term"
            name="returnOfPremiumOnSurvival"
            rules={[{ required: true, message: 'Please select whether you want Return of Premium on Survival!' }]}>
            <Select placeholder="Select option">
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

       
             <Form.Item
               label="Payment Frequency"
               name="paymentFrequency"
               rules={[{ required: true, message: 'Please select the payment frequency!' }]}>
               <Select placeholder="Select Frequency">
                 <Option value="annual">Annual</Option>
                 <Option value="oneoff">One-off</Option>
               </Select>
             </Form.Item>
           </Col>
         </Row>
       </>
       
        )}

        <Form.Item>
          {currentStep > 0 && (
            <Button 
            style={{ marginRight: 8 }} 
            onClick={handlePrev}>
              Go Back
            </Button>
          )}
          {currentStep < 2 && (
            <Button 
            type="primary" 
            style={{ marginRight: 8 }} onClick={handleNext}>
              Next
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>  
  );
};
export default TermLifeQuote;
