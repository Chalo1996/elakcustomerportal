import { useEffect } from "react";
import { Form, Input, Row, Col, DatePicker, Select, Checkbox } from "antd";
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

const PersonalDetailsForm = ({ formData, setFormData }) => {
  const [form] = Form.useForm();

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

  const validateTerms = (_, value) => {
    return value
      ? Promise.resolve()
      : Promise.reject(new Error("Please agree to our terms to proceed"));
  };

  const validateBirthDate = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }

    const today = new Date();
    const selectedDate = new Date(value);

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

    if (selectedDate >= minDate && selectedDate <= maxDate) {
      return Promise.resolve();
    }

    if (selectedDate < maxDate) {
      return Promise.reject(new Error("Maximum required age is 70 years."));
    } else {
      return Promise.reject(new Error("Minimum required age is 18 years."));
    }
  };

  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col gap-4">
        <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
          Please enter your details
        </p>
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name.",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Input
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address.",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Input
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
              style={{ width: "100%", cursor: "pointer", marginBottom: "35px" }}
            >
              <DatePicker
                style={{ width: "100%" }}
                id="birthDate"
                onChange={(value) =>
                  setFormData({ ...formData, birthDate: value })
                }
                inputReadOnly={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name.",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Input
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
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
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: validateTerms,
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <Checkbox
                checked={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.checked })
                }
              >
                I accept the{" "}
                <a href="#terms" style={{ color: "#A32A29" }}>
                  terms
                </a>{" "}
                &{" "}
                <a href="#privacy" style={{ color: "#A32A29" }}>
                  privacy policy
                </a>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PersonalDetailsForm;
