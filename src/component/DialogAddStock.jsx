import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "antd";
import InputFormBuy from "./utils/InputFormBuy";
import { FaPlus } from "react-icons/fa6";
import InputFormSell from "./utils/InputFormSell";
import { message } from "antd";
import Button from "@mui/material/Button";
import { https } from "../services/configService";

const saveStock = async (arrStock) => {
    try {
        const response = await https.post('/api/v1/report/luu-co-phieu-khuyen-nghi', arrStock)
    } catch (err) {
        console.error(err)
    }
}

const DialogAddStock = ({ catchStock }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [components, setComponents] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [arrStock, setArrStock] = useState({
        stock_buy: [],
        stock_sell: []
    })
    const getStock = async () => {
        try {
            const response = await https.get('/api/v1/report/nhan-dinh-thi-truong-redis')
            // console.log(response.data.data.stock_buy)
            catchStock(response.data.data.stock_buy)
        } catch (err) {
            console.error(err)
        }
    }
    const catchStockInput = (type, stock) => {
        setArrStock((preArrStock) => ({
            ...preArrStock,
            [type]: [...preArrStock[type], stock]
        }))
    }
    const warning = (text) => {
        messageApi.open({
            type: "warning",
            content: text,
        });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        getStock()
    }, [])
    const handleOk = async () => {
        setIsModalOpen(false);
        await saveStock(arrStock)
        getStock()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        catchStock([])
        setComponents([])
        saveStock({
            stock_buy: [],
            stock_sell: []
        })
    };

    const addComponent = (type) => {
        if (components.length < 4) {
            const newComponent =
                type === "buy" ? (
                    <InputFormBuy key={components.length} catchStockInput={catchStockInput} isBuy={true} />
                ) : (
                    <InputFormSell key={components.length} catchStockInput={catchStockInput} isBuy={false} />
                );
            setComponents((prevComponents) => [...prevComponents, newComponent]);
        } else {
            warning("Tối đa 4 mã");
        }
    };
    const removeComponent = (index) => {
        const updatedComponents = [...components];
        updatedComponents.splice(index, 1);
        setComponents(updatedComponents);
    };
    return (
        <>
            {contextHolder}
            <Button variant="contained" onClick={showModal}>
                Thêm cổ phiếu khuyến nghị
            </Button>
            <Modal
                width={1600}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Xóa tất cả"
            >
                <div className="w-full grid place-items-center">
                    <div className="flex justify-evenly w-[30%] ">
                        <div>
                            <Button color="success" onClick={() => addComponent("buy")}>
                                <FaPlus />
                                <span className="ml-2">Mua</span>
                            </Button>
                        </div>
                        <div>
                            <Button color="error" onClick={() => addComponent("sell")}>
                                <FaPlus />
                                <span className="ml-2">Bán</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex  mt-5 ">
                    {components.map((component, index) => (
                        <Fragment key={index} >
                            <div>
                                <Button size="small" onClick={() => removeComponent(index)} variant="outlined" color="warning" >x</Button>
                            </div>
                            {component}

                        </Fragment>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default DialogAddStock;
