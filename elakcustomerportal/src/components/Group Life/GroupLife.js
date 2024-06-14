import React, { useState, useEffect, useCallback } from 'react';
import { Steps, Row, Form, Input, InputNumber, Button, message, Col, Checkbox, Modal, DatePicker, Select, Radio, Divider, Typography, Card } from 'antd';
import 'tailwindcss/tailwind.css';

import { preventNumericInput, preventTextInput, disabledDate, disabledTodayDate, PhoneAreas } from "./Utilities.js"
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../store/redux/features/glaSlice";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from 'moment';


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
    <Form
      layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter details of contact person</Title>
        </Col>
      </Row>
      <br></br>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Contact First Name"
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
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Contact Last Name"
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
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Contact Gender"
            rules={[{ required: true, message: "Please select gender." }]}
            name="gender"
            required
          >
            <Select id="gender" placeholder="Select Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Contact Date of Birth"
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
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Contact Email Address"
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
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Contact Mobile Number"
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
            <a href="/home/group-life-assurance" style={{ color: "#A32A29" }}>
              terms
            </a>{" "}
            and{" "}
            <a href="/home/group-life-assurance" style={{ color: "#A32A29" }}>
              privacy policy
            </a>
          </Checkbox>
        </Form.Item>
      </Row>
    </Form>)
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
      <br></br>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="What is the average age of employees in your company?"
            name="averageAge"
            rules={[{ required: true, message: "Please enter average age of employees!" }]}
          >
            <InputNumber
              onKeyPress={preventTextInput}
              addonBefore={formData.currencySymbol}
              name="averageAge"
              value={formData.annualSalaries}
              onChange={(value) => handleInputChange(value, 'averageAge')}
              placeholder="Enter average age of employees"
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
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter the number of family members to be covered</Title>
        </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
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
      </Row>
      <br></br>
      <Row gutter={16}>
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
  const [form] = Form.useForm();

  const handleInputChange = (value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleStartDateChange = useCallback(
    (date) => {
      if (!date) {
        form.resetFields(['policyEndDate']);
        setFormData({ ...formData, policyEndDate: null });
        return null;
      }
      const oneYearLater = date.clone().add(1, 'year').subtract(1, 'day');
      setFormData({ ...formData, policyStartDate: date, policyEndDate: oneYearLater });
      return oneYearLater;
    },
    [form, formData, setFormData]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    form.setFieldsValue(formData);
    form.setFieldsValue({ policyStartDate: formData.policyStartDate });
  }, [form, formData]);

  useEffect(() => {
    const newPolicyEndDate = handleStartDateChange(formData.policyStartDate);
    setFormData({ ...formData, policyEndDate: newPolicyEndDate });
    form.setFieldsValue({ policyEndDate: newPolicyEndDate });
  }, [formData, form, setFormData, handleStartDateChange]);

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter policy details</Title>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Cover Commencement Date"
            name="policyStartDate"
            rules={[
              {
                required: true,
                message: 'Please select start date.',
              },
            ]}
            style={{ width: '100%', cursor: 'pointer' }}
          >
            <DatePicker
              style={{ width: '100%' }}
              id="policyStartDate"
              disabledDate={(current) => current && current < moment().endOf('day')}
              onChange={handleStartDateChange}
              inputReadOnly={true}
            />
          </Form.Item>
          {formData.policyStartDate && (
            <p className="flex items-center mb-[35px]">
              <InfoCircleOutlined
                style={{
                  color: '#D93E3E',
                  marginRight: '8px',
                }}
              />
              <span className="text-[#929497]">
                Your cover will automatically expire on {formatDate(formData.policyEndDate)}
              </span>
            </p>
          )}
        </Col>
        <Col span={12}>
          <Form.Item
            label="What Level of Cover Do you need?"
            name="multipleOfAnnualSalary"
            rules={[
              {
                required: true,
                message: 'Please select a level of cover!',
              },
            ]}
          >
            <Select
              placeholder="Please select"
              onChange={(value) => handleInputChange(value, 'multipleOfAnnualSalary')}
            >
              <Option value="1">1x Salary</Option>
              <Option value="2">2x Salary</Option>
              <Option value="3">3x Salary</Option>
              <Option value="4">4x Salary</Option>
              <Option value="5">5x Salary</Option>
            </Select>
          </Form.Item>
          <br />
          {formData.flatAmount && (
            <Form.Item
              label="Specify Flat Amount"
              name="flatAmount"
              rules={[
                {
                  required: true,
                  message: 'Please enter the flat amount!',
                },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Enter flat amount"
                min={0}
                addonBefore="KSh"
                value={formData.flatAmount}
                onChange={(value) => handleInputChange(value, 'flatAmount')}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/(,*)/g, '')}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </Form>
  );
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
              <p>{formDataToSubmit.numberOfEmployees} members</p>
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
              <p>Annual Salary X {formDataToSubmit.multipleOfAnnualSalary}</p>
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

  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.groupLifeAssurance.isLoading);
  const data = useSelector((state) => state.groupLifeAssurance.glaData);

  const [formDataToSubmit] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    ContactDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phoneArea: "254",
      mobileNumber: "",
      dateOfBirth: "",
      selectedOption: "",
    },
    proposedClientDetails: {
      nameOfClient: "Banda Okumu Okwach",
      industry: "professional",
      "intermediaryName": "TBA",
      "benefitType": "multipleOfSalary",
      "totalAnnualSalaries": 441014666,
      "totalNumberOfStaff": 923,
      "averageAge": 34
    },
    "illnessNaturalCausesAccidents": {
      "glaAsMultipleofAnnualSalary": 4,
      "criticalIllnessBenefitPercentage": 30,
      "typeOfCriticalIllnessCover": "accelerated",
      "mainMemberLastExpense": 100000,
      "typeOfMainMemberLastExpense": "accelerated",
      "spouseLastExpense": 0,
      "childLastExpense": 0,
      "parentsLastExpense": 0,
      "totalNumberOfSpouses": 0,
      "totalNumberOfChilidren": 0,
      "totalNumberOfParentsAndParentsInLaw": 0
    },
    "accidentalOccupationalCausesOnly": {
      "deathBenefitMultiplier": 4,
      "permananentTotalDisability": 4,
      "temporaryTotalDisability": 104,
      "negotiatedFreeCoverLimit": null,
      "negotiatedMaxCriticalIllnessCover": null,
      "medicalReimbursment": 500000,
      "lifeAssistantBenefit": 0,
      "occupationalIllness": 0,
      "accidentalOccupationalLastExpense": 100000,
      "schemeLossRatio": 0,
      "discountOnRate": 0
    }
  });

  const onFormFinish = (values) => {
    let updatedFormData = { ...formData };

    if (currentStep === 0) {
      updatedFormData.ContactDetails = values;
      if (action === 'callback') {
        setAction("Submit");
        return;
      }
    } else if (currentStep === 1) {
      formDataToSubmit.proposedClientDetails = values;
    } else if (currentStep === 2) {
      formDataToSubmit.illnessNaturalCausesAccidents = values;
    } else if (currentStep === 3) {
      updatedFormData.accidentalOccupationalCausesOnly = values;
    }

    updatedFormData.proposedClientDetails.totalAnnualSalaries = parseFloat(updatedFormData.proposedClientDetails.totalAnnualSalaries);
    updatedFormData.proposedClientDetails.totalNumberOfStaff = parseInt(updatedFormData.proposedClientDetails.totalNumberOfStaff);
    updatedFormData.proposedClientDetails.averageAge = parseInt(updatedFormData.proposedClientDetails.averageAge);

    updatedFormData.illnessNaturalCausesAccidents.glaAsMultipleofAnnualSalary = parseFloat(updatedFormData.illnessNaturalCausesAccidents.glaAsMultipleofAnnualSalary);
    updatedFormData.illnessNaturalCausesAccidents.totalNumberOfSpouses = parseInt(updatedFormData.illnessNaturalCausesAccidents.totalNumberOfSpouses);
    updatedFormData.illnessNaturalCausesAccidents.totalNumberOfChilidren = parseInt(updatedFormData.illnessNaturalCausesAccidents.totalNumberOfChilidren);
    updatedFormData.illnessNaturalCausesAccidents.totalNumberOfParentsAndParentsInLaw = parseInt(updatedFormData.illnessNaturalCausesAccidents.totalNumberOfSpouses) + parseInt(updatedFormData.illnessNaturalCausesAccidents.totalNumberOfParentsAndParentsInLaw);

    updatedFormData.accidentalOccupationalCausesOnly.deathBenefitMultiplier = parseFloat(updatedFormData.accidentalOccupationalCausesOnly.deathBenefitMultiplier);
    updatedFormData.accidentalOccupationalCausesOnly.permananentTotalDisability = parseFloat(updatedFormData.accidentalOccupationalCausesOnly.permananentTotalDisability);
    updatedFormData.accidentalOccupationalCausesOnly.temporaryTotalDisability = parseInt(updatedFormData.accidentalOccupationalCausesOnly.temporaryTotalDisability);
    updatedFormData.accidentalOccupationalCausesOnly.medicalReimbursment = parseInt(updatedFormData.accidentalOccupationalCausesOnly.medicalReimbursment);
    updatedFormData.accidentalOccupationalCausesOnly.lifeAssistantBenefit = parseInt(updatedFormData.accidentalOccupationalCausesOnly.lifeAssistantBenefit);
    updatedFormData.accidentalOccupationalCausesOnly.occupationalIllness = parseInt(updatedFormData.accidentalOccupationalCausesOnly.occupationalIllness);
    updatedFormData.accidentalOccupationalCausesOnly.schemeLossRatio = parseInt(updatedFormData.accidentalOccupationalCausesOnly.schemeLossRatio);
    updatedFormData.accidentalOccupationalCausesOnly.discountOnRate = parseInt(updatedFormData.accidentalOccupationalCausesOnly.discountOnRate);

    console.log('Form Data To Submit: ', updatedFormData);
    setFormData(updatedFormData);
    message.success('Quote generated successfully!');
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

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async () => {
    console.log('Form Data: ', formData);
    if (authStatus === "succeeded") {
      try {
        await dispatch(fetchData(formData)).unwrap();
        message.success('Quote generated successfully!');
        setIsFormSubmitted(true);
      } catch (error) {
        message.error('Failed to submit form data.');
      }
    } else {
      message.error('Authentication failed.');
    }
  };


  useEffect(() => {
    if (!isLoading && isFormSubmitted) {
      navigate("quotation-details", {
        state: { formData, data },
      });
      dispatch(fetchData());
    }
  }, [isLoading, navigate, formData, data, dispatch, isFormSubmitted]);



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
