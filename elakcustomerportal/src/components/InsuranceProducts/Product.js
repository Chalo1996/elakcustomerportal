import { Card, Button } from "antd";
import { useTheme } from "../../store/context/theme-context";
import gleImg from "../../assets/funeral-expense.jpg";

const product = {
  title: "Funeral Expense Cover",
  image: gleImg,
  description:
    "Funeral expense solution is designed to help families deal with the burden of meeting immediate funeral related expenses on the death of a family member.",
};

const { Meta } = Card;

const Product = () => {
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
      className={`${theme === "dark" ? "bg-gray-700 text-white" : ""} m-2`}
    >
      <Meta title={product.title} description={product.description} />
      <div className="flex justify-start mt-4">
        <Button className="border-0 shadow-none mr-3 text-[maroon]">
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
