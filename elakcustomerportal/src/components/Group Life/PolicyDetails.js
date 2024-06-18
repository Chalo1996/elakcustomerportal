import React, { useEffect, useCallback } from 'react';
import { Row, Form, InputNumber, Col, DatePicker, Select, Typography } from 'antd';
import 'tailwindcss/tailwind.css';

import { InfoCircleOutlined } from "@ant-design/icons";
import moment from 'moment';




const { Option } = Select;
const { Title, } = Typography;


const PolicyDetails = ({form, formData, setFormData }) => {  
    const handleInputChange = (value, field) => {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    };
  
    const handleStartDateChange = useCallback(
      (date) => {
        if (!date) {
          form.resetFields(['policyEndDate']);
          setFormData({ ...formData, policyEndDate: null });
          return null;
        }
        const oneYearLater = date.clone().add(1, 'year').subtract(1, 'day');
        setFormData({ ...formData, policyStartDate: date, policyEndDate: oneYearLater });
        return oneYearLater;
      },
      [form, formData, setFormData]
    );
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    };
  
    useEffect(() => {
      form.setFieldsValue(formData);
      form.setFieldsValue({ policyStartDate: formData.policyStartDate });
    }, [form, formData]);
  
    useEffect(() => {
      const newPolicyEndDate = handleStartDateChange(formData.policyStartDate);
      setFormData({ ...formData, policyEndDate: newPolicyEndDate });
      form.setFieldsValue({ policyEndDate: newPolicyEndDate });
    }, [formData, form, setFormData, handleStartDateChange]);
  
    return (
      <Form form={form} layout="vertical" initialValues={formData}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Title level={5} style={{ marginBottom: '20px' }}>Please enter policy details</Title>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Cover Commencement Date"
              name="policyStartDate"
              rules={[
                {
                  required: true,
                  message: 'Please select start date.',
                },
              ]}
              style={{ width: '100%', cursor: 'pointer' }}
            >
              <DatePicker
                style={{ width: '100%' }}
                id="policyStartDate"
                disabledDate={(current) => current && current < moment().endOf('day')}
                onChange={handleStartDateChange}
                inputReadOnly={true}
              />
            </Form.Item>
            {formData.policyStartDate && (
              <p className="flex items-center mb-[35px]">
                <InfoCircleOutlined
                  style={{
                    color: '#D93E3E',
                    marginRight: '8px',
                  }}
                />
                <span className="text-[#929497]">
                  Your cover will automatically expire on {formatDate(formData.policyEndDate)}
                </span>
              </p>
            )}
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="What Level of Cover Do you need?"
              name="multipleOfAnnualSalary"
              rules={[
                {
                  required: true,
                  message: 'Please select a level of cover!',
                },
              ]}
            >
              <Select
                placeholder="Please select"
                onChange={(value) => handleInputChange(value, 'multipleOfAnnualSalary')}
              >
                <Option value="1">1x Salary</Option>
                <Option value="2">2x Salary</Option>
                <Option value="3">3x Salary</Option>
                <Option value="4">4x Salary</Option>
                <Option value="5">5x Salary</Option>
              </Select>
            </Form.Item>
            <br />
            {formData.flatAmount && (
              <Form.Item
                label="Specify Flat Amount"
                name="flatAmount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the flat amount!',
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Enter flat amount"
                  min={0}
                  addonBefore="KSh"
                  value={formData.flatAmount}
                  onChange={(value) => handleInputChange(value, 'flatAmount')}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/(,*)/g, '')}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    );
  };

  export default PolicyDetails;