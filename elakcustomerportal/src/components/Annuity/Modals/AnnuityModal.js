import { NavLink } from "react-router-dom";
import { Modal, Button, Row } from "antd";
import Img from "../../../assets/annuityImg.jpg";
import { useTheme } from "../../../store/context/theme-context";

const AnnuityModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const { theme } = useTheme();
  const customTitle = (
    <p
      className={`${
        theme === "dark" ? "text-white bg-gray-800" : "text-black"
      } text-lg font-medium text-center font-roboto `}
    >
      Annuity Cover
    </p>
  );

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onOk={onOkay}
      onCancel={onCancel}
      className={theme === "dark" ? "dark-theme" : ""}
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
            className={`${
              theme === "dark" ? "text-white" : ""
            } shadow-none font-semibold text-lg leading-6 text-center w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg `}
          >
            <NavLink to="annuity">Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className="flex flex-col gap-1 ">
        <img
          src={Img}
          alt={product.title}
          className="object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto"
        />
        <div className="py-3 px-0">
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-[#221F1F]"
            } text-left  font-semibold text-[16px] leading-6`}
          >
            Life is a journey...
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
          Group life insurance – also known as death in service insurance – is an attractive
          employee benefit designed to financially support your employee’s loved ones by providing
          them with a cash lump-sum payment.
          </p>
        </div>
        <div className="py-3 px-0">
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-[#221F1F]"
            } text-left  font-semibold text-[16px] leading-6`}
          >
            Our Annuity cover
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
          We will make a lump sum payment to your beneficiaries within 48 hours of a notice of death. 
          This payment is intended to cover funeral expenses and provide financial stability during a difficult time. 
          With a range of coverage options to choose from, your peace of mind and the well-being of your employees and 
          their families are just a click away.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AnnuityModal;
