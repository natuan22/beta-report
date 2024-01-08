import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import Button from "@mui/material/Button";
import FormInput from "../../../../report/utils/component/FormInput";


const DialogAddImgAndTextWeek = ({ onSubmitSuccess, getImgFromInput }) => {
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
            <Button variant="contained" onClick={showModal}>
                Thêm hình và nhận định
            </Button>
            <Modal
                width={1600}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Đóng"
            >
                <div className="h-[650px] grid place-items-center">
                    <FormInput getImgFromInput={getImgFromInput} handleOk={handleOk} onSubmitSuccess={onSubmitSuccess} />

                </div>
            </Modal>
        </>
    );
};

export default DialogAddImgAndTextWeek;
