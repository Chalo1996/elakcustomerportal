import { useState } from "react";
import { Form, Input, Row, Col, DatePicker, Select } from "antd";
import sspFlag from "../../assets/flags/ssp.png";
import cdfFlag from "../../assets/flags/cdf.png";
import rwfFlag from "../../assets/flags/rwf.png";
import kesFlag from "../../assets/flags/kes.png";
import tzsFlag from "../../assets/flags/tzs.png";
import ugxFlag from "../../assets/flags/ugx.png";

const { Option } = Select;
const PhoneAreas = [
  { code: "+211", flag: sspFlag, country: "South Sudan" },
  { code: "+243", flag: cdfFlag, country: "DRC" },
  { code: "+250", flag: rwfFlag, country: "Rwanda" },
  { code: "+254", flag: kesFlag, country: "Kenya" },
  { code: "+255", flag: tzsFlag, country: "Tanzania" },
  { code: "+256", flag: ugxFlag, country: "Uganda" },
];

const PersonalDetailsForm = ({ form }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneArea, setPhoneArea] = useState("+254");
  const [country, setCountry] = useState("Kenya");
  const [birthDate, setBirthDate] = useState(null);

  const validateBirthDate = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }

    const today = new Date();
    const selectedDate = new Date(value);

    // Calculate minimum and maximum dates
    const minDate = new Date(
      today.getFullYear() - 70,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Check if selected date is within the acceptable range
    if (selectedDate >= minDate && selectedDate <= maxDate) {
      return Promise.resolve();
    }

    // Reject with appropriate error message
    if (selectedDate < maxDate) {
      return Promise.reject(new Error("Maximum required age is 70 years."));
    } else {
      return Promise.reject(new Error("Minimum required age is 18 years."));
    }
  };

  const handlePhoneAreaChange = (newValue) => {
    const selectedCountry = PhoneAreas.find((area) => area.code === newValue);
    if (selectedCountry) {
      setCountry(selectedCountry.country);
    }

    setPhoneArea(newValue);
  };

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

  const ChoosePhoneArea = ({ value, onChange }) => {
    return (
      <Select style={{ width: 100 }} value={value} onChange={onChange}>
        {PhoneAreas.map((item) => (
          <Option value={item.code} key={item.code}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{item.code}</span>
              <img
                src={item.flag}
                alt={item.country}
                style={{ width: "20px", marginLeft: "8px" }}
              />
            </div>
          </Option>
        ))}
      </Select>
    );
  };

  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col gap-4">
        <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
          Please enter your details
        </p>
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              onKeyPress={preventNumericInput}
              rules={[
                {
                  required: true,
                  message: "Please enter your first name.",
                },
              ]}
            >
              <Input
                placeholder="Enter your first name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              onKeyPress={preventNumericInput}
              rules={[
                {
                  required: true,
                  message: "Please enter your email address.",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                value={firstName}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "Please select date of birth.",
                },
                { validator: validateBirthDate },
              ]}
              style={{ width: "100%", cursor: "pointer" }}
            >
              <DatePicker
                style={{ width: "100%" }}
                id="birthDate"
                onChange={(value) => setBirthDate(value)}
                inputReadOnly={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              onKeyPress={preventNumericInput}
              rules={[
                {
                  required: true,
                  message: "Please enter your last name.",
                },
              ]}
            >
              <Input
                placeholder="Enter your last name"
                value={firstName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              onKeyPress={preventTextInput}
              name="phoneNo"
              rules={[
                {
                  required: true,
                  message: "Please input a mobile number.",
                },
                {
                  len: 9,
                  message: "The input must have exactly 9 digits.!",
                },
              ]}
            >
              <Input
                addonBefore={
                  <ChoosePhoneArea
                    value={phoneArea}
                    onChange={handlePhoneAreaChange}
                  />
                }
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PersonalDetailsForm;
