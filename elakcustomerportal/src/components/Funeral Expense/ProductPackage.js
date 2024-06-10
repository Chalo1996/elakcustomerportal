import { Card, Col } from "antd";

const { Meta } = Card;

const ProductPackage = ({ name, benefit }) => {
  return (
    <Col xs={24} sm={12} lg={8}>
      <Card className="w-full" hoverable>
        <Meta title={name} description={`Benefit: ${benefit} KES`} />
      </Card>
    </Col>
  );
};

export default ProductPackage;
