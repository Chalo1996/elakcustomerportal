import { Card, Button } from "antd";
import { useTheme } from "../../store/context/theme-context";
import { useState } from "react";

import FuneralExpenseModal from "../Funeral Expense/FuneralExpenseModal";
import GroupTermLifeModal from "../Group Term Life/GroupTermLifeModal";
import { NavLink } from "react-router-dom";

const { Meta } = Card;

const Product = ({ product, index }) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderModal = () => {
    switch (index) {
      case 0:
        return (
          <FuneralExpenseModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
        case 4:
        return (
          <GroupTermLifeModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      //Add cases for additional product modals here...
      default:
      return null;
    }
  };

  return (
    <Card
      bordered={false}
      cover={
        <img
          alt={product.title}
          src={product.image}
          className="h-40 object-cover"
        />
      }
      className={`${theme === "dark" ? "bg-gray-700 text-white" : ""} m-4`}
    >
      <Meta
        title={
          <span style={{ color: theme === "dark" ? "gray" : "inherit" }}>
            {product.title}
          </span>
        }
        description={
          <span style={{ color: theme === "dark" ? "gray" : "inherit" }}>
            {product.description}
          </span>
        }
      />
      <div className="flex flex-col lg:flex-row justify-start mt-4 gap-1">
        <Button
          className="border-0 shadow-none text-[#A32A29]"
          onClick={showModal}>
          Learn More
        </Button>

         <Button type="primary" className="border-0 shadow-none">
          <NavLink to={product.url}>Get Cover</NavLink>
        </Button>
      </div>
      {renderModal()}
    </Card>
  );
};
export default Product;
