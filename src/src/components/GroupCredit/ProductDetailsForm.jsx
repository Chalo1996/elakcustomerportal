import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Space,
  Typography,
  InputNumber,
  Switch,
} from "antd";

const { Item } = Form;
const { Text } = Typography;

const ProductDetailsForm = ({ formData, handleFormChange, form }) => {
  const handleSumChange = (value) => {
    handleFormChange("sumAssured", value);
  };

  const handleTermsInMonths = (value) => {
    handleFormChange("termsInMonths", value);
  };

  const handleFrequencyChange = (value) => {
    handleFormChange("frequency", value);
    let installmentValue;
    switch (value) {
      case "Annually":
        installmentValue = 1;
        break;
      case "SemiAnnually":
        installmentValue = 2;
        break;
      case "Quarterly":
        installmentValue = 4;
        break;
      case "Monthly":
        installmentValue = 12;
        break;
      default:
        installmentValue = 1;
    }
    handleFormChange("installments", installmentValue);
  };

  const handlePremiumInstallments = (e) => {
    handleFormChange("installments", e.target.value);
  };

  const handleRetrenchmentChange = (checked) =>
    handleFormChange("retrenchment", checked);

  const disableNotNumberKey = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <Form layout='vertical' form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='How much would you like to pay for the cover?'
            name='sumAssured'
            onKeyPress={disableNotNumberKey}
            rules={[
              {
                required: true,
                message: "Please input the sum assured!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              value={formData.sumAssured}
              prefix='KSH'
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleSumChange}
            />
          </Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='For how long would you like to pay for the cover?'
            name='termsInMonths'
            onKeyPress={disableNotNumberKey}
            rules={[
              {
                required: true,
                message: "Please input terms in months!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              value={formData.termsInMonths}
              onChange={handleTermsInMonths}
            />
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='How would you like to pay for the cover?'
            name='frequency'
            rules={[
              {
                required: true,
                message: "Please select the premium frequency!",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              value={formData.frequency}
              placeholder='Select frequency'
              onChange={handleFrequencyChange}
              options={[
                { value: "Single", label: "Single" },
                { value: "Annually", label: "Annually" },
                { value: "SemiAnnually", label: "Semi-Annually" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Monthly", label: "Monthly" },
              ]}
            />
          </Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label={
              <Text>
                How many times per year would you like to pay for the cover?
              </Text>
            }
            name='installments'
          >
            <Space direction='vertical' wrap style={{ width: "100%" }}>
              <Input
                readOnly
                value={formData.installments}
                onChange={handlePremiumInstallments}
              />
            </Space>
          </Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item label='Retrenchment Cover?'>
            <Switch
              defaultChecked={formData.retrenchment}
              onChange={handleRetrenchmentChange}
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductDetailsForm;
