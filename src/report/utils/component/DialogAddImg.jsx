import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "antd";
import { FaPlus } from "react-icons/fa6";
import { message } from "antd";
import Button from "@mui/material/Button";


const DialogAddImg = ({ catchStock }) => {
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
                Thêm hình
            </Button>
            <Modal
                width={1600}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Xóa tất cả"
            >

            </Modal>
        </>
    );
};

export default DialogAddImg;
