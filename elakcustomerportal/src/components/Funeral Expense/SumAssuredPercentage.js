import { useEffect, useCallback } from "react";
import { Form, InputNumber, DatePicker } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const SumAssuredPercentageForm = ({ form, formData, setFormData }) => {
  const disabledDate = (current) => {
    const today = new Date();
    return (
      current &&
      current < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const handleStartDateChange = useCallback(
    (date, timeInYears) => {
      if (!date) {
        form.resetFields(["endDate"]);
        setFormData({ ...formData, endDate: null });
        return null;
      }
      const oneYearLater = date
        .clone()
        .add(timeInYears, "year")
        .subtract(1, "day");
      setFormData({ ...formData, startDate: date });

      return oneYearLater;
    },
    [form, formData, setFormData]
  );

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    form.setFieldsValue(formData);
    form.setFieldsValue({ startDate: formData.startDate });
  }, [form, formData]);

  useEffect(() => {
    const newEndDate = handleStartDateChange(formData.startDate, 1);
    setFormData({ ...formData, endDate: newEndDate });
    form.setFieldsValue({ endDate: newEndDate });
  }, [formData, form, setFormData, handleStartDateChange]);

  return (
    <>
      <div className="w-[710px] h-[76px] mt-3 py-3 flex flex-col gap-1">
        <p className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Please enter the percentage of SA payable for each member.
        </p>
      </div>
      <Form form={form} layout="vertical">
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="text-[#929497]">
                Principal member percentage of sum assured (%)
              </span>
            }
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
              value={formData.principalPercentage}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              onChange={(value) =>
                setFormData({ ...formData, principalPercentage: value })
              }
              disabled
            />
          </Form.Item>
          {formData.spouseNumber > 0 && (
            <Form.Item
              label={
                <span className="text-[#929497]">
                  Spouse percentage of sum assured (%)
                </span>
              }
              name="spousePercentage"
              onKeyPress={preventTextInput}
              rules={[
                {
                  required: true,
                  message: "Please input the percentage!",
                },
                {
                  type: "number",
                  min: 20,
                  message: "The minimum percentage is 20",
                },
              ]}
            >
              <div>
                <InputNumber
                  style={{ width: "100%" }}
                  value={formData.spousePercentage}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(value) =>
                    setFormData({ ...formData, spousePercentage: value })
                  }
                />
                <p className="text-[#929497] mb-[20px]">
                  Enter percentage value between 20% and 100%
                </p>
              </div>
            </Form.Item>
          )}
          {formData.childrenNumber > 0 && (
            <Form.Item
              label={
                <span className="text-[#929497]">
                  Children percentage of sum assured (%)
                </span>
              }
              name="childrenPercentage"
              onKeyPress={preventTextInput}
              rules={[
                {
                  required: true,
                  message: "Please input the percentage!",
                },
                {
                  type: "number",
                  min: 20,
                  message: "The minimum percentage is 20",
                },
              ]}
            >
              <div>
                <InputNumber
                  style={{ width: "100%" }}
                  value={formData.childrenPercentage}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(value) =>
                    setFormData({ ...formData, childrenPercentage: value })
                  }
                />
                <p className="text-[#929497] mb-[20px]">
                  Enter percentage value between 20% and 100%
                </p>
              </div>
            </Form.Item>
          )}
          {formData.parentsInLawNumber > 0 && (
            <Form.Item
              label={
                <span className="text-[#929497]">
                  Parents-In-Law percentage of sum assured (%)
                </span>
              }
              name="parentsInLawPercentage"
              onKeyPress={preventTextInput}
              rules={[
                {
                  required: true,
                  message: "Please input the percentage!",
                },
                {
                  type: "number",
                  min: 20,
                  message: "The minimum percentage is 20",
                },
              ]}
            >
              <div>
                <InputNumber
                  style={{ width: "100%" }}
                  value={formData.parentsInLawPercentage}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      parentsInLawPercentage: value,
                    })
                  }
                />
                <p className="text-[#929497] mb-[20px]">
                  Enter percentage value between 20% and 100%
                </p>
              </div>
            </Form.Item>
          )}

          {formData.parentsNumber > 0 && (
            <Form.Item
              label={
                <span className="text-[#929497]">
                  Parents percentage of sum assured (%)
                </span>
              }
              name="parentsPercentage"
              onKeyPress={preventTextInput}
              rules={[
                {
                  required: true,
                  message: "Please input the percentage!",
                },
                {
                  type: "number",
                  min: 20,
                  message: "The minimum percentage is 20",
                },
              ]}
            >
              <div>
                <InputNumber
                  style={{ width: "100%" }}
                  value={formData.parentsPercentage}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(value) =>
                    setFormData({ ...formData, parentsPercentage: value })
                  }
                />
                <p className="text-[#929497] mb-[20px]">
                  Enter percentage value between 20% and 100%
                </p>
              </div>
            </Form.Item>
          )}
          <Form.Item
            label="Cover Commencement Date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please select start date.",
              },
            ]}
            style={{ width: "100%", cursor: "pointer" }}
          >
            <div>
              <DatePicker
                style={{ width: "100%" }}
                id="startDate"
                value={formData.startDate}
                disabledDate={disabledDate}
                onChange={handleStartDateChange}
                inputReadOnly={true}
              />
              {formData.startDate && (
                <p className="flex items-center mb-[20px]">
                  <InfoCircleOutlined
                    style={{
                      color: "#D93E3E",
                      marginRight: "8px",
                    }}
                  />
                  <span className="text-[#929497]">
                    Your cover will automatically expire on{" "}
                    {formatDate(formData.endDate)}
                  </span>
                </p>
              )}
            </div>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default SumAssuredPercentageForm;
