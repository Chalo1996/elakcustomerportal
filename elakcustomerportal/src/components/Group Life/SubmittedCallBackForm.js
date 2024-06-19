import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from "react-router-dom";


const { Title, Text } = Typography;

const SubmittedCallBack = () => {
    const navigate = useNavigate();

    const HandleAllDone = () => {
        navigate(-2)
    };
    return (
        <div style={{ padding: "70px" }}>
            <div style={{ marginBottom: "40px" }}>
                <Title level={3}>Your request was successful</Title>
            </div>
            <div style={{ marginBottom: "40px" }}>
                <Text>One of our agents will contact you in the next 24 hours through our number 0763000000</Text>
            </div>
            <div>
                <Button onClick={HandleAllDone} type="primary">All Done</Button>
            </div>
        </div>

    );
};

export default SubmittedCallBack;