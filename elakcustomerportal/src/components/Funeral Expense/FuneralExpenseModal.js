import { Modal, Button } from "antd";

const FuneralExpenseModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  return (
    <Modal
      open={isModalOpen}
      onOk={onOkay}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <p>{product.title}</p>
      <p>{product.description}</p>
    </Modal>
  );
};

export default FuneralExpenseModal;
