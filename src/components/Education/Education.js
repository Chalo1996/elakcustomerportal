import React, { useState } from "react";
import { Steps, Form, Input, Radio, DatePicker, Button, Row, Col, Select, Modal, InputNumber, Checkbox } from "antd";
import moment from "moment";
import 'tailwindcss/tailwind.css';
import sspFlag from '../../assets/flags/ssp.png';
import cdfFlag from '../../assets/flags/cdf.png';
import rwfFlag from '../../assets/flags/rwf.png';
import kesFlag from '../../assets/flags/kes.png';
import tzsFlag from '../../assets/flags/tzs.png';
import ugxFlag from '../../assets/flags/ugx.png';

const { Step } = Steps;
const { Option } = Select;

const Education = () => {
  const [current, setCurrent] = useState(0);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    targetType: '',
    TermInYears: 0,
    frequency: '',
    premium: 0,
    currency: 'KES',
    startDate: null,
    endDate: null,
    currencies: [
      { code: 'KES', name: 'KES' },
      { code: 'USD', name: 'USD' },
    
    ],
  });

  const onChangeCurrency = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      currency: value,
    }));
  };
  const PhoneAreas = [
    { code: "+211", flag: sspFlag, country: "South Sudan" },
    { code: "+243", flag: cdfFlag, country: "DRC" },
    { code: "+250", flag: rwfFlag, country: "Rwanda" },
    { code: "+254", flag: kesFlag, country: "Kenya" },
    { code: "+255", flag: tzsFlag, country: "Tanzania" },
    { code: "+256", flag: ugxFlag, country: "Uganda" },
  ];
  const handleChange = (newValue) => {
    const area = PhoneAreas.find((item) => item.code === newValue);
    setFormData((prevData) => ({
      ...prevData,
      country: area.country,
      telCode: area.code,
    }));
  };
  const validatePhoneNumber = (_, value) => {
    const phoneRegex = /^\d+$/;
    if (!value || phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Phone number should only contain digits")
    );
  };
  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  const back = () => {
    setCurrent(current - 1);
  };

  const disabledStartDate = (current) => {
    return current && current < moment().startOf('day');
  };


  const disabledDate = (current) => {
    return (
      current &&
      (current < moment().subtract(80, 'years') || current > moment().subtract(18, 'years'))
    );
  };

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date,
    }));
  };



  const showTermsModal = () => {
    setIsTermsModalVisible(true);
  };

  const handleTermsModalOk = () => {
    setIsTermsModalVisible(false);
  };

  const handleTermsModalCancel = () => {
    setIsTermsModalVisible(false);
  };

  const showPrivacyModal = () => {
    setIsPrivacyModalVisible(true);
  };

  const handlePrivacyModalOk = () => {
    setIsPrivacyModalVisible(false);
  };

  const handlePrivacyModalCancel = () => {
    setIsPrivacyModalVisible(false);
  };



  return (
    <>
      <Steps current={current}>
        <Step title="Personal Details" />
        <Step title="Product Details" />
        <Step title="Review & Confirm" />
        <Step title="Get a Quote" />
      </Steps>
      <div style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical">
        {current === 0 && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Telephone No" 
                  name="telephone" 
                  rules={[
                    { 
                    required: true, 
                    message: 'Please enter your telephone number' 
                    },
                    {
                      pattern: "^[0-9]{9}$",
                      message: "The Phone number should be 9 digits!",
                    },
                    ]}>
                    <Input
                          addonBefore={
                            <Select
                              style={{ width: 100 }}
                              defaultValue="+254"
                              onChange={handleChange}
                            >
                              {PhoneAreas.map((item) => (
                                <Option value={item.code} key={item.code}>
                                  {item.code}
                                  <div
                                    className={`currency-flag currency-flag-sm currency-flag-${item.flag}`}
                                  ></div>
                                </Option>
                              ))}
                            </Select>
                          }
                          value={formData.tel}
                          onChange={(event) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              tel: event.target.value,
                            }))
                          }
                          style={{ width: "100%" }}
                        />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
              <Col span={12}>
                  <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
                    <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        {current === 1 && (
  <>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Target Type"
          name="targetType"
          id="targetType"
          style={{ width: "100%" }}
        >
          <Select
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                targetType: value,
              }))
            }
            defaultValue={formData.targetType}
            style={{ width: "100%" }}
          >
            <Option key="1" value="Investment Premium">
              Investment Premium
            </Option>
            <Option key="2" value="Fund Value">
              Fund Value
            </Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Term In Years"
          name="termInYears"
          style={{ width: "100%" }}
          rules={[
            {
              type: 'number',
              message: 'Please select the term in years.',
            },
            {
              required: true,
              message: 'Please input the term in years.',
            },
          ]}
        >
          <Select
            id="termInYears"
            value={formData.TermInYears}
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                TermInYears: value,
              }))
            }
            style={{ width: "100%" }}
          >
            {Array.from({ length: 13 }, (_, i) => (
              <Select.Option key={i + 3} value={i + 3}>
                {i + 3}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="frequency"
          label="Premium Frequency"
          style={{ width: "100%" }}
        >
          <Select
            style={{ width: "100%" }}
            id="frequency"
            value={formData.frequency}
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                frequency: value,
              }))
            }
          >
            <Option key="Weekly" value="Weekly">
              Weekly
            </Option>
            <Option key="Monthly" value="Monthly">
              Monthly
            </Option>
            <Option key="Quarterly" value="Quarterly">
              Quarterly
            </Option>
            <Option key="SemiAnnual" value="SemiAnnual">
              SemiAnnual
            </Option>
            <Option key="Annual" value="Annual">
              Annual
            </Option>
            <Option key="One off" value="One off">
              One off
            </Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="Premium"
          label={formData.targetType}
          required
        >
          <Input.Group compact>
            <Form.Item
              name="currency"
              noStyle
            >
              <Select
                onChange={onChangeCurrency}
                defaultValue={formData.currency}
                style={{ width: '20%' }}
              >
                {formData.currencies.map((currency, index) => (
                  <Select.Option key={index} value={currency.code}>
                    {currency.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="premium"
              noStyle
              rules={[
                { required: true, message: 'Premium is required' },
              ]}
            >
              <InputNumber
                id="premium"
                step={10000}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/(,*)/g, '')}
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    premium: value,
                  }))
                }
                value={formData.premium}
                style={{ width: '80%' }}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="When would you wish to start?"
                    name="startDate"
                    rules={[{ required: true, message: 'Please select the start date' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      disabledDate={disabledStartDate}
                      onChange={handleStartDateChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="termsCheckbox"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please accept the terms and privacy policies' }]}
        >
          <Checkbox>
            I accept the <a href="#" onClick={showTermsModal}>terms</a> & <a href="#" onClick={showPrivacyModal}>privacy policies</a>
          </Checkbox>
        </Form.Item>
      </Col>
    </Row>
  </>
)}

          {current === 2 && (
            <div>
               <h3>Review Your Information</h3>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <span>{formData.firstName}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <span>{formData.lastName}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Telephone No">
                    <span>{formData.telephone}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email">
                    <span>{formData.email}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Date of Birth">
                    <span>{formData.dateOfBirth?.format('YYYY-MM-DD')}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Target Type">
                    <span>{formData.targetType}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Term In Years">
                    <span>{formData.TermInYears}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Payment Frequency">
                    <span>{formData.frequency}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Premium">
                    <span>{formData.currency} {formData.premium}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Start Date">
                    <span>{formData.startDate?.format('YYYY-MM-DD')}</span>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
          {current === 3 && (
            <div>
              {/* Your form fields for step 4 */}
            </div>
          )}
          <div style={{ marginTop: 20 }}>
            {current > 0 && (
              <Button style={{ marginRight: 8 }} onClick={back}>
                Back
              </Button>
            )}
            {current < 3 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
          </div>
        </Form>
       </div>
      <Modal
        title={<b>Terms and Conditions</b>}
        visible={isTermsModalVisible}
        onOk={handleTermsModalOk}
        onCancel={handleTermsModalCancel}
      >
        <p>Terms and conditions content goes here...</p>
      </Modal>
      <Modal
        title={<b>Privacy Policy</b>}
        visible={isPrivacyModalVisible}
        onOk={handlePrivacyModalOk}
        onCancel={handlePrivacyModalCancel}
      >
        <p>Privacy policy content goes here...</p>
      </Modal>
     
    </>
  );
};

export default Education;
