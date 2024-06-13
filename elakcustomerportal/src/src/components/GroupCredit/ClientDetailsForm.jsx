import React from "react";
import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import moment from "moment";
import kenyaFlag from "../../assets/flags/kes.png";
import tzFlag from "../../assets/flags/tzs.png";
import ugFlag from "../../assets/flags/ugx.png";
import rwandaFlag from "../../assets/flags/rwf.png";
import ssudanFlag from "../../assets/flags/ssp.png";
import congoFlag from "../../assets/flags/cdf.png";

const { Item } = Form;
const { Option } = Select;

const ClientDetailsForm = ({ formData, handleFormChange }) => {
  const handleNameChange = (e) => {
    handleFormChange("username", e.target.value);
  };

  const handleCountryCodeChange = (value) => {
    let countryCode;
    let countryFlag;
    switch (value) {
      case "Kenya":
        countryCode = "+254";
        countryFlag = kenyaFlag;
        break;
      case "Uganda":
        countryCode = "+256";
        countryFlag = ugFlag;
        break;
      case "Tanzania":
        countryCode = "+255";
        countryFlag = tzFlag;
        break;
      case "Rwanda":
        countryCode = "+250";
        countryFlag = rwandaFlag;
        break;
      case "Congo":
        countryCode = "+243";
        countryFlag = congoFlag;
        break;
      case "South-Sudan":
        countryCode = "+211";
        countryFlag = ssudanFlag;
        break;
      default:
        countryCode = "+000";
        countryFlag = null;
    }
    handleFormChange("country", value);
    handleFormChange("countryCode", countryCode);
    handleFormChange("countryFlag", countryFlag);
  };

  const handlePhoneChange = (e) => {
    let phoneNumber = e.target.value;
    if (phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.replace(/^0+/, "");
    }
    handleFormChange("phone", phoneNumber);
  };

  const handleDoBChange = (date) => {
    handleFormChange("dob", date ? date.toISOString() : null);
  };

  const handleEmailChange = (e) => {
    handleFormChange("email", e.target.value);
  };

  const disabledDate = (current) => {
    if (!current) return false;
    const selectedDate = new Date(current);
    const today = new Date();
    let age = today.getFullYear() - selectedDate.getFullYear();
    const hasBirthdayOccurred =
      today.getMonth() > selectedDate.getMonth() ||
      (today.getMonth() === selectedDate.getMonth() &&
        today.getDate() >= selectedDate.getDate());
    if (!hasBirthdayOccurred) {
      age--;
    }
    return age < 18 || age > 65;
  };

  const disableNotNumberKey = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const validatePhone = (_, value) => {
    const cleanedPhoneNumber = value.replace(/[ -()]/g, "");
    const phoneRegex = /^\d{9}$/;
    if (value && !phoneRegex.test(cleanedPhoneNumber)) {
      return Promise.reject("Please enter a valid phone number");
    }
    return Promise.resolve();
  };

  return (
    <Form layout='vertical'>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='Name'
            name='username'
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              placeholder='Enter Name'
              value={formData.username}
              onChange={handleNameChange}
            />
          </Item>
          <Item
            label='Country'
            name='country'
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              className='w-full'
              placeholder='Select Country'
              value={formData.country}
              onChange={handleCountryCodeChange}
            >
              <Option value='Kenya'>Kenya</Option>
              <Option value='Uganda'>Uganda</Option>
              <Option value='Tanzania'>Tanzania</Option>
              <Option value='Rwanda'>Rwanda</Option>
              <Option value='Congo'>Congo</Option>
              <Option value='South-Sudan'>South-Sudan</Option>
            </Select>
          </Item>

          <Item
            label='Phone No'
            name='phone'
            onKeyPress={disableNotNumberKey}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              { validator: validatePhone },
            ]}
          >
            <Input
              addonBefore={
                <div className='flex items-center space-x-1 mr-5'>
                  <span className='text-sm'>{formData.countryCode}</span>
                  {formData.countryFlag && (
                    <img
                      src={formData.countryFlag}
                      alt={formData.country}
                      className='w-6 h-4 object-contain'
                    />
                  )}
                </div>
              }
              placeholder='700000000'
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='Email'
            name='email'
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder='Enter Email'
              value={formData.email}
              onChange={handleEmailChange}
            />
          </Item>
          <Item
            label='Date Of Birth'
            name='dob'
            rules={[
              {
                required: true,
                message: "Please input your date of birth!",
              },
            ]}
          >
            <DatePicker
              format='MM/DD/YYYY'
              placeholder='Select Date of Birth'
              value={formData.dob ? moment(formData.dob) : null}
              onChange={handleDoBChange}
              disabledDate={disabledDate}
              className='w-full border rounded'
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ClientDetailsForm;
