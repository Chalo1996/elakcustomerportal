import { Row } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const FuneralExpensePage = () => {
  return (
    <Row align="middle" gutter={8} className="pt-10 pl-9">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Customer
        </span>

        <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col gap-4">
          <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
            Please select the type of customer
          </p>
        </div>
      </div>
    </Row>
  );
};

export default FuneralExpensePage;
