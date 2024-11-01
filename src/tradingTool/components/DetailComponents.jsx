import { Modal, Tooltip } from "antd";
import React, { useState } from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

export default (params) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();

  const showModal = (data) => {
    setIsModalDetailOpen(true);
    setDataDetail(data);
  };

  const handleDetailOk = async () => {
    setIsModalDetailOpen(false);
  };

  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={() => showModal(params.data)}>
        <Tooltip
          placement="right"
          title={<span className="">Xem chi tiết</span>}
          color={"linear-gradient(to bottom, #ffffff, #f4e6dd)"}
        >
          <span>{params.value}</span>
        </Tooltip>
      </div>
      <Modal
        centered
        width={500}
        open={isModalDetailOpen}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        footer={null}
        className="detail-conditions"
      >
        <div className="h-fit border-[3px] m-[15px] border-dashed border-yellow-300">
          <div className="flex justify-between items-center text-[25px] py-1 px-3">
            <p className="m-1 w-[75%]">Mã</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail?.code}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Giá</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.closePrice)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Giá mục tiêu 2024</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.price_2024)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Tiềm năng tăng giá 2024 (%)</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.p_2024)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Giá mục tiêu 2025</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.price_2025)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Tiềm năng tăng giá 2025 (%)</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.p_2025)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">MA</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail?.name}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Giá trị MA</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.ma)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Hiệu suất sinh lời theo MA (%)</p>
            <p className="m-1">:</p>
            <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
              {dataDetail && formatNumberCurrency(dataDetail?.total)}
            </p>
          </div>
          <div className="flex justify-between items-center text-[16px] py-1 px-3">
            <p className="m-1 w-[75%]">Tín hiệu</p>
            <p className="m-1">:</p>
            <p
              className={`m-1 w-[25%] text-end font-semibold ${
                dataDetail?.signal == "MUA"
                  ? "text-green-500"
                  : dataDetail?.signal == "BÁN"
                  ? "text-red-500"
                  : dataDetail?.signal == "Hold mua"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {dataDetail?.signal}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
