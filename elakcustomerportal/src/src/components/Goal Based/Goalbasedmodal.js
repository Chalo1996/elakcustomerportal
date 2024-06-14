import { Modal, Button, Row } from "antd";
import goal from "../../assets/goal.png";
import { NavLink } from "react-router-dom";

const Goalbasedmodal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const customTitle = (
    <p className="text-lg font-medium text-center font-roboto text-black">
      Goal-Based Insurance Cover
    </p>
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
        <Row justify="start" key="footer-row">
          <Button
            key="close"
            type="primary"
            className="shadow-none font-semibold text-lg leading-6 text-center text-white w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg "
          >
            <NavLink to="goal-based">Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className="flex flex-col gap-1 ">
        <img
          src={goal}
          alt={product.title}
          className="object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto"
        />
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            Secure Your Financial Goals
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Goal-based insurance cover helps you achieve your financial goals by providing the necessary funds at the right time. Whether you're saving for your child's education, buying a home, or planning for retirement, this cover ensures that your goals are met, even in unforeseen circumstances.
          </p>
        </div>
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            Benefits of Goal-Based Insurance Cover
          </p>
          <ul className="list-disc text-left pl-5">
            <li className="mb-2">Tailored coverage to meet your specific financial goals</li>
            <li className="mb-2">Flexibility to adjust your coverage as your goals change</li>
            <li className="mb-2">Tax benefits under section 80C of the Income Tax Act</li>
            <li className="mb-2">Peace of mind knowing that your financial goals are protected</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default Goalbasedmodal;
