import React from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { message } from "antd";

import { useFormik } from 'formik';
const InputFormSell = ({ catchStockInput, isBuy }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (text) => {
        messageApi.open({
            type: "success",
            content: text,
        });
    };
    const { handleSubmit, setFieldValue, handleChange, } =
        useFormik({
            initialValues: {
                code: '',
                buyPrice: 0,
                sellPrice: 0,
                rate: 0,
                profit: '',
                time: '',
                isBuy
            },
            onSubmit: (values) => {
                // console.log(values)
                catchStockInput("stock_buy", values);
                success('Thêm mã thành công')
            },
        });
    const handleSelect = (name) => {
        return (value) => {
            setFieldValue(name, value);
        };
    };
    return (
        <Form
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 12,
            }}
            layout="horizontal"
            size='default'
            style={{
                width: 400,
            }}
            onSubmitCapture={handleSubmit}
        >
            {contextHolder}
            <Form.Item label='Mã'>
                <Input name='code' onChange={handleChange} /> {/* Thiết lập chiều rộng mong muốn */}
            </Form.Item>
            <Form.Item label="Giá mua">
                <Input name='buyPrice' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Giá bán">
                <Input name='sellPrice' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="% lời/lỗ">
                <Input name='rate' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Chốt lời/lỗ">
                <Select name='profit' onChange={handleSelect('profit')}>
                    <Select.Option value="Chốt lời">Chốt lời</Select.Option>
                    <Select.Option value="Cắt lỗ">Cắt lỗ</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Thời gian">
                <Input name='time' onChange={handleChange} />
            </Form.Item>
            <div className='w-full grid place-items-center'>
                <button className=' outline-0 border-0 p-3 rounded-xl bg-red-500 text-white cursor-pointer' >
                    Thêm mã bán
                </button>
            </div>
        </Form>
    );
};
export default InputFormSell;