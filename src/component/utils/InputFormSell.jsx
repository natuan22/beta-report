import React from "react";
import { Form, Input, Select } from "antd";
import { message } from "antd";
import { useFormik } from "formik";

const InputFormSell = ({ catchStockInput, isBuy, data, index }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      code: data?.code || "",
      buyPrice: data?.buyPrice || 0,
      sellPrice: data?.sellPrice || 0,
      rate: data?.rate || 0,
      profit: data?.profit || 0,
      time: data?.time || "",
      isBuy,
    },
    onSubmit: (values) => {
      // console.log(values)
      catchStockInput("stock_buy", values, index);
      success("Thêm mã thành công");
    },
  });

  const handleSelect = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 12,
      }}
      layout="horizontal"
      size="default"
      style={{
        width: 320,
      }}
      onSubmitCapture={handleSubmit}
    >
      {contextHolder}
      <Form.Item label="Mã">
        <Input
          name="code"
          defaultValue={data?.code || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Giá mua">
        <Input
          name="buyPrice"
          defaultValue={data?.buyPrice || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Giá bán">
        <Input
          name="sellPrice"
          defaultValue={data?.sellPrice || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="% lời/lỗ">
        <Input
          name="rate"
          defaultValue={data?.rate || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Chốt lời/lỗ">
        <Select
          name="profit"
          defaultValue={data?.profit || ""}
          onChange={handleSelect("profit")}
        >
          <Select.Option value="Chốt lời">Chốt lời</Select.Option>
          <Select.Option value="Cắt lỗ">Cắt lỗ</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Thời gian">
        <Input
          name="time"
          defaultValue={data?.time || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <div className="w-full grid place-items-center">
        <button className=" outline-0 border-0 p-3 rounded-xl bg-red-500 text-white cursor-pointer">
          Thêm mã bán
        </button>
      </div>
    </Form>
  );
};
export default InputFormSell;
