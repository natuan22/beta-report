import { Table, Tooltip } from "antd";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import GauChart from "./GauChart";
import calSignalText from "../../helper/calSignalText";

const TableTechnique = ({ data, handleDelCodeInWatchlist, loadingTb }) => {
  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-white";
    } else {
      // Dòng chẵn màu #d9e9fd
      return "bg-[#d9e9fd] ";
    }
  };

  const columns = [
    {
      title: "Mã CP",
      dataindex: "code",
      fixed: true,
      width: 200,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`font-bold text-lg flex flex-row items-center`}>
            <IoIosCloseCircle
              className="text-[#dcdcdd] w-[20px] h-[20px] mr-2 cursor-pointer hover:text-red-500"
              onClick={() => handleDelCodeInWatchlist(record.code)}
            />
            <Tooltip
              placement="left"
              title={
                <span className="">Click vào mã cổ phiếu để xem báo cáo</span>
              }
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              <a
                className="text-[#0D4381] cursor-pointer no-underline hover:text-[#0164F8]"
                href={`/phan-tich-ky-thuat-tu-dong/${record.code}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {record.code}
              </a>
            </Tooltip>
          </div>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Thị giá (đồng)",
      dataindex: "closePrice",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange)}`}
          >
            {formatNumberCurrency(record.closePrice * 1000)}
          </div>
        );
      },
      sorter: (a, b) => a.closePrice - b.closePrice,
    },
    {
      title: "%D",
      dataindex: "perChange",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange)}`}
          >
            {formatNumberCurrency(record.perChange)}
          </div>
        );
      },
      sorter: (a, b) => a.perChange - b.perChange,
    },
    {
      title: "KLGD (CP)",
      dataindex: "totalVol",
      width: 130,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.totalVol)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVol - b.totalVol,
    },
    {
      title: "GTGD (tỷ đồng)",
      dataindex: "totalVal",
      width: 160,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.totalVal / 1000000000)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "Tín hiệu đường xu hướng",
      align: "center",
      width: 220,
      render: (_, record) => {
        return <GauChart data={record.trendSignal} />;
      },
    },
    {
      title: "Tín hiệu chỉ báo kỹ thuật",
      align: "center",
      width: 220,
      render: (_, record) => {
        return <GauChart data={record.technicalSignal} />;
      },
    },
    {
      title: "Tín hiệu kỹ thuật tổng hợp",
      align: "center",
      render: (_, record) => {
        return <GauChart data={record.generalSignal} />;
      },
    },
  ];

  return (
    <div>
      {Array.isArray(data) && data?.length > 0 ? (
        <div className="table-data-watchlist">
          <Table
            loading={loadingTb}
            showSorterTooltip={false}
            scroll={{ x: 1380 }}
            columns={columns}
            dataSource={data}
            rowClassName={rowClassName}
            pagination={{ defaultPageSize: 15, showSizeChanger: false }}
          />
        </div>
      ) : (
        <div className="grid place-content-center h-[710px] font-medium text-lg">
          <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
            <div className="p-7">Chưa có mã chứng khoán nào</div>
            <div>Bạn hãy thêm mã chứng khoán vào watchlist để theo dõi.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTechnique;
