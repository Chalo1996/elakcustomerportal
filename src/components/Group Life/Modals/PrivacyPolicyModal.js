import React from 'react';
import { Modal, Button, Typography } from 'antd';

const { Paragraph } = Typography;

const PrivacyPolicyModal = ({ isVisible, onClose }) => {
  const handlePrivacyModalAccept = () => {
    onClose();
  };

  return (
    <Modal
      title={<b>Privacy Policy</b>}
      open={isVisible}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="accept" type="primary" onClick={handlePrivacyModalAccept}>
          Accept
        </Button>,
      ]}
      onCancel={onClose}
    >
      <Paragraph>
        Comprehensive Group Life Assurance Privacy policy
      </Paragraph>
    </Modal>
  );
};

export default PrivacyPolicyModal;
