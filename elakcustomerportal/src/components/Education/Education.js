import React, {useState,useEffect} from "react";
import {Steps,Form,Input,Radio,Divider,Typography,DatePicker,Button,Row,Col,Select,Modal,InputNumber,Checkbox} from "antd";
import { useNavigate } from 'react-router-dom';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    telephone: '',
    email: '',
    dateOfBirth: null,
    targetType: '',
    termInYears: 0,
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

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await form.validateFields();
      console.log('Received values:', values);
      navigate("Educ-Quotation");
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  useEffect(() => {
    if (formData.startDate && formData.termInYears) {
      const calculatedEndDate = calculateEndDate(formData.startDate, formData.termInYears);
      setFormData((prevData) => ({ ...prevData, endDate: calculatedEndDate }));
      form.setFieldsValue({ endDate: calculatedEndDate });
    }
  }, [formData.startDate, formData.termInYears,form]);

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date ? moment(date).startOf('day') : null,
    }));
  };
  
  const handletermInYearsChange = (value) => {
    setFormData((prevData) => ({ ...prevData, termInYears: value }));
  };

  const calculateEndDate = (startDate, years) => {
    const startMoment = moment.utc(startDate); // Parse as UTC date
    const localStartMoment = startMoment.local(); // Convert to local date
  
    console.log('startDate:', localStartMoment.format('YYYY-MM-DD'));  // Debug log
  
    if (localStartMoment.isValid() && years) {
      return localStartMoment.add(years, 'years');
    }
    return null;
  };
  
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


  
  const next = () => {
    form.validateFields().then(() => {
      if (current === 0) {
        setIsModalOpen(true); // Only open modal for step 0
      } else {
        setCurrent(current + 1); // Directly go to next step for other steps
      }
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };
  
  

  const back = () => {
    setCurrent(current - 1);
  };


  const disabledDate = (current) => {
    return (
      current &&
      (current < moment().subtract(80, 'years') || current > moment().subtract(18, 'years'))
    );
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
  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedOption: e.target.value,
    }));
  };
  const handleModalOk = () => {
    setIsModalOpen(false);
    setCurrent(current + 1);
  };

;
  
  return (
    <>
     <br></br>
     <br></br>
     <h1 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>Education Savings Insurance Cover</h1>
      <Steps current={current}>
        <Step title="Personal Details" />
        <Step title="Product Details" />
        <Step title="Review" />
       
      </Steps>
      <div style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
        {current === 0 && (
          
  <>
  <div>
   <Row gutter={16}>
            <h3>Please, enter your personal details to continue</h3>
    </Row>
   </div>
    <br></br>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="First Name" name="firstName" 
        rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input 
            value={formData.firstName}
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                firstName: event.target.value,
              }))
            }
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input
            value={formData.lastName}
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                lastName: event.target.value,
              }))
            } 
          />
        </Form.Item>
      </Col>
    </Row>
    <br></br>
    <Row gutter={16}>
    <Col span={12}>
        <Form.Item label="Email Address" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
          <Input
              value={formData.email}
              onChange={(event) =>
                setFormData((prevData) => ({
                  ...prevData,
                  email: event.target.value,
                }))
              }
          />
        </Form.Item>
      </Col>
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
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                   <img
                      src={item.flag}
                      alt={item.country}
                      style={{ width: '20px', marginRight: '8px' }}
                    />
                    {item.code}
                    </div>
                  </Option>
                    ))}
                  </Select>
                }
                value={formData.telephone}
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    telephone: event.target.value,
                  }))
                }
                style={{ width: "100%" }}
              />
        </Form.Item>
      </Col>
    </Row>
    <br></br>
    <Row gutter={16}>
    <Col span={12}>
        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
          <DatePicker 
          style={{ width: '100%' }} 
          disabledDate={disabledDate}
          value={formData.dateOfBirth}
          onChange={(date) =>
            setFormData((prevData) => ({
              ...prevData,
              dateOfBirth: date,
            }))
          }
          />
        </Form.Item>
      </Col>
    </Row>
    <br></br>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="termsCheckbox"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please accept the terms and privacy policies' }]}
        >
          <Checkbox>
            I accept the <button type="button" onClick={showTermsModal} style={{ border: 'none', background: 'none', padding: 0, color: 'maroon', cursor: 'pointer' }}>terms</button> & <button type="button" onClick={showPrivacyModal} style={{ border: 'none', background: 'none', padding: 0, color: 'maroon', cursor: 'pointer' }}>privacy policies</button>
          </Checkbox>
        </Form.Item>
      </Col>
    </Row>
    
    <Modal
        title="What would you like to do?"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Row justify="start" key="footer-row" className="mt-4">
            <Button
              key="submit"
              type="primary"
              onClick={handleModalOk}
              disabled={!formData.selectedOption}
              className="shadow-none"
            >
              Continue
            </Button>
          </Row>,
        ]}
      >
        <br></br>
        <Radio.Group onChange={handleRadioChange} value={formData.selectedOption} style={{ width: '100%' }}>
          <div className="w-full flex items-center justify-between">
            <Typography.Text>Generate Quote</Typography.Text>
            <Radio value="quote"></Radio>
          </div>
 
          <Divider />
          <div className="w-full flex items-center justify-between">
            <Typography.Text>Request a Call Back</Typography.Text>
            <Radio value="callback"></Radio>
          </div>
        </Radio.Group>
      </Modal>
  </>
)}
<br></br>

        {current === 1 && (
  <>
  <br></br>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Target Type"
          tooltip="Understand your choice:
Investment Premium 
With this option, you can comfortably set a specific sum for your regular insurance payments. 
Fund value
By selecting this option, you have the flexibility to set a specific fund value that you aspire 
to achieve over time."
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
          name="Premium"
          label={formData.targetType || "Investment Premium"}
          tooltip="How much money do you want to invest?"
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
    <br></br>
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
          label="How many years would you wish to save?"
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
            value={formData.termInYears}
            onChange={handletermInYearsChange}
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
    <br></br>
    <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="When would you wish to start?"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date' }]}
          >
 <DatePicker
  style={{ width: '100%' }}
  value={formData.startDate ? moment(formData.startDate) : null}
  disabledDate={(current) => current && current < moment().startOf('day')}
  onChange={handleStartDateChange}
/>


          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="The Insurance cover policy will expire on"
            name="endDate"
          >
            <DatePicker
              style={{ width: '100%' }}
              value={formData.endDate ? moment(formData.endDate) : null}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
  </>
)}
      
      {current === 2 && (
  <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
    <h4 style={{ marginBottom: '20px' }}>Please, Review and confirm Your Information details to continue</h4>
    <div>
      <br />
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <h5 style={{ color: '#888', marginBottom: '5px' }}>Product</h5>
            <span>Education savings</span>
          </Col>
        </Row>
      </div>
      <Divider />
      <br />
      <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Personal Information</h4>
      <br />
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>First Name</h4>
            <span>{formData.firstName}</span>
          </Col>
          <br />
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Last Name</h4>
            <span>{formData.lastName}</span>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Telephone No</h4>
            <span>{formData.telephone}</span>
          </Col>
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Email</h4>
            <span>{formData.email}</span>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Date of Birth</h4>
            <span>{formData.dateOfBirth?.format('YYYY-MM-DD')}</span>
          </Col>
        </Row>
        <br />
      </div>
      <Divider />
      <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Policy Information</h4>
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Target Type</h4>
          <span>{formData.targetType}</span>
        </Col>
        <br />
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Term In Years</h4>
          <span>{formData.termInYears}</span>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Payment Frequency</h4>
          <span>{formData.frequency}</span>
        </Col>
        <br />
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Premium</h4>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: formData.currency }).format(formData.premium)}</span>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Start Date</h4>
          <span>{formData.startDate?.format('YYYY-MM-DD')}</span>
        </Col>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>End Date</h4>
          <span>{formData.endDate?.format('YYYY-MM-DD')}</span>
        </Col>
      </Row>
      <br />
    </div>
      </div>
)}

          <div style={{ marginTop: 20 }}>
            {current > 0 && (
              <Button style={{ marginRight: 8 }} onClick={back}>
                Back
              </Button>
            )}
            {current < 2 &&  (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
  {current === 2 && (
              <Button type="primary" htmlType="submit">
                Generate Quote
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
