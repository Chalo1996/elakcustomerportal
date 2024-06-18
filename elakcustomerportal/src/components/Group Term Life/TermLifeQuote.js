import React, { useState } from 'react';
import { Row, Col, Space,Form, Input,Divider, Button, DatePicker, Select, Steps, Modal, Radio, Checkbox,Typography } from 'antd';
import Title from 'antd/es/skeleton/Title';
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Item } = Form;

const TermLifeQuote = () => {
  const { Option } = Select;
  const { Step } = Steps;
  const { Title, Text } = Typography;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({});
  const [generateQuoteChecked, setGenerateQuoteChecked] = useState(false);
  const [requestCallbackChecked, setRequestCallbackChecked] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    secondname: '',
    dateOfBirth: '',
    email: '',
    country:'',
    countryCode: '+254',
    phoneNumber: '',
    premiumType: '',
    isCoverLoan:'',
    coverType: '',
    principalAmount: '',
    termInYears: '',
    installmentsPerAnnum: '',
    singleJoint: '',
    loanType: '',
    sumAssured: '',
    termInYearsCover: '',
    benefitEscalationCover: '',
    acceleratedCritalIllness: '',
    percentageOfPremToBReturned: '',
    returnOfPremiumOnSurvival: '',
    paymentFrequency: ''
  });

  const retOfPremSurvival = {
    YES: 'YES',
    NO: 'NO',
    };
    const premiumFrequency = {
      ANNUAL: 'ANNUAL',
      ONEOFF: 'ONEOFF',
      };
  const percentPremRet = {
    '20': '20%',
    '50': '50%',
    '80': '80%',
    '100': '100%',
    };
  const acceleratedCI = {
    YES: 'YES',
    NO: 'NO',
    };
  const benefitEscalation = {
    LEVEL: 'STAY THE SAME OVER TIME (LEVEL)',
    INCREASING: 'GET BIGGER OVER TIME(INCREASING)',
    };
  const loanTyp = {
    BULLLET: 'PAYMENT AT TERM END',
    AMORTIZATION: 'GRADUAL PAYMENT',
    };
    const singleJoint = {
    SINGLE: 'SINGLE',
    JOINT: 'JOINT',
    };
  const isCoverForloan = {
    YES: 'LOAN-PREMIUM',
    NO: 'NON-LOAN PREMIUM',
    };
  const coverTypes = {
    INDIVIDUAL: 'INDIVIDUAL',
    KEYMANRISK: 'ANOTHER KEY PERSON',
    };
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
    setReviewData(allValues);
  };
  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevFormData) =>
    ({ ...prevFormData, [name]: value }));
    };

  const handleSelectChange = (value, name) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
          title:   'Form Incomplete',
          content: 'Please Ensure All Fields are Filled.',
        });
      });
    }  
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);};
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
      setGenerateQuoteChecked(!checked);}};
  const addCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const validatePhone = (_, value) => {
    const cleanedPhoneNumber = value.replace(/[ -()]/g, '');
    const phoneRegex = /^\d{9}$/;
    if (value && !phoneRegex.test(cleanedPhoneNumber)) {
    return Promise.reject('Please enter a valid phone number');}
    return Promise.resolve();
    };

  const getRequiredRule = () => [{required: true, message: 'This Field is Mandatory!'}] 

  const contextObject = {
    name: formData.name,
    secondname: formData.secondname,
    principalAmount: formData.principalAmount,     //.replace(/,/g, ''),
    termInYears: formData.termInYears,
    annualInterestRate: formData.annualInterestRate,
    installmentsPA: formData.installmentsPerAnnum,
    sumAssuredCover: formData.sumAssured,
    termYearsCover: formData.termInYearsCover,
    loanType: formData.loanType,
    coverType: formData.coverType,
    isCoverLoan: formData.isCoverLoan,
    singleJoint: formData.singleJoint,
    benefitEscalationCover: formData.benefitEscalationCover,
    annualEscalationRate: formData.annualEscalationRate,
    acceleratedCritalIllness: formData.acceleratedCritalIllness,
    returnOfPremiumOnSurvival: formData.returnOfPremiumOnSurvival,
    percentageOfPremToBReturned: formData.percentageOfPremToBReturned,
    premiumFrequency: formData.premiumFrequency
    };
    
    const handlePrincipalChange = (e) => {
      let { value } = e.target; 
      value = value.replace(/[^\d,]/g, ''); 
      const numericValue = value.replace(/,/g, '');
      const parsedValue = parseFloat(numericValue);  
      if (!isNaN(parsedValue)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          principalAmount: parsedValue,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          principalAmount: '',
        }));
      }
    };

    const handleSumAssuredChange = (e) => {
      let { value } = e.target; 
      value = value.replace(/[^\d,]/g, ''); 
      const numericValue = value.replace(/,/g, '');
      const parsedValue = parseFloat(numericValue);  
      if (!isNaN(parsedValue)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          sumAssured: parsedValue,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          sumAssured: '',
        }));
      }
    };

    const handleReturnOfPremiumChange = (value) => {
      if (value === 'NO') {
        setFormData(prevFormData => ({
          ...prevFormData,
          returnOfPremiumOnSurvival: value,
          percentageOfPremToBReturned: 0,  
        }));
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          returnOfPremiumOnSurvival: value,
        }));
      }
      };
    const formatNumberWithCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const yrsDrpDwnLoan = {};
    for (let i = 1; i <= 50; i++) {
    yrsDrpDwnLoan[i.toString()] = i.toString();
    }
    const yrsDrpDwnCover = {};
    for (let i = 1; i <= 15; i++) {
    yrsDrpDwnCover[i.toString()] = i.toString();
    }
    const instPerAnnDropDown = {};
    for (let i = 1; i <= 12; i++) {
    instPerAnnDropDown[i.toString()] = i.toString();
    }

    const handleReview = () => {
      setShowReviewModal(true);
    };

    const handlePolicyCheckboxChange = (e) => {
      setIsModalVisible(e.target.checked);
    };
    const handleOk = () => {
      setIsModalVisible(false);
    };

    const navigate = useNavigate();
    const handleBackClick = () =>{
      navigate('/home/welcome'); 
    };

    return (
    <div>  
      <Space 
        style={{ 
        fontSize: '22px',  
        marginTop: '30px',
        fontWeight: '600', 
        alignItems: 'center', 
        cursor: 'pointer'  
      }}  
      onClick={handleBackClick}>
      <ArrowLeftOutlined style={{ color: 'black' }}/>
       Term Life Cover  
      </Space>

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

      <Steps current={currentStep} style={{ marginTop: '50px' }}>
        <Step title="Personal Details"/>
        <Step title="Cover Details"/>
        <Step title="Additional Options"/>
        <Step title="Review"/>
      </Steps>

      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: '40px'}}
        onFinish={handleNext}>
        {currentStep === 0 && (
        <div> 
           <h1 
            style={{ textAlign: 'left',  fontSize: '24px', marginBottom: '20px',marginTop: '40px' }}>
            Please enter your details
            </h1>
           <h1 
          style={{ textAlign: 'left', fontSize: '17px', marginBottom: '20px',marginTop: '0px',color: 'grey' }}>
            Please enter your personal details to continue
      </h1>   
        <Row gutter={16}>
        <Col span={12}>
        
        <Form.Item
          label="FIRST NAME"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}/>
        </Form.Item>

        </Col>
        <Col span={12}>
        <Form.Item 
          label="LAST NAME"
          name="secondname" 
          style={{ width: '100%' }}
          rules={[{ required: true, message: 'Enter Last Name' }]}>
          <Input 
            name="secondname" 
            value={formData.secondname}
            onChange={handleInputChange}/>
        </Form.Item>
        </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>

          <Form.Item
            label="DATE OF BIRTH"
            name="dob"
            value={formData.dateOfBirth}
            rules={[{ required: true, message: 'Please input your date of birth!' },]}>
            <DatePicker
            format="YYYY-MM-DD"
            placeholder="2006-12-31"
            style={{ width: '100%' }}
            onChange={(date, dateString) => handleSelectChange(dateString, 'dateOfBirth')}
            disabledDate={(current) => {
            const today = new Date();
            const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return current && (current > today || current > eighteenYearsAgo);
            }}/>
          </Form.Item>

          <Form.Item
          label="COUNTRY"
          name="country"
          rules={[{ required: true, message: 'Select Country Code!'},]}>
          <Select
          value={formData.country}
          placeholder="KENYA"
          onChange={(value) => handleSelectChange(value, 'country')}>
          {Object.keys(countryCodes).map((country) => (
          <Select.Option key={country} value={country}>{country}</Select.Option>
          ))}
          </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
          label="EMAIL"
          name= "email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!'}]}>
          <Input
          name= "email"
          placeholder="johndoe@gmail.com"
          value={formData.email}
          onChange={handleInputChange}/>
          </Form.Item>

          <Form.Item
          label="MOBILE NUMBER"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone number!'}]}>
          <Input
          name="phoneNumber"
          placeholder="712345678"
          addonBefore={countryCodes[formData.country]}
          value={formData.phoneNumber}
          onChange={handleInputChange}/>
          </Form.Item>
          </Col>
          </Row>

          <Row gutter={16}>
          <Col span={12}>
          <Form.Item
          style={{ marginTop: '60px', marginLeft: '0px' }}
          
        
          valuePropName="checked">
          <Checkbox style={{ color: '#8B4513', checkboxStyle: { color: '#8B4513' } }}>I accept the Terms and Conditions</Checkbox>
          </Form.Item>
          </Col>
          </Row>
        </div>    
        )}

  {currentStep === 1 && (
  <> 
  <h1 
  style={{ textAlign: 'left', fontSize: '17px', marginBottom: '20px',marginTop: '0px',color: 'grey' }}>
      Please enter your cover details.
  </h1>
  <Row gutter={16}>
  <Col span={12}>
   <Item
    label="WHAT TYPE OF COVER PREMIUM WOULD YOU LIKE?">
    <Select
    placeholder="LOAN-PREMIUM"
    value={formData.isCoverLoan}
    onChange={(value) => handleSelectChange(value, 'isCoverLoan')}
    style={{ width: '100%' }}>
    {Object.keys(isCoverForloan).map((option) => (
    <Option key={option} value={option}>
    {isCoverForloan[option]}
    </Option>
    ))}
    </Select>
    </Item>
    </Col>

    <Col span={12}>
    <Item
    label="DO YOU WANT A COVER FOR INDIVIDUAL PROTECTION?">
    <Select
    placeholder="INDIVIDUAL"
    value={formData.coverType}
    onChange={(value) => handleSelectChange(value, 'coverType')}>
    {Object.keys(coverTypes).map((type) => (
    <Option key={type} value={type}>
    {coverTypes[type]}
    </Option>
    ))}
    </Select>
    </Item>
    </Col>
    </Row>


    {formData.isCoverLoan === 'YES' && (
    <div>
     <Row gutter={16}>
     <Col span={12}>
     <Item
      label="INSURED AMOUNT">
      <Input
        name="principalAmount"
        rules={[{ required: true, message: 'Please Enter Principal Amount' }]}
        placeholder="Principal Amount"
        type="text"
        value={formatNumberWithCommas(formData.principalAmount)}  
        onChange={handlePrincipalChange}/>
      </Item>

      <Item
          label="HOW MANY YEARS WILL THE COVER TAKE?">
          <Select   
            name="termInYears"     
            placeholder="7"
            value={formData.termInYears}
            onChange={(value) => handleSelectChange(value, 'termInYears')}
            style={{ width: '100%' }}>
            {Object.keys(yrsDrpDwnLoan).map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Item>
    
        <Item
          label="NUMBER OF INSTALLMENTS PER ANNUM">
          <Select
            name="installmentsPerAnnum"   
            placeholder="12"
            value={formData.installmentsPerAnnum}
            onChange={(value) => handleSelectChange(value, 'installmentsPerAnnum')}
            style={{ width: '100%' }}>
            {Object.keys(instPerAnnDropDown).map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Item>
    </Col>
   
      <Col span={12}>
      <Item
          label="IS THE COVER FOR A SINGLE PERSON OR JOINT ENTITY?"
          rules={getRequiredRule()}>
          <Select
           name="singleJoint"  
            placeholder="SINGLE"
            value={formData.singleJoint}
            onChange={(value) => handleSelectChange(value, 'singleJoint')}>
            {Object.keys(singleJoint).map((type) => (
              <Option key={type} value={type}>
                {singleJoint[type]}
              </Option>
            ))}
          </Select>
        </Item>

        <Item
          label="PREFERRED REPAYMENT SCHEDULE">
          <Select
           name="loanType"  
            placeholder="BULLET"
            value={formData.loanType}
            onChange={(value) => handleSelectChange(value, 'loanType')}>
            {Object.keys(loanTyp).map((type) => (
              <Option key={type} value={type}>
                {loanTyp[type]}
              </Option>
            ))}
          </Select>
        </Item>
    </Col>  
    </Row>         
 </div>
 )}
        
              {formData.isCoverLoan === 'NO' && (
                <div>
                  <Row gutter={16}>
                  <Col span={12}>
                  <Item
                  label="How  much would  you like to pay for the cover?"
                  rules={[{ required: true, message: 'Please Enter Sum Assured' }]}>
                  <Input
                    name="sumAssured"
                    placeholder="1000,000"
                    type="text"  
                    value={formatNumberWithCommas(formData.sumAssured)}  
                    onChange={handleSumAssuredChange}
                  />
                </Item>
                <Item
                  label="HOW MANY YEARS WILL THE COVER TAKE?"
                  rules={getRequiredRule()}>
                  <Select
                   name="termInYearsCover"
                    placeholder="15"
                    value={formData.termInYearsCover}
                    onChange={(value) => handleSelectChange(value, 'termInYearsCover')}
                    style={{ width: '100%' }}>
                    {Object.keys(yrsDrpDwnCover).map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </Item>
                  </Col> 
        
                  <Col span={12}>
                  <Item
                  label="HOW WOULD YOU LIKE BENEFITS TO CHANGE OVER TIME?"
                  rules={getRequiredRule()}>
                  <Select
                    name="benefitEscalationCover"
                    placeholder="LEVEL"
                    value={formData.benefitEscalationCover}
                    onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, benefitEscalationCover: value }))}
                    style={{ width: '100%' }}>
                    {Object.keys(benefitEscalation).map((option) => (
                      <Option key={option} value={option}>
                        {benefitEscalation[option]}
                      </Option>
                    ))}
                  </Select>
                </Item>
                  </Col> 
                  </Row>  
                </div>
              )} 
        </>  
        )}


        {currentStep === 2 && (
        <>
          <h1 
          style={{ textAlign: 'left', fontSize: '17px', marginBottom: '20px',marginTop: '0px',color: 'grey' }}>
          Please Enter Additional 
         </h1>
         <Row gutter={16}>
           <Col span={12}>
           <Item
            label="HAVE YOU BEEN DIAGNOSED WITH ANY CRITICAL ILLNESS?"
            rules={getRequiredRule()}>
            <Select
             name="acceleratedCritalIllness"
            placeholder="YES"
            value={formData.acceleratedCritalIllness}
            onChange={(value) => handleSelectChange(value, 'acceleratedCritalIllness')}
            style={{ width: '100%' }}>
            {Object.keys(acceleratedCI).map((option) => (
            <Option key={option} value={option}>
            {acceleratedCI[option]}
            </Option>
            ))}
            </Select>
            </Item>

            <Item
            label="HOW MUCH REFUND WOULD YOU LIKE IF INSURANCE GOES UNUSED?">
            <Select
              name="percentageOfPremToBReturned"
              placeholder="50%"
              value={formData.returnOfPremiumOnSurvival === 'NO' ? 0 : formData.percentageOfPremToBReturned}
              onChange={(value) => handleSelectChange(value, 'percentageOfPremToBReturned')}
              style={{ width: '100%' }}
              disabled={formData.returnOfPremiumOnSurvival === 'NO'}>
              {Object.keys(percentPremRet).map((option) => (
                <Option key={option} value={parseInt(option)}>
                  {percentPremRet[option]}
                </Option>
              ))}
            </Select>
          </Item>
             
           </Col>
       
           <Col span={12}>
           <Item
            label="WOULD YOU LIKE A REFUND OF INSURANCE IF YOU OUTLIVE THE POLICY TERM"
            rules={getRequiredRule()}>
            <Select
             name="returnOfPremiumOnSurvival"
            placeholder="YES"
            value={formData.returnOfPremiumOnSurvival}
            onChange={handleReturnOfPremiumChange} 
            style={{ width: '100%' }}>
            {Object.keys(retOfPremSurvival).map((option) => (
            <Option key={option} value={option}>
            {retOfPremSurvival[option]}
            </Option>
            ))}
            </Select>
            </Item>
       
            <Item
            label="PAYMENT FREQUENCY"
            rules={getRequiredRule()}>
            <Select
            name="premiumFrequency"
            placeholder="ANNUAL"
            value={formData.premiumFrequency}
            onChange={(value) => handleSelectChange(value, 'premiumFrequency')}
            style={{ width: '100%' }}>
            {Object.keys(premiumFrequency).map((option) => (
            <Option key={option} value={option}>
            {premiumFrequency[option]}
            </Option>
            ))}
            </Select>
            </Item>
           </Col>
         </Row>
       </> 
        )}

        {currentStep === 3 &&(
        <>
         <Row gutter={16}>
         <Col span={12}>
          <Form.Item
          label="ENTER YOUR PREFERRED COVER START DATE"
          name="coverStartDate"
          rules={[
          { required: true, message: 'Please select the cover start date!' }
          ]}>
          <DatePicker
          format="YYYY-MM-DD"
          placeholder="Select Cover Start Date"
          style={{ width: '100%' }}
          disabledDate={(current) => current && current < moment().startOf('day')}/>
          </Form.Item> 
          </Col>
          </Row>

        <Modal
        visible={showReviewModal}
        onCancel={() => setShowReviewModal(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setShowReviewModal(false)}>
            Close
          </Button>,
          <Button key="submit" type="primary">
            Submit
          </Button>
        ]}>

<div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h4 style={{ marginBottom: '20px' }}>Please, Review and confirm Your Information details to continue</h4>
              <div>
                <br />
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h5 style={{ color: '#888', marginBottom: '5px' }}>Product</h5>
                      <span>Term Life Cover</span>
                    </Col>
                  </Row>
                </div>
                <Divider />
                <br />

                <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Personal Information</h4>
                <br />

                {/*----------------------------------PERSONAL DETAILS-----------------------------------------*/}
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>First Name</h4>
                      <span>{formData.name}</span>
                    </Col>
                    <br />
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Last Name</h4>
                      <span>{formData.secondname}</span>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Telephone No</h4>
                      <span>{formData.phoneNumber}</span>
                    </Col>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Email</h4>
                      <span>{formData.email}</span>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Date of Birth</h4>
                      <span>{formData.dateOfBirth}</span>
                    </Col>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Country</h4>
                      <span>{formData.country}</span>
                    </Col>
                  </Row>
                  <br />
                </div>
                <Divider />

                {/*----------------------------------COVER DETAILS-----------------------------------------*/}
                <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Cover Details</h4>  
                <br/>
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Premium Type</h4>
                      <span>{formData.isCoverLoan}</span>
                    </Col>
                    <br />
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Cover Type</h4>
                      <span>{formData.coverType}</span>
                    </Col>
                  </Row>
                  <br />

                  {formData.isCoverLoan === 'YES' &&(
                  <>
                  <Row gutter={16}>
                  <Col span={12}>
                  <h4 style={{ color: '#888', marginBottom: '5px' }}>Principal</h4>
                  <span>{formData.principalAmount}</span>
                  </Col>
                  <Col span={12}>
                  <h4 style={{ color: '#888', marginBottom: '5px' }}>Term In Years</h4>
                  <span>{formData.termInYears}</span>
                  </Col>
                  </Row>
                  <br/>

                  <Row gutter={16}>
                  <Col span={12}>
                  <h4 style={{ color: '#888', marginBottom: '5px' }}>Installments Per Annum</h4>
                  <span>{formData.installmentsPerAnnum}</span>
                  </Col>
                  <Col span={12}>
                  <h4 style={{ color: '#888', marginBottom: '5px' }}>Single or Joint</h4>
                  <span>{formData.singleJoint}</span>
                  </Col>
                  </Row>
                  <br/>

                  <Row gutter={16}>
                  <Col span={12}>
                  <h4 style={{ color: '#888', marginBottom: '5px' }}>Loan Type</h4>
                  <span>{formData.loanType}</span>
                  </Col>
                  </Row>
                  <br/>
                  </>
                  )}

                  {formData.isCoverLoan === 'NO' &&(
                  <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Sum Assured </h4>
                      <span>{formData.sumAssured}</span>

                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Term In Years</h4>
                      <span>{formData.termInYearsCover}</span>               
                    </Col>
                    <Col span={12}>
                    <h4 style={{ color: '#888', marginBottom: '5px' }}>Benefit Escalation</h4>
                    <span>{formData.benefitEscalationCover}</span>
                    </Col>
                  </Row>
                  <br/>
                  </>
                  )}

       
                </div>
                <Divider/> 

                   {/*----------------------------------Additional Options-----------------------------------------*/}
                <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}> Additional Options</h4>
                <br/>
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Accelerated Critical Illness</h4>
                      <span>{formData.acceleratedCritalIllness}</span>
                    </Col>
                    <br />
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Percentage of Premium to be Returned</h4>
                      <span>{formData.percentageOfPremToBReturned}</span>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={16}>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Return of Premium on Survival</h4>
                      <span>{formData.returnOfPremiumOnSurvival}</span>
                    </Col>
                    <Col span={12}>
                      <h4 style={{ color: '#888', marginBottom: '5px' }}>Payment Frequency</h4>
                      <span>{formData.premiumFrequency}</span>
                    </Col>
                  </Row>
                  <br />
                  
                </div>
                <Divider />

              </div>
            </div>






      <div>
    <Checkbox 
    onChange={handlePolicyCheckboxChange}>Policy Exclusions</Checkbox>
    {isModalVisible && (
     
     <div style={{ width: '100%', height: '50%', overflowY: 'auto', position: 'relative', border: '1px solid #ccc', padding: '16px', boxSizing: 'border-box' }}>

        <h3>Policy Exclusions</h3>
        <p>
          When considering term life insurance, it's important to be aware of 
          potential policy exclusions that may affect coverage. Common exclusions 
          often include pre-existing conditions, where deaths resulting from undisclosed
          medical conditions are not covered. Many policies have a suicide exclusion clause,
          typically within the first two years of the policy, meaning if the policyholder 
          commits suicide during this period, the insurer may not pay out the death benefit.

          Engaging in hazardous activities, such as extreme sports like skydiving or scuba diving, 
          may also lead to exclusions. Deaths resulting from these activities might not be covered
          if they were not disclosed during the application process. Similarly, deaths occurring 
          during illegal activities, including drug use or committing a crime, are often excluded from coverage.

          Acts of war and terrorism can also be excluded from term life insurance policies. 
          This means that if the policyholder dies due to war or terrorism, the insurance company may not pay
          out the benefit. Additionally, deaths resulting from alcohol or drug abuse are commonly excluded, 

          and insurers may deny claims if the death is directly linked to substance misuse.
          Understanding these exclusions helps policyholders ensure they are adequately covered a
          nd avoid situations that might invalidate their policy.
        </p>
        <Button key="agree" type="primary" onClick={handleOk}>
          Agree
        </Button>
      </div>
    )}
  </div>


    </Modal>

          <div>             
            <Row gutter={16}>
              {Object.entries(reviewData).map(([key, value]) => (
                <Col span={12} key={key}>
                  <p>
                    <strong>{key.toUpperCase()}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </p>
                </Col>
              ))}
            </Row>
          </div>
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
          {currentStep < 3 && (
            <Button 
            type="primary" 
            style={{ marginRight: 8 }} onClick={handleNext}>
              Next
            </Button>
          )}

          {currentStep === 3 && (
          <Button 
          type="primary" 
          onClick={handleReview}
          style={{ marginRight: 8 }}>
          Review
          </Button>
          )}
        </Form.Item>
      </Form>
    </div>  
  );
};
export default TermLifeQuote;
