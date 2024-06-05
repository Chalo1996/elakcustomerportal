import React, { useState } from 'react';
import { div, Steps, Form, Row, Input, InputNumber, Button, message, Col, Checkbox, Modal, DatePicker, Select, Radio } from 'antd';
import 'tailwindcss/tailwind.css';

const { Step } = Steps;
const { Option } = Select;

const GroupLifeAssurance = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState('continue');
  const [formData, setFormData] = useState({
    contactDetails: {},
    companyDetails: {},
    insuredMembers: {},
    policyDetails: {}
  });

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
        setIsModalVisible(true);
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

  const handleModalOk = (action) => {
    setIsModalVisible(false);
    if (action === "quote") {
      setCurrentStep(currentStep + 1);
    } else if (action === "callback") {
      form.submit();
    }
  };
  
  const ReviewAndConfirmModal = () => (
    <Modal
      title="Review and Confirm"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalVisible(false)}>
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
      <h3>Contact Details</h3>
      <p><strong>First Name:</strong> {formData.contactDetails.firstName}</p>
      <p><strong>Last Name:</strong> {formData.contactDetails.lastName}</p>
      <p><strong>Email Address:</strong> {formData.contactDetails.email}</p>
      <p><strong>Mobile Number:</strong> {formData.contactDetails.mobileNumber}</p>
      <p><strong>Date of Birth:</strong> {formData.contactDetails.dob}</p>
  
      <h3>Company Details</h3>
      <p><strong>Company Name:</strong> {formData.companyDetails.companyName}</p>
      <p><strong>Company Address:</strong> {formData.companyDetails.companyAddress}</p>
      <p><strong>Industry Type:</strong> {formData.companyDetails.industryType}</p>
      <p><strong>Number of Employees:</strong> {formData.companyDetails.numberOfEmployees}</p>
      <p><strong>Annual Turnover:</strong> {formData.companyDetails.annualTurnover}</p>
  
      <h3>Insured Members</h3>
      <p><strong>Principal Members:</strong> {formData.insuredMembers.principalMembers}</p>
      <p><strong>Spouses:</strong> {formData.insuredMembers.spouses}</p>
      <p><strong>Children:</strong> {formData.insuredMembers.children}</p>
      <p><strong>Parents:</strong> {formData.insuredMembers.parents}</p>
      <p><strong>Parents-in-Law:</strong> {formData.insuredMembers.parentsInLaw}</p>
  
      <h3>Policy Details</h3>
      <p><strong>Policy Start Date:</strong> {formData.policyDetails.policyStartDate}</p>
      <p><strong>Benefit Level:</strong> {formData.policyDetails.benefitLevel}</p>
      <p><strong>Main Member Sum Assured:</strong> {formData.policyDetails.mainMember}</p>
      <p><strong>Spouse Sum Assured:</strong> {formData.policyDetails.spouse}</p>
      <p><strong>Children Sum Assured:</strong> {formData.policyDetails.children}</p>
      <p><strong>Parents & In-Laws Sum Assured:</strong> {formData.policyDetails.parentsInLaws}</p>
      <p><strong>Accidental/Occupational LA Sum Assured:</strong> {formData.policyDetails.accidentalLA}</p>
      <p><strong>Life Assistant Benefit:</strong> {formData.policyDetails.lifeAssistantBenefit}</p>
      <p><strong>Occupational Illness Benefit:</strong> {formData.policyDetails.occupationalIllnessBenefit}</p>
    </Modal>
  );

  const steps = [
    {
      title: 'Contact Details',
      content: (
        <div>
          <Form layout="vertical" form={form} onFinish={onFormFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter your first name!' }]}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your last name!' }]}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email address!' },
                    { type: 'email', message: 'Please enter a valid email address!' },
                  ]}
                  >
                  <Input className="custom-input" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mobile Number"
                  name="mobileNumber"
                  rules={[{ required: true, message: 'Please enter your mobile number!' }]}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please enter your date of birth!' }]}
                >
                  <DatePicker className="w-full custom-input" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept terms and privacy policy') }]}
              >
                <Checkbox>
                  I accept the <a href="#">terms</a> and <a href="#">privacy policy</a>
                </Checkbox>
              </Form.Item>
            </Row>
          </Form>
        </div>
      ),
    },
    {
      title: 'Company Details',
      content: (
        <div>
      <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, message: 'Please enter company name!' }]}
              >
                <Input className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Company Address"
                name="companyAddress"
                rules={[{ required: true, message: 'Please enter company address!' }]}
              >
                <Input className="custom-input" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Industry Type"
                name="industryType"
                rules={[{ required: true, message: 'Please select industry type!' }]}
              >
                <Select className="w-full">
                  <Option value="administrative">Administrative</Option>
                  <Option value="parastatalGovernment">Parastatal/Government</Option>
                  <Option value="lightManufacturing">Light Manufacturing</Option>
                  <Option value="heavyManufacturing">Heavy Manufacturing</Option>
                  <Option value="professional">Professional</Option>
                  <Option value="retailersAndWholesalers">Retailers & Wholesalers</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Number of Employees"
                name="numberOfEmployees"
                rules={[{ required: true, message: 'Please enter number of employees!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Annual Turnover"
                name="annualTurnover"
                rules={[{ required: true, message: 'Please enter annual turnover!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Insured Members',
      content: (
        <div>
         <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Principal Members"
                name="principalMembers"
                rules={[{ required: true, message: 'Please enter number of principal members!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Spouses"
                name="spouses"
                rules={[{ required: true, message: 'Please enter number of spouses!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Children"
                name="children"
                rules={[{ required: true, message: 'Please enter number of children!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Parents"
                name="parents"
                rules={[{ required: true, message: 'Please enter number of parents!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Parents-in-law"
                name="parentsInLaw"
                rules={[{ required: true, message: 'Please enter number of parents-in-law!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Policy Details',
      content: (
        <div>
<Row gutter={16}>
  <Col span={12}>
    <Form.Item
      label="Policy Start Date"
      name="policyStartDate"
      rules={[{ required: true, message: 'Please select policy start date!' }]}
    >
      <DatePicker className="w-full custom-input" />
    </Form.Item>
  </Col>
</Row>
<Row>
  <Col span={24}>
    <Form.Item shouldUpdate>
      {({ getFieldValue }) => {
        const policyStartDate = getFieldValue('policyStartDate');
        const expiryDate = policyStartDate ? new Date(policyStartDate).setFullYear(new Date(policyStartDate).getFullYear() + 1) : null;
        return (
          <p>
            Your cover will automatically expire on {expiryDate ? new Date(expiryDate).toLocaleDateString() : '____'}
          </p>
        );
      }}
    </Form.Item>
  </Col>
</Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Benefit Level (As Multiple of Annual Salary)"
                name="benefitLevel"
                rules={[{ required: true, message: 'Please enter benefit level!' }]}
                tooltip="Enter the benefit level as a multiple of annual salary"
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Main Member"
                name="mainMemberSum"
                rules={[{ required: true, message: 'Please enter sum assured for main member!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Spouse"
                name="spouseSum"
                rules={[{ required: true, message: 'Please enter sum assured for spouse!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Children"
                name="childrenSum"
                rules={[{ required: true, message: 'Please enter sum assured for children!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Parents & In-Laws"
                name="parentsInLawsSum"
                rules={[{ required: true, message: 'Please enter sum assured for parents & in-laws!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <h4>Additional Riders or Benefits</h4>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Accidental/Occupational LA Sum Assured"
                name="accidentalSum"
                rules={[{ required: true, message: 'Please enter sum assured for accidental/occupational LA!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Life Assistant Benefit"
                name="lifeAssistantBenefit"
                rules={[{ required: true, message: 'Please enter life assistant benefit!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Occupational Illness Benefit"
                name="occupationalIllnessBenefit"
                rules={[{ required: true, message: 'Please enter occupational illness benefit!' }]}
              >
                <InputNumber className="w-full custom-input-number" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Review and Confirm',
      content: (
        <ReviewAndConfirmModal />
      ),
    },
  ];
  
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <Steps current={currentStep} className="mb-8">
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
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
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="quote" type="primary" onClick={() => handleModalOk("quote")}>
            Generate Quote
          </Button>,
          <Button key="callback" onClick={() => handleModalOk("callback")}>
            Request a call back
          </Button>,
        ]}
      >
        <p>Please select an option:</p>
      </Modal>
    </div>
  );
  
};

export default GroupLifeAssurance;
