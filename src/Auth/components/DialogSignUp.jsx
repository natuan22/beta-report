import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../app/asset/img/logoWeek.png";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction, userRegisterAction } from "../thunk";
import { object, ref, string } from "yup";
import { useFormik } from "formik";
import PopUpOTP from "./PopUpOTP";

const DialogSignUp = ({ onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [openOTP, setOpenOTP] = useState(false);
  const [userID, setUserID] = useState(null);

  const normalizePhone = (value) => {
    // Chuẩn hóa số điện thoại: thêm '84' nếu bắt đầu bằng '0'
    if (value.startsWith("0")) {
      return `84${value.substring(1)}`;
    }
    return value;
  };
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

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  const userSchema = object({
    phone: string()
      .required("Vui lòng nhập số điện thoại")
      .transform(normalizePhone)
      .matches(
        /^(84|0[1-9])+([0-9]{8,9})\b/,
        "Vui lòng nhập số điện thoại hợp lệ"
      ),
    password: string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu phải nhiều hơn 8 ký tự")
      .max(16, "Mật khẩu không được quá 16 ký tự")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-z]).{8,16}$/,
        "Mật khẩu phải có ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và 1 số"
      ),
    confirm_password: string()
      .required("Vui lòng nhập lại mật khẩu xác nhận")
      .oneOf([ref("password"), null], "Mật khẩu xác nhận không khớp"),
    first_name: string().required("Vui lòng nhập tên"),
    last_name: string().required("Vui lòng nhập họ"),
  });
  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues: {
        phone: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
      },
      onSubmit: async (values) => {
        // Chuẩn hóa số điện thoại trước khi gửi đi
        const normalizedValues = {
          ...values,
          phone: normalizePhone(values.phone),
        };
        try {
          const response = await dispatch(userRegisterAction(normalizedValues));
          // console.log(response)
          if (response.status === 201) {
            setUserID(response?.data.data.user_id);
            setOpenOTP(true);
          } else if (response.response.data.status === 400) {
            warning(response.response.data.message);
          }
        } catch (err) {
          console.error(err);
        }
      },
      validationSchema: userSchema,
      validateOnBlur: false,
    }
  );

  useEffect(() => {}, [touched]);
  return (
    <>
      {contextHolder}
      <Button
        variant="text"
        color="error"
        onClick={showModal}
        sx={{
          p: "0.5rem",
          borderRadius: "0.375rem",
          width: "122px",
          fontWeight: 600,
        }}
      >
        Đăng ký
      </Button>
      <Modal
        centered
        width={500}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PopUpOTP open={openOTP} userID={userID} />
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <div className="mt-6">
            <div className="mb-3 flex justify-center items-center">
              <img src={logo} alt="logo" className="h-14 w-auto" />
            </div>
            <div className="relative">
              <Form.Item name="phone">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Số điện thoại"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Item>
              {errors.phone && touched.phone && (
                <p className="absolute top-[42px] m-0 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="relative">
              <Form.Item name="password">
                <Input.Password
                  placeholder="Mật khẩu"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Item>
              {errors.password && touched.password && (
                <p className="absolute top-[42px] m-0 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="relative">
              <Form.Item name="confirm_password">
                <Input.Password
                  placeholder="Xác nhận lại mật khẩu"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Item>
              {errors.confirm_password && touched.confirm_password && (
                <p className="absolute top-[42px] m-0 text-sm text-red-500">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <div className="relative">
                <Form.Item name="last_name">
                  <Input
                    placeholder="Họ"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Form.Item>
                {errors.last_name && touched.last_name && (
                  <p className="absolute top-[42px] m-0 text-sm text-red-500">
                    {errors.last_name}
                  </p>
                )}
              </div>
              <div className="relative">
                <Form.Item name="first_name">
                  <Input
                    placeholder="Tên"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Form.Item>
                {errors.first_name && touched.first_name && (
                  <p className="absolute top-[42px] m-0 text-sm text-red-500">
                    {errors.first_name}
                  </p>
                )}
              </div>
            </div>
            <Form.Item>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "452px", height: "40px" }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DialogSignUp;
