import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import "../utils/otpForm.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { https } from "../../services/configService";
import OtpInput from "react-otp-input";

const apiUrl = process.env.REACT_APP_BASE_URL;

const PopUpOTP = ({ open, userID }) => {
  const navigate = useNavigate();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(open);
  const [countdown, setCountdown] = useState(300);
  const [verifyOTP, setVerifyOTP] = useState("");

  const warning = (value) => {
    messageApi.open({
      type: "warning",
      content: value,
    });
  };
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (isResendDisabled) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear interval and re-enable the button when countdown reaches 0
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setIsResendDisabled(false);
        setCountdown(300); // Reset countdown to 5 minutes
      }

      return () => {
        clearInterval(countdownInterval);
      };
    } else {
      // Start countdown immediately if resend button is enabled
      setCountdown(300); // Set countdown to 5 minutes
    }
  }, [isResendDisabled, countdown]);

  const handleSubmit = async (event) => {
    try {
      const response = await https.post(
        `${apiUrl}/api/v1/auth/verify-otp/${userID}`,
        {
          verifyOTP,
        }
      );
      // console.log(response);
      setIsOpen(false);
      warning("Đăng ký thành công");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      warning(err.response.data.message);
    }
  };
  const handleResendOTP = async () => {
    setIsResendDisabled(true); // Vô hiệu hóa nút "Gửi lại OTP"
    try {
      await https.post(`${apiUrl}/api/v1/auth/get-verify-otp/${userID}`);
    } catch (err) {
      console.error(err);
      warning("Không thể gửi lại mã xác nhận");
      setIsResendDisabled(false); // Kích hoạt lại nút nếu có lỗi xảy ra
    }
  };

  return (
    <>
      {contextHolder}
      <Modal open={isOpen} footer={[]} maskClosable={false} closable={false}>
        <div className="grid place-content-center">
          <form className="otp-Form">
            <span className="mainHeading">Nhập vào OTP</span>
            <p className="otpSubheading ">
              Chúng tôi đã gửi mã xác minh tới số điện thoại di động của bạn
            </p>
            <OtpInput
              value={verifyOTP}
              onChange={setVerifyOTP}
              numInputs={6}
              renderInput={(props) => <input type="number" {...props} />}
              containerStyle={"flex w-[300px] justify-between"}
              inputStyle={{ width: "30px", height: "30px" }}
              inputType={"tel"}
            />
            <button
              onClick={handleSubmit}
              className="verifyButton"
              type="submit"
            >
              Xác nhận
            </button>
            <p className="resendNote">
              Bạn không nhận được OTP?
              <button
                onClick={handleResendOTP}
                className={`${
                  isResendDisabled
                    ? "cursor-not-allowed resendBtn bg-[#7f81ff] p-[10px] text-white font-bold text-sm border-0"
                    : "cursor-pointer resendBtn bg-[#7f81ff] p-[10px] text-white font-bold text-sm border-0  "
                }  `}
                disabled={isResendDisabled}
              >
                {isResendDisabled
                  ? `Gửi lại OTP sau:  ${countdown}s`
                  : "Gửi lại OTP"}
              </button>
            </p>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default PopUpOTP;
