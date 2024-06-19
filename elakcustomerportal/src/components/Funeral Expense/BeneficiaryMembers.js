import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, InputNumber, Switch } from "antd";

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
        <p className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Please enter the number of family members to be covered
        </p>
      </div>
      {isIndividual && (
        <Form form={form} layout="vertical">
          <div className="grid md:grid-cols-2 gap-4">
            <Form.Item
              label="Do you want to cover your spouse?"
              style={{ marginBottom: "20px" }}
            >
              <Switch
                checked={formData.spouse}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    spouse: checked,
                    spouseNumber: checked ? 1 : 0,
                  })
                }
                className="flex items-center mb-3 font-open-sans text-base font-semibold leading-35 text-left"
              />
              <p className="text-[#929497]">
                Toggle switch to select/unselect spouse
              </p>
            </Form.Item>
            <Form.Item
              label="How many children do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
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
              label="How many parents do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
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
            <Form.Item
              label="How many parents-in-law do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Specify number of parents in law"
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
          </div>
        </Form>
      )}

      {isGroup && (
        <Form form={form} layout="vertical">
          <div className="grid md:grid-cols-2 gap-4">
            <Form.Item
              label="Please input the number of principal members"
              name="principalNumber"
              onKeyPress={preventTextInput}
              rules={[
                {
                  required: true,
                  message: "Number of principal members is required",
                },
                {
                  type: "number",
                  message: "Minimum number permitted is 5!",
                },
              ]}
              style={{ marginBottom: "20px" }}
            >
              <div>
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
              </div>
            </Form.Item>
            <Form.Item
              label="How many spouses do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
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
                max={formData.principalNumber}
                min={0}
              />
              <p className="text-[#929497]">
                Maximum number is {formData.principalNumber}
              </p>
            </Form.Item>
            <Form.Item
              label="How many children do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
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
              label="How many parents do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
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
            <Form.Item
              label="How many parents-in-law do you want covered?"
              onKeyPress={preventTextInput}
              rules={[
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              style={{ marginBottom: "20px" }}
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
          </div>
        </Form>
      )}
    </>
  );
};

export default BeneficiaryMembersForm;
