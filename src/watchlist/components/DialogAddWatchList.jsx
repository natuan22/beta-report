import Button from "@mui/material/Button";
import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { getApi } from "../../helper/getApi";
import { postApi } from "../../helper/postApi";

const DialogAddWatchList = ({ catchWatchlists }) => {
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
    await postApi("/api/v1/watchlist/create", values);
    setIsModalOpen(false);

    const fetchDataWatchList = async () => {
      try {
        const data = await getApi("/api/v1/watchlist");
        catchWatchlists(data);

        // Lấy tên của watchlist mới được thêm vào
        const newWatchlist = data.find(
          (watchlist) => watchlist.name === values.name
        );
        if (newWatchlist) {
          localStorage.setItem("watchlistActive", JSON.stringify(newWatchlist));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataWatchList();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Button
        variant="text"
        color="primary"
        onClick={showModal}
        sx={{
          borderRadius: "15px",
          width: "335px",
          height: "52px",
          fontWeight: 600,
          backgroundImage:
            "linear-gradient(90deg, #0669fcff 0%, #011e49ff 100%)",
          color: "white",
          fontSize: "18px",
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
        className="modalStyle"
      >
        <Form
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <div className="mt-6">
            <p className="text-[20px] font-semibold text-white mb-2 mt-0">
              Nhập tên watchlist
            </p>
            <div className="flex flex-col items-end">
              <Form.Item name="name" className="inputStyle">
                <Input placeholder="Tên watchlist" />
              </Form.Item>
              <Form.Item className="btnStyle">
                <Button
                  type="submit"
                  variant="text"
                  sx={{
                    fontWeight: 600,
                    color: "#ffba07",
                    fontSize: "18px",
                    textTransform: "none",
                  }}
                >
                  Tạo watchlist
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DialogAddWatchList;
