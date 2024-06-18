import { Card, Col } from "antd";

const { Meta } = Card;

const ProductPackage = ({ name, benefit, onSelect, selected }) => {
  const handleClick = () => {
    onSelect(name, benefit);
  };

  const formattedBenefit = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(benefit);

  return (
    <Col xs={24} sm={12} lg={8}>
      <Card
        className={`transition cursor-pointer duration-100 ease-in-out transform ${
          selected ? "border-[#A32A29] shadow-xl ring-4 ring-red-200" : ""
        } w-full`}
        onClick={handleClick}
      >
        <Meta title={name} description={`Benefit: ${formattedBenefit}`} />
      </Card>
    </Col>
  );
};

export default ProductPackage;
