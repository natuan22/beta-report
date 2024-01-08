import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Form, Input } from "antd";
import { https } from "../../../../services/configService";
const { TextArea } = Input;


const saveText = async (text) => {
    try {
        const res = await https.post('api/v1/report/luu-dien-bien-thi-truong-tuan', text)
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

const AddText = ({ handleGetTextInpur }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const { handleSubmit, handleChange } = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: (values) => {
            saveText(values)
            handleGetTextInpur(values.text)
        },
    });

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
                Thêm nhận định
            </Button>
            <Modal
                width={1600}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Đóng"
            >
                <div className="h-[650px] grid place-items-center">
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
                        <Form.Item label="Nhận định">
                            <TextArea
                                name="text"
                                onChange={handleChange}
                                placeholder="Nhập vào nhận định"
                                rows={4}
                                style={{
                                    height: 200,
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Tác vụ">
                            <button
                                type="submit"
                                class="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl border-0     font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

export default AddText;
