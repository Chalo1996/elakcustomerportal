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
        <Button className={`border-0 shadow-none text-[maroon]`}>
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
