import { useEffect } from "react";
import { Form, InputNumber, Row, Col, Checkbox } from "antd";

const BeneficiaryMembersForm = ({ form, formData, setFormData }) => {
  const principalNumber = 1;

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-4">
        <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
          Please enter the number of family members to be covered
        </p>
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item label="" style={{ marginBottom: "35px" }}>
              <Checkbox
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    spouse: e.target.checked,
                    spouseNumber: e.target.checked ? 1 : 0,
                  })
                }
                className="flex items-center mb-3 font-open-sans text-base font-semibold leading-35 text-left"
              >
                Spouse
              </Checkbox>
              <p className="text-[#929497] ml-6">Checkbox to select spouse</p>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Children"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={0}
                step={1}
                onChange={(value) =>
                  setFormData({ ...formData, childrenNumber: value })
                }
                value={formData.childrenNumber}
                max={principalNumber * 12}
                min={0}
              />
              <p className="text-[#929497]">
                Maximum number is {principalNumber * 12}
              </p>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Parents"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={0}
                step={1}
                onChange={(value) =>
                  setFormData({ ...formData, parentsNumber: value })
                }
                value={formData.parentsNumber}
                max={principalNumber * 2}
                min={0}
              />
              <p className="text-[#929497]">
                Maximum number is {principalNumber * 2}
              </p>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Parents In Law"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "35px" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={0}
                step={1}
                onChange={(value) =>
                  setFormData({ ...formData, parentsInLawNumber: value })
                }
                value={formData.prentsInLawNumber}
                max={principalNumber * 2}
                min={0}
              />
              <p className="text-[#929497]">
                Maximum number is {principalNumber * 2}
              </p>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BeneficiaryMembersForm;
