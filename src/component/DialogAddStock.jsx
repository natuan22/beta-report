import Button from "@mui/material/Button";
import { Modal, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { postApi } from "../helper/postApi";
import { https } from "../services/configService";
import InputFormBuy from "./utils/InputFormBuy";
import InputFormSell from "./utils/InputFormSell";

const DialogAddStock = ({ catchStock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setComponents] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [arrStock, setArrStock] = useState({
    stock_buy: [],
    stock_sell: [],
  });

  const getStock = async () => {
    try {
      const response = await https.get(
        "/api/v1/report/nhan-dinh-thi-truong-redis"
      );
      catchStock(response.data.data.stock_buy);
      loadComponents(response.data.data);
      setArrStock((preArrStock) => ({
        ...preArrStock,
        stock_buy: response.data.data.stock_buy,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const catchStockInput = (type, stock, indexToUpdate) => {
    setArrStock((prevArrStock) => {
      let updatedArrStock = { ...prevArrStock };

      // Cập nhật phần tử tại chỉ mục indexToUpdate
      if (indexToUpdate !== null && indexToUpdate !== undefined) {
        updatedArrStock = {
          ...updatedArrStock,
          [type]: prevArrStock[type].map((item, index) =>
            index === indexToUpdate ? stock : item
          ),
        };
      } else {
        // Thêm một phần tử mới vào mảng
        updatedArrStock = {
          ...updatedArrStock,
          [type]: [...prevArrStock[type], stock],
        };
      }

      return updatedArrStock;
    });
  };

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    getStock();
  };

  useEffect(() => {
    getStock();
  }, []);

  const addComponent = (type) => {
    if (components.length < 4) {
      const newComponent =
        type === "buy" ? (
          <InputFormBuy
            key={components.length}
            catchStockInput={catchStockInput}
            isBuy={true}
          />
        ) : (
          <InputFormSell
            key={components.length}
            catchStockInput={catchStockInput}
            isBuy={false}
          />
        );
      setComponents((prevComponents) => [...prevComponents, newComponent]);
    } else {
      warning("warning", "Tối đa 4 mã");
    }
  };

  const loadComponents = (arr) => {
    setComponents(
      arr.stock_buy.map((item, index) => (
        <Fragment key={index}>
          {item.isBuy ? (
            <div>
              <InputFormBuy
                catchStockInput={catchStockInput}
                isBuy={true}
                data={item}
                index={index}
              />
            </div>
          ) : (
            <div>
              <InputFormSell
                catchStockInput={catchStockInput}
                isBuy={false}
                data={item}
                index={index}
              />
            </div>
          )}
        </Fragment>
      ))
    );
  };

  const removeComponent = (index) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    const updatedArr = [...arrStock.stock_buy];
    updatedArr.splice(index, 1);
    setArrStock((preArrStock) => ({
      ...preArrStock,
      stock_buy: updatedArr,
    }));
    setComponents(updatedComponents);
  };

  const removeAll = async () => {
    catchStock([]);
    setComponents([]);
    setArrStock({
      stock_buy: [],
      stock_sell: [],
    });
    await postApi("/api/v1/report/luu-co-phieu-khuyen-nghi", {
      stock_buy: [],
      stock_sell: [],
    });
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await postApi("/api/v1/report/luu-co-phieu-khuyen-nghi", arrStock);
    getStock();
    warning("success", "Thêm cổ phiếu khuyến nghị thành công");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        cancelText="Đóng"
        okText="Lưu"
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
            <div>
              <Button variant="contained" color="error" onClick={removeAll}>
                Xoá tất cả
              </Button>
            </div>
          </div>
        </div>
        <div className="flex  mt-5 ">
          {components.map((component, index) => (
            <Fragment key={index}>
              <div>
                <Button
                  size="small"
                  onClick={() => removeComponent(index)}
                  variant="outlined"
                  color="warning"
                >
                  x
                </Button>
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
