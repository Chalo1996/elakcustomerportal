import { Row, Col, Card } from "antd";

const ConfirmDetailsForm = ({ formData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="mb-10 mt-10">
      <p className="font-open-sans text-[15px] font-semibold text-left">
        To continue, please confirm your insurance purchase details
      </p>

      <Card className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Product</p>
              <p>Funeral Expense</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Premium Package</p>
              <p>{formData.productName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Cover Date</p>
              <p>{formatDate(formData.startDate)}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Customer</p>
              <p>{formData.segment}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Sum Assured</p>
              <p>{formData.benefitAmount}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Personal Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Full Name</p>
              <p>
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Email Address</p>
              <p>{formData.email}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Mobile Number</p>
              <p>
                {formData.phoneArea}
                {formData.phoneNo}
              </p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Beneficiary Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Spouse</p>
              <p>{formData.spouseNumber} adult</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Children</p>
              <p>{formData.childrenNumber} children</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Parents</p>
              <p>{formData.parentsNumber} adult(s)</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Parents-In-Law</p>
              <p>{formData.parentsInLawNumber} adult(s)</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Coverage Percentages" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Principal</p>
              <p>{formData.principalPercentage}%</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Spouse</p>
              <p>
                {formData.spouseNumber > 0 ? formData.spousePercentage : 0}%
              </p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Children</p>
              <p>
                {formData.childrenNumber > 0 ? formData.childrenPercentage : 0}%
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Parents</p>
              <p>
                {formData.parentsNumber > 0 ? formData.parentsPercentage : 0}%
              </p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Parents-In-Law</p>
              <p>
                {formData.parentsInLawNumber > 0
                  ? formData.parentsInLawPercentage
                  : 0}
                %
              </p>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default ConfirmDetailsForm;
