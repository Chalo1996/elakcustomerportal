import { useNavigate } from "react-router-dom";
import { Modal, Button, Checkbox } from "antd";

const CustomerTypeModal = ({ isModalOpen, onOkay, onCancel, customerType }) => {
  const navigate = useNavigate();
  const customTitle = (
    <div className={`relative`}>
      <p className="font-medium text-left font-open-sans text-lg leading-6 w-[297px] h-[48px]">
        You'll need to provide the following personal details to continue
      </p>
    </div>
  );

  const handleNavigate = () => {
    if (customerType === "Personal") {
      navigate("/home/funeral-expense?customer=individual");
    } else if (customerType === "Group") {
      navigate("/home/funeral-expense?customer=group");
    }
  };

  const modalStyle = {
    width: "354px",
    height: "364px",
    gap: "0px",
  };

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      style={modalStyle}
      onOk={onOkay}
      onCancel={onCancel}
      footer={[
        <div className="w-full h-[86px]" key="footer-row">
          <div className="flex justify-between items-center h-full gap-3">
            <Button
              key="close"
              onClick={onCancel}
              className="w-full h-[48px] px-8 py-2 border-[#A32A29] text-[#A32A29] shadow-none text-base text-center font-open-sans"
            >
              Cancel
            </Button>
            <Button
              key="continue"
              type="primary"
              onClick={handleNavigate}
              className="w-full h-[48px] px-8 py-2 shadow-none text-base text-center font-open-sans"
            >
              Continue
            </Button>
          </div>
        </div>,
      ]}
    >
      <div className="flex flex-col gap-3 mt-7">
        <Checkbox
          defaultChecked
          className={`marker:non-interactive flex items-center mb-3 font-open-sans text-base font-semibold leading-35 text-left`}
        >
          Full name
        </Checkbox>
        <Checkbox
          defaultChecked
          className={`non-interactive flex items-center mb-3 font-open-sans text-base font-semibold leading-35 text-left`}
        >
          Email address
        </Checkbox>
        <Checkbox
          defaultChecked
          className={`non-interactive flex items-center mb-3 font-open-sans text-base font-semibold leading-35 text-left`}
        >
          Phone number
        </Checkbox>
        <Checkbox
          defaultChecked
          className={`non-interactive flex items-center mb-3 font-open-sans text-base font-semibold leading-35 text-left`}
        >
          Date of Birth
        </Checkbox>
      </div>
    </Modal>
  );
};

export default CustomerTypeModal;
