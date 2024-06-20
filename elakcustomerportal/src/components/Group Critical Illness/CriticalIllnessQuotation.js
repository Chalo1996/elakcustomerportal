import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Table, Typography, Row, Col, Button, Checkbox, Card } from 'antd';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetData } from "../../store/redux/features/gciSlice";
import { LeftOutlined } from "@ant-design/icons";


const CriticalIllnessQuotation = () => {
    // const [ tableColumns, setTableColumns] = useState([]);
    const [acceptedExclusions, setAcceptedExclusions] = useState(false);
    // const [current, setCurrent] = useState(0);

    const dispatch = useDispatch();
  const location = useLocation();
  const { formData = {}, quotationData = {} } = location.state || {};

  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

    // const handleTableColumnsChange = (columns) => {
    //     setTableColumns(columns);
    // };

    const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const currentDate = today.toLocaleDateString("en-US", options);

  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate('/home/customer-type/critical-illness');
  };

    const { Text, Title } = Typography;

    const [formatter] = useState(new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
    }));

    const handleAcceptanceChange = (e) => {
        setAcceptedExclusions(e.target.checked);
    };

    const handleNavigate = () => {
        navigate(-1);
      };

    const generateQuotationContent = () => {
        // Construct the content of the quotation here
        const content = `
    <div style={{
        border: "2px solid black",
        maxWidth: "800px",
        margin: "auto",
        position: "relative",
        paddingBottom: "60px",
    }}>
        <div style={{ maxWidth: "750px", margin: "auto" }}>
            <Row
                justify="space-between"
                align="middle"
                style={{ marginTop: "20px" }}
            >
                <Col>
                    <Title level={4} style={{ margin: 0 }}>
                        EQUITY LIFE ASSURANCE (KENYA) LIMITED
                    </Title>
                    <Title level={4} style={{ margin: 0 }}>
                        Quotation
                    </Title>
                </Col>
                <Col>
                    <div style={{ textAlign: "right" }}>
                        <img
                            src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain"
                            alt="Company Logo"
                            style={{
                                maxWidth: "100px",
                                maxHeight: "120px",
                                marginLeft: "30px",
                            }}
                        />
                        <Text style={{ display: "block", marginTop: "10px" }}>
                            ${currentDate}
                        </Text>
                    </div>
                </Col>
            </Row>
    
            <Title style={{ textAlign: "left" }} level={4}>
                Contact Details
            </Title>
            <Table
                columns={columns}
                dataSource={contactDetails}
                pagination={false}
                bordered
                showHeader={false}
                size="middle"
                style={{
                    border: "2px solid maroon",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            />
    
            <Title style={{ textAlign: "left" }} level={4}>
                Policy Details
            </Title>
            <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                Personal Critical Illness Cover
            </Title>
            <Table
                columns={tableColumnsData}
                dataSource={emptyDataTemplate}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                    border: "2px solid maroon",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            />
    
            <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                Personal Funeral Expense Rider
            </Title>
            <Table
                columns={tableColumnsData}
                dataSource={emptyDataTemplate}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                    border: "2px solid maroon",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            />
    
            <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                Personal Terminal Illness Rider
            </Title>
            <Table
                columns={tableColumnsData}
                dataSource={emptyDataTemplate}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
                style={{
                    border: "2px solid maroon",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            />
    
            <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                Total Premiums
            </Title>
            <Table
                columns={tableColumnsData}
                dataSource={emptyDataTemplate}
                pagination={false}
                bordered
                showHeader={true}
                size="middle"
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
            <Text>Quotation is valid for 90 days since the date of issue</Text>
            <br />
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Category of member</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Minimum entry age</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Maximum entry age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Life Assured (Main member)</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>18 years</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>70 years</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Spouse</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>18 years</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>70 years</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Children</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>37 weeks</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>24 years</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <p><strong>Onboarding requirements:</strong> Member data in the below format</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Date of Birth</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>ID/Passport Number</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Main Member</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Relation to Member</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <Text>Copies of ID/Passport, Birth Certificate/Notification of members covered.</Text>
            <div>
                <p style={{ fontStyle: "italic" }}>Additional documents for individual cover: KRA Pin of main member.</p>
                <p style={{ fontStyle: "italic" }}>Additional documents for Groups/Corporates: Certificate of Registration & KRA Pin.</p>
            </div>
            <Text strong>Contacts</Text>
            <br />
            <Text>Email: businessdevelopment@equityinsurance.co.ke</Text>
            <br />
            <Text>Tel: +254763026000</Text>
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
    `;
    
        return content;
    };
    

    const handleDownload = () => {
        // Content of the quotation to be downloaded
        const quotationContent = generateQuotationContent();
    
        // Create a new jsPDF instance
        const doc = new jsPDF();
    
        // Set font size and add HTML content
        doc.setFontSize(12);
        doc.html(quotationContent, {
            callback: function (pdf) {
                // Save the PDF
                pdf.save("CriticalIllnessQuotation.pdf");
            },
            x: 10,
            y: 10
        });
    };
    
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

    const tableColumns = [
        {
            title: "Member Type",
            dataIndex: "name",
            key: "name",
            width: "15%",
        },
        {
            title: "Lives",
            dataIndex: "individualLives",
            key: "individualLives",
            width: "15%",
        },
        {
            title: "Sum Assured Per Member",
            dataIndex: "sumAssured",
            key: "sumAssured",
            width: "15%",
            render: (text) => formatter.format(text)
        },
        {
            title: "Total Sum Assured",
            dataIndex: "totalSumAssured",
            key: "totalSumAssured",
            width: "15%",
            render: (text) => formatter.format(text)
        },
        {
            title: "Premium Per Member",
            dataIndex: "ciPremium",
            key: "ciPremium",
            width: "15%",
            render: (text) => formatter.format(text)
        },
        {
            title: "Total Premium",
            dataIndex: "totalciPremium",
            key: "totalciPremium",
            width: "15%",
            render: (text) => formatter.format(text)
        },
    ];

    const contactDetails = [
        { key: "clientName", attribute: "Name", value: `${formData.firstName} ${formData.lastName}`},
        { key: "telNo", attribute: "Phone Number", value: formData.mobileNumber },
        { key: "clientEmailAddress", attribute: "Email", value: formData.email },
    ];

    const criticalIllnessCover = [
        {
          name: quotationData.tableData[0].name,
          individualLives: quotationData.tableData[0].individualLives,
          sumAssured: quotationData.tableData[0].sumAssured,
          totalSumAssured: quotationData.tableData[0].totalSumAssured,
          ciPremium: quotationData.tableData[0].ciPremium,
          totalciPremium: quotationData.tableData[0].individualLives*quotationData.tableData[0].ciPremium,
        },
        {
          name: quotationData.tableData[1].name,
          individualLives: quotationData.tableData[1].individualLives,
          sumAssured: quotationData.tableData[1].sumAssured,
          totalSumAssured: quotationData.tableData[1].totalSumAssured,
          ciPremium: quotationData.tableData[1].ciPremium,
          totalciPremium: quotationData.tableData[1].individualLives*quotationData.tableData[1].ciPremium,
        },
        {
          name: quotationData.tableData[2].name,
          individualLives: quotationData.tableData[2].individualLives,
          sumAssured: quotationData.tableData[2].sumAssured,
          totalSumAssured: quotationData.tableData[2].totalSumAssured,
          ciPremium: quotationData.tableData[2].ciPremium,
          totalciPremium:quotationData.tableData[2].individualLives*quotationData.tableData[2].ciPremium,
        },
        {
          name: quotationData.tableData[3].name,
          individualLives: quotationData.tableData[3].individualLives,
          sumAssured: quotationData.tableData[3].sumAssured,
          totalSumAssured: quotationData.tableData[3].totalSumAssured,
          ciPremium: quotationData.tableData[3].ciPremium,
          totalciPremium: quotationData.tableData[0].ciPremium+quotationData.tableData[1].ciPremium+quotationData.tableData[2].ciPremium,
        },
      ];
      

      const funeralExpenseCover = [
        {
           name: quotationData.tableData[0].name,
           individualLives: quotationData.tableData[0].individualLives,
           sumAssured: 100000,
           totalSumAssured: 100000*quotationData.tableData[0].individualLives,
           ciPremium: quotationData.tableData[0].funeralExpense,
           totalciPremium: quotationData.tableData[0].individualLives*quotationData.tableData[0].funeralExpense,
         },
         {
           name: quotationData.tableData[1].name,
           individualLives: quotationData.tableData[1].individualLives,
           sumAssured:  100000,
           totalSumAssured: 100000*quotationData.tableData[1].individualLives,
           ciPremium: quotationData.tableData[1].funeralExpense,
           totalciPremium: quotationData.tableData[1].individualLives*quotationData.tableData[1].funeralExpense,
         },
         {
           name: quotationData.tableData[2].name,
           individualLives: quotationData.tableData[2].individualLives,
           sumAssured: 100000,
           totalSumAssured: 100000*quotationData.tableData[2].individualLives,
           ciPremium: quotationData.tableData[2].funeralExpense,
           totalciPremium:quotationData.tableData[2].individualLives*quotationData.tableData[2].funeralExpense,
         },
         {
           name: quotationData.tableData[3].name,
           individualLives: quotationData.tableData[3].individualLives,
           sumAssured: 100000,
           totalSumAssured: 100000*quotationData.tableData[3].individualLives,
           ciPremium: quotationData.tableData[3].funeralExpense,
           totalciPremium: quotationData.tableData[0].funeralExpense+quotationData.tableData[1].funeralExpense+quotationData.tableData[2].funeralExpense,
         },
           ];

           const terminalIllnessRider = [
            {
         name: quotationData.tableData[0].name,
         individualLives: quotationData.tableData[0].individualLives,
         sumAssured: 250000,
         totalSumAssured: 250000*quotationData.tableData[0].individualLives,
         ciPremium: quotationData.tableData[0].terminalExpense,
         totalciPremium: quotationData.tableData[0].individualLives*quotationData.tableData[0].terminalExpense,
       },
       {
         name: quotationData.tableData[1].name,
         individualLives: quotationData.tableData[1].individualLives,
         sumAssured:  187500,
         totalSumAssured: 187500*quotationData.tableData[1].individualLives,
         ciPremium: quotationData.tableData[1].terminalExpense,
         totalciPremium: quotationData.tableData[1].individualLives*quotationData.tableData[1].terminalExpense,
       },
       {
         name: quotationData.tableData[2].name,
         individualLives: quotationData.tableData[2].individualLives,
         sumAssured: 125000,
         totalSumAssured: 125000*quotationData.tableData[2].individualLives,
         ciPremium: quotationData.tableData[2].terminalExpense,
         totalciPremium:quotationData.tableData[2].individualLives*quotationData.tableData[2].terminalExpense,
       },
       {
         name: quotationData.tableData[3].name,
         individualLives: quotationData.tableData[3].individualLives,
         sumAssured: 250000+187500+125000,
         totalSumAssured: 250000+187500+625000,
         ciPremium: quotationData.tableData[3].terminalExpense,
         totalciPremium: quotationData.tableData[0].terminalExpense+quotationData.tableData[1].terminalExpense+quotationData.tableData[2].terminalExpense,
       },
     
         ];
     
     
         const totalPremiumDetails = [
            {
              name: quotationData.tableData[0].name,
              individualLives: quotationData.tableData[0].individualLives,
              sumAssured: quotationData.tableData[0].ciPremium,
              totalSumAssured: quotationData.tableData[0].terminalExpense,
              ciPremium: quotationData.tableData[0].funeralExpense,
              totalciPremium: quotationData.tableData[0].totalPremium,
            },
            {
              name: quotationData.tableData[1].name,
              individualLives: quotationData.tableData[1].individualLives,
              sumAssured: quotationData.tableData[1].ciPremium,
              totalSumAssured: quotationData.tableData[1].terminalExpense,
              ciPremium: quotationData.tableData[1].funeralExpense,
              totalciPremium: quotationData.tableData[1].totalPremium,
            },
            {
              name: quotationData.tableData[2].name,
              individualLives: quotationData.tableData[2].individualLives,
              sumAssured: quotationData.tableData[2].ciPremium,
              totalSumAssured: quotationData.tableData[2].terminalExpense,
              ciPremium: quotationData.tableData[2].funeralExpense,
              totalciPremium: quotationData.tableData[2].totalPremium,
            },
            {
              name: quotationData.tableData[3].name,
              individualLives: quotationData.tableData[3].individualLives,
              sumAssured: quotationData.tableData[0].ciPremium+quotationData.tableData[1].ciPremium+quotationData.tableData[2].ciPremium,
              totalSumAssured: quotationData.tableData[0].terminalExpense+quotationData.tableData[1].terminalExpense+quotationData.tableData[2].terminalExpense,
              ciPremium: quotationData.tableData[0].funeralExpense+quotationData.tableData[1].funeralExpense+quotationData.tableData[2].funeralExpense,
              totalciPremium: quotationData.tableData[0].totalPremium+quotationData.tableData[1].totalPremium+quotationData.tableData[2].totalPremium,
            },
          ];      

    return (
        <div className="pt-5 pl-4">
      <div className="flex items-center" style={{ marginBottom: "20px", marginTop: "10px" }} >
          <button className="mb-1.5 focus:outline-none hover:text-[#A32A29]" >
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate}/>
          </button>
          <Title level={5} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
            Critical Illness Cover
          </Title>
      </div>
      <Card style={{ border: "1px solid maroon" }}>
            <div
                style={{
                    maxWidth: "800px",
                    margin: "auto",
                    position: "relative",
                    paddingBottom: "60px",
                    width: "90%"
                }}
            >
                <div style={{ maxWidth: "750px", margin: "auto" }}>
                    <Row
                        justify="space-between"
                        align="middle"
                        style={{ marginTop: "20px" }}
                    >
                        <Col>
                            <Title level={4} style={{ margin: 0 }}>
                                EQUITY LIFE ASSURANCE (KENYA) LIMITED
                            </Title>
                            <Title level={4} style={{ margin: 0 }}>
                                Quotation
                            </Title>
                        </Col>
                        <Col>
                            <div style={{ textAlign: "right" }}>
                                <img
                                    src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain"
                                    alt="Company Logo"
                                    style={{
                                        maxWidth: "100px",
                                        maxHeight: "120px",
                                        marginLeft: "30px",
                                    }}
                                />
                                <Text style={{ display: "block", marginTop: "10px" }}>
                                    {currentDate}
                                </Text>
                            </div>
                        </Col>
                    </Row>
    
                    <Title style={{ textAlign: "left" }} level={4}>
                        Contact Details
                    </Title>
                    <Table
                        columns={columns}
                        dataSource={contactDetails}
                        pagination={false}
                        bordered
                        showHeader={false}
                        size="middle"
                        style={{
                            border: "2px solid maroon",
                            padding: "20px",
                            marginBottom: "20px",
                        }}
                    />
    
                    <Title style={{ textAlign: "left" }} level={4}>
                        Policy Details
                    </Title>
                    <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                        Personal Critical Illness Cover
                    </Title>
                    <Table
                        columns={tableColumns}
                        dataSource={criticalIllnessCover}
                        pagination={false}
                        bordered
                        showHeader={true}
                        size="middle"
                        style={{
                            border: "2px solid maroon",
                            padding: "20px",
                            marginBottom: "20px",
                        }}
                    />
    
                    <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                        Personal Funeral Expense Rider
                    </Title>
                    <Table
                        columns={tableColumns}
                        dataSource={funeralExpenseCover}
                        pagination={false}
                        bordered
                        showHeader={true}
                        size="middle"
                        style={{
                            border: "2px solid maroon",
                            padding: "20px",
                            marginBottom: "20px",
                        }}
                    />
    
                    <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                        Personal Terminal Illness Rider
                    </Title>
                    <Table
                        columns={tableColumns}
                        dataSource={terminalIllnessRider}
                        pagination={false}
                        bordered
                        showHeader={true}
                        size="middle"
                        style={{
                            border: "2px solid maroon",
                            padding: "20px",
                            marginBottom: "20px",
                        }}
                    />
    
                    <Title style={{ textAlign: "center", color: "maroon" }} level={4}>
                        Total Premiums
                    </Title>
                    <Table
                        columns={tableColumns}
                        dataSource={totalPremiumDetails}
                        pagination={false}
                        bordered
                        showHeader={true}
                        size="middle"
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
                    <Text>Quotation is valid for 90 days since the date of issue</Text>
                    <br />
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Category of member</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Minimum entry age</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Maximum entry age</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid black", padding: "8px" }}>Life Assured (Main member)</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>18 years</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>70 years</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid black", padding: "8px" }}>Spouse</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>18 years</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>70 years</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid black", padding: "8px" }}>Children</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>37 weeks</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>24 years</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p><strong>Onboarding requirements:</strong> Member data in the below format</p>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Date of Birth</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>ID/Passport Number</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Main Member</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Relation to Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <Text>Copies of ID/Passport, Birth Certificate/Notification of members covered.</Text>
                    <div>
                        <p style={{ fontStyle: "italic" }}>Additional documents for individual cover: KRA Pin of main member.</p>
                        <p style={{ fontStyle: "italic" }}>Additional documents for Groups/Corporates: Certificate of Registration & KRA Pin.</p>
                    </div>
                    <Text strong>Contacts</Text>
                    <br />
                    <Text>Email: businessdevelopment@equityinsurance.co.ke</Text>
                    <br />
                    <Text>Tel: +254763026000</Text>
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
                        padding: "6px",
                    }}
                >
                    Equity Life Assurance (Kenya) Limited
                </div>
            </div>
            </Card>
    
            {/* Checkbox for accepting policy exclusions */}
            <div style={{ margin: '20px 0', textAlign: 'left' }}>
                <Checkbox
                    checked={acceptedExclusions}
                    onChange={handleAcceptanceChange}
                >
                    I accept the {" "}
        <a href="./" style={{ color: "#A32A29" }}>
            policy exclusions
        </a>
                </Checkbox>
            </div>
    
            {/* Buttons */}
            <div style={{ textAlign: "right", marginTop: "20px", color: "#A32A29" }}>
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
             disabled={!acceptedExclusions}
          >
            Continue with Payment
          </Button>
          <Button className="mr-4" style={{ marginRight: "10px" }} onClick={handleDownload}>
            Download
          </Button>
          <Button className="mr-4" style={{ marginRight: "10px" }}>
            Send to Email
          </Button>
        </div>
        </div>
    );    
};


export default CriticalIllnessQuotation;
