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

const RequestCallbackModal = ({ visible, onCancel, onContinue, selectedOption, setSelectedOption }) => {
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Modal
      title="How would you like to proceed?"
      visible={visible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="continue" type="primary" onClick={onContinue} disabled={!selectedOption}>
          Continue
        </Button>,
      ]}
    >
      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        <Space direction="vertical">
          <Radio value="callback">Request a Call Back</Radio>
          <Radio value="generate">Generate Quote</Radio>
        </Space>
      </Radio.Group>
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
  const [policyTerm, setPolicyTerm] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [clientEmailAddress, setClientEmailAddress] = useState();
  const [telNo, setTelNo] = useState();
  const [spouseNumber, setSpouseNumber] = useState();
  const [childrenNumber, setChildrenNumber] = useState();
  const [SAPrincipal, setSAPrincipal] = useState();
  const [SASpouse, setSASpouse] = useState();
  const [SAChildren, setSAChildren] = useState();
  const [sumAssured, setSumAssured] = useState();
  const [setCoverDate] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [callbackModalVisible, setCallbackModalVisible] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

//   const [formatter] = React.useState(new Intl.NumberFormat('en-KE', {
//     style: 'currency',
//     currency: 'KES',
// }));

// const preventNumericInput = (event) => {
//   if (/[0-9]/.test(event.key)) {
//     event.preventDefault();
//   }
// };

const preventTextInput = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};


  const policyTerms = ["1", "2", "3"];
  const { Option } = Select;

  const handleNextClick = async () => {
    if (current === 1 && !termsChecked) {
      alert("Please accept the terms and conditions");
      return;
    }
    if (selection === 'individual' && current === 0) {
      setModalVisible(true);
    } else if (selection === 'individual' && current === 1) {
      setCallbackModalVisible(true);
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

  const handleCallbackModalClose = () => {
    setCallbackModalVisible(false);
  };

  const handleGenerateQuote = () => {
    setConfirmModalVisible(false);
    setCurrent(current + 1);
    // Add logic to generate the quote
  };

  const handleCallbackContinue = async () => {
    if (selectedOption === "callback") {
      try {
        await form.validateFields();
        form.submit(); // Submit the form
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    } else if (selectedOption === "generate") {
      setCurrent(current + 1); // Move to the next step
    }
    setCallbackModalVisible(false); // Close the modal
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
                rules={[{ required: true, message: "Please select gender." }]}
                name="gender"
                required
              >
                <Select id="gender" placeholder="Select Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="dob">
                <DatePicker
                  style={{ width: '100%' }}
                  value = {dateOfBirth}
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
          label="Email Adress"
          name="email"
          required
          rules={[
            { required: true, message: "Please input email address." },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            id="email"
            placeholder="name@email.com"
            value={clientEmailAddress}
            onChange={(event) => setClientEmailAddress(event.target.value)}
          />
        </Form.Item>

              <Form.Item
          label="Mobile Number"
          name="telNo"
          rules={[
            { required: true, message: "Please input a mobile number." },
            { len: 10, message: "The input must have exactly 10 digits." },
          ]}
        >
          <Input
            placeholder="0700000000"
            value={telNo}
            onChange={(e) => setTelNo(e.target.value)}
            onKeyPress={preventTextInput}
          />
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
              <Input
                id="spouseNumber"
                value={spouseNumber}
                onChange={(event) => setSpouseNumber(event.target.value)}
              />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item label="CHILDREN" name="children">
              <Input
                id="childrenNumber"
                value={childrenNumber}
                onChange={(event) => setChildrenNumber(event.target.value)}
              />
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
                rules={[{ required: true, message: "Please enter percentage." }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                  value={SAPrincipal}
    onChange={(value) => setSAPrincipal(parseFloat(value))}
                />
              </Form.Item>
              <Form.Item
                label="SA % Payable to Spouse"
                name="saSpouse"
                rules={[{ required: true, message: "Please enter percentage." }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                  value={SASpouse}
    onChange={(value) => setSASpouse(parseFloat(value))}
                />
              </Form.Item>
              <Form.Item label="Cover Start Date">
              <DatePicker
                onChange={(date, dateString) => setCoverDate(dateString)}
                disabledDate={(current) => {
                  const today = new Date();
                  return current && current < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                }}
              />
            </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
            <Form.Item
  label="SA % Payable to Children"
  name="saChildren"
  rules={[{ required: true, message: "Please enter percentage." }]}
>
  <InputNumber
    style={{ width: "100%" }}
    formatter={(value) => `${value}%`}
    parser={(value) => value.replace("%", "")}
    step={0.1}
    value={SAChildren}
    onChange={(value) => setSAChildren(parseFloat(value))}
  />
</Form.Item>

<Form.Item
          label="Sum Assured"
          rules={[
            { required: true, message: ("Please input the benefit amount") },
            { type: "number", message: "The input is not a valid number!" },
          ]}
        >
          <InputNumber
            value={sumAssured}
            style={{ width: "100%" }}
            addonBefore="Ksh"
            // disabled={!sumAssuredEdit}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/(,*)/g, "")}
            onChange={setSumAssured}
          />
        </Form.Item>
              <Form.Item
          label="Policy Term(Years)"
          rules={[{ required: true, message: "Please select the Policy Term." }]}
          name="policyTerm"
          required
        >
          <Select
            id="policyTerm"
            placeholder="Please select the policy term"
            value={policyTerm}
            onChange={(value) => setPolicyTerm(parseFloat(value))}
          >
            {policyTerms.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
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
              {current === 1 && selectedOption === "callback" ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
      <IndividualCustomerDetailsModal visible={modalVisible} onCancel={() => setModalVisible(false)} onNext={handleModalClose} />
      <RequestCallbackModal
        visible={callbackModalVisible}
        onCancel={handleCallbackModalClose}
        onContinue={handleCallbackContinue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
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
