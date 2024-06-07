import React, { useState } from "react";
import { PersonalIcon, GroupIcon } from "../../layout/icons/icons";
import { Steps, Radio, Space, Button, Row, Col, Form, Input, Select, DatePicker, Modal, Checkbox, InputNumber } from "antd";

const { Step } = Steps;

const IndividualCustomerDetailsModal = ({ visible, onCancel, onNext }) => {
  const [, setCheckedList] = useState([]);

  const onCheckboxChange = (checkedList) => {
    setCheckedList(checkedList);
  };

  const handleOk = () => {
    onNext(); // Call the onNext function passed from the parent component
  };

  const handleCancel = () => {
    onCancel(); // Close the modal without moving to the next step
  };

  return (
    <Modal
      title="You will be required to provide the following details to continue"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Continue
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item>
          <Checkbox.Group onChange={onCheckboxChange} style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox value="name" style={{ marginBottom: '20px' }}>Full Name</Checkbox>
            <Checkbox value="gender" style={{ marginBottom: '20px' }}>Gender</Checkbox>
            <Checkbox value="dob" style={{ marginBottom: '20px' }}>Date of Birth</Checkbox>
            <Checkbox value="email" style={{ marginBottom: '20px' }}>Email Address</Checkbox>
            <Checkbox value="telNo" style={{ marginBottom: '20px' }}>Phone Number</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ConfirmationModal = ({ visible, onCancel, onEdit, onGenerate, data }) => {
  return (
    <Modal
      title="To continue, please confirm your insurance purchase details"
      visible={visible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="edit" onClick={onEdit}>
          Edit
        </Button>,
        <Button key="generate" type="primary" onClick={onGenerate}>
          Generate Quote
        </Button>,
      ]}
    >
      <p>Please confirm your details before generating the quote.</p>
      <div>
        <p><strong>Customer Type:</strong> {data.selection}</p>
        <p><strong>First Name:</strong> {data.firstName}</p>
        <p><strong>Last Name:</strong> {data.lastName}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Date of Birth:</strong> {data.dob}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone Number:</strong> {data.telNo}</p>
        <p><strong>Number of Spouses:</strong> {data.spouses}</p>
        <p><strong>Number of Children:</strong> {data.children}</p>
        <p><strong>SA % Payable to Principal:</strong> {data.saPrincipal}</p>
        <p><strong>SA % Payable to Spouse:</strong> {data.saSpouse}</p>
        <p><strong>SA % Payable to Children:</strong> {data.saChildren}</p>
        <p><strong>Sum Assured:</strong> {data.sumAssured}</p>
      </div>
    </Modal>
  );
};

const GroupCriticalIllness = () => {
  const [current, setCurrent] = useState(0);
  const [selection, setSelection] = useState('individual');
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

  const handleNextClick = async () => {
    if (current === 1 && !termsChecked) {
      alert("Please accept the terms and conditions");
      return;
    }
    if (selection === 'individual' && current === 0) {
      setModalVisible(true);
    } else if (current === steps.length - 2) {
      const values = await form.validateFields();
      setFormData({ ...values, selection });
      setConfirmModalVisible(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrevClick = () => {
    setCurrent(current - 1);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCurrent(current + 1);
  };

  const handleConfirmModalClose = () => {
    setConfirmModalVisible(false);
  };

  const handleGenerateQuote = () => {
    setConfirmModalVisible(false);
    setCurrent(current + 1);
    // Add logic to generate the quote
  };

  const steps = [
    {
      title: "Customer Type",
      content: (
        <Space direction="vertical">
          <div>Select:</div>
          <Radio.Group onChange={handleSelectionChange} value={selection}>
            <Radio value="individual">
              <Space>
                <PersonalIcon />
                <span>Individual Customer</span>
              </Space>
            </Radio>
            <Radio value="group">
              <Space>
                <GroupIcon />
                <span>Group Customer</span>
              </Space>
            </Radio>
          </Radio.Group>
        </Space>
      ),
    },
    {
      title: "Personal details",
      content: (
        <Form form={form} layout="vertical" style={{ marginTop: '24px', padding: '16px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item
                label="First Name"
                rules={[{ required: true, message: "Please input Customer Name." }]}
                name="firstName"
                required
              >
                <Input
                  addonBefore={
                    <Select style={{ width: 90 }} defaultValue="Mr.">
                      <Select.Option value="Mr.">Mr.</Select.Option>
                      <Select.Option value="Mrs.">Mrs.</Select.Option>
                      <Select.Option value="Ms.">Ms.</Select.Option>
                    </Select>
                  }
                  id="firstName"
                  placeholder="Please type a customer name"
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                rules={[{ required: true, message: "Please select the Customer gender." }]}
                name="gender"
                required
              >
                <Select id="gender" placeholder="Select">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="dob">
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={(current) => {
                    const today = new Date();
                    const eighteenYearsAgo = new Date(
                      today.getFullYear() - 18,
                      today.getMonth(),
                      today.getDate()
                    );
                    return current && current >= eighteenYearsAgo;
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[
                  { required: true, message: "Please input last name." },
                ]}
              >
                <Input id="lastName" placeholder="Last name" />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="email"
                required
                rules={[
                  { required: true, message: "Please input email address." },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input id="email" placeholder="name@email.com" />
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="telNo"
                rules={[
                  { required: true, message: "Please input a mobile number." },
                  { len: 10, message: "The input must have exactly 10 digits." },
                ]}
              >
                <Input placeholder="0700000000" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Checkbox
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            >
              I accept the terms and conditions
            </Checkbox>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Insured Members",
      content: (
        <Form form={form} layout="vertical" style={{ marginTop: '24px', padding: '16px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item label="SPOUSE" name="spouses">
                <Input placeholder="Number of spouses" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item label="CHILDREN" name="children">
                <Input placeholder="Number of children" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Percentage of Cover Payable",
      content: (
        <Form form={form} layout="vertical" style={{ marginTop: '24px', padding: '16px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item
                label="SA % Payable to Principal"
                name="saPrincipal"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                />
              </Form.Item>
              <Form.Item
                label="SA % Payable to Spouse"
                name="saSpouse"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item label="SA % Payable to Children" name="saChildren">
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                />
              </Form.Item>
              <Form.Item label="Sum Assured" name="sumAssured">
                <InputNumber
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Get Quotation",
      content: <div>Quotation</div>
    },
  ];

  return (
    <>
      <h1 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Critical Illness Cover</h1>
      <Steps current={current}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 32 }}>
        {steps[current].content}
        <div className="steps-action" style={{ marginTop: 16 }}>
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handlePrevClick}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={handleNextClick}>
              Next
            </Button>
          )}
        </div>
      </div>
      <IndividualCustomerDetailsModal visible={modalVisible} onCancel={() => setModalVisible(false)} onNext={handleModalClose} />
      <ConfirmationModal
        visible={confirmModalVisible}
        onCancel={handleConfirmModalClose}
        onEdit={handlePrevClick}
        onGenerate={handleGenerateQuote}
        data={formData}
      />
    </>
  );
};

export default GroupCriticalIllness;
