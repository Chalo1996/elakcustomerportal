import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Quotation from "./Quotation";
import dayjs from 'dayjs';
import { Steps, Radio, Space, Button, Row, Col, Form, Input, Select, DatePicker, Modal, Checkbox, InputNumber, Divider, Typography, Switch, Card} from "antd";
import sspFlag from '../../assets/flags/ssp.png';
import cdfFlag from '../../assets/flags/cdf.png';
import rwfFlag from '../../assets/flags/rwf.png';
import kesFlag from '../../assets/flags/kes.png';
import tzsFlag from '../../assets/flags/tzs.png';
import ugxFlag from '../../assets/flags/ugx.png';


const { Step } = Steps;


const RequestCallbackModal = ({ visible, onCancel, onContinue, selectedOption, setSelectedOption }) => {
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Modal
      title="What would you like to do?"
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
      <div style={{ width: '100%' }}>
        <Radio.Group onChange={handleOptionChange} value={selectedOption} style={{ width: '100%' }}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Radio value="generate">Generate Quote</Radio>
            <Divider style={{ margin: '8px 0', width: '100%' }} />
            <Radio value="callback">Request a Call Back</Radio>
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
};

const GroupCriticalIllness = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [policyTerm, setPolicyTerm] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [clientEmailAddress, setClientEmailAddress] = useState();
  // const [telNo, setTelNo] = useState();
  const [phoneArea, setPhoneArea] = React.useState("+254");
  const [principalNumber, setPrincipalNumber] = React.useState();
  const [spouseNumber, setSpouseNumber] = useState();
  const [spouse, setSpouse] = useState(false);
  // const [spouseDOB, setSpouseDOB] = useState();
  const [childrenNumber, setChildrenNumber] = useState();
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [SAPrincipal, setSAPrincipal] = useState();
  const [SASpouse, setSASpouse] = useState();
  const [SAChildren, setSAChildren] = useState();
  const [sumAssured, setSumAssured] = useState();
  const [coverDate,setCoverDate] = useState();
  const [coverExpiryDate, setCoverExpiryDate] = useState();
  const [callbackModalVisible, setCallbackModalVisible] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({});
  const [showHiddenFields, setShowHiddenFields] = useState(false);

 
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

const navigate = useNavigate();


const PhoneAreas = [
  { code: "+211", flag: sspFlag, country: "South Sudan" },
  { code: "+243", flag: cdfFlag, country: "DRC" },
  { code: "+250", flag: rwfFlag, country: "Rwanda" },
  { code: "+254", flag: kesFlag, country: "Kenya" },
  { code: "+255", flag: tzsFlag, country: "Tanzania" },
  { code: "+256", flag: ugxFlag, country: "Uganda" },
];

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

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD'); 
};


const handleCoverDateChange = (date, timeInYears) => {
  if (!date) {
    form.resetFields(["coverExpiryDate"]);
    setCoverExpiryDate();
    return null;
  }
  const oneYearLater = date
    .clone()
    .add(timeInYears, "year")
    .subtract(1, "day");
  setCoverDate(date);

  return oneYearLater;
};

const disabledDate = (current) => {
  const today = new Date();
  return (
    current &&
    current <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
};

const disableCoverExpiryDate = (date) => {
  if (coverDate) {
    const currentDate = new Date(coverDate);
    let newCoverExpiryDate = new Date(coverDate);
    newCoverExpiryDate.setFullYear(currentDate.getFullYear() + 1);

    // Adjust for leap years
    if (currentDate.getDate() === 29 && currentDate.getMonth() === 1) {
      if (newCoverExpiryDate.getMonth() === 1 && newCoverExpiryDate.getDate() === 28) {
        newCoverExpiryDate.setDate(1); // Start from March 1
        newCoverExpiryDate.setMonth(2); // Adjust to March
      }
    }

    const formattedCoverExpiryDate = new Date(
      newCoverExpiryDate.getFullYear(),
      newCoverExpiryDate.getMonth(),
      newCoverExpiryDate.getDate()
    );

    return date && date < formattedCoverExpiryDate;
  }
};

  const today = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);
    
  const policyTerms = ["1", "2", "3"];
  const { Option } = Select;
  

  const handleNextClick = async () => {
    try {
      await form.validateFields();
      const currentValues = form.getFieldsValue();
      setFormData(prevFormData => ({
        ...prevFormData,
        [steps[current]]: currentValues,
      }));

      if (current === 0 && !termsChecked) {
        alert("Please accept the terms and conditions");
        return;
      } else if (current === 0) {
        setCallbackModalVisible(true); 
      } else if (current === steps.length - 2) {
        setCurrent(current + 1); // Move to the next step
        setShowHiddenFields(true); // Show hidden fields for the final step
      } else {
        setCurrent(current + 1); // Move to the next step
      }
      const values = await form.validateFields();
        console.log("VALUES", values)
        console.log("CURRENT", currentValues)
        // setFormData(prevFormData => ({
        //   ...prevFormData,
        //   [steps[current]]: values,
        // }));
        setFormData({...formData, ...values});
        console.log("Form data:", formData);
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };
  
  
  const handlePrevClick = () => {
    setCurrent(current - 1);
  };

  const handleCallbackModalClose = () => {
    setCallbackModalVisible(false);
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

  const renderReviewAndConfirm = () => {
    console.log ("FORM DATA", formData)
    return (
      <Form layout="vertical">
        <Typography.Text strong>Please confirm your insurance purchase details to continue</Typography.Text>
        <Card title="PERSONAL DETAILS">
          <Row gutter={16}>
          <Col span={12}>
            <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>First Name:</p>
            <div style={{ marginTop: '0px' }}>{formData?.firstName}</div>
          </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Last Name:</p>
              <div style={{ marginTop: '0px' }}>{formData?.lastName }</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Email Address:</p>
              <div style={{ marginTop: '0px' }}>{formData?.email }</div>
            </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Mobile Number:</p>
              <div style={{ marginTop: '0px' }}>{formData?.mobileNumber }</div>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Date of Birth:</p>
              <div style={{ marginTop: '0px' }}>{formatDate(formData.dob)}</div>
            </Col>
          </Row>
        </Card>
        <br></br>
        <Card title="INSURED MEMBERS">
          <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Number of Principal Members: </p>
              <div style={{ marginTop: '0px' }}>{formData?.principalNumber }</div>
            </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Spouse Date of Birth: </p>
              <div style={{ marginTop: '0px' }}>{formatDate(formData.spouseDOB)}</div>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Number of Spouses: </p>
              <div style={{ marginTop: '0px' }}>{formData?.spouseNumber }</div>
            </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Number of Children: </p>
              <div style={{ marginTop: '0px' }}>{formData?.childrenNumber}</div>
            </Col>
          </Row>
        </Card>
        <br></br>
        <Card title="COVERAGE">
          <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Sum Assured: </p>
              <div style={{ marginTop: '0px' }}>{formData?.sumAssured }</div>
            </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Principal member percentage of sum assured: </p>
              <div style={{ marginTop: '0px' }}>{formData?.SAPrincipal }</div>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Spouse percentage of sum assured: </p>
              <div style={{ marginTop: '0px' }}>{formData?.SASpouse }</div>
            </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Children percentage of sum assured: </p>
              <div style={{ marginTop: '0px' }}>{formData?.SAChildren }</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Cover Commencement Date: </p>
              <div style={{ marginTop: '0px' }}>{formatDate(formData.coverDate)}</div>
            </Col>
            <Col span={12}>
              <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Policy Term (Years): </p>
              <div style={{ marginTop: '0px' }}>{formData?.policyTerm }</div>
            </Col>
            <Col span={12}>
          <p style={{ fontWeight: 'lighter', color: '#888', marginBottom: '0px' }}>Cover End Date: </p>
          <div style={{ marginTop: '0px' }}>{formatDate(formData.coverExpiryDate)}</div>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  };
  
  const steps = [
    {
      title: "Personal details",
      content: (
        <Form form={form} onFinish={(values) => console.log('Form submitted:', values)} layout="vertical" style={{ marginTop: '24px', padding: '16px' }}>
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

              <Form.Item label="Date of Birth" name="dob"
              rules={[{ required: true, message: "Please enter date of birth." }]}>
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
          <Form.Item>
            <Checkbox
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            >
              I accept the terms and privacy policies
            </Checkbox>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Insured Members",
      content: (
        <Form form={form} layout="vertical" style={{ marginTop: '24px', padding: '16px' }}>
          <Typography.Text strong>Please enter the number of family members to be insured</Typography.Text>
          <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
          <Form.Item label="Spouse" name="spouse">
            <Switch onChange={(checked) => setSpouse(checked)} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
          <Form.Item
            label="Spouse Date of Birth"
            name="spouseDOB"
            rules={[
              { required: spouse, message: "Please enter spouse date of birth." },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabled={!spouse}
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
      </Row>
          <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
            <Form.Item label="Number of principal members" name="principalNumber"
              rules={[{ required: true, message: "Please enter the number of principal members." }]}>
              <Input
                id="principalNumber"
                value={principalNumber}
                onChange={(event) => setPrincipalNumber(event.target.value)}
              />
              </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
          <Form.Item
            label="Number of Spouses"
            name="spouseNumber"
            rules={[
              { required: spouse, message: "Please enter the number of spouses." },
            ]}
          >
            <Input
              id="spouseNumber"
              value={spouseNumber}
              onChange={(event) => setSpouseNumber(event.target.value)}
              disabled={!spouse}
            />
          </Form.Item>
        </Col>
        </Row>
        <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
          <Form.Item label="Children" name="children">
            <Switch onChange={(checked) => setChildrenVisible(checked)} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
          <Form.Item
            label="Number of Children"
            name="childrenNumber"
            rules={[
              {
                required: childrenVisible,
                message: "Please enter the number of children.",
              },
            ]}
          >
            <Input
              id="childrenNumber"
              value={childrenNumber}
              onChange={(event) => setChildrenNumber(event.target.value)}
              disabled={!childrenVisible}
            />
          </Form.Item>
        </Col>
      </Row>
        </Form>
      ),
    },
    {
      title: "Coverage",
      content: (
        <Form form={form} layout="vertical" style={{ marginTop: '24px', padding: '16px' }}>
          <Typography.Text strong>Please confirm the sum assured and percentage sum assured for each member</Typography.Text>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
            <Form.Item
          label="Sum Assured"
          name="sumAssured"
          rules={[{ required: true, message: "Please input sum assured." }]}
        >
          <InputNumber
            value={sumAssured}
            style={{ width: "100%" }}
            addonBefore="Ksh"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/(,*)/g, "")}
            onChange={setSumAssured}
          />
        </Form.Item>
              <Form.Item
                label="Spouse percentage of sum assured"
                name="SASpouse"
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
              <Form.Item
                    label="Cover Commencement Date"
                    name="coverDate"
                    rules={[
                      {
                        required: true,
                        message: ("Please select start date."),
                      },
                    ]}
                    style={{ width: "100%", cursor: "pointer" }}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      id="coverDate"
                      disabledDate={disabledDate}
                      onChange={handleCoverDateChange}
                       inputReadOnly={true}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Cover End Date"
                    name="coverExpiryDate"
                    style={{ width: "100%", cursor: "pointer" }}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      id="coverExpiryDate"
                      disabled
                      inputReadOnly={true}
                    />
                  </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
            <Form.Item
  label="Principal member percentage of sum assured"
  name="SAPrincipal"
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
                label="Children percentage of sum assured"
                name="SAChildren"
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
      title: "Review",
      content: (
        <div>
          {renderReviewAndConfirm(formData)}
        </div>
      ),
    },
  ];

  
  return (
    <div>
<h1 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Critical Illness Cover</h1>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: '24px' }}>
        {steps[current].content}
      </div>
      <div className="steps-action" style={{ marginTop: '24px' }}>
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
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={async () => {
              try {
                await form.validateFields();
                form.submit(); // Submit the form
                navigate('quotation'); // Navigate to the Quotation component
              } catch (errorInfo) {
                console.log('Failed:', errorInfo);
              }
            }}
          >
            Generate Quote
          </Button>
        )}
      </div>
      <RequestCallbackModal
        visible={callbackModalVisible}
        onCancel={handleCallbackModalClose}
        onContinue={handleCallbackContinue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default GroupCriticalIllness;
