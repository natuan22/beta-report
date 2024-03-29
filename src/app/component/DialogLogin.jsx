import React, { useState } from "react";
import { Form, Input, message } from "antd";
import Button from "@mui/material/Button";
import { Modal } from "antd";

const DialogLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const warning = (text) => {
    messageApi.open({
      type: "warning",
      content: text,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button
        variant="text"
        color="primary"
        onClick={showModal}
        sx={{ p: "0.5rem", "border-radius": "0.375rem", width: "244.27px" }}
      >
        Đăng nhập
      </Button>
      <Modal
        width={400}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="h-[400px]">
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 12,
            }}
          >
            <div className="mt-10">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default DialogLogin;
