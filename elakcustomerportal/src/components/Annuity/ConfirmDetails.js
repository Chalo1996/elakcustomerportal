import { Card } from "antd";

const ConfirmDetailsForm = ({ formData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };
  return (
    <Card className="mb-10 mt-10">
      <p className="font-open-sans text-[15px] font-semibold text-left">
        To continue, please confirm your insurance purchase details
      </p>

      <Card title="Personal Details" className="mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Full Name</p>
            <p>
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Date of Birth</p>
            <p>{formatDate(formData.birthDate)}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Gender</p>
            <p>{formData.gender}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Email Address</p>
            <p>{formData.email}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Mobile Number</p>
            <p>
              {formData.phoneArea}
              {formData.phoneNo}
            </p>
          </div>
        </div>
      </Card>

      {!formData.isSingleLife && (
        <Card title="Spouse Details" className="mb-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Spouse DOB</p>
              <p>{formatDate(formData.spouseDob)}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Spouse Gender</p>
              <p>{formData.spouseGender}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Spouse Reversion Rate</p>
              <p>{`${formData.spouseReversion}%`}</p>
            </div>
          </div>
        </Card>
      )}

      <Card title="Product Configuration Details" className="mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Product</p>
            <p>Annuity Insurance Policy</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Annuity Type</p>
            <p>{formData.annuityType}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Single/Joint Life</p>
            <p>{formData.segment}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Target Type</p>
            <p>{formData.targetType}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">
              {formData.isPurchasePrice
                ? "Purchase Price"
                : `Annuity Amount Per ${formData.displayFrequency}`}
            </p>
            <p>
              {formatCurrency(
                formData.isPurchasePrice
                  ? formData.purchasePrice
                  : formData.annuityPerMonth
              )}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">
              {formData.isDeferredAnnuity
                ? "Contract Start Date"
                : "Commencement Date"}
            </p>
            <p>{formatDate(formData.startDate)}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Deferrement Period</p>
            <p>
              {formData.isDeferredAnnuity
                ? `${formData.deferrementPeriod} months`
                : "-"}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Guaranteed Period</p>
            <p>{`${formData.guaranteedPeriod} years`}</p>
          </div>
        </div>
      </Card>

      <Card title="Optional Benefits" className="mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Residual Premium</p>
            <p>{formData.residualPremium}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Long Term Care</p>
            <p>{formData.longTermCare}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Critical Illness</p>
            <p>{formData.criticalIllness}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Total Disability</p>
            <p>{formData.totalDisability}</p>
          </div>
          <div className="flex flex-col items-start justify-start mb-4">
            <p className=" text-[#929497]">Funeral Expense</p>
            <p>{formData.funeralExpense}</p>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default ConfirmDetailsForm;
