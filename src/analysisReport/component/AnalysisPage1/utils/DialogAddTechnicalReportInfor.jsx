import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import Button from "@mui/material/Button";
import FormInput from "./FormInput";

const DialogAddTechnicalReportInfor = ({
  stock,
  onSubmitSuccess,
  getImgFromInput,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const warning = (type, text) => {
    messageApi.open({
      type,
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
      <Button variant="contained" onClick={showModal}>
        Thêm hình và nhận định
      </Button>
      <Modal
        width={1600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        footer={null}
      >
        <div className="h-full w-full">
          <FormInput
            code={stock}
            getImgFromInput={getImgFromInput}
            handleOk={handleOk}
            warning={warning}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>
      </Modal>
    </>
  );
};

export default DialogAddTechnicalReportInfor;
