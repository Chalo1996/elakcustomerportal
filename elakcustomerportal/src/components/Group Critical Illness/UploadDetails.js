import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  message,
  notification,
  Upload,
  Table,
  Row
} from "antd";

const { Dragger } = Upload;

const UploadDetails = () => {
  const [dataToBeSubmitted, setDataToBeSubmitted] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  // Function to download the CSV headers template
  const handleDownloadHeaders = () => {
    const headers = [
      "clientName",
      "memberNo",
      "fullName",
      "dob",
      "startDate",
      "coverEndDate",
      "category",
      "basicSalary",
      "dateOfMedicals",
      "acceptanceTerms",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "csv_headers.csv");
    document.body.appendChild(link);

    link.click();
  };

  // Function to handle file upload
  const handleFileUpload = (info) => {
    const { status } = info.file;
    if (status !== "done") {
      return;
    }

    const file = info.file.originFileObj;
    const fileExtension = file.name.split(".").pop();
    const isCSV = fileExtension.toLowerCase() === "csv";
    if (!isCSV) {
      message.destroy();
      notification.error({
        message: "Error",
        description: "Only files with .csv extension are allowed.",
        duration: 10,
      });
      return false;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split("\n");
      const nonEmptyLines = lines.filter((line) => line.trim() !== "");

      const members = [];
      const headers = nonEmptyLines[0]
        .split(/[;,]/)
        .map((value) => value.replace(/"/g, "").trim());

      for (let i = 1; i < nonEmptyLines.length; i++) {
        const values = nonEmptyLines[i]
          .split(/[;,]/)
          .map((value) => value.replace(/"/g, "").trim());
        const member = {};
        for (let j = 0; j < headers.length; j++) {
          member[headers[j]] = values[j];
        }
        members.push(member); // Only push member objects to the array
      }

      const context = {
        members: members.map((member) =>
          Object.fromEntries(
            Object.entries(member).map(([key, value]) => [
              key,
              value.replace(/"/g, ""),
            ])
          )
        ),
      };
      setDataToBeSubmitted(context);
      setTableColumns(
        headers.map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
        }))
      );
      setTableData(
        members.map((member, index) => ({ ...member, key: index }))
      );
      console.log("Headers:", headers);
      console.log("Members:", members);
      console.log("Context:", context);
    };

    reader.readAsText(file);
  };

  // Function to handle file removal
  const handleRemove = (file) => {
    setTableData([]);
    setTableColumns([]);
    setDataToBeSubmitted();
    message.success(`${file.name} removed and its data deleted.`);
  };

  // Function to handle quote button click
  const handleQuoteButtonClick = () => {
    if (!dataToBeSubmitted) {
      message.error(
        "Error: No data to submit. Please upload a CSV file first."
      );
      return;
    }
    console.log("Data to be submitted:", dataToBeSubmitted);
  };

  return (
    <Form>
      <Card title="Upload CSV" bordered={true}>
        <Button onClick={handleDownloadHeaders}>Download Template</Button>
        <Divider />
        <Col span={24}>
          <span>
            <strong>Customer Details</strong>
          </span>
        </Col>
        <Dragger
          name="file"
          multiple={false}
          accept=".csv"
          action="#"
          onChange={handleFileUpload}
          onRemove={handleRemove}
        >
          <p className="ant-upload-drag-icon"></p>
          <p className="ant-upload-text">Click or drag to upload Members</p>
          <p className="ant-upload-hint">
            Note: Only files with a .csv extension are accepted.
          </p>
        </Dragger>
        <Divider />
        {tableData.length > 0 && (
          <Table
            dataSource={tableData}
            columns={tableColumns}
            pagination={false}
            bordered
          />
        )}
        <Divider />
        <Row justify="end">
          <Button type="primary" onClick={handleQuoteButtonClick}>
            Submit Data
          </Button>
        </Row>
      </Card>
    </Form>
  );
};

export default UploadDetails;
