import { Row } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Product from "./Product";
import products from "../../utils/products";

const ProductsList = () => {
  return (
    <>
      <Row align="middle" gutter={8} className="pt-10 pl-9">
        <div className="mb-4">
          <span>
            <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
              <LeftOutlined className="w-8 h-8" />
            </button>
          </span>
          <span className="text-lg font-semibold font-open-sans text-left">
            Get Insurance
          </span>
        </div>

        <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col  gap-4">
          <p className="text-lg font-semibold font-open-sans text-left">
            Recommended for you
          </p>
          <p className="text-sm font-normal font-open-sans text-left text-[#929497]">
            We thought this might interest you
          </p>
        </div>
      </Row>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {products.map((product, index) => (
          <Product key={product.title} product={product} index={index} />
        ))}
      </div>
    </>
  );
};

export default ProductsList;
