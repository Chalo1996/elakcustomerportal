import { Card, Row, Col, Table } from "antd";

const FuneralExpenseQuotation = ({ formData, tableData }) => {
  const customerTableColumns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      width: "50%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "50%",
    },
  ];

  const customerTableData = [
    {
      key: "name",
      attribute: "Name",
      value: `${formData.title} ${formData.customerName}`,
    },
    {
      key: "gender",
      attribute: "Gender",
      value: formData.customerGender,
    },
    {
      key: "email",
      attribute: "Email",
      value: formData.customerEmail,
    },
    {
      key: "country",
      attribute: "Country",
      value: formData.country,
    },
    {
      key: "phone",
      attribute: " Phone",
      value: `${formData.customerPhoneArea}${formData.customerPhone}`,
    },
  ];

  const policyDataColumns = [
    { title: "Member Type", dataIndex: "name", key: "name" },
    { title: "Number of Members", dataIndex: "lives", key: "lives" },
    {
      title: "Sum Assured Per Member",
      dataIndex: "sumAssured",
      key: "sumAssured",
    },
    {
      title: "Total Sum Assured",
      dataIndex: "totalSumAssured",
      key: "totalSumAssured",
    },
    {
      title: "Premium Per Member",
      dataIndex: "premiumPerMember",
      key: "premiumPerMember",
    },
    {
      title: "Total Premium",
      dataIndex: "totalPremium",
      key: "totalPremium",
    },
  ];

  const ageInfoData = [
    {
      category: "Life Assured (Main Member)",
      minAge: "18 years",
      maxAge: "70 years",
    },
    { category: "Spouse", minAge: "18 years", maxAge: "70 years" },
    { category: "Children", minAge: "1 day", maxAge: "24 years" },
    { category: "Parents/Parents In-Law", minAge: "NA", maxAge: "70 years" },
  ];

  return (
    <>
      <Card style={{ border: "1px solid black" }}>
        <div style={{ width: "90%", margin: "auto" }}>
          <Row justify="space-between">
            <Col>
              <h3 style={{ fontWeight: "bold" }}>
                EQUITY LIFE ASSURANCE (KENYA) LIMITED
              </h3>
              <h4 style={{ fontWeight: "bold" }}>Funeral Expense</h4>
              <h4 style={{ fontWeight: "bold" }}>
                {formData.segment} Quotation
              </h4>
            </Col>
            <Col>
              <img
                src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain"
                alt="Company Logo"
                style={{
                  maxWidth: "100px",
                  maxHeight: "120px",
                }}
              />

              <h4
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Date: {new Date().toLocaleDateString()}
              </h4>
            </Col>
          </Row>

          <h4 style={{ fontWeight: "bold", marginTop: "5px" }}>
            Customer Details
          </h4>
          <Table
            columns={customerTableColumns}
            dataSource={customerTableData}
            bordered
            pagination={false}
            style={{ border: "1px solid black" }}
            showHeader={false}
          />

          <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
            Policy Details
          </h4>
          <Table
            columns={policyDataColumns}
            dataSource={tableData}
            bordered
            pagination={false}
            title={() => (
              <div
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "maroon",
                }}
              >
                {formData.segment === "Individual Customer"
                  ? "Personal Funeral Expense Cover"
                  : "Group Funeral Expense Cover"}
              </div>
            )}
            style={{ border: "1px solid black" }}
          />

          <h4 style={{ fontWeight: "bold", marginTop: "20px" }}>Notes</h4>
          <p>1. Cover on 24 hour worldwide basis. </p>
          <p>
            2. Funeral Expense claims are payable within 48 hours of official
            notification.
          </p>
          <p>
            3. All Funeral Expense benefits are paid on death, due to any
            covered cause, of the main member or of the dependants where
            applicable.
          </p>
          <p>
            4. Cover applies to principal member, one spouse, biological
            children, biological parents & parents-in-law. Cover may be extended
            to adopted children subject to proof of legal adoption.
          </p>
          <p>
            5 .The cover duration is one (1) year and commences once the premium
            is paid in full.
          </p>
          <p>
            6. The premium rates are subject to re-pricing in case the claims
            experience proves worse than allowed for in the premium rates.
          </p>
          <p>
            7. There is a waiting period of 1 month for nuclear family and 2
            months for parents and parents in law from the date of commencement
            of the policy and subject to payment of full premium. In case of
            natural death within the waiting period no benefit is payable. There
            is no waiting period for accidental death.
          </p>
          <p>
            8. This quotation is valid for a period of 90 days after the date of
            issue.
          </p>

          <table
            style={{
              width: "80%",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "maroon",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Category of Member
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Minimum Entry Age
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Maximum Entry Age
                </th>
              </tr>
            </thead>
            <tbody>
              {ageInfoData.map((row, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {row.category}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {row.minAge}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {row.maxAge}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: "15px" }}>
            <strong>Onboarding requirements:</strong> Member data in the below
            format
          </p>
          <table>
            <thead>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Date of Birth
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                ID/Passport Number
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Phone Number
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Main Member
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Relation to Member
              </th>
            </thead>
            <tbody>
              <td style={{ border: "1px solid black", padding: "8px" }}></td>
              <td style={{ border: "1px solid black", padding: "8px" }}></td>
              <td style={{ border: "1px solid black", padding: "8px" }}></td>
              <td style={{ border: "1px solid black", padding: "8px" }}></td>
              <td style={{ border: "1px solid black", padding: "8px" }}></td>
              <td style={{ border: "1px solid black", padding: "8px" }}></td>
            </tbody>
          </table>

          <p style={{ marginTop: "15px" }}>
            Copies of ID/Passport, Birth Certificate/Notification of members
            covered.
          </p>
          <p>
            <em>
              Additional documents for individual cover: KRA Pin of main member.
            </em>
          </p>
          <p>
            <em>
              Additional documents for Groups/Corporates-Certificate of
              Registration & KRA Pin.{" "}
            </em>
          </p>

          <div style={{ marginBottom: "10px", marginTop: "15px" }}>
            <h4 style={{ fontWeight: "bold" }}>Contacts</h4>
            <p>
              Email:
              <a href="mailto:businessdevelopment@equityinsurance.co.ke">
                businessdevelopment@equityinsurance.co.ke
              </a>
              <br />
              Tel: <a href="tel:0763026000">+254763026000</a>
            </p>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            backgroundColor: "maroon",
            textAlign: "center",
            padding: "6px",
          }}
        >
          <h3 style={{ color: "white" }}>
            <strong>Equity Life Assurance (Kenya) Limited</strong>
          </h3>
        </div>
      </Card>
    </>
  );
};

export default FuneralExpenseQuotation;
