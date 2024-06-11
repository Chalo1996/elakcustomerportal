import {useState} from "react"
import { Form, Row } from "antd";
import ProductPackage from "./ProductPackage";

const productPackages = [
  { name: "Imara", benefit: 10000 },
  { name: "Bora", benefit: 50000 },
  { name: "Jambo", benefit: 100000 },
  { name: "Zuri", benefit: 150000 },
  { name: "Fahari", benefit: 200000 },
  { name: "Imani", benefit: 300000 },
  { name: "Nuru", benefit: 400000 },
  { name: "Pendo", benefit: 500000 },
];

const ProductPackagesForm = ({ form, formData, setFormData }) => {
    const [selectedPackage, setSelectedPackage] = useState(formData.productName);

    const handleSelect = (name, benefit) => {
      setFormData({
        ...formData,
        productName: name,
        benefitAmount: benefit,
      });
      setSelectedPackage(name);
    };

  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] mt-3 mb-10 py-3 px-0 flex flex-col gap-1">
        <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
          Please select your preferred product package.
        </p>
        <p className="text-sm font-normal font-open-sans text-left text-[#929497]">
          The benefit covers the principal member and selected family members.
        </p>
      </div>

      <Form form={form} className="mb-10">
        <Row gutter={[16, 16]}>
          {productPackages.map((pkg, index) => (
            <ProductPackage
              key={index}
              name={pkg.name}
              benefit={pkg.benefit}
              onSelect={handleSelect}
              selected={pkg.name === selectedPackage}
            />
          ))}
        </Row>
      </Form>
    </>
  );
};

export default ProductPackagesForm;
