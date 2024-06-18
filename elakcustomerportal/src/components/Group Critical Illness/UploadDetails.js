import React, { useState, useContext, createContext, useEffect } from 'react';
import { Button, Card, Col, Divider, Form, message, notification, Upload, Table, Row, Input } from "antd";
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;
const EditableContext = createContext(null);

const UploadDetails = () => {
  const [dataToBeSubmitted, setDataToBeSubmitted] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const navigate = useNavigate();

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = React.useRef();
    const form = useContext(EditableContext);

    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const EditableTable = ({ dataSource, handleSave, tableColumns }) => {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = tableColumns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
        }),
      };
    });

    return (
      <div style={{ border: "1px solid black" }}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  };

  const newContext = {
    parameters: {
      benefitAmount: 1000000,
      policyTerm: 3,
      expenseSumAssured: 100000,
      marketingLoading: 8,
      expenseLoading: 10,
      profitLoading: 5,
      morbidityLoading: 5,
      segment: "Group Customer",
      TISelector: "Yes",
    },
    members: [
      {
        name: "PRINCIPAL",
        sumAssuredPercentage: 100,
      },
      {
        name: "SPOUSE",
        sumAssuredPercentage: 75,
      },
      {
        name: "CHILDREN",
        sumAssuredPercentage: 50,
      },
    ],
    lookupTable: [
      {
        Min: 0,
        Max: 29,
        CIMultiplier: 30,
        TIMultiplier: 30,
      },
      {
        Min: 30,
        Max: 39,
        CIMultiplier: 40,
        TIMultiplier: 40,
      },
      {
        Min: 40,
        Max: 49,
        CIMultiplier: 60,
        TIMultiplier: 60,
      },
      {
        Min: 50,
        Max: 59,
        CIMultiplier: 80,
        TIMultiplier: 80,
      },
      {
        Min: 60,
        Max: 69,
        CIMultiplier: 150,
        TIMultiplier: 150,
      },
      {
        Min: 70,
        Max: 100,
        CIMultiplier: 200,
        TIMultiplier: 200,
      },
    ],
  };

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

      const headers = nonEmptyLines[0]
        .split(/[;,]/)
        .map((value) => value.replace(/"/g, "").trim());

      const groupMemberData = [];
      const relationCounts = {};

      for (let i = 1; i < nonEmptyLines.length; i++) {
        const values = nonEmptyLines[i]
          .split(/[;,]/)
          .map((value) => value.replace(/"/g, "").trim());

        const memberData = {};
        headers.forEach((header, index) => {
          memberData[header] = values[index];
        });

        const relationToMember = memberData["Relation to Member"];
        if (relationToMember) {
          relationCounts[relationToMember] =
            (relationCounts[relationToMember] || 0) + 1;
        }

        groupMemberData.push(memberData);
      }

      console.log("Members:", groupMemberData);
      console.log("Relation Counts:", relationCounts);

      const individualLives = {
        PRINCIPAL: relationCounts["Self"] || 0,
        SPOUSE: relationCounts["Spouse"] || 0,
        CHILDREN: relationCounts["Child"] || 0,
      };

      console.log("Individual Lives:", individualLives);

      newContext.groupMemberData = groupMemberData.map((member) =>
        Object.fromEntries(
          Object.entries(member).map(([key, value]) => [key, value.replace(/"/g, '')])
        )
      );
      newContext.members[0].individualLives = individualLives.PRINCIPAL;
      newContext.members[1].individualLives = individualLives.SPOUSE;
      newContext.members[2].individualLives = individualLives.CHILDREN;

      message.success("File uploaded and data extracted successfully.");
      setDataToBeSubmitted(newContext);
      setTableColumns(
        headers.map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
          editable: true,
        }))
      );
      setTableData(
        groupMemberData.map((member, index) => ({ ...member, key: index }))
      );
      console.log("Context:", newContext);
    };

    reader.readAsText(file);
  };

  const handleSave = (row) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTableData(newData);

    const newArray = newData.map((member) => {
      const { key, ...rest } = member;
      return rest;
    });

    const updatedContext = {
      ...dataToBeSubmitted,
      groupMemberData: newArray.map((memberData) =>
        Object.fromEntries(
          Object.entries(memberData).map(([key, value]) => [
            key,
            typeof value === "string" ? value.replace(/"/g, "") : value,
          ])
        )
      ),
    };

    setDataToBeSubmitted(updatedContext);
  };

  const handleRemove = (file) => {
    setTableData([]);
    setTableColumns([]);
    setDataToBeSubmitted(null); // Ensure this clears the data
    message.success(`${file.name} file deleted.`);
  };

  // const handleQuoteButtonClick = () => {
  //   if (!dataToBeSubmitted) {
  //     console.error(
  //       "Error: No data to submit. Please upload a CSV file first."
  //     );
  //     return;
  //   }
  //   console.log("Data to be submitted:", dataToBeSubmitted);
  //   // Handle submission logic here, e.g., sending data to a server
  // };

  return (
    <div>
      <Card>
        <Dragger
          name="file"
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleFileUpload}
          onRemove={handleRemove}
          accept=".csv"
        >
          <p className="ant-upload-drag-icon">
            <i className="fas fa-upload" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single .csv file only.</p>
        </Dragger>
      </Card>
      <Divider />
      {tableData.length > 0 && (
        <EditableTable
          dataSource={tableData}
          handleSave={handleSave}
          tableColumns={tableColumns}
        />
      )}
    </div>
  );
};

export default UploadDetails;
