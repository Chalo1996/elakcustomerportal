import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, InputNumber, Row, Col, Checkbox } from "antd";

const BeneficiaryMembersForm = ({ form, formData, setFormData }) => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const isIndividual = searchParams.get("customer") === "individual";
  const isGroup = searchParams.get("customer") === "group";

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
      {isIndividual && (
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label="" style={{ marginBottom: "35px" }}>
                <Checkbox
                  checked={formData.spouse}
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
                  placeholder="Specify number of children"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, childrenNumber: value })
                  }
                  value={formData.childrenNumber}
                  max={formData.principalNumber * 12}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 12}
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
                  placeholder="Specify number of parents"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, parentsNumber: value })
                  }
                  value={formData.parentsNumber}
                  max={formData.principalNumber * 2}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 2}
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
                  placeholder="Specify number of parents in law"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, parentsInLawNumber: value })
                  }
                  value={formData.prentsInLawNumber}
                  max={formData.principalNumber * 2}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 2}
                </p>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      {isGroup && (
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Principal Members"
                name="principalNumber"
                onKeyPress={preventTextInput}
                rules={[
                  {
                    required: true,
                    message: "Number of principal members is required",
                  },
                  {
                    type: "number",
                    message: "The input is not a valid number!",
                  },
                ]}
                style={{ marginBottom: "35px" }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Specify number of principal members"
                  step={1}
                  value={formData.principalNumber}
                  onChange={(value) =>
                    setFormData({ ...formData, principalNumber: value })
                  }
                  min={5}
                />
                {formData.principalNumber && (
                  <p className="text-[#929497]">
                    Minimum permitted number of 5 members
                  </p>
                )}
              </Form.Item>
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
                  placeholder="Specify number of children"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, childrenNumber: value })
                  }
                  value={formData.childrenNumber}
                  max={formData.principalNumber * 12}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 12}
                </p>
              </Form.Item>
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
                  placeholder="Specify number of parents-in-law"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, parentsInLawNumber: value })
                  }
                  value={formData.parentsInLawNumber}
                  max={formData.principalNumber * 2}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 2}
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
                  placeholder="Specify number of spouses"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, spouseNumber: value })
                  }
                  value={formData.spouseNumber}
                  max={formData.principalNumber * 2}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 2}
                </p>
              </Form.Item>
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
                  placeholder="Specify number of parents"
                  defaultValue={0}
                  step={1}
                  onChange={(value) =>
                    setFormData({ ...formData, parentsNumber: value })
                  }
                  value={formData.parentsNumber}
                  max={formData.principalNumber * 2}
                  min={0}
                />
                <p className="text-[#929497]">
                  Maximum number is {formData.principalNumber * 2}
                </p>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default BeneficiaryMembersForm;
