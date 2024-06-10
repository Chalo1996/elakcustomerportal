import React, { useState } from 'react';
import { Steps, Form, Row, Input, InputNumber, Button, message, Col, Checkbox, Modal, DatePicker, Select, Space, Radio, Divider, Typography } from 'antd';
import 'tailwindcss/tailwind.css';
import sspFlag from '../../assets/flags/ssp.png';
import cdfFlag from '../../assets/flags/cdf.png';
import rwfFlag from '../../assets/flags/rwf.png';
import kesFlag from '../../assets/flags/kes.png';
import tzsFlag from '../../assets/flags/tzs.png';
import ugxFlag from '../../assets/flags/ugx.png';

const { Step } = Steps;
const { Option } = Select;
const { Title } = Typography;

const preventNumericInput = (event) => {
  if (/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

const preventTextInput = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

const disabledDate = (current) => {
  if (!current) return false;
  const selectedDate = new Date(current);
  const today = new Date();
  let age = today.getFullYear() - selectedDate.getFullYear();
  const hasBirthdayOccurred =
    today.getMonth() > selectedDate.getMonth() ||
    (today.getMonth() === selectedDate.getMonth() &&
      today.getDate() >= selectedDate.getDate());
  if (!hasBirthdayOccurred) {
    age--;
  }
  return age < 18 || age > 75;
};

const disabledTodayDate = (current) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return current && current.toDate() < today;
};

const PhoneAreas = [
  { code: "+211", flag: sspFlag, country: "South Sudan" },
  { code: "+243", flag: cdfFlag, country: "DRC" },
  { code: "+250", flag: rwfFlag, country: "Rwanda" },
  { code: "+254", flag: kesFlag, country: "Kenya" },
  { code: "+255", flag: tzsFlag, country: "Tanzania" },
  { code: "+256", flag: ugxFlag, country: "Uganda" },
];



const GroupLifeAssurance = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState();
  const [formData, setFormData] = useState({
    contactDetails: {},
    companyDetails: {},
    insuredMembers: {},
    policyDetails: {}
  });

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();

  const [currencySymbol,] = React.useState("KSh");
  const [phoneArea, setPhoneArea] = React.useState("+254");
  const [setCountry] = React.useState("Kenya");
  const [industry, setIndustry] = useState('pleaseSelect');
  const [isFlatAmount, setIsFlatAmount] = useState(false);
  const [levelOfCover, SetLevelOfCover] = useState("pleaseSelect");
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);

  const [numberPrincipalMembers, setNumberPrincipalMembers] = useState(0);
  const [totalNumberOfSpouses, setTotalNumberOfSpouses] = useState(0);
  const [totalNumberOfChilidren, setTotalNumberOfChilidren] = useState(0);
  const [totalNumberOfParents, setTotalNumberOfParents] = useState(0);
  const [totalNumberOfParentsInLaws, setTotalNumberOfParentsInLaws] = useState(0);


  const initialValues = {
    industry: 'pleaseSelect',
    levelOfCover: "pleaseSelect",
    totalNumberOfSpouses: 0,
    totalNumberOfChilidren: 0,
    totalNumberOfParents: 0,
    totalNumberOfParentsInLaws: 0,
  };


const ChoosePhoneArea = ({ value, onChange }) => (
    <Select defaultValue={value} onChange={onChange} style={{ width: 100 }}>
        {PhoneAreas.map((area) => (
            <Option key={area.code} value={area.code}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <span>{area.code}</span>
                    <img src={area.flag} alt={area.country} style={{ width: '20px', marginLeft: '8px' }} />
                </div>
            </Option>
        ))}
    </Select>
);

  const handlePhoneAreaChange = (newValue) => {
    const selectedCountry = PhoneAreas.find((area) => area.code === newValue);
    if (selectedCountry) {
      setCountry(selectedCountry.country);
    }

    setPhoneArea(newValue);
  };

  const handleCoverChange = (value) => {
    SetLevelOfCover(levelOfCover);
    setIsFlatAmount(value === 'flatAmount');
  };


  const onFormFinish = (values) => {
    const updatedFormData = { ...formData };
    if (currentStep === 0) {
      updatedFormData.contactDetails = values;
      if (action === 'callback') {
        form.submit(); // Submit the form if requesting a callback
        return;
      }
    } else if (currentStep === 1) {
      updatedFormData.companyDetails = values;
    } else if (currentStep === 2) {
      updatedFormData.insuredMembers = values;
    } else if (currentStep === 3) {
      updatedFormData.policyDetails = values;
    }

    setFormData(updatedFormData);
    message.success("Form submitted successfully!");
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

  const ReviewAndConfirmModal = () => (
    <Modal
      title="Review and Confirm"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalOpen(false)}>
          Return
        </Button>,
        <Button key="quote" type="primary" onClick={() => handleModalOk('quote')}>
          View Quote
        </Button>,
        <Button key="email" type="primary" onClick={() => handleModalOk('email')}>
          Send to My Email
        </Button>,
        <Checkbox key="accept" onChange={(e) => setAction(e.target.checked ? 'callback' : 'continue')}>
          I accept the policy exclusions
        </Checkbox>
      ]}
    >
      <Form>
        <Row>
          <h3>Contact Details</h3>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>First Name:</strong> {formData.contactDetails.firstName}</p>
          </Col>
          <Col span={12}>
            <p><strong>Last Name:</strong> {formData.contactDetails.lastName}</p>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Email Address:</strong> {formData.contactDetails.email}</p>
          </Col>
          <Col span={12}>
            <p><strong>Mobile Number:</strong> {formData.contactDetails.mobileNumber}</p>
          </Col>
          <Col span={12}>
            <p><strong>Date of Birth:</strong> {formData.contactDetails.dob}</p>
          </Col>
        </Row>

        <Row gutter={16}>
          <h3>Company Details</h3>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Company Name:</strong> {formData.companyDetails.companyName}</p>
          </Col>
          <Col span={12}>
            <p><strong>Company Address:</strong> {formData.companyDetails.companyAddress}</p>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <p><strong>Industry Type:</strong> {formData.companyDetails.industryType}</p>
          </Col>
          <Col span={12}>
            <p><strong>Number of Employees:</strong> {formData.companyDetails.numberOfEmployees}</p>
          </Col>
          <Col span={12}>
            <p><strong>Annual Turnover:</strong> {formData.companyDetails.annualTurnover}</p>
          </Col>
        </Row>
      </Form>

      {/*Do what I have done above for the rest*/}
      <h3>Insured Members</h3>
      <p><strong>Principal Members:</strong> {formData.insuredMembers.principalMembers}</p>
      <p><strong>Spouse:</strong> {formData.insuredMembers.spouse}</p>
      <p><strong>Children:</strong> {formData.insuredMembers.children}</p>
      <p><strong>Parents:</strong> {formData.insuredMembers.parents}</p>
      <p><strong>Parents-in-Law:</strong> {formData.insuredMembers.parentsInLaw}</p>

      <h3>Policy Details</h3>
      <p><strong>Policy Start Date:</strong> {formData.policyDetails.policyStartDate}</p>
      <p><strong>Benefit Level:</strong> {formData.policyDetails.benefitLevel}</p>
    </Modal>
  );


  const description = "Please enter the number of family members to be covered";

  const steps = [
    {
      title: "Contact Details",
      content: (
        <Form
          layout="vertical"
          form={form}
          onFinish={onFormFinish}
          initialValues={initialValues}
        >
          <Row gutter={16}>
            <p>Please enter your personal details to continue</p>
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
                  value={firstName}
                  onChange={setFirstName}
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
                  value={lastName}
                  onChange={setLastName}
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
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input
                  className="custom-input"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email address"
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
                  className="w-full custom-input"
                  disabledDate={disabledDate}
                  value={dateOfBirth}
                  onChange={setDateOfBirth}
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
        </Form>
      ),
    },

    {
      title: "Company Details",
      content: (
        <div>
          <Row gutter={16}>
            <p>Please enter company details to continue</p>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="What is the name of your Company"
                name="companyName"
                rules={[
                  { required: true, message: "Please enter company name!" },
                ]}
              >
                <Input
                  className="custom-input"
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
                  value={industry}
                  onChange={(value) => setIndustry(value)}
                >
                  <Option value="pleaseSelect">Please Select</Option>
                  <Option value="administrative">Administrative</Option>
                  <Option value="parastatalGovernment">
                    Parastatal/Government
                  </Option>
                  <Option value="lightManufacturing">
                    Light Manufacturing
                  </Option>
                  <Option value="heavyManufacturing">
                    Heavy Manufacturing
                  </Option>
                  <Option value="professional">Professional</Option>
                  <Option value="retailersAndWholesalers">
                    Retailers & Wholesalers
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="How many employees are to be covered by this scheme?"
                name="numberOfEmployees"
                rules={[
                  {
                    required: true,
                    message: "Please enter number of employees!",
                  },
                ]}
              >
                <InputNumber
                  className="w-full custom-input-number"
                  value={numberOfEmployees}
                  onChange={setNumberOfEmployees}
                  placeholder="Enter total number of employees"
                  onKeyPress={preventTextInput}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="What is the total annual salary of your company?"
                name="annualTurnover"
                rules={[
                  { required: true, message: "Please enter annual turnover!" },
                ]}
              >
                <InputNumber
                  onKeyPress={preventTextInput}
                  addonBefore={currencySymbol}
                  placeholder="Enter total annual Salaries"
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
      ),
    },
    {
      title: "Insured Members",
      description,
      content: (
        <div>
          <Row gutter={16}>
            <p>Please enter insured members details to continue</p>
          </Row>
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
                  value={numberPrincipalMembers}
                  onChange={setNumberPrincipalMembers}
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
                  value={totalNumberOfSpouses}
                  onKeyPress={preventTextInput}
                  onChange={setTotalNumberOfSpouses}
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
                  value={totalNumberOfChilidren}
                  onChange={setTotalNumberOfChilidren}
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
                  value={totalNumberOfParents}
                  onKeyPress={preventTextInput}
                  onChange={setTotalNumberOfParents}
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
                  value={totalNumberOfParentsInLaws}
                  onKeyPress={preventTextInput}
                  onChange={setTotalNumberOfParentsInLaws}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Policy Details",
      content: (
        <div>
          <Row gutter={16}>
            <p>Please enter policy details to continue</p>
          </Row>
          <br></br>
          <Row gutter={16}>
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
                  onChange={handleCoverChange}
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
              {isFlatAmount && (
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
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/(,*)/g, "")}
                  />
                </Form.Item>
              )}
            </Col>

            <Col span={12}>
              <Form.Item
                label="Policy Start Date"
                name="policyStartDate"
                rules={[
                  {
                    required: true,
                    message: "Please select policy start date!",
                  },
                ]}
              >
                <DatePicker
                  className="w-full custom-input"
                  disabledDate={disabledTodayDate}
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                {({ getFieldValue }) => {
                  const policyStartDate = getFieldValue("policyStartDate");
                  const expiryDate = policyStartDate
                    ? new Date(policyStartDate).setFullYear(
                        new Date(policyStartDate).getFullYear() + 1
                      )
                    : null;
                  return (
                    <p>
                      Your cover will automatically expire on{" "}
                      {expiryDate
                        ? new Date(expiryDate).toLocaleDateString()
                        : "____"}
                    </p>
                  );
                }}
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Review and Confirm",
      content: (
        <div>
          <Row gutter={16}>
            <p>Please Review and Confirm your entries to continue</p>
          </Row>
          <ReviewAndConfirmModal />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-8">
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
        </div>
      </Form>
      <Modal
        title="What would you like to do?"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        
        footer={[
          <div style={{ textAlign: 'left' }}>
          <Button key="continue" type="primary" disabled={!formData.selectedOption} onClick={handleModalOk}>
            Continue
          </Button>
          </div>,
        ]}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}
      >
        <Radio.Group onChange={handleRadioChange} value={formData.selectedOption}>
          <Space direction="vertical">
            <Radio value="quote">Generate Quote</Radio>
            <Divider></Divider>
            <Radio value="callback">Request a Call Back</Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );

};

export default GroupLifeAssurance;
