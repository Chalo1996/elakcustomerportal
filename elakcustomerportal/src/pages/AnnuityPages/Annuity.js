import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons/";

const AnnuityPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="pt-5 pl-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Get Annuity Cover
        </span>
      </div>
    </div>
  );
};

export default AnnuityPage;
