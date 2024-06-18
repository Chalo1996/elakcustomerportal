import React, { useCallback } from 'react';
import { Row, Form, Input, InputNumber, Col, Select, Typography } from 'antd';
import 'tailwindcss/tailwind.css';
import { preventNumericInput, preventTextInput } from "./Utilities.js";

const { Option } = Select;
const { Title } = Typography;

const CompanyDetails = ({form, formData, setFormData }) => {
  const handleInputChange = useCallback((value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  return (
    <Form  form={form} layout="vertical" initialValues={formData}>
      <Row gutter={16}>
        <Col span={24}>
          <Title level={5} style={{ marginBottom: '20px' }}>Please enter company details</Title>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="What is the name of your Company"
            name="companyName"
            rules={[{ required: true, message: "Please enter company name!" }]}
          >
            <Input
              className="custom-input"
              placeholder="Enter name of your company"
              onKeyPress={preventNumericInput}
              onChange={(e) => handleInputChange(e.target.value, 'companyName')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="industry"
            label="How would you classify your company?"
            rules={[{ required: true, message: "Please select Industry!" }]}
          >
            <Select
              placeholder="Please select company classification"
              onChange={(value) => handleInputChange(value, 'industry')}
            >
              <Option value="administrative">Administrative</Option>
              <Option value="parastatalGovernment">Parastatal/Government</Option>
              <Option value="lightManufacturing">Light Manufacturing</Option>
              <Option value="heavyManufacturing">Heavy Manufacturing</Option>
              <Option value="professional">Professional</Option>
              <Option value="retailersAndWholesalers">Retailers & Wholesalers</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="How many employees are to be covered by this scheme?"
            name="numberOfEmployees"
            rules={[{ required: true, message: "Please enter number of employees!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter total number of employees"
              onKeyPress={preventTextInput}
              onChange={(value) => handleInputChange(value, 'numberOfEmployees')}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="What is the total annual salary of your company?"
            name="annualSalaries"
            rules={[{ required: true, message: "Please enter annual turnover!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter total annual salaries of all employees"
              onKeyPress={preventTextInput}
              addonBefore={formData.currencySymbol}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
              onChange={(value) => handleInputChange(value, 'annualSalaries')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="What is the average age of employees in your company?"
            name="averageAge"
            rules={[{ required: true, message: "Please enter average age of employees!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter average age of employees"
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
              onChange={(value) => handleInputChange(value, 'averageAge')}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CompanyDetails;
