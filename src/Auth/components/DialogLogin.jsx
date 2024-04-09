import React, { useState } from "react";
import { Form, Input, message } from "antd";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../app/asset/img/logoWeek.png";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../thunk";

const DialogLogin = ({ onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const loginMessage = useSelector(
    (state) => state.authen.loginMessage || "Sai tài khoản hoặc mật khẩu"
  );

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
    // Thay thế số 0 đầu tiên thành 84 trong số điện thoại khi gửi yêu cầu API
    const modifiedPhone = values.phone.replace(/^0/, "84");

    // Gửi yêu cầu API với số điện thoại đã được sửa đổi
    await dispatch(userLoginAction({ ...values, phone: modifiedPhone }));
    warning(loginMessage);
    onSubmitSuccess();
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
          width: "122px",
          fontWeight: 600,
        }}
      >
        Đăng nhập
      </Button>
      <Modal
        centered
        width={400}
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
            <div className="mb-3 flex justify-center items-center">
              <img src={logo} alt="logo" className="h-14 w-auto" />
            </div>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Số điện thoại"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "352px", height: "40px" }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DialogLogin;
