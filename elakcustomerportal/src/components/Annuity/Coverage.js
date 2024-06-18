import { useEffect } from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const GuaranteedPeriods = [0, 5, 10];
const Options = ["Yes", "No"];

const CoverageForm = ({ form, formData, setFormData }) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);
  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] mt-3 py-3 px-0 flex flex-col gap-4">
        <p className="font-open-sans text-[18px] font-semibold leading-[28px] text-left">
          Please enter or select product coverage and optional benefits
        </p>
      </div>

      <Form form={form} layout="vertical">
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="Guaranteed Period"
            rules={[
              {
                required: true,
                message: "Please select period.",
              },
            ]}
          >
            <Select
              value={formData.guaranteedPeriod}
              onChange={(value) =>
                setFormData({ ...formData, guaranteedPeriod: value })
              }
            >
              {GuaranteedPeriods.map((item) => (
                <Option key={item} value={item}>
                  {`${item} years`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="mb-2">
          <span>
            <strong>Optional Bundles</strong>
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="Return of Residual Premium"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.residualPremium}
              onChange={(value) =>
                setFormData({ ...formData, residualPremium: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Long Term Care"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.longTermCare}
              onChange={(value) =>
                setFormData({ ...formData, longTermCare: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Critical & Terminal Illness"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.criticalIllness}
              onChange={(value) =>
                setFormData({ ...formData, criticalIllness: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Total & Permanent Disability"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.totalDisability}
              onChange={(value) =>
                setFormData({ ...formData, totalDisability: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Funeral Expense"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.funeralExpense}
              onChange={(value) =>
                setFormData({ ...formData, funeralExpense: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default CoverageForm;
