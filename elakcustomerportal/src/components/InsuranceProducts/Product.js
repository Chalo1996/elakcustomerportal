import { Card, Button } from "antd";
import { useTheme } from "../../store/context/theme-context";

const { Meta } = Card;

const Product = ({ product }) => {
  const { theme } = useTheme();
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
      <Meta title={product.title} description={product.description} />
      <div className="flex flex-col md:flex-row justify-start mt-4">
        <Button className="border-0 shadow-none text-[maroon]">
          Learn More
        </Button>
        <Button type="primary" className="border-0 shadow-none">
          Get Cover
        </Button>
      </div>
    </Card>
  );
};

export default Product;
