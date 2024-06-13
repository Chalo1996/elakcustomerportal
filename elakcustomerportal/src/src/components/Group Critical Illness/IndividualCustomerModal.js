import React, { useState } from "react";
import { Steps, Radio, Space, Button, Row, Col, Form, Input, Select, DatePicker, Modal, Checkbox, InputNumber } from "antd";

const IndividualCustomerDetailsModal = ({ visible, onCancel, onNext }) => {
    const [, setCheckedList] = useState([]);
  
    const onCheckboxChange = (checkedList) => {
      setCheckedList(checkedList);
    };
  
    const handleOk = () => {
      onNext(); // Call the onNext function passed from the parent component
    };
  
    const handleCancel = () => {
      onCancel(); // Close the modal without moving to the next step
    };
  
  
    return (
      <Modal
        title="You will be required to provide the following details to continue"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        width={600}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Continue
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item>
            <Checkbox.Group onChange={onCheckboxChange} style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox value="name" style={{ marginBottom: '20px' }}>Full Name</Checkbox>
              <Checkbox value="gender" style={{ marginBottom: '20px' }}>Gender</Checkbox>
              <Checkbox value="dob" style={{ marginBottom: '20px' }}>Date of Birth</Checkbox>
              <Checkbox value="email" style={{ marginBottom: '20px' }}>Email Address</Checkbox>
              <Checkbox value="telNo" style={{ marginBottom: '20px' }}>Phone Number</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  export default IndividualCustomerDetailsModal;