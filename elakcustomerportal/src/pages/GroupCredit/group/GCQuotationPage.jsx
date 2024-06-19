import React from "react";
import { useSelector } from "react-redux";
import Quotation from "../../../components/GroupCredit/quotes/group/Quotation";

const GCQuotationPageGroup = () => {
  const userDetails = useSelector((state) => state.groupCredit);
  const quotationData = useSelector((state) => state.groupCredit.quotationData);

  return (
    <div className='quotation-page'>
      <Quotation formData={userDetails} quotationData={quotationData} />
    </div>
  );
};

export default GCQuotationPageGroup;
