import { useEffect } from "react";
import { Form, Input, Row, Col, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
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

const CallBackForm = ({ form, formData, setFormData }) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handlePhoneAreaChange = (newValue) => {
    const selectedCountry = PhoneAreas.find((area) => area.code === newValue);
    if (selectedCountry) {
      setFormData({
        ...formData,
        phoneArea: newValue,
        country: selectedCountry.country,
      });
    }
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

  return (
    <>
      <div className='w-[710px] h-[76px] top-[408px] left-[425px] mt-2 mb-10 py-3 px-0 flex flex-col gap-0'>
        <p className='font-open-sans text-[16px] font-semibold leading-[24px] text-left'>
          Please confirm your details
        </p>
        <p className='text-sm font-normal font-open-sans text-left text-[#929497]'>
          These are the details our agent will use to contact you
        </p>
      </div>

      <Form form={form} layout='vertical'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label='First Name'
              name='firstName'
              onKeyPress={preventNumericInput}
              rules={[
                {
                  required: true,
                  message: "Please enter your first name.",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Input
                placeholder='Enter your first name'
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label='Mobile Number'
              name='phoneNo'
              onKeyPress={preventTextInput}
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
              style={{ marginBottom: "35px" }}
            >
              <Input
                addonBefore={
                  <Select
                    style={{ width: 100 }}
                    value={formData.phoneArea}
                    onChange={handlePhoneAreaChange}
                  >
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
                }
                value={formData.phoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label='Last Name'
              name='lastName'
              onKeyPress={preventNumericInput}
              rules={[
                {
                  required: true,
                  message: "Please enter your last name.",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Input
                placeholder='Enter your last name'
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label='Email Address'
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please enter your email address.",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Input
                placeholder='Enter your email address'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <p className='flex items-center mb-[35px]'>
            <InfoCircleOutlined
              style={{
                color: "#D93E3E",
                marginRight: "8px",
              }}
            />
            <span className='text-[#929497]'>
              Edit any field before clicking submit if necessary
            </span>
          </p>
        </Row>
      </Form>
    </>
  );
};

export default CallBackForm;
