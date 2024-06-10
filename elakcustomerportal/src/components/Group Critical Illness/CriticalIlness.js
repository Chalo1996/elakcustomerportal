import React, { useState } from "react";
import { Steps, Radio, Space, Button, Row, Col, Form, Input, Select, DatePicker, Modal, Checkbox, InputNumber, Divider, Typography, Table} from "antd";
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
      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        <Space direction="vertical">
          <Radio value="generate">Generate Quote</Radio>
          <Divider />
          <Radio value="callback">Request a Call Back</Radio>
        </Space>
      </Radio.Group>
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
  const [telNo, setTelNo] = useState();
  const [phoneArea, setPhoneArea] = React.useState("+254");
  const [spouseNumber, setSpouseNumber] = useState();
  const [childrenNumber, setChildrenNumber] = useState();
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
  const [ setTableColumns] = useState([]);
  const [showHiddenFields, setShowHiddenFields] = useState(false);

  const [formatter] = React.useState(new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
}));

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

const PhoneAreas = [
  { code: "+211", flag: sspFlag, country: "South Sudan" },
  { code: "+243", flag: cdfFlag, country: "DRC" },
  { code: "+250", flag: rwfFlag, country: "Rwanda" },
  { code: "+254", flag: kesFlag, country: "Kenya" },
  { code: "+255", flag: tzsFlag, country: "Tanzania" },
  { code: "+256", flag: ugxFlag, country: "Uganda" },
];

const handleTableColumnsChange = (columns) => {
  setTableColumns(columns);
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

const columns = [
  {
    title: "Attribute",
    dataIndex: "attribute",
    key: "attribute",
    width: "50%",
    render: (text) => <Text strong>{text}</Text>,
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    width: "50%",
  },
];

const tableColumns = [
  {
    title: "Member Type",
    dataIndex: "name",
    key: "name",
    width: "15%",
  },
  {
    title: "Lives",
    dataIndex: "individualLives",
    key: "individualLives",
    width: "15%",
  },
  {
    title: "Sum Assured Per Member",
    dataIndex: "sumAssured",
    key: "sumAssured",
    width: "15%",
    render: (text) => formatter.format(text)
  },
  {
    title: "Total Sum Assured",
    dataIndex: "totalSumAssured",
    key: "totalSumAssured",
    width: "15%",
    render: (text) => formatter.format(text)
  },
  {
    title: "Premium Per Member",
    dataIndex: "ciPremium",
    key: "ciPremium",
    width: "15%",
    render: (text) => formatter.format(text)
  },
  {
    title: "Total Premium",
    dataIndex: "totalciPremium",
    key: "totalciPremium",
    width: "15%",
    render: (text) => formatter.format(text)
  },
];

const contactDetails = [
  { key: "clientName", attribute: "Name", value: formData.clientName },
  { key: "telNo", attribute: "Phone Number", value: formData.telNo},
  { key: "clientEmailAddress", attribute: "Email", value: formData.clientEmailAddress },
];

const criticalIllnessCover = [
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
];

const funeralExpenseCover = [
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
  {
    name: "",
    individualLives: "",
    sumAssured: "",
    totalSumAssured: "",
    ciPremium: "",
    totalciPremium: "",
  },
     ];

     const terminalIllnessRider = [
      {
        name: "",
        individualLives: "",
        sumAssured: "",
        totalSumAssured: "",
        ciPremium: "",
        totalciPremium: "",
      },
      {
        name: "",
        individualLives: "",
        sumAssured: "",
        totalSumAssured: "",
        ciPremium: "",
        totalciPremium: "",
      },
      {
        name: "",
        individualLives: "",
        sumAssured: "",
        totalSumAssured: "",
        ciPremium: "",
        totalciPremium: "",
      },
      {
        name: "",
        individualLives: "",
        sumAssured: "",
        totalSumAssured: "",
        ciPremium: "",
        totalciPremium: "",
      },
   ];

   const totalPremiumDetails = [
    {
      name: "",
      individualLives: "",
      sumAssured: "",
      totalSumAssured: "",
      ciPremium: "",
      totalciPremium: "",
    },
    {
      name: "",
      individualLives: "",
      sumAssured: "",
      totalSumAssured: "",
      ciPremium: "",
      totalciPremium: "",
    },
    {
      name: "",
      individualLives: "",
      sumAssured: "",
      totalSumAssured: "",
      ciPremium: "",
      totalciPremium: "",
    },
    {
      name: "",
      individualLives: "",
      sumAssured: "",
      totalSumAssured: "",
      ciPremium: "",
      totalciPremium: "",
    },
  ];

  const today = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);
    
  const policyTerms = ["1", "2", "3"];
  const { Option } = Select;
  const { Text, Title } = Typography;

  const handleNextClick = async () => {
    try {
      await form.validateFields();
      if (current === 0 && !termsChecked) {
        alert("Please accept the terms and conditions");
        return;
      } else if (current === 0) {
        setCallbackModalVisible(true); 
      } else if (current === steps.length - 2) {
        const values = await form.validateFields();
        setFormData({ ...values });
        console.log("Form data:", formData);
        setCurrent(current + 1); // Move to the next step
        setShowHiddenFields(true); // Show hidden fields for the final step
      } else {
        setCurrent(current + 1); // Move to the next step
      }
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
  

  const steps = [
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

              <Form.Item label="Date of Birth" name="dob"
              rules={[{ required: true, message: "Please entger date of birth." }]}>
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
          <Typography.Text strong>How many members would you like to insure?</Typography.Text>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item label="SPOUSE" name="spouses"
              rules={[{ required: true, message: "Please enter the number of spouses." }]}>
              <Input
                id="spouseNumber"
                value={spouseNumber}
                onChange={(event) => setSpouseNumber(event.target.value)}
              />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
              <Form.Item label="CHILDREN" name="children"
              rules={[{ required: true, message: "Please enter the number of children." }]}>
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
          <Typography.Text strong>Please confirm the sum assured and percentage sum assured for each member</Typography.Text>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '16px' }}>
            <Form.Item
          label="Sum Assured"
          rules={[{ required: true, message: "Please input sum assured." }]}
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
      title: "Review and Confirm",
      content: (
        <div>Rewiew and Confirm</div>
      ),
    },
    {
      title: "Get Quotation",
      content: (
        <>
          <div
            style={{
              border: "2px solid black",
              maxWidth: "800px",
              margin: "auto",
              position: "relative",
              paddingBottom: "60px",
            }}
          >
            <div style={{ maxWidth: "750px", margin: "auto" }}>
              <Row
                justify="space-between"
                align="middle"
                style={{ marginTop: "20px" }}
              >
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    EQUITY LIFE ASSURANCE (KENYA) LIMITED
                  </Title>
                  <Title level={4} style={{ margin: 0 }}>
                    {formData.segment} Quotation
                  </Title>
                </Col>
                <Col>
                  <div style={{ textAlign: "right" }}>
                    <img
                      src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain"
                      alt="Company Logo"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "120px",
                        marginLeft: "30px",
                      }}
                    />
                    <Text style={{ display: "block", marginTop: "10px" }}>
                      {currentDate}
                    </Text>
                  </div>
                </Col>
              </Row>
  
              <Title style={{ textAlign: "left" }} level={4}>
                Contact Details
              </Title>
              <Table
                columns={columns}
                dataSource={contactDetails}
                pagination={false}
                bordered
                showHeader={false}
                size="middle"
                style={{
                  border: "2px solid maroon",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              />
  
              <Title style={{ textAlign: "left" }} level={4}>
                Policy Details
              </Title>
              <Title style={{ textAlign: "center", color: "red" }} level={4}>
                Personal Critical Illness Cover
              </Title>
              <Table
                columns={tableColumns}
                dataSource={criticalIllnessCover}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                  border: "2px solid maroon",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              />
  
              <Title style={{ textAlign: "center" }} level={4}>
                Personal Funeral Expense Rider
              </Title>
              <Table
                columns={tableColumns}
                dataSource={funeralExpenseCover}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                  border: "2px solid maroon",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              />
  
              <Title style={{ textAlign: "center" }} level={4}>
                Personal Terminal Illness Rider
              </Title>
              <Table
                columns={tableColumns}
                dataSource={terminalIllnessRider}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                  border: "2px solid maroon",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              />
  
              <Title style={{ textAlign: "center" }} level={4}>
                Total Premiums
              </Title>
              <Table
                columns={tableColumns}
                dataSource={totalPremiumDetails}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                  border: "2px solid maroon",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              />
            </div>
  
            <div
              style={{
                textAlign: "justify",
                marginTop: "20px",
                marginLeft: "15px",
                padding: "10px",
              }}
            >
              <Text>Quotation is valid for 90 days since the date of issue</Text>
              <br />
              <table border="1">
                <tr>
                  <th>Category of member</th>
                  <th>Minimum entry age</th>
                  <th>Maximum entry age</th>
                </tr>
                <tr>
                  <td>Life Assured (Main member)</td>
                  <td>18 years</td>
                  <td>70 years</td>
                </tr>
                <tr>
                  <td>Spouse</td>
                  <td>18 years</td>
                  <td>70 years</td>
                </tr>
                <tr>
                  <td>Children</td>
                  <td>37 weeks</td>
                  <td>24 years</td>
                </tr>
              </table>
              <br />
              <p>
                <strong>Onboarding requirements:</strong> Member data in the below
                format
              </p>
              <table>
                <thead>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Name
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Date of Birth
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    ID/Passport Number
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Phone Number
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Main Member
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Relation to Member
                  </th>
                </thead>
                <tbody>
                  <td style={{ border: "1px solid black", padding: "8px" }}></td>
                  <td style={{ border: "1px solid black", padding: "8px" }}></td>
                  <td style={{ border: "1px solid black", padding: "8px" }}></td>
                  <td style={{ border: "1px solid black", padding: "8px" }}></td>
                  <td style={{ border: "1px solid black", padding: "8px" }}></td>
                  <td style={{ border: "1px solid black", padding: "8px" }}></td>
                </tbody>
              </table>
              <br />
              <Text>
                Copies of ID/Passport, Birth Certificate/Notification of members
                covered.
              </Text>
              <div>
                <p style={{ fontStyle: "italic" }}>
                  Additional documents for individual cover: KRA Pin of main
                  member.
                </p>
                <p style={{ fontStyle: "italic" }}>
                  Additional documents for Groups/Corporates: Certificate of
                  Registration & KRA Pin.
                </p>
              </div>
              <Text strong>Contacts</Text>
              <br />
              <Text>Email: businessdevelopment@equityinsurance.co.ke</Text>
              <br />
              <Text>Tel: +254763026000</Text>
              <br />
            </div>
  
            <div
              style={{
                backgroundColor: "maroon",
                position: "absolute",
                bottom: "0",
                width: "100%",
                textAlign: "center",
                color: "white",
                padding: "5px 0",
              }}
            >
              Equity Life Assurance (Kenya) Limited
            </div>
          </div>
        </>
      ),
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
              {current === 0 && selectedOption === "callback" ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
    
      <RequestCallbackModal
        visible={callbackModalVisible}
        onCancel={handleCallbackModalClose}
        onContinue={handleCallbackContinue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
};

export default GroupCriticalIllness;
