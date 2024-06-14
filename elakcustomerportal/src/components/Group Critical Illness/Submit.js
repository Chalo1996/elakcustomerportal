import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { LeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import sspFlag from "../../assets/flags/ssp.png";
import cdfFlag from "../../assets/flags/cdf.png";
import rwfFlag from "../../assets/flags/rwf.png";
import kesFlag from "../../assets/flags/kes.png";
import tzsFlag from "../../assets/flags/tzs.png";
import ugxFlag from "../../assets/flags/ugx.png";

const { Option } = Select;

const Submit = () => {
  const [form] = Form.useForm();
  const [clientEmailAddress, setClientEmailAddress] = useState('');
  const [phoneArea, setPhoneArea] = useState("+254");

  const navigate = useNavigate();

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    navigate("/critical-illness/submit"); // Example navigation after form submission
  };

  const handleNavigate = () => {
    navigate(-1);
  };

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{area.code}</span>
            <img
              src={area.flag}
              alt={area.country}
              style={{ width: "20px", marginLeft: "8px" }}
            />
          </div>
        </Option>
      ))}
    </Select>
  );

  return (
    <div className="mb-4">
      <span>
        <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
        </button>
      </span>
      <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
        Request Callback
      </span>
      <div className="steps-content" style={{ marginTop: "24px" }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-0">
            <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
              Please confirm your details
            </p>
            <p
              style={{
                fontWeight: "lighter",
                color: "#888",
                marginBottom: "0px",
              }}
            >
              These are the details our agent will use to contact you.
            </p>
          </div>
          <br />
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: "16px" }}>
              <Form.Item
                label="Enter First Name"
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
                    <ChoosePhoneArea value={phoneArea} onChange={setPhoneArea} />
                  }
                  placeholder="Enter your mobile number"
                  onKeyPress={preventTextInput}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: "16px" }}>
              <Form.Item
                label="Enter Last Name"
                name="lastName"
                required
                rules={[{ required: true, message: "Please input last name." }]}
              >
                <Input id="lastName" placeholder="Last name" />
              </Form.Item>
              <Form.Item
                label="Enter Email Address"
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
            </Col>
          </Row>
          <div className="notification" style={{ marginTop: "16px", marginBottom: "16px", color: "#888" }}>
            <ExclamationCircleOutlined style={{ marginRight: "8px", color: "black" }} />
            Edit any field before clicking submit if necessary.
          </div>
          <Form.Item style={{ marginTop: "16px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Submit;
