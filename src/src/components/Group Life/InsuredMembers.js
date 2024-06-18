import React, { useCallback } from 'react';
import { Row, Form, InputNumber, Col, Typography } from 'antd';
import 'tailwindcss/tailwind.css';

import { preventTextInput } from "./Utilities.js";

const { Title } = Typography;

const InsuredMembers = ({form,  formData, setFormData }) => {
  const handleInputChange = useCallback((value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  return (
    <Form  form={form} layout="vertical" initialValues={formData}>
      <Row gutter={16}>
        <Col span={24}>
          <Title level={5} style={{ marginBottom: '20px' }}>
            Please enter the number of family members to be covered
          </Title>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="How many spouses would you like to be covered?"
            name="totalNumberOfSpouses"
            rules={[{ required: true, message: "Please enter number of spouses!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter number of spouses"
              value={formData.totalNumberOfSpouses}
              onChange={(value) => handleInputChange(value, "totalNumberOfSpouses")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Specify amount beneficiary will get in the event of death of a spouse?"
            name="spouseLastExpense"
            rules={[{ required: true, message: "Please enter spouse last expense!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              addonBefore={formData.currencySymbol}
              placeholder="Enter spouse last expense"
              value={formData.spouseLastExpense}
              onChange={(value) => handleInputChange(value, "spouseLastExpense")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="How many children would you like to cover?"
            name="totalNumberOfChilidren"
            rules={[{ required: true, message: "Please enter number of children!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter number of children"
              value={formData.totalNumberOfChilidren}
              onChange={(value) => handleInputChange(value, "totalNumberOfChilidren")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Specify amount beneficiary will get in the event of death of a child?"
            name="childLastExpense"
            rules={[{ required: true, message: "Please enter child last expense!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              addonBefore={formData.currencySymbol}
              placeholder="Enter child last expense"
              value={formData.childLastExpense}
              onChange={(value) => handleInputChange(value, "childLastExpense")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="How many parents and parents-in-law would you like to be covered?"
            name="totalNumberOfParentsAndParentsInLaw"
            rules={[{ required: true, message: "Please enter number of parents!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter number of parents"
              value={formData.totalNumberOfParentsAndParentsInLaw}
              onChange={(value) => handleInputChange(value, "totalNumberOfParentsAndParentsInLaw")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Specify amount beneficiary will get in the event of death of a parent or in-law?"
            name="parentsLastExpense"
            rules={[{ required: true, message: "Please enter parents last expense!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              addonBefore={formData.currencySymbol}
              placeholder="Enter parents last expense"
              value={formData.parentsLastExpense}
              onChange={(value) => handleInputChange(value, "parentsLastExpense")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default InsuredMembers;
