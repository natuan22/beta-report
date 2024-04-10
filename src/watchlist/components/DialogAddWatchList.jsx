import React, { useState } from "react";
import { Form, Input, message } from "antd";
import Button from "@mui/material/Button";
import { Modal } from "antd";

const DialogAddWatchList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onFinish = async (values) => {
    console.log("Finish:", values);
  };

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  return (
    <>
      {contextHolder}
      <Button
        variant="text"
        color="primary"
        onClick={showModal}
        sx={{
          p: "0.5rem",
          borderRadius: "0.375rem",
          width: "200px",
          fontWeight: 600,
        }}
      >
        Tạo watchlist
      </Button>
      <Modal
        centered
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <div className="mt-6">
            <div>Nhập tên watchlist</div>
            <Form.Item name="name">
              <Input placeholder="Tên watchlist" />
            </Form.Item>
            <Form.Item>
              <Button type="submit" variant="text" sx={{ fontWeight: 600 }}>
                Tạo watchlist
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DialogAddWatchList;
