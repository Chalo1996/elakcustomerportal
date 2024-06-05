// import React, { useState } from "react";
// import { Steps, Form, Input, DatePicker, Button, Row, Col, Select, Modal } from "antd";
// import moment from "moment";

// const { Step } = Steps;
// const { Option } = Select;

// function Education() {
//   const [current, setCurrent] = useState(0);
//   const [isCoverDurationModalVisible, setIsCoverDurationModalVisible] = useState(false);

//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const back = () => {
//     setCurrent(current - 1);
//   };

//   const showCoverDurationModal = () => {
//     setIsCoverDurationModalVisible(true);
//   };

//   const handleCoverDurationOk = () => {
//     setIsCoverDurationModalVisible(false);
//   };

//   const handleCoverDurationCancel = () => {
//     setIsCoverDurationModalVisible(false);
//   };

//   const disabledDate = (current) => {
//     return (
//       current && 
//       (current < moment().subtract(80, 'years') || current > moment().subtract(18, 'years'))
//     );
//   };

//   return (
//     <>
//       <Steps current={current}>
//         <Step title="1" description="Enter product details." />
//         <Step title="2" description="Enter your personal details." />
//         <Step title="3" description="Insurance Sum" />
//         <Step title="4" description="Get a quote." />
//       </Steps>
//       <div style={{ marginTop: 20 }}>
//         {current === 0 && (
//           <Form layout="vertical">
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Investment Premium" name="investmentPremium" rules={[{ required: true, message: 'Please select the investment premium' }]}>
//                   <Select>
//                     {[...Array(10)].map((_, i) => (
//                       <Option key={i} value={1000 * (i + 1)}>
//                         {1000 * (i + 1)}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
//                   <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Cover Duration">
//                   <Button onClick={showCoverDurationModal}>Set Cover Duration</Button>
//                 </Form.Item>
//                 <Modal
//                   title={<b>Cover Duration</b>}
//                   visible={isCoverDurationModalVisible}
//                   onOk={handleCoverDurationOk}
//                   onCancel={handleCoverDurationCancel}
//                 >
//                   <Form layout="vertical">
//                     <Form.Item label="Period of Duration" name="periodOfDuration" rules={[{ required: true, message: 'Please enter the period of duration' }]}>
//                       <Input />
//                     </Form.Item>
//                     <Form.Item label="Cover Start Date" name="coverStartDate" rules={[{ required: true, message: 'Please enter the cover start date' }]}>
//                       <DatePicker style={{ width: '100%' }} />
//                     </Form.Item>
//                     <Form.Item label="Cover End Date" name="coverEndDate" rules={[{ required: true, message: 'Please enter the cover end date' }]}>
//                       <DatePicker style={{ width: '100%' }} />
//                     </Form.Item>
//                   </Form>
//                 </Modal>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Payment Frequency" name="paymentFrequency" rules={[{ required: true, message: 'Please select the payment frequency' }]}>
//                   <Select>
//                     <Option value="weekly">Weekly</Option>
//                     <Option value="monthly">Monthly</Option>
//                     <Option value="quarterly">Quarterly</Option>
//                     <Option value="semiannually">Semiannually</Option>
//                     <Option value="annually">Annually</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         )}
//         {current === 1 && (
//           <Form layout="vertical">
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Telephone No" name="telephone" rules={[{ required: true, message: 'Please enter your telephone number' }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         )}
//         {current === 2 && (
//           <div>
//             <p>Get a quote form goes here...</p>
//             {/* Add form fields for step 3 */}
//           </div>
//         )}
//         <div style={{ marginTop: 20 }}>
//           {current > 0 && (
//             <Button style={{ marginRight: 8 }} onClick={back}>
//               Back
//             </Button>
//           )}
//           {current < 2 && (
//             <Button type="primary" onClick={next}>
//               Next
//             </Button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Education;
