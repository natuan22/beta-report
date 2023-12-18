import React from 'react';
import {
    Form,
    Input,
} from 'antd';
import { useFormik } from 'formik';
const InputFormSell = () => {
    const { handleSubmit, setFieldValue, handleChange, errors, touched } =
        useFormik({
            initialValues: {
                code: '',
                buyPrice: 0,
                sellPrice: 0,
                rate: 0,
                profit: 0,
                time: ''
            },
            onSubmit: (values) => {

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
                <Input name='profit' onChange={handleChange} />
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