import React, { useState } from "react";
import { Steps, Radio, Space, Button, Row, Col, Form, Input, Select, DatePicker, Modal, Checkbox } from "antd";

const { Step } = Steps;

const IndividualCustomerDetailsModal = ({ visible, onCancel, onNext }) => {
  const [, setCheckedList] = useState([]);
  const [termsChecked, setTermsChecked] = useState(false);

  const onCheckboxChange = (checkedList) => {
    setCheckedList(checkedList);
  };

  const onTermsChange = (e) => {
    setTermsChecked(e.target.checked);
  };

  const handleOk = () => {
    if (termsChecked) {
      onNext(); // Call the onNext function passed from the parent component
    } else {
      alert("Please accept the terms and conditions");
    }
  };

  const handleCancel = () => {
    onCancel(); // Close the modal without moving to the next step
  };

  return (
    <Modal
      title="Individual Customer Details"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Personal Details">
          <Space direction="vertical">
            <Checkbox.Group onChange={onCheckboxChange} style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox value="name">Name</Checkbox>
              <Checkbox value="gender">Gender</Checkbox>
              <Checkbox value="dob">Date of Birth</Checkbox>
              <Checkbox value="email">Email</Checkbox>
              <Checkbox value="telNo">Mobile Number</Checkbox>
            </Checkbox.Group>
            <Checkbox
              checked={termsChecked}
              onChange={onTermsChange}
            >
              I accept the terms and conditions
            </Checkbox>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const GroupCriticalIllness = () => {
  const [current, setCurrent] = useState(0);
  const [selection, setSelection] = useState('individual');
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

  const handleNextClick = () => {
    if (selection === 'individual') {
      setModalVisible(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrevClick = () => {
    setCurrent(current - 1);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (selection === 'individual') {
      setCurrent(current + 1);
    }
  };

  const steps = [
    {
      title: "Select Customer Type",
      content: (
        <Space direction="vertical">
          <div>Select:</div>
          <Radio.Group onChange={handleSelectionChange} value={selection}>
            <Radio value="individual">Individual Customer</Radio>
            <Radio value="group">Group Customer</Radio>
          </Radio.Group>
        </Space>
      ),
    },
    {
      title: "Enter your details",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={20} sm={20} md={10} lg={10} xl={10}>
              <Form.Item
                label="Name"
                rules={[{ required: true, message: "Please input Customer Name." }]}
                name="name"
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
                  id="name"
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

              <Form.Item label="Specify Date of Birth">
                <DatePicker
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

            <Col xs={20} sm={20} md={10} lg={10} xl={10}>
              <Form.Item
                label="Email"
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
        </Form>
      ),
    },
    {
      title: "Insurance Details",
      content: <div>Insurance Details</div>,
    },
    {
      title: "Get Quotation",
      content: <div>Get Quotation</div>,
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
    </>
  );
};

export default GroupCriticalIllness;

