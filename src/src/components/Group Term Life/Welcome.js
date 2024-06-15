import React, { useState } from 'react';
import { Typography, Space, Modal, Checkbox, Button,Row, Col} from 'antd';
import { UserOutlined, ArrowLeftOutlined, ArrowRightOutlined,RightOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const { Text } = Typography; 
function Welcome() {
    const navigate = useNavigate();

    const[modalVisible, setModalVisible] = useState(false);

    const handlePersonalClick = () =>{
        setModalVisible(true);  
    };
    const handleCustomerClick = () =>{
      navigate('/home'); 
    };
    const handleModalCancel = () =>{
        setModalVisible(false);  
    };

  return (
    <div>
    <Space 
      style={{ 
        fontSize: '22px',  
        marginTop: '30px',
        fontWeight: '600', 
        alignItems: 'center', 
        cursor: 'pointer'  
      }}  
      onClick={handleCustomerClick}>
      <ArrowLeftOutlined style={{ color: 'black' }}/>
       Term Life Cover  
     </Space>
     

      <h1  
      style={{ textAlign: 'left',  fontSize: '24px',marginTop: '50px', marginBottom: '20px' }}>
      Please select the type of customer
      </h1>
      <br/>
      <Text type="secondary" style={{ fontSize: '18px' }}>
        Select the type of customer to proceed
      </Text>
      <br/>

      <Space 
      style={{ fontSize: '18px', marginTop: '30px', alignItems: 'center' }}  
      onClick={handlePersonalClick}>
        <div style={{
          backgroundColor: '#bfbfbf',
          borderRadius: '50%',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '8px'
        }}>
        <UserOutlined style={{ color: 'maroon' }}/>
        </div>
        Personal
        <RightOutlined style={{ marginLeft: '8px', color: 'maroon' }}/>
      </Space>

        <Modal
          title = "Personal Details"
          visible = {modalVisible}
          onCancel = {handleModalCancel}
          footer  = {[
                      <Row gutter={16} key="buttons" justify="space-between">
                      <Col span={12}>
                      <Button 
                      block style={{ height: '48px' }} key="cancel" 
                      onClick={handleModalCancel}>
                      Cancel
                      </Button>
                      </Col>
                      <Col span={12}>

                      <NavLink to="/home/term-life-quote">
                      <Button block style={{ height: '48px' }} key="cancel" 
                      type="primary" 
                      onClick={handleModalCancel}>
                      Continue
                      </Button>
                      </NavLink>
                    
                      </Col>
                      </Row>
                  ]}>
                  <Text 
                   strong style={{ color: 'black', fontSize: '24px' }}>
                   Youll need to provide the following personal details to continue 
                   </Text>  

      <div style={{ display: 'flex', flexDirection: 'column'}}>  
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '10px', pointerEvents: 'none' }}>
        <Checkbox defaultChecked={true}>
          <span style={{ fontSize: '16px' }}>Name</span>
        </Checkbox>
        </div>
          <div style={{ marginBottom: '10px', pointerEvents: 'none' }}>
          <Checkbox defaultChecked={true}>
              <span style={{ fontSize: '16px' }}>Email</span>
          </Checkbox>
          </div>
          <div style={{ marginBottom: '10px', pointerEvents: 'none' }}>
          <Checkbox defaultChecked={true}>
              <span style={{ fontSize: '16px' }}>Phone Number</span>
          </Checkbox>
          </div>
          <div style={{ marginBottom: '10px', pointerEvents: 'none' }}>
          <Checkbox defaultChecked={true}>
              <span style={{ fontSize: '16px' }}>Address</span>
          </Checkbox>
          </div>
          <div style={{ marginBottom: '10px', pointerEvents: 'none' }}>
          <Checkbox defaultChecked={true}>
              <span style={{ fontSize: '16px' }}>Date of Birth</span>
          </Checkbox>
          </div>
      </div>
      </div>
      </Modal>
    </div>
  )
}
export default Welcome

