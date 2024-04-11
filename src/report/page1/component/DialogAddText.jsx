import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import Button from "@mui/material/Button";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import { postApi } from "../../../helper/postApi";
const apiUrl = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;

const DialogAddText = ({ getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = async () => {
    setIsModalOpen(false);
  };
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      content: "",
    },
    onSubmit: async (values) => {
      await postApi(apiUrl, "api/v1/report/luu-dien-bien-thi-truong", {
        text: [values.title, values.subTitle, values.content],
      });
      await getData();
      handleOk();
      warning("success", "Thêm diễn biến thị trường thành công");
    },
  });

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button variant="contained" onClick={showModal}>
        Thêm diễn biến thị trường
      </Button>
      <Modal
        width={1600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        footer={null}
      >
        <div className="h-[400px] grid place-items-center">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              width: 1000,
            }}
            onSubmitCapture={handleSubmit}
          >
            <Form.Item label="Title">
              <Input onChange={handleChange} name="title" />
            </Form.Item>

            <Form.Item label="Sub title">
              <Input onChange={handleChange} name="subTitle" />
            </Form.Item>

            <Form.Item label="Content">
              <TextArea
                onChange={handleChange}
                name="content"
                placeholder="Nhận định 1"
                rows={4}
                style={{
                  height: 200,
                }}
              />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <button
                type="submit"
                class="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl border-0 focus:outline-0     font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Thêm
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default DialogAddText;
