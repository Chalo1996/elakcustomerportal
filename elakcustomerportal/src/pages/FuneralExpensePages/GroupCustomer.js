import React, { useState } from "react";
import { Steps, Button, Form, Input } from "antd";

const { Step } = Steps;

const Step1Form = ({ formData, setFormData }) => {
  return (
    <Form layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input
          className="custom-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Item>
    </Form>
  );
};

const Step2Form = ({ formData, setFormData }) => {
  return (
    <Form layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          className="custom-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Item>
    </Form>
  );
};

const Step3Form = ({ formData, setFormData }) => {
  return (
    <Form layout="vertical">
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input
          className="custom-input"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </Form.Item>
    </Form>
  );
};

const GroupCustomerPage = () => {
  const [current, setCurrent] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = () => {
    console.log("Collected data:", formData);
  };

  const steps = [
    {
      title: "Step 1",
      content: <Step1Form formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Step 2",
      content: <Step2Form formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Step 3",
      content: <Step3Form formData={formData} setFormData={setFormData} />,
    },
  ];

  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default GroupCustomerPage;
