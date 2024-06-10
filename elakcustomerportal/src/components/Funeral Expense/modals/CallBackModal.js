import React, { useState } from "react";
import { Modal, Button, Radio, Typography, Row, Divider } from "antd";
import { useTheme } from "../../../store/context/theme-context";

const { Text } = Typography;

const CallBackModal = ({ isModalOpen, onClose, onContinue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { theme } = useTheme();

  const customTitle = (
    <p
      className={`${
        theme === "dark" ? "text-white bg-gray-800" : ""
      }  text-left font-open-sans text-lg leading-6`}
    >
      What would you like to do?
    </p>
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleContinue = () => {
    onContinue(selectedOption);
  };

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onCancel={onClose}
      footer={[
        <Row justify="start" key="footer-row">
          <Button
            key="submit"
            type="primary"
            onClick={handleContinue}
            disabled={!selectedOption}
            className="shadow-none"
          >
            Continue
          </Button>
        </Row>,
      ]}
    >
      <Radio.Group
        onChange={handleOptionChange}
        value={selectedOption}
        style={{ width: "100%" }}
      >
        <div className="w-full flex items-center justify-between">
          <Text>Generate Quote</Text>
          <Radio value="generateQuote"></Radio>
        </div>
        <br />
        <br />
        <Divider />
        <br />
        <br />
        <div className="w-full flex items-center justify-between">
          <Text>Request a call back</Text>
          <Radio value="requestCallback"></Radio>
        </div>
      </Radio.Group>
    </Modal>
  );
};

export default CallBackModal;
