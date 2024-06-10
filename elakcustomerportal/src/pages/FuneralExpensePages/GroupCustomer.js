import React, { useState } from "react";
import { Steps, Button, Form, Input } from "antd";

const { Step } = Steps;

const Step1Form = ({ form }) => (
  <Form form={form} layout="vertical">
    <Form.Item
      label="Name"
      name="name"
      rules={[{ required: true, message: "Please input your name!" }]}
    >
      <Input />
    </Form.Item>
  </Form>
);

const Step2Form = ({ form }) => (
  <Form form={form} layout="vertical">
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
    >
      <Input />
    </Form.Item>
  </Form>
);

const Step3Form = ({ form }) => (
  <Form form={form} layout="vertical">
    <Form.Item
      label="Address"
      name="address"
      rules={[{ required: true, message: "Please input your address!" }]}
    >
      <Input />
    </Form.Item>
  </Form>
);

const GroupCustomerPage = () => {
  const [current, setCurrent] = useState(0);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const forms = [form1, form2, form3];

  const next = async () => {
    try {
      await forms[current].validateFields();
      // Save current form data to state
      setFormData({
        ...formData,
        ...forms[current].getFieldsValue(),
      });
      setCurrent(current + 1);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(forms.map((form) => form.validateFields()));
      // Collect data from all forms
      const data = {
        ...formData,
        ...forms[current].getFieldsValue(),
      };
      console.log("Collected data:", data);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const steps = [
    {
      title: "Step 1",
      content: <Step1Form form={form1} />,
    },
    {
      title: "Step 2",
      content: <Step2Form form={form2} />,
    },
    {
      title: "Step 3",
      content: <Step3Form form={form3} />,
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
