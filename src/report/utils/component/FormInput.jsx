import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormInput = () => {
    return (
        <div className="flex flex-col items-center  w-full">
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
            >
                <Form.Item label="Đoạn 1">
                    <TextArea
                        placeholder="Nhận định 1"
                        rows={4}
                        style={{
                            height: 200,
                        }}
                    />
                </Form.Item>
                <Form.Item label="Đoạn 2">
                    <TextArea
                        placeholder="Nhận định 2"
                        style={{
                            height: 200,
                        }}
                        rows={4}
                    />
                </Form.Item>
                <Form.Item
                    label="Ảnh"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Thêm hình
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <Button>Thêm</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default FormInput;
