import React, { useState } from "react";
import { Modal, Checkbox, Button } from "antd";

const Privacy = ({ visible, onClose }) => {
  const [understood, setUnderstood] = useState(false);

  const handleCheckboxChange = (e) => {
    setUnderstood(e.target.checked);
  };

  const handleOk = () => {
    if (understood) {
      onClose();
    }
  };

  return (
    <Modal
      title='Privacy Policy'
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Checkbox key='checkbox' onChange={handleCheckboxChange}>
          Understood privacy terms
        </Checkbox>,
        <Button
          key='submit'
          type='primary'
          disabled={!understood}
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <p>This is the privacy policy...</p>
    </Modal>
  );
};

export default Privacy;
