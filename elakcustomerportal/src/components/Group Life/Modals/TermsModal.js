import React from 'react';
import { Modal, Button, Typography } from 'antd';

const { Paragraph } = Typography;

const TermsModal = ({ isVisible, onClose }) => {
  const handleTermsModalAccept = () => {
    onClose();
  };

  return (
    <Modal
      title={<b>Terms and Conditions</b>}
      open={isVisible}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="accept" type="primary" onClick={handleTermsModalAccept}>
          Accept
        </Button>,
      ]}
      onCancel={onClose}
    >
      <Paragraph>
      Comprehensive Group Life Assurance Terms and conditions
      </Paragraph>
    </Modal>
  );
};

export default TermsModal;
