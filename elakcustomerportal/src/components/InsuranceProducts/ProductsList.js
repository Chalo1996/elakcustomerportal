import React from "react";
import Product from "./Product";
import products from "../../utils/products";

const ProductsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product, index) => (
        <Product key={product.title} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;
