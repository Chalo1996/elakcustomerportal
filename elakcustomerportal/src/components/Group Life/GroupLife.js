import React, { useState } from 'react';
import { Steps, Row, Form, Input, InputNumber, Button, message, Col, Checkbox, Modal, DatePicker, Select, Radio, Divider, Typography, Card } from 'antd';
import 'tailwindcss/tailwind.css';

import { preventNumericInput, preventTextInput, disabledDate, disabledTodayDate, PhoneAreas } from "./Utilities.js"
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};


const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;

const ContactDetails = ({ formData, setFormData }) => {
  const [phoneArea, setPhoneArea] = React.useState("+254");
  
  const handleInputChange = (value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const ChoosePhoneArea = ({ value, onChange }) => (
    <Select defaultValue={value} onChange={onChange} style={{ width: 100 }}>
      {PhoneAreas.map((area) => (
        <Option key={area.code} value={area.code}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{area.code}</span>
            <img src={area.flag} alt={area.country} style={{ width: '20px', marginLeft: '8px' }} />
          </div>
        </Option>
      ))}
    </Select>
  );

  return (
    <div
      layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4} style={{ marginBottom: '20px' }}>Please enter your details</Title>
          <p>Please enter your personal details to continue</p></Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input
              className="custom-input"
              value={formData.firstName}
              onChange={(e) => handleInputChange(e.target.value, 'firstName')}
              placeholder="Enter your first name"
              onKeyPress={preventNumericInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input
              className="custom-input"
              value={formData.lastName}
              onChange={(e) => handleInputChange(e.target.value, 'lastName')}
              placeholder="Enter your last name"
              onKeyPress={preventNumericInput}
            />
          </Form.Item>
        </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address!",
              },
            ]}
          >
            <Input
              className="custom-input"
              value={formData.email}
              placeholder="Enter your email address"
              onChange={(e) => handleInputChange(e.target.value, 'email')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { len: 9, message: "The input must have exactly 9 digits." },
              {
                required: true,
                message: "Please enter your mobile number!",
              },
            ]}
          >
            <Input
              maxLength={9}
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange(e.target.value, 'mobileNumber')}
              addonBefore={
                <ChoosePhoneArea
                  value={phoneArea}
                  onChange={setPhoneArea}
                />
              }
              placeholder="Enter your mobile number"
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Please enter your date of birth!",
              },
            ]}
          >
            <DatePicker
              value={formData.dateOfBirth}
              className="w-full custom-input"
              disabledDate={disabledDate}
              onChange={(value) => handleInputChange(value, 'dateOfBirth')}
            />
          </Form.Item>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    "Should accept terms and privacy policy"
                  ),
            },
          ]}
        >
          <Checkbox>
            I accept the{" "}
            <a href="./" style={{ color: "#A32A29" }}>
              terms
            </a>{" "}
            and{" "}
            <a href="./" style={{ color: "#A32A29" }}>
              privacy policy
            </a>
          </Checkbox>
        </Form.Item>
      </Row>
    </div>)
};

const CompanyDetails = ({ formData, setFormData }) => {
  const handleInputChange = (value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4} style={{ marginBottom: '20px' }}>Please enter company details</Title>
          <p>Please enter company details to continue</p>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="What is the name of your Company"
            name="companyName"
            rules={[{ required: true, message: "Please enter company name!" }]}
          >
            <Input
              className="custom-input"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange(e.target.value, 'companyName')}
              placeholder="Enter name of your company"
              onKeyPress={preventNumericInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="industry"
            label="How would you classify your company?"
            rules={[{ required: true, message: "Please select Industry!" }]}
          >
            <Select
              value={formData.industry}
              placeholder="Please select company classification"
              onChange={(value) => handleInputChange(value, 'industry')}
            >
              <Option value="administrative">Administrative</Option>
              <Option value="parastatalGovernment">Parastatal/Government</Option>
              <Option value="lightManufacturing">Light Manufacturing</Option>
              <Option value="heavyManufacturing">Heavy Manufacturing</Option>
              <Option value="professional">Professional</Option>
              <Option value="retailersAndWholesalers">Retailers & Wholesalers</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="How many employees are to be covered by this scheme?"
            name="numberOfEmployees"
            rules={[{ required: true, message: "Please enter number of employees!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={(value) => handleInputChange(value, 'numberOfEmployees')}
              placeholder="Enter total number of employees"
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="What is the total annual salary of your company?"
            name="annualSalaries"
            rules={[{ required: true, message: "Please enter annual turnover!" }]}
          >
            <InputNumber
              onKeyPress={preventTextInput}
              addonBefore={formData.currencySymbol}
              name="annualSalaries"
              value={formData.annualSalaries}
              onChange={(value) => handleInputChange(value, 'annualSalaries')}
              placeholder="Enter total annual salaries of all employees"
              className="w-full custom-input-number"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

const InsuredMembers = ({ formData, setFormData }) => {
  const handleInputChange = (value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4} style={{ marginBottom: '20px' }}>Please enter number of members to be covered</Title>
          <p>Please enter insured members details to continue</p></Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Number of Principal Members"
            name="principalMembers"
            rules={[
              {
                required: true,
                message: "Please enter number of principal members!",
              },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              value={formData.numberPrincipalMembers}
              onChange={(value) => handleInputChange(value, 'numberPrincipalMembers')}
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Number of Spouse"
            name="totalNumberOfSpouses"
            rules={[
              { required: true, message: "Please enter number of spouse!" },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              value={formData.totalNumberOfSpouses}
              onChange={(value) => handleInputChange(value, "totalNumberOfSpouses")}
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Number of Children"
            name="totalNumberOfChilidren"
            rules={[
              {
                required: true,
                message: "Please enter number of children!",
              },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              value={formData.totalNumberOfChilidren}
              onChange={(value) => handleInputChange(value, 'totalNumberOfChilidren')}
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Number of Parents"
            name="totalNumberOfParents"
            rules={[
              {
                required: true,
                message: "Please enter number of parents!",
              },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              value={formData.totalNumberOfParents}
              onKeyPress={preventTextInput}
              onChange={(value) => handleInputChange(value, 'totalNumberOfParents')}
            />
          </Form.Item>
        </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Number of Parents-in-law"
            name="totalNumberOfParentsInLaws"
            rules={[
              {
                required: true,
                message: "Please enter number of parents-in-law!",
              },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              value={formData.totalNumberOfParentsInLaws}
              onKeyPress={preventTextInput}
              onChange={(value) => handleInputChange(value, 'totalNumberOfParentsInLaws')}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
};

const PolicyDetails = ({ formData, setFormData }) => {
  const [currencySymbol,] = React.useState("KSh");
  
  const handleInputChange = (value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4} style={{ marginBottom: '20px' }}>Please enter policy details</Title>
          <p>Please enter policy details to continue</p></Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="When would you like the cover to start?" name="policyStartDate"
            rules={[{ required: true, message: 'Please Select a date' }]}
          >
            <DatePicker 
            style={{ width: "100%" }}
            value={formData.policyStartDate}
            disabledDate={disabledTodayDate}
            onChange={(value) => handleInputChange(value, 'policyStartDate')}
             />
          </Form.Item>
          <br></br>
          <Form.Item label="Your cover will automatically expire on;" name="coverEndDate"
            rules={[{ required: true, message: 'Please Select a date' }]}
          >
            <DatePicker 
            style={{ width: "100%" }}
            value={formData.policyEndDate}
            onChange={(value) => handleInputChange(value, 'policyEndDate')}
             />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="What Level of Cover Do you need?"
            name="benefitLevel"
            rules={[
              {
                required: true,
                message: "Please select a level of cover!",
              },
            ]}
          >
            <Select
              placeholder="Please select"
              onChange={(value) => handleInputChange(value, 'benefitLevel')}
            >
              <Option value="pleaseSelect">Please Select</Option>
              <Option value="1x">1x Salary</Option>
              <Option value="2x">2x Salary</Option>
              <Option value="3x">3x Salary</Option>
              <Option value="4x">4x Salary</Option>
              <Option value="5x">5x Salary</Option>
              <Option value="flatAmount">
                I will specify A flat amount
              </Option>
            </Select>
          </Form.Item>
          <br></br>
          {formData.flatAmount && (
            <Form.Item
              label="Specify Flat Amount"
              name="flatAmount"
              rules={[
                {
                  required: true,
                  message: "Please enter the flat amount!",
                },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Enter flat amount"
                min={0}
                addonBefore={currencySymbol}
                value={formData.flatAmount}
                onChange={(value) => handleInputChange(value, 'flatAmount')}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </div>
  )
};

const ReviewAndConfirm = ({ formDataToSubmit }) => {
  const [formatter] = React.useState(new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
}));
  return (
    <div layout='vertical'>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4} style={{ marginBottom: '20px' }}>Please confirm your details</Title>
          <p>To continue, please confirm your details</p></Col>
      </Row>
      <Card title="Contact Details" layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <h5><strong>First Name</strong></h5>
            {formDataToSubmit.firstName}
          </Col>
          <Col span={12}>
            <p><strong>Last Name</strong></p>
            {formDataToSubmit.lastName}
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={12}>
            <p>
            <strong>Email Address</strong>
            </p>
            
            {formDataToSubmit.email}
          </Col>
          <Col span={12}>
          <p>
          <strong>Mobile Number</strong>
          </p>
          +254 {formDataToSubmit.mobileNumber}
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
        <Col span={12}>
            <p><strong>Date of Birth</strong></p>
            {formatDate(formDataToSubmit.dateOfBirth)}
          </Col>
        </Row>
      </Card>
      <br></br>
      <Card title="Company Details" layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Industry Type</strong> </p>
            {formDataToSubmit.industry}
          </Col>
          <Col span={12}>
            <p><strong>Company Name</strong></p>
            {formDataToSubmit.companyName}
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Number of Employees</strong></p>
            {formDataToSubmit.numberOfEmployees}
          </Col>
          <Col span={12}>
            <p><strong>Total Annual Salaries</strong></p>
            {formatter.format(formDataToSubmit.annualSalaries)}
          </Col>
        </Row>

      </Card>
      <br></br>
      <Card title="Insured Members" layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Principal Members</strong> </p>
            {formDataToSubmit.numberPrincipalMembers}
          </Col>
          <Col span={12}>
            <p><strong>Spouse</strong> </p>
            {formDataToSubmit.totalNumberOfSpouses}
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Children</strong></p>
            {formDataToSubmit.totalNumberOfChilidren}
          </Col>
          <Col span={12}>
            <p><strong>Parents</strong> </p>
            {formDataToSubmit.totalNumberOfParents}
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Parents-in-Law</strong> </p>
            {formDataToSubmit.totalNumberOfParentsInLaws}
          </Col>
          <Col span={12}></Col>
        </Row>
      </Card>
      <br></br>
      <Card title="Policy Details" layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Policy Start Date</strong></p>
            {formatDate(formDataToSubmit.policyStartDate)}
          </Col>
          <Col span={12} tooltip="Multiple Of Annual Salary">
            <p><strong>Benefit Level</strong> </p>
            {formDataToSubmit.benefitLevel}
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={12}>
          <p><strong>Policy End Date</strong></p>
          {formatDate(formDataToSubmit.policyEndDate)}
          </Col>
        </Row>
      </Card>
    </div>)
};

const GroupLifeAssurance = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    phoneArea: "+254",
    dateOfBirth: "",
    currencySymbol: "KES",

    companyName: "",
    industry: "",
    numberOfEmployees: 0,
    annualSalaries: 0,

    numberPrincipalMembers: 0,
    totalNumberOfSpouses: "",
    totalNumberOfChilidren: "",
    totalNumberOfParents: "",
    totalNumberOfParentsInLaws: "",

    isFlatAmount: "",
    benefitLevel: "",
    flatAmount: "",
    policyStartDate: "",
    policyEndDate: "",
  });

  const onFormFinish = (values) => {
    let updatedFormData = { ...formData };

    if (currentStep === 0) {
      updatedFormData = values;
      if (action === 'callback') {
        setAction("Submit");
        return;
      }
    } else if (currentStep === 1) {
      updatedFormData = { ...updatedFormData, ...values };
    } else if (currentStep === 2) {
      updatedFormData = { ...updatedFormData, ...values };
    } else if (currentStep === 3) {
      updatedFormData = { ...updatedFormData, ...values };
    }

    const formDataToSubmit = {
      firstName: updatedFormData.firstName,
      lastName: updatedFormData.lastName,
      email: updatedFormData.email,
      mobileNumber: updatedFormData.mobileNumber,
      phoneArea: updatedFormData.phoneArea,
      dateOfBirth: updatedFormData.dateOfBirth,
      companyName: updatedFormData.companyName,
      industry: updatedFormData.industry,
      numberOfEmployees: updatedFormData.numberOfEmployees,
      annualSalaries: updatedFormData.annualSalaries,
      principalMembers: updatedFormData.principalMembers,
      totalNumberOfSpouses: updatedFormData.totalNumberOfSpouses,
      totalNumberOfChilidren: updatedFormData.totalNumberOfChilidren,
      totalNumberOfParents: updatedFormData.totalNumberOfParents,
      totalNumberOfParentsInLaws: updatedFormData.totalNumberOfParentsInLaws,
      levelOfCover: updatedFormData.benefitLevel,
      flatAmount: updatedFormData.flatAmount,
      policyStartDate: updatedFormData.policyStartDate,
      policyEndDate: updatedFormData.policyEndDate,
    };

    setFormData(updatedFormData);
    console.log('Form Data: ', formDataToSubmit);
    message.success('Form submitted successfully!');
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

  const handleRadioChange = (e) => {
    setFormData({ ...formData, selectedOption: e.target.value });
  };

  const handleModalOk = () => {
    const selectedOption = formData.selectedOption;
    if (selectedOption === 'quote') {
      setCurrentStep(currentStep + 1);
    } else if (selectedOption === 'callback') {
      setIsModalOpen(false);
    } else {
      console.error('No option selected!');
    }

    setIsModalOpen(false);
  };


  const navigate = useNavigate();

  const HandleQuoteButton = () => {
    navigate("group-life-quotation");
  };

  const steps = [
    {
      title: "Contact Details",
      content: (
        <ContactDetails formData={formData} setFormData={setFormData} />
      ),
    },

    {
      title: "Company Details",
      content: (
        <CompanyDetails formData={formData} setFormData={setFormData} />
      ),
    },
    {
      title: "Insured Members",
      content: (
        <InsuredMembers formData={formData} setFormData={setFormData} />
      ),
    },
    {
      title: "Policy Details",
      content: (
        <PolicyDetails formData={formData} setFormData={setFormData} />
      ),
    },
    {
      title: "Review",
      content: (
        <ReviewAndConfirm formDataToSubmit={formData} />
      ),
    }
  ];

  return (
    <div>
      <div>
        <Title level={4} style={{ marginBottom: '20px' }}>Group Life Assurance Cover</Title>
      </div>
      <br></br>
      <Steps current={currentStep} className="mb-8">
        {steps.map((step, index) => (
          <Step key={index} title={step.title} subTitle={step.subTitle} />
        ))}
      </Steps>
      <Form form={form} onFinish={onFormFinish} layout='vertical'>
        <div className="steps-content">{steps[currentStep].content}</div>
        <div className="steps-action mt-8">
          {currentStep > 0 && (
            <Button className="mr-4" onClick={() => onPrevStep()}>
              Go Back
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={() => onNextStep()}>
              {action === 'callback' ? 'Submit' : 'Continue'}
            </Button>
          )}
          {currentStep > 3 && (
            <Button className="mr-4" onClick={HandleQuoteButton}>
              Generate Quote
            </Button>
          )}
        </div>
      </Form>
      <Modal
        title="What would you like to do?"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Row justify="start" key="footer-row" className="mt-4">
            <Button
              key="submit"
              type="primary"
              onClick={handleModalOk}
              disabled={!formData.selectedOption}
              className="shadow-none"
            >
              Continue
            </Button>
          </Row>,
        ]}
      >
        <br></br>
        <Radio.Group onChange={handleRadioChange} value={formData.selectedOption} style={{ width: '100%' }}>
          <div className="w-full flex items-center justify-between">
            <Text>Generate Quote</Text>
            <Radio value="quote"></Radio>
          </div>

          <Divider />
          <div className="w-full flex items-center justify-between">
            <Text>Request a Call Back</Text>
            <Radio value="callback"></Radio>
          </div>
        </Radio.Group>
      </Modal>
    </div>
  );

};

export default GroupLifeAssurance;
