import React from "react";
import { Form, Input } from "antd";
import { message } from "antd";
import { useFormik } from "formik";

const InputFormBuy = ({ catchStockInput, isBuy, data, index }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const { handleSubmit, handleChange } = useFormik({
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
      catchStockInput("stock_buy", values, index);
      success("Thêm mã thành công");
    },
  });

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
      <Form.Item label="Giá khuyến nghị">
        <Input
          name="buyPrice"
          defaultValue={data?.buyPrice || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Giá mục tiêu">
        <Input
          name="sellPrice"
          defaultValue={data?.sellPrice || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Giá ngừng lỗ">
        <Input
          name="rate"
          defaultValue={data?.rate || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Lãi kỳ vọng">
        <Input
          name="profit"
          defaultValue={data?.profit || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Thời gian">
        <Input
          name="time"
          defaultValue={data?.time || ""}
          onChange={handleChange}
        />
      </Form.Item>
      <div className="w-full grid place-items-center">
        <button className=" outline-0 border-0 p-3 rounded-xl bg-green-500 text-white cursor-pointer">
          Thêm mã mua
        </button>
      </div>
    </Form>
  );
};
export default InputFormBuy;
