import React, { useState } from "react";
import { Avatar, Divider, Radio, Button, Layout, Space, Row, Typography } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate, Route } from 'react-router-dom';
import Home from "./Home";
import logo from './dark-logo.png'; 

<Route path="/home" element={ <Home />} /> 

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const LandingPage = () => {
  const [accountType, setAccountType] = useState('personal');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (accountType === 'personal') {
      navigate('/home');
    } else if (accountType === 'corporate') {
      navigate('/home');
    }
  };

  const handleRadioChange = e => {
    setAccountType(e.target.value);
  };

  return (
    <Layout style={{ height: '100vh', display: 'flex' }}>
      <Sider width="60%" style={{ backgroundColor: '#A32A29', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'left' }}>
        <img src={logo} alt="Equity Logo" style={{ marginBottom: '20px' }} /> {/* Add the logo */}
        <div style={{ color: 'white', textAlign: 'left' }}>
          <Title level={1} style={{ color: 'white' }}>Welcome to <br></br>EQUITY Assurance</Title>
          <Text style={{ color: 'white', fontSize: '20px' }}>The insurer you can trust</Text>
        </div>
      </Sider>
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
          <Title level={2} style={{ marginBottom: '20px' }}>Hello There</Title>
          <Text style={{ display: 'block', marginBottom: '20px' }}>Please select an account option</Text>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Radio.Group value={accountType} onChange={handleRadioChange} style={{ width: '100%' }} >
              <Row style={{ alignItems: 'left', marginBottom: '10px' }}>
                <Avatar size={40} style={{ cursor: 'pointer', marginRight: '10px', backgroundColor: '#A32A29' }}>P</Avatar>
                <Text style={{ flex: 1 }}>Personal</Text>
                <Radio value="personal" />
              </Row>
              <Divider style={{ margin: '10px 10' }} />
              <Row style={{ alignItems: 'left' }}>
                <Avatar size={40} style={{ cursor: 'pointer', marginRight: '10px', backgroundColor: '#A32A29'}}>CS</Avatar>
                <Text style={{ flex: 1 }}>Corporate/SME</Text>
                <Radio value="corporate" disabled />
              </Row>
            </Radio.Group>
          </Space>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button type="primary" onClick={handleContinue} style={{ backgroundColor: '#A32A29', borderColor: '#A32A29' }}>
              Continue
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};



export default LandingPage;
