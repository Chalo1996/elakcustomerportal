import React from "react";
import { Col, Row, Table, Typography } from "antd";

const { Text, Title } = Typography;

const Quotation = ({ formData, quotationData }) => {
  const {
    firstname,
    lastname,
    gender,
    country,
    phone,
    email,
    dob,
    sumAssured,
    countryCode,
    termsInMonths,
    frequency,
    installments,
    retrenchment,
  } = formData;

  const {
    annuitantAge,
    TermsInYears,
    AnnualPremiumsPayable,
    individualRetrenchmentCover,
    GrossInsurancePremium,
    medicalRequirements,
  } = quotationData;

  console.log("QuotationData", quotationData);

  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      width: "50%",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "50%",
    },
  ];

  const dataUserDetails = [
    { key: "name", attribute: "Name", value: `${firstname} ${lastname}` },
    { key: "gender", attribute: "Gender", value: gender },
    { key: "country", attribute: "Country", value: country },
    { key: "phone", attribute: "Phone", value: `${countryCode}${phone}` },
    { key: "email", attribute: "Email", value: email },
    {
      key: "dob",
      attribute: "Date of Birth",
      value: dob,
    },
    { key: "age", attribute: "Age", value: annuitantAge - 1 },
  ];

  let coverTypeTitle;
  let premiumsAttr;
  let numOfPremiumAttr;

  switch (frequency) {
    case "Single":
      coverTypeTitle = `Single`;
      premiumsAttr = `Total`;
      numOfPremiumAttr = ``;
      break;
    case "Annual":
      coverTypeTitle = `Annually`;
      premiumsAttr = `Annual`;
      numOfPremiumAttr = ` every year`;
      break;
    case "SemiAnnually":
      coverTypeTitle = `SemiAnnually`;
      premiumsAttr = `Semi-Annual`;
      numOfPremiumAttr = ` per year`;
      break;
    case "Quarterly":
      coverTypeTitle = `Quarterly`;
      premiumsAttr = `Quarterly`;
      numOfPremiumAttr = ` per year`;
      break;
    case "Monthly":
      coverTypeTitle = `Monthly`;
      premiumsAttr = "Monthly";
      numOfPremiumAttr = ` per year`;
      break;
    default:
      premiumsAttr = "";
  }

  const dataPolicyDetails = [
    {
      key: "coverType",
      attribute: "Type of Cover",
      value: coverTypeTitle,
    },
    {
      key: "termsInMonths",
      attribute: "Terms in Months",
      value: termsInMonths,
    },
    {
      key: "termsInYears",
      attribute: "Terms in Years",
      value: TermsInYears,
    },
    {
      key: "sumAssured",
      attribute: "Initial Sum Assured",
      value:
        (sumAssured &&
          sumAssured.toLocaleString("en-US", {
            style: "currency",
            currency: "KSH",
          })) ||
        5000000,
    },
    {
      key: "frequency",
      attribute: "Premium Frequency",
      value: frequency,
    },
  ];

  const dataSelectedOptionalBenefitsDetails = [
    {
      key: "retrenchment",
      attribute: "Retrenchment Cover/Job Loss",
      value: individualRetrenchmentCover ? "Yes" : "No",
    },
  ];

  const dataPremiumDetails = [
    {
      key: "annualPremium",
      attribute: `${premiumsAttr} Premiums payable`,
      value:
        AnnualPremiumsPayable.toLocaleString("en-US", {
          style: "currency",
          currency: "KSH",
        }) || 1,
    },
    {
      key: "premiumInstallments",
      attribute: `Number of Premium Installments${numOfPremiumAttr}`,
      value: installments,
    },
    {
      key: "totalPremium",
      attribute: "Total Premiums payable",
      value:
        GrossInsurancePremium.toLocaleString("en-US", {
          style: "currency",
          currency: "KSH",
        }) || 1,
    },
  ];

  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <>
      <div
        style={{
          border: "2px solid black",
          maxWidth: "800px",
          margin: "auto",
          position: "relative",
          paddingBottom: "60px",
        }}
      >
        <div style={{ maxWidth: "750px", margin: "auto" }}>
          <Row
            justify='space-between'
            align='middle'
            style={{ marginTop: "20px" }}
          >
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                EQUITY LIFE ASSURANCE (KENYA) LIMITED
              </Title>
              <Title level={4} style={{ margin: 0 }}>
                Group Credit Quotation
              </Title>
            </Col>
            <Col>
              <div style={{ textAlign: "right" }}>
                <img
                  src='https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain'
                  alt='Company Logo'
                  style={{
                    maxWidth: "100px",
                    maxHeight: "120px",
                    marginLeft: "30px",
                  }}
                />
                <Text style={{ display: "block", marginTop: "10px" }} strong>
                  Date: {formattedDate}
                </Text>
              </div>
            </Col>
          </Row>

          <Title style={{ textAlign: "center" }} level={4}>
            Client Details
          </Title>
          <Table
            columns={columns}
            dataSource={dataUserDetails}
            pagination={false}
            bordered
            showHeader={false}
            size='middle'
            style={{
              border: "2px solid maroon",
              padding: "20px",
              marginBottom: "20px",
            }}
          />

          <Title style={{ textAlign: "center" }} level={4}>
            Policy Details
          </Title>
          <Table
            columns={columns}
            dataSource={dataPolicyDetails}
            pagination={false}
            bordered
            showHeader={false}
            size='middle'
            style={{
              border: "2px solid maroon",
              padding: "20px",
              marginBottom: "20px",
            }}
          />

          <Title style={{ textAlign: "center" }} level={4}>
            Selected Optional Benefits
          </Title>
          <Table
            columns={columns}
            dataSource={dataSelectedOptionalBenefitsDetails}
            pagination={false}
            bordered
            showHeader={false}
            size='middle'
            style={{
              border: "2px solid maroon",
              padding: "20px",
              marginBottom: "20px",
            }}
          />

          <Title style={{ textAlign: "center" }} level={4}>
            Premium Details
          </Title>
          <Table
            columns={columns}
            dataSource={dataPremiumDetails}
            pagination={false}
            bordered
            showHeader={false}
            size='middle'
            style={{
              border: "2px solid maroon",
              padding: "20px",
              marginBottom: "20px",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "justify",
            marginTop: "20px",
            marginLeft: "15px",
            padding: "10px",
          }}
        >
          <Text strong>Notes:</Text>
          <br />
          <Text>Quotation is valid for 90 days since the date of issue</Text>
          <br />
          <Text>Premium is Indicative: Medicals Required</Text>
          <br />
          <Text strong style={{ color: "red" }}>
            Medical Requirements
          </Text>
          {/* <br />
            <Text>1. Medical Examiner's Report</Text>
            <br />
            <Text>
              2. Blood Profile (ESR, CBC) and Blood Chemistry Studies (FBS,
              Cholesterol, SGPT, SGOT, Creatinine or Serum Urea)
            </Text>
            <br />
            <Text>3. Urinalysis Report</Text>
            <br /> */}
          <br />
          <Text>1. {medicalRequirements}</Text>
          <br />
          <br />
          <Text strong>Term & Conditions</Text>
          <br />
          <a
            href='http://www.equity.co.ke/insurance_termlife'
            target='_blank'
            rel='noopener noreferrer'
          >
            www.equity.co.ke/insurance_termlife
          </a>
          <br />
          <Text strong>Contacts</Text>
          <br />
          <Text>Email: quotations@equityinsurance.co.ke</Text>
          <br />
          <Text>Tel: 0765000000</Text>
          <br />
        </div>

        <div
          style={{
            backgroundColor: "maroon",
            position: "absolute",
            bottom: "0",
            width: "100%",
            textAlign: "center",
            color: "white",
            padding: "5px 0",
          }}
        >
          Equity Life Assurance (Kenya) Limited
        </div>
      </div>
    </>
  );
};

export default Quotation;