
import { useNavigate } from "react-router-dom";
import { Steps, Button, Typography, message, Form } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import ContactDetails from "./CustomerDetails";

const { Title } = Typography;


const Annuity=()=>{

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);
      };
    return (
        <>
        <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
        </button>
        <Title level={4} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Annuity Cover
        </Title>
      </div>
        </>
    );
};

export default Annuity;