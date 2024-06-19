import { Modal, Button, Row, Col } from "antd";

const ExclusionsModal = ({ isModalOpen, onCancel, onOkay }) => {
  const customTitle = (
    <p className={`text-lg font-medium text-left font-roboto `}>Exclusions</p>
  );
  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onOk={onOkay}
      onCancel={onCancel}
      style={{
        width: "741px",
        height: "710px",
        gap: "0px",
        opacity: "1",
      }}
      footer={[
        <Row justify="end" key="footer-row">
          <Button
            key="close"
            type="primary"
            className={`shadow-none font-semibold text-lg leading-6 text-center w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg `}
          >
            I agree
          </Button>
        </Row>,
      ]}
    ></Modal>
  );
};

export default ExclusionsModal;
