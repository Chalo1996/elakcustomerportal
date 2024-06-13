import React, { useState } from 'react';
import { Steps, Row, Form, Input, InputNumber, Button, message, Col, Checkbox, Modal, DatePicker, Select, Radio, Divider, Typography, Card } from 'antd';
import 'tailwindcss/tailwind.css';

import { preventNumericInput, preventTextInput, disabledDate, disabledTodayDate, PhoneAreas } from "./Utilities.js"
import dayjs from 'dayjs';

const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const ContactDetails = ({ formData, setFormData }) => {
  
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
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter your details</Title>
          </Col>
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
                  value={formData.phoneArea}
                  onChange={(value) => handleInputChange(value, 'phoneArea')}
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
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter company details</Title>
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
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter number of members to be covered</Title>
          </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="How many principle members would you like to be covered?"
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
              placeholder='Enter number of principal members'
              value={formData.numberPrincipalMembers}
              onChange={(value) => handleInputChange(value, 'numberPrincipalMembers')}
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="How many spouses would you like to be covered?"
            name="totalNumberOfSpouses"
            rules={[
              { required: true, message: "Please enter number of spouses!" },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder='Enter number of spouses'
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
            label="How many children would you like to be covered?"
            name="totalNumberOfChildren"
            rules={[
              {
                required: true,
                message: "Please enter number of children!",
              },
            ]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder='Enter number of children'
              value={formData.totalNumberOfChildren}
              onChange={(value) => handleInputChange(value, 'totalNumberOfChildren')}
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="How many parents would you like to be covered?"
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
              placeholder='Enter number of parents'
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
            label="How many parents-in-law would you like to be covered?"
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
              placeholder='Enter number of parents-in-law'
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
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter policy details</Title>
          </Col>
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
          <Form.Item label="Your cover will automatically expire on:" name="coverEndDate"
            rules={[{ required: true, message: 'Please Select a date' }]}
          >
            <DatePicker 
            style={{ width: "100%" }}
            value={"2025-06-12"}
            onChange={(value) => handleInputChange(value, '2025-06-12')}
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
              <Option value="1">1x Salary</Option>
              <Option value="2">2x Salary</Option>
              <Option value="3">3x Salary</Option>
              <Option value="4">4x Salary</Option>
              <Option value="5">5x Salary</Option>
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
  const [formatter] = React.useState(
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    })
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="mb-10 mt-10">
      <p className="font-open-sans text-[15px] font-semibold text-left">
        To continue, please confirm your details
      </p>

      <Card title="Contact Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">First Name</p>
              <p>{formDataToSubmit.firstName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Email Address</p>
              <p>{formDataToSubmit.email}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Last Name</p>
              <p>{formDataToSubmit.lastName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Mobile Number</p>
              <p>{formDataToSubmit.phoneArea} {formDataToSubmit.mobileNumber}</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Date of Birth</p>
              <p>{formatDate(formDataToSubmit.dateOfBirth)}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Company Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Industry Type</p>
              <p>{formDataToSubmit.industry}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Employees</p>
              <p>{formDataToSubmit.numberOfEmployees} employees</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Company Name</p>
              <p>{formDataToSubmit.companyName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Total Annual Salaries</p>
              <p>{formatter.format(formDataToSubmit.annualSalaries)}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Insured Members" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Principal Members</p>
              <p>{formDataToSubmit.numberPrincipalMembers} members</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Children</p>
              <p>{formDataToSubmit.totalNumberOfChildren} children</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Spouse</p>
              <p>{formDataToSubmit.totalNumberOfSpouses} spouses</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Parents</p>
              <p>{formDataToSubmit.totalNumberOfParents} parents</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Parents-in-Law</p>
              <p>{formDataToSubmit.totalNumberOfParentsInLaws} parents-in-law</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Policy Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">The cover commences on:</p>
              <p>{formatDate(formDataToSubmit.policyStartDate)}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">The cover will expire on:</p>
              <p>{formatDate(formDataToSubmit.policyEndDate)}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">The assured sum will be:</p>
              <p>Annual Salary X {formDataToSubmit.benefitLevel}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  );
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
    totalNumberOfChildren: 0,
    totalNumberOfParents: "",
    totalNumberOfParentsInLaws: "",

    isFlatAmount: "",
    benefitLevel: "",
    flatAmount: "",
    policyStartDate: "",
    policyEndDate: "2024-06-12",
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
      dateOfBirth: formatDate(updatedFormData.dateOfBirth),
      companyName: updatedFormData.companyName,
      industry: updatedFormData.industry,
      numberOfEmployees: updatedFormData.numberOfEmployees,
      annualSalaries: updatedFormData.annualSalaries,
      principalMembers: updatedFormData.principalMembers,
      totalNumberOfSpouses: updatedFormData.totalNumberOfSpouses,
      totalNumberOfChildren: updatedFormData.totalNumberOfChildren,
      totalNumberOfParents: updatedFormData.totalNumberOfParents,
      totalNumberOfParentsInLaws: updatedFormData.totalNumberOfParentsInLaws,
      levelOfCover: updatedFormData.benefitLevel,
      flatAmount: updatedFormData.flatAmount,
      policyStartDate: formatDate(updatedFormData.policyStartDate),
      policyEndDate: formatDate(updatedFormData.policyEndDate),
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

  const handleSubmit = async () => {
    console.log('Form Data: ', formData);
    message.success('Form submitted successfully!');
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
        <Title level={5} style={{ marginBottom: '20px' }}>Group Life Assurance Cover</Title>
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
            <Button type="primary" onClick={handleSubmit} >
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
