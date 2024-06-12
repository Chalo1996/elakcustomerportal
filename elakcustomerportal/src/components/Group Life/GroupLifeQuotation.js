import { Table, Row, Col, Card } from 'antd';

const QuotationTable = () => {
    const formatCurrency = (value) => `KES ${Math.round(value).toLocaleString()}`;

    const columns = [
      {
        title: 'Attribute',
        dataIndex: 'attribute',
        key: 'attribute',
        width: '50%',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: '50%',
      },
    ];

    const groupLifeAssurance = [
      { title: 'Benefit Description', dataIndex: 'benefitDescriptionGla', key: 'benefitDescriptionGla' },
      { title: 'Benefit Level', dataIndex: 'benefitLevel', key: 'benefitLevel' },
      { title: 'Sums Assured', dataIndex: 'appliedSumAssured', key: 'appliedSumAssured', render: (value) => formatCurrency(value) },
      { title: 'Annual Premium', dataIndex: 'premium', key: 'premium', render: (value) => formatCurrency(value) },
    ];

    const accidentalOccupationalCausesOnly = [
      { title: 'Benefit Description', dataIndex: 'benefitDescriptionGpaWiba', key: 'benefitDescriptionGpaWiba' },
      { title: 'Benefit Level', dataIndex: 'benefitLevel', key: 'benefitLevel' },
      { title: 'Sums Assured', dataIndex: 'appliedSumAssured', key: 'appliedSumAssured', render: (value) => formatCurrency(value) },
      { title: 'Annual Premium', dataIndex: 'premium', key: 'premium', render: (value) => formatCurrency(value) },
    ];

    return (
      <Card style={{ border: '1px solid maroon' }}>
        <div style={{ width: '90%', margin: 'auto' }}>
          {/* Header */}
          <Row justify="space-between" style={{ border: '1px solid maroon', padding: '10px' }}>
            <Col>
              <h3 style={{ fontWeight: 'bold', marginBottom: 0 }}>EQUITY LIFE ASSURANCE (KENYA) LIMITED</h3>
              <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>Group Life Assurance - Combined Solution</h4>
              <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>Quotation</h4>
            </Col>
            <Col>
              <img src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain" alt="Company Logo" style={{ maxWidth: '100px', maxHeight: '120px' }} />
              <h4 style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>Date: {new Date().toLocaleDateString()}</h4>
            </Col>
          </Row>

          {/* Company Details Table */}
          <h4 style={{ fontWeight: 'bold', marginBottom: 0, marginTop: 15}}>Company Details</h4>
          <Table
            columns={columns}
            bordered
            pagination={false}
            showHeader={false}
            style={{ marginBottom: '20px', border: '1px solid maroon' }}
          />

          {/* Group Life Assurance Table */}
          <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>Group Life Assurance – (Illness, Natural Causes or Accidental Causes)</h4>
          <Table
            columns={groupLifeAssurance}
            bordered
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Annual Premium</Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>{formatCurrency(0)}</Table.Summary.Cell>
              </Table.Summary.Row>
            )}
            style={{ marginBottom: '20px', border: '1px solid maroon' }}
          />

          {/* Free Cover Limit Table */}
          <Table
            bordered
            pagination={false}
            showHeader={false}
            columns={[
              { dataIndex: 'label', key: 'label', render: (text) => <strong>{text}</strong> },
              { dataIndex: 'value', key: 'value', align: 'right', render: (text) => <strong>{text}</strong> },
            ]}
            style={{ marginBottom: '20px', border: '1px solid maroon' }}
          />

          {/*Maximum Critical Illness Cover*/}
        <Table
            bordered
            pagination={false}
            showHeader={false}
            columns={[
              { dataIndex: 'label', key: 'label', render: (text) => <strong>{text}</strong> },
              { dataIndex: 'value', key: 'value', align: 'right', render: (text) => <strong>{text}</strong> },
            ]}
            style={{ marginBottom: '20px', border: '1px solid maroon' }}
          />

          {/* Accidental/Occupational Causes Only Table */}
          <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>Accidental/Occupational Causes Only</h4>
          <Table
            columns={accidentalOccupationalCausesOnly}
            bordered
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Annual Premium</Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>{formatCurrency(0)}</Table.Summary.Cell>
              </Table.Summary.Row>
            )}
            style={{ marginBottom: '20px', border: '1px solid maroon' }}
          />

          {/* Total Annual Premium */}
          <Table
            bordered
            pagination={false}
            showHeader={false}
            columns={[
              { dataIndex: 'label', key: 'label', render: (text) => <strong>{text}</strong> },
              { dataIndex: 'value', key: 'value', align: 'right', render: (text) => <strong>{text}</strong> },
            ]}
            style={{ marginBottom: '20px', border: '1px solid maroon' }}
          />

          {/* Notes */}
          <h4 style={{ fontWeight: 'bold', marginTop: '20px' }}>Notes</h4>
          <ol>
            <li>Our Quotation is valid for a period of 90 days from the date of issue</li>
            <li>Passive terrorism included</li>
            <li>We reserve the right to review our quotation should the basis against which the quotation has been done vary significantly</li>
            <li>Terms and Conditions of ELAK's Group Life Assurance policy apply and will be availed on scheme admission</li>
          </ol>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', backgroundColor: 'maroon', textAlign: 'center', padding: '6px', marginTop: '20px' }}>
          <h3 style={{ color: 'white', margin: 0 }}><strong>Equity Life Assurance (Kenya) Limited</strong></h3>
        </div>
      </Card>
    );
  };


  export default QuotationTable;