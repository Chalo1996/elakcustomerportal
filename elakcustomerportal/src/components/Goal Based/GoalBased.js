import React, { useState } from "react";
import { Steps, Form, Input, DatePicker, Button, Row, Col, Select, Modal } from "antd";
import moment from "moment";

const { Step } = Steps;
const { Option } = Select;

const Goal = () => {
  const [current, setCurrent] = useState(0);
  const [isCoverDurationModalVisible, setIsCoverDurationModalVisible] = useState(false);
  const [periodOfDuration, setPeriodOfDuration] = useState(null);
  const [coverStartDate, setCoverStartDate] = useState(null);
  const [coverEndDate, setCoverEndDate] = useState(null);
  const [form] = Form.useForm();

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

  const showCoverDurationModal = () => {
    setIsCoverDurationModalVisible(true);
  };

  const handleCoverDurationOk = () => {
    form.validateFields(['periodOfDuration', 'coverStartDate']).then((values) => {
      setPeriodOfDuration(values.periodOfDuration);
      setCoverStartDate(values.coverStartDate);
      const endDate = moment(values.coverStartDate).add(values.periodOfDuration, 'years');
      setCoverEndDate(endDate);
      setIsCoverDurationModalVisible(false);
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  const handleCoverDurationCancel = () => {
    setIsCoverDurationModalVisible(false);
  };

  const disabledDate = (current) => {
    return (
      current &&
      (current < moment().subtract(80, 'years') || current > moment().subtract(18, 'years'))
    );
  };

  const handleStartDateChange = (date) => {
    if (date && periodOfDuration) {
      const endDate = moment(date).add(periodOfDuration, 'years');
      setCoverEndDate(endDate);
    }
  };

;


  return (
    <>
    <Steps current={current}>
      <Step title="Product Details" />
      <Step title="Personal Details" />
      <Step title="Insurance Details" />
      <Step title="Get a Quote" />
    </Steps>
    <div style={{ marginTop: 20 }}>
      <Form form={form} layout="vertical">
        {current === 0 && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Investment Premium" name="investmentPremium" rules={[{ required: true, message: 'Please select the investment premium' }]}>
                  <Select>
                    {[...Array(10)].map((_, i) => (
                      <Option key={i} value={1000 * (i + 1)}>
                        {1000 * (i + 1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
                  <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Cover Duration">
                  <Input
                    readOnly
                    onClick={showCoverDurationModal}
                    placeholder="Select duration"
                    value={periodOfDuration ? `${periodOfDuration} years` : "Select duration"}
                    style={{ cursor: 'pointer' }}
                  />
                </Form.Item>
              
              </Col>
              <Col span={12}>
                <Form.Item label="Payment Frequency" name="paymentFrequency" rules={[{ required: true, message: 'Please select the payment frequency' }]}>
                  <Select>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                    <Option value="quarterly">Quarterly</Option>
                    <Option value="semiannually">Semiannually</Option>
                    <Option value="annually">Annually</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {current === 1 && (
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
                <Form.Item label="Telephone No" name="telephone" rules={[{ required: true, message: 'Please enter your telephone number' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
         {current === 2 && (
          <>
          <p>Insurance details form goes here...</p>
            {/* Your form fields for step 3 */}
          </>
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
    title={<b>Cover Duration</b>}
    visible={isCoverDurationModalVisible}
    onOk={handleCoverDurationOk}
    onCancel={handleCoverDurationCancel}
  >
    <Form layout="vertical" form={form}>
      <Form.Item label="Period of Duration" name="periodOfDuration" rules={[{ required: true, message: 'Please select the period of duration' }]}>
        <Select onChange={(value) => form.setFieldsValue({ coverDuration: value })}>
          {[...Array(13)].map((_, i) => (
            <Option key={i + 3} value={i + 3}>{i + 3} years</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Cover Duration" name="coverDuration" hidden>
        <Input readOnly />
      </Form.Item>
      <Form.Item
        label="Cover Start Date"
        name="coverStartDate"
        rules={[{ required: true, message: 'Please enter the cover start date' }]}
      >
        <DatePicker
          style={{ width: '100%' }}
          onChange={(date) => {
            form.setFieldsValue({ coverStartDate: date });
            handleStartDateChange(date); // Call handleStartDateChange on date change
          }}
        />
      </Form.Item>
      <Form.Item
        label="Cover End Date"
        name="coverEndDate"
      >
        <Input readOnly value={coverEndDate ? coverEndDate.format('YYYY-MM-DD') : ''} />
      </Form.Item>
      </Form>
  </Modal>
  </>
);
}


export default Goal;

