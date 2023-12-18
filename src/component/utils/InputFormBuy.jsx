import React from 'react';
import {
    Form,
    Input,
} from 'antd';
import { useFormik } from 'formik';
const InputFormBuy = () => {
    const { handleSubmit, handleChange } =
        useFormik({
            initialValues: {
                code: '',
                entryPrice: 0,
                targetPrice: 0,
                stopLossPrice: 0,
                profit: 0,
                time: ''
            },
            onSubmit: (values) => {
                console.log(values)
            },
        });
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
                width: 600,
            }}
            onSubmitCapture={handleSubmit}
        >
            <Form.Item label='Mã'>
                <Input name='code' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Giá khuyến nghị">
                <Input name='entryPrice' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Giá mục tiêu">
                <Input name='targetPrice' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Giá ngừng lỗ">
                <Input name='stopLossPrice' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Lãi kỳ vọng">
                <Input name='profit' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Thời gian">
                <Input name='time' onChange={handleChange} />
            </Form.Item>
            <div className='w-full grid place-items-center'>
                <button className=' outline-0 border-0 p-3 rounded-xl bg-green-500 text-white cursor-pointer' >
                    Thêm mã mua
                </button>
            </div>
        </Form>
    );
};
export default InputFormBuy;