import { Modal, Button, Checkbox } from "antd";
import { useTheme } from "../../store/context/theme-context";

const CustomerTypeModal = ({ isModalOpen, onOkay, onCancel }) => {
  const { theme } = useTheme();
  const customTitle = (
    <p
      className={`${
        theme === "dark" ? "text-white bg-gray-800" : "text-black"
      } text-lg font-medium text-left font-roboto `}
    >
      You'll need to provide the following personal details to continue
    </p>
  );

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      className={theme === "dark" ? "dark-theme" : ""}
      onOk={onOkay}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onOkay}>
          Continue
        </Button>,
      ]}
    >
      <Checkbox
        defaultChecked
        style={{ display: "block", marginBottom: "10px" }}
      >
        Full name
      </Checkbox>
      <Checkbox
        defaultChecked
        style={{ display: "block", marginBottom: "10px" }}
      >
        Email address
      </Checkbox>
      <Checkbox
        defaultChecked
        style={{ display: "block", marginBottom: "10px" }}
      >
        Phone number
      </Checkbox>
      <Checkbox style={{ display: "block", marginBottom: "10px" }}>
        Date of Birth
      </Checkbox>
    </Modal>
  );
};

export default CustomerTypeModal;
