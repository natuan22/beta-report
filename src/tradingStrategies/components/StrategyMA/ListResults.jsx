import { Modal, Table, Tooltip } from "antd";
import React, { useState } from "react";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";

const ListResults = ({ data, strategy }) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [details, setDetails] = useState([]);

  const showModalDetail = (record) => {
    setIsModalDetailOpen(true);
    setDetails(record);
  };

  const handleDetailOk = () => {
    setIsModalDetailOpen(false);
  };

  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-white";
    } else {
      // Dòng chẵn màu #F6F0EA
      return "bg-[#F6F0EA]";
    }
  };

  const columns = [
    {
      title: strategy === 'ma' ? "Đường MA" : 'Chỉ báo',
      dataindex: "name",
      align: "center",
      width: 150,
      render: (_, record) => (
        <div className="text-black text-right text-[13px]">
          <Tooltip
            placement="right"
            title={<span className="">Xem chi tiết</span>}
            color={"linear-gradient(to bottom, #ffffff, #f4e6dd)"}
          >
            <div
              className="mr-3 cursor-pointer"
              onClick={() => showModalDetail(record)}
            >
              {record.name}
            </div>
          </Tooltip>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tổng hiệu suất sinh lời (%)",
      dataindex: "total",
      align: "center",
      width: 250,
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.total * 100)}
        </div>
      ),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Tổng số lượng lệnh",
      dataindex: "count",
      align: "center",
      width: 250,
      render: (_, record) => (
        <div className="text-black text-right">{record.count}</div>
      ),
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Hiệu suất sinh lời max (%)",
      dataindex: "max",
      align: "center",
      width: 250,
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.max * 100)}
        </div>
      ),
      sorter: (a, b) => a.max - b.max,
    },
    {
      title: "Hiệu suất sinh lời min (%)",
      dataindex: "min",
      align: "center",
      width: 250,
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.min * 100)}
        </div>
      ),
      sorter: (a, b) => a.min - b.min,
    },
    {
      title: "Hiệu suất sinh lời trung bình (%)",
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency((record.total / record.count) * 100)}
          </div>
        );
      },
      sorter: (a, b) => a.total / a.count - b.total / b.count,
    },
  ];

  const columnDetails = [
    {
      title: "Ngày mua",
      dataindex: "date_buy",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">{record.date_buy}</div>
      ),
      sorter: (a, b) => new Date(a.date_buy) - new Date(b.date_buy),
    },
    {
      title: "Giá mua",
      dataindex: "price_buy",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.price_buy)}
        </div>
      ),
      sorter: (a, b) => a.price_buy - b.price_buy,
    },
    {
      title: "Ngày bán",
      dataindex: "date_sell",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">{record.date_sell}</div>
      ),
      sorter: (a, b) => new Date(a.date_sell) - new Date(b.date_sell),
    },
    {
      title: "Giá bán",
      dataindex: "price_sell",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.price_sell)}
        </div>
      ),
      sorter: (a, b) => a.price_sell - b.price_sell,
    },
    {
      title: "Hiệu suất sinh lời (%)",
      align: "profit",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.profit)}
          </div>
        );
      },
      sorter: (a, b) => a.profit - b.profit,
    },
  ];

  return (
    <div className="mt-2 border-solid border-2 border-[#0050AD] table-data-trading-strategies">
      <Table
        showSorterTooltip={false}
        columns={columns}
        dataSource={data}
        rowClassName={rowClassName}
        pagination={false}
        scroll={{ x: 1400, y: 352 }}
      />
      <Modal
        centered
        width={1000}
        open={isModalDetailOpen}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        footer={null}
        className="detail-conditions"
      >
        <div className="h-[600px] table-data-trading-strategies">
          <span className="font-semibold text-[20px]">{details.name}</span>
          <Table
            showSorterTooltip={false}
            columns={columnDetails}
            dataSource={details.detail}
            rowClassName={rowClassName}
            pagination={false}
            scroll={{ y: 500 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ListResults;
