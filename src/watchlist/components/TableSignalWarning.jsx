import { Table, Tooltip } from "antd";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const TableSignalWarning = ({ data, handleDelCodeInWatchlist, loadingTb }) => {
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
      title: "Tín hiệu",
      render: (_, record) => {
        return <div className="text-black text-right"></div>;
      },
    },
  ];

  return (
    <div>
      {Array.isArray(data) && data?.length > 0 ? (
        <div className="table-data-watchlist w-[1840px]">
          <Table
            loading={loadingTb}
            showSorterTooltip={false}
            scroll={{ x: 1000 }}
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

export default TableSignalWarning;
