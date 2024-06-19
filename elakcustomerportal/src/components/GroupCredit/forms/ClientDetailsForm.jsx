import React, { useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  Button,
} from "antd";
import moment from "moment";
import kenyaFlag from "../../../assets/flags/kes.png";
import tzFlag from "../../../assets/flags/tzs.png";
import ugFlag from "../../../assets/flags/ugx.png";
import rwandaFlag from "../../../assets/flags/rwf.png";
import ssudanFlag from "../../../assets/flags/ssp.png";
import congoFlag from "../../../assets/flags/cdf.png";
import Terms from "../../../pages/TermsAndPrivacy/Terms";
import Privacy from "../../../pages/TermsAndPrivacy/Privacy";

const { Item } = Form;
const { Option } = Select;

const countryOptions = [
  { label: "Kenya", value: "+254", flag: kenyaFlag },
  { label: "Uganda", value: "+256", flag: ugFlag },
  { label: "Tanzania", value: "+255", flag: tzFlag },
  { label: "Rwanda", value: "+250", flag: rwandaFlag },
  { label: "Congo", value: "+243", flag: congoFlag },
  { label: "South-Sudan", value: "+211", flag: ssudanFlag },
];

const ClientDetailsForm = ({ formData, handleFormChange, form }) => {
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const initialFormData = {
    ...formData,
    country: "Kenya",
    countryCode: formData.countryCode || "+254",
    countryFlag: formData.countryFlag || kenyaFlag,
  };

  const handleInputChange = (key, value) => {
    handleFormChange(key, value);
  };

  const handlePhonePrefixChange = (value) => {
    handleFormChange("countryCode", value);
    const selectedCountry = countryOptions.find(
      (country) => country.value === value
    );
    handleFormChange("countryFlag", selectedCountry?.flag || null);
  };

  const handlePhoneChange = (e) => {
    let phoneNumber = e.target.value.replace(/^0+/, "");
    handleFormChange("phone", phoneNumber);
  };

  const disabledDate = (current) => {
    if (!current) return false;
    const today = new Date();
    const selectedDate = new Date(current);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const hasBirthdayOccurred =
      today.getMonth() > selectedDate.getMonth() ||
      (today.getMonth() === selectedDate.getMonth() &&
        today.getDate() >= selectedDate.getDate());

    return age < 18 || age > 65 || !hasBirthdayOccurred;
  };

  const validatePhone = (_, value) => {
    const cleanedPhoneNumber = value.replace(/[ -()]/g, "");
    const phoneRegex = /^\d{10}$/;
    if (value && !phoneRegex.test(cleanedPhoneNumber)) {
      return Promise.reject("Please enter a valid phone number");
    }
    return Promise.resolve();
  };

  const handleTermsClose = () => {
    setTermsVisible(false);
    handleFormChange("termschecked", true);
  };

  const handlePrivacyClose = () => {
    setPrivacyVisible(false);
    handleFormChange("termschecked", true);
  };

  return (
    <>
      <Form layout='vertical' form={form} initialValues={initialFormData}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Item
              label='First Name'
              name='firstname'
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                placeholder='Enter First Name'
                value={formData.firstname}
                onChange={(e) => handleInputChange("firstname", e.target.value)}
              />
            </Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Item
              label='Last Name'
              name='lastname'
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                placeholder='Enter Last Name'
                value={formData.lastname}
                onChange={(e) => handleInputChange("lastname", e.target.value)}
              />
            </Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Item
              label='Gender'
              name='gender'
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select
                className='w-full'
                placeholder='Select Gender'
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
              >
                <Option value='Male'>Male</Option>
                <Option value='Female'>Female</Option>
              </Select>
            </Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
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
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Item
              label='Date Of Birth'
              name='dob'
              rules={[
                { required: true, message: "Please input your date of birth!" },
              ]}
            >
              <DatePicker
                format='MM/DD/YYYY'
                placeholder='Select Date of Birth'
                value={formData.dob ? moment(formData.dob, "MM/DD/YYYY") : null}
                onChange={(date, dateString) =>
                  handleInputChange("dob", dateString)
                }
                disabledDate={disabledDate}
                className='w-full border rounded'
              />
            </Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Item
              label='Mobile Number'
              name='phone'
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              rules={[
                { required: true, message: "Please input your phone number!" },
                { validator: validatePhone },
              ]}
            >
              <Input
                addonBefore={
                  <Select
                    value={formData.countryCode || "+254"}
                    onChange={handlePhonePrefixChange}
                    style={{ width: 120 }}
                  >
                    {countryOptions.map((country) => (
                      <Option key={country.value} value={country.value}>
                        <div className='flex items-center'>
                          <img
                            src={country.flag}
                            alt={country.label}
                            className='w-6 h-4 object-contain mr-2'
                          />
                          {country.value}
                        </div>
                      </Option>
                    ))}
                  </Select>
                }
                placeholder='700000000'
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Item
              label='Country'
              name='country'
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select
                className='w-full'
                placeholder='Select Country'
                value={formData.country}
                onChange={(value) => handleInputChange("country", value)}
              >
                <Option value='Kenya'>Kenya</Option>
                <Option value='Uganda'>Uganda</Option>
                <Option value='Tanzania'>Tanzania</Option>
                <Option value='Rwanda'>Rwanda</Option>
                <Option value='Congo'>Congo</Option>
                <Option value='South-Sudan'>South-Sudan</Option>
              </Select>
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Item
              name='terms'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "You must accept the terms and conditions"
                        ),
                },
              ]}
            >
              <Checkbox
                checked={formData.termschecked}
                onChange={(e) =>
                  handleInputChange("termschecked", e.target.checked)
                }
              >
                I accept the
                <Button
                  type='link'
                  className='text-red-800 p-1'
                  style={{ color: "brown" }}
                  onClick={() => setTermsVisible(true)}
                >
                  terms
                </Button>
                &
                <Button
                  type='link'
                  className='text-red-800 p-1'
                  style={{ color: "brown" }}
                  onClick={() => setPrivacyVisible(true)}
                >
                  privacy policy
                </Button>
              </Checkbox>
            </Item>
          </Col>
        </Row>
      </Form>
      <Terms visible={termsVisible} onClose={handleTermsClose} />
      <Privacy visible={privacyVisible} onClose={handlePrivacyClose} />
    </>
  );
};

export default ClientDetailsForm;
