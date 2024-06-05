import React, { useState } from "react";
import { Card, Steps, Form, Row, Input, InputNumber, Button, message, Col, Checkbox, Modal, Select } from "antd";
import {
 UserOutlined,
 MailOutlined,
 PhoneOutlined,
 NumberOutlined,
 DollarOutlined,
 SmileOutlined,
 IdcardOutlined,
} from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;

const GroupLifeAssurance = () => {
 const [currentStep, setCurrentStep] = useState(0);
 const [form] = Form.useForm();
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [industry, setIndustry] = useState('professional');


 const onFormFinish = (values) => {
  console.log("Success:", values);
  message.success("Form submitted successfully!");
  // Handle form submission logic here (e.g., send data to server)
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

 const steps = [
  {
   title: "Company Details",
   content: (
    <Card>
     <Row gutter={16}>
      <Col span={12}>
       <Form.Item
        label="Company Name"
        name="CompanyName"
        rules={[{ required: true, message: "Please enter Company name!" }]}
       >
        <Input prefix={<UserOutlined />} />
       </Form.Item>
       <Form.Item
        label="Email"
        name="email"
        rules={[
         { required: true, message: "Please enter email address!" },
         { type: "email", message: "Please enter a valid email address!" },
        ]}
       >
        <Input prefix={<MailOutlined />} />
       </Form.Item>
      </Col>
      <Col span={12}>
       <Form.Item
        label="Mobile Number"
        name="mobileNumber"
        rules={[{ required: true, message: "Please enter mobile number!" }]}
       >
        <Input prefix={<PhoneOutlined />} />
       </Form.Item>
      </Col>
     </Row>
     <Row>
     <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept terms and privacy policy') }]}
       >
        <Checkbox>
         I accept the <a href="./terms">terms</a> and <a href="./privacyPolicy">privacy policy</a>
        </Checkbox>
       </Form.Item>
     </Row>
    </Card>
   ),
  },
  {
   title: "Company Details",
   content: (
    <Card>
     <Row gutter={16}>
      <Col span={12}>
       <Form.Item
        label="Total Number of Employees"
        name="totalEmployees"
        rules={[
         { required: true, message: "Please enter total number of employees!" },
        ]}
       >
        <InputNumber prefix={<NumberOutlined />} style={{ width: "80%" }} />
       </Form.Item>
       <Form.Item
        label="Total Annual Salary (KES)"
        name="totalAnnualSalary"
        rules={[
         { required: true, message: "Please enter total annual salary!" },
        ]}
       >
        <InputNumber
         prefix={<DollarOutlined />}
         formatter={(value) => `KES ${value}`}
         style={{ width: "80%" }}
        />
       </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
                name="industry"
                label="Industry"
                rules={[{ required: true, message: 'Please select Industry!' }]}
              >
                <Select value={industry} onChange={value => setIndustry(value)}>
                  <Option value="administrative">Administrative</Option>
                  <Option value="parastatalGovernment">Parastatal/Government</Option>
                  <Option value="lightManufacturing">Light Manufacturing</Option>
                  <Option value="heavyManufacturing">Heavy Manufacturing</Option>
                  <Option value="professional">Professional</Option>
                  <Option value="retailersAndWholesalers">Retailers & Wholesalers</Option>
                </Select>
              </Form.Item>
       <Form.Item
        label="Average Age"
        name="averageAge"
        rules={[{ required: true, message: "Please enter average age!" }]}
       >
        <InputNumber prefix={<SmileOutlined />} style={{ width: "80%" }} />
       </Form.Item>
      </Col>
     </Row>
    </Card>
   ),
  },
  {
   title: "Dependents",
   content: (
    <Card>
     <Row gutter={16}>
      <Col span={12}>
       <Form.Item
        label="Number of Principal Members"
        name="principalMembers"
        rules={[
         { required: true, message: "Please enter number of principal members!" },
        ]}
       >
        <InputNumber prefix={<IdcardOutlined />} style={{ width: "80%" }} />
       </Form.Item>
       <Form.Item
        label="Spouse"
        name="spouse"
        rules={[
         { required: true, message: "Please enter number of spouses!" },
        ]}
       >
        <InputNumber style={{ width: "80%" }} />
       </Form.Item>
       <Form.Item
        label="Children"
        name="children"
        rules={[
         { required: true, message: "Please enter number of children!" },
        ]}
       >
        <InputNumber prefix={<SmileOutlined />} style={{ width: "80%" }} />
       </Form.Item>
      </Col>
      <Col span={12}>
       <Form.Item
        label="Parents"
        name="parents"
        rules={[
         { required: true, message: "Please enter number of parents!" },
        ]}
       >
        <InputNumber prefix={<UserOutlined />} style={{ width: "80%" }} />
       </Form.Item>
       <Form.Item
        label="Parents-in-Law"
        name="parentsInLaw"
        rules={[
         { required: true, message: "Please enter number of parents-in-law!" },
        ]}
       >
        <InputNumber prefix={<UserOutlined />} style={{ width: "80%" }} />
       </Form.Item>
      </Col>
     </Row>
    </Card>
   ),
  },
  {
   title: "Last Expense Sum Assured",
   content: (
    <Card>
     <Row gutter={16}>
      <Col span={12}>
       <Form.Item
        label="Main Member"
        name="mainMember"
        rules={[
          { required: true, message: "Please enter Last Expense Sum Assured for Main Member!" },
        ]}
      >
        <InputNumber prefix={<UserOutlined />} style={{ width: "80%" }} />
      </Form.Item>
      <Form.Item
        label="Spouse"
        name="spouseAssured"
        rules={[
          { required: true, message: "Please enter Last Expense Sum Assured for Spouse!" },
        ]}
      >
        <InputNumber style={{ width: "80%" }} />
      </Form.Item>
      <Form.Item
        label="Children"
        name="childrenAssured"
        rules={[
          { required: true, message: "Please enter Last Expense Sum Assured for Children!" },
        ]}
      >
        <InputNumber prefix={<SmileOutlined />} style={{ width: "80%" }} />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="Parents"
        name="parentsAssured"
        rules={[
          { required: true, message: "Please enter Last Expense Sum Assured for Parents!" },
        ]}
      >
        <InputNumber prefix={<UserOutlined />} style={{ width: "80%" }} />
      </Form.Item>
      <Form.Item
        label="Parents-in-Law"
        name="parentsInLawAssured"
        rules={[
          { required: true, message: "Please enter Last Expense Sum Assured for Parents-in-Law!" },
        ]}
      >
        <InputNumber prefix={<UserOutlined />} style={{ width: "80%" }} />
      </Form.Item>
    </Col>
  </Row>
</Card>
),
},
];

const actions = (
<div className="steps-action">
  {currentStep > 0 && (
    <Button style={{ margin: "0 8px" }} onClick={onPrevStep}>
      Previous
    </Button>
  )}
  {currentStep < steps.length - 1 && (
    <Button type="primary" onClick={onNextStep}>
      Next
    </Button>
  )}
  {currentStep === steps.length - 1 && (
    <Button type="primary" onClick={() => form.submit()}>
      Generate Quote
    </Button>
  )}
</div>
);

return (
<>
  <Steps current={currentStep}>
    {steps.map((item) => (
      <Step key={item.title} title={item.title} />
    ))}
  </Steps>
  <Form form={form} name="control-hooks" onFinish={onFormFinish} scrollToFirstError layout="vertical">
    <div className="steps-content">{steps[currentStep].content}</div>
    {actions}
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
</>
);
};

export default GroupLifeAssurance;