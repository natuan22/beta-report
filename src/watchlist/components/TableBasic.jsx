import { Table, Tooltip } from "antd";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import Loading from "../../loading/Loading";

const TableBasic = ({ data, handleDelCodeInWatchlist, loading, loadingTb }) => {
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
      title: (
        <span>
          Thị giá <br />
          (đồng)
        </span>
      ),
      dataindex: "closePrice",
      width: 100,
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
      width: 80,
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
      title: (
        <span>
          KLGD <br />
          (CP)
        </span>
      ),
      dataindex: "totalVol",
      width: 110,
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
      title: (
        <span>
          GTGD <br />
          (tỷ đồng)
        </span>
      ),
      dataindex: "totalVal",
      width: 120,
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
      title: (
        <span>
          EPS <br />
          (đồng/cp)
        </span>
      ),
      dataindex: "EPS",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.EPS)}
          </div>
        );
      },
      sorter: (a, b) => a.EPS - b.EPS,
    },
    {
      title: "PE (lần)",
      dataindex: "PE",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.PE)}
          </div>
        );
      },
      sorter: (a, b) => a.PE - b.PE,
    },
    {
      title: (
        <span>
          BVPS <br />
          (đồng/cp)
        </span>
      ),
      dataindex: "BVPS",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.BVPS)}
          </div>
        );
      },
      sorter: (a, b) => a.BVPS - b.BVPS,
    },
    {
      title: "PB (lần)",
      dataindex: "PB",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.PB)}
          </div>
        );
      },
      sorter: (a, b) => a.PB - b.PB,
    },
    {
      title: "ROA (%)",
      dataindex: "ROA",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.ROA * 100)}
          </div>
        );
      },
      sorter: (a, b) => a.ROA - b.ROA,
    },
    {
      title: "ROE (%)",
      dataindex: "ROE",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.ROE * 100)}
          </div>
        );
      },
      sorter: (a, b) => a.ROE - b.ROE,
    },
    {
      title: (
        <span>
          Biên LNG <br /> năm gần nhất (%)
        </span>
      ),
      dataindex: "grossProfitMarginYear",
      width: 180,
      align: "center",
      render: (_, record) => {
        const grossProfitMarginYear = record.grossProfitMarginYear * 100;

        return (
          <div className="text-black text-right">
            {grossProfitMarginYear !== 0
              ? formatNumberCurrency(grossProfitMarginYear)
              : ""}
          </div>
        );
      },
      sorter: (a, b) => a.grossProfitMarginYear - b.grossProfitMarginYear,
    },
    {
      title: (
        <span>
          Biên LNG <br /> quý gần nhất (%)
        </span>
      ),
      dataindex: "grossProfitMarginQuarter",
      width: 170,
      align: "center",
      render: (_, record) => {
        const grossProfitMarginQuarter = record.grossProfitMarginQuarter * 100;

        return (
          <div className="text-black text-right">
            {grossProfitMarginQuarter !== 0
              ? formatNumberCurrency(grossProfitMarginQuarter)
              : ""}
          </div>
        );
      },
      sorter: (a, b) => a.grossProfitMarginQuarter - b.grossProfitMarginQuarter,
    },
    {
      title: (
        <span>
          Biên LNR <br /> năm gần nhất (%)
        </span>
      ),
      dataindex: "netProfitMarginYear",
      width: 180,
      align: "center",
      render: (_, record) => {
        const netProfitMarginYear = record.netProfitMarginYear * 100;

        return (
          <div className="text-black text-right">
            {netProfitMarginYear !== 0
              ? formatNumberCurrency(netProfitMarginYear)
              : ""}
          </div>
        );
      },
      sorter: (a, b) => a.netProfitMarginYear - b.netProfitMarginYear,
    },
    {
      title: (
        <span>
          Biên LNR <br /> quý gần nhất (%)
        </span>
      ),
      dataindex: "netProfitMarginQuarter",
      align: "center",
      render: (_, record) => {
        const netProfitMarginQuarter = record.netProfitMarginQuarter * 100;

        return (
          <div className="text-black text-right">
            {netProfitMarginQuarter !== 0
              ? formatNumberCurrency(netProfitMarginQuarter)
              : ""}
          </div>
        );
      },
      sorter: (a, b) => a.netProfitMarginQuarter - b.netProfitMarginQuarter,
    },
  ];

  return (
    <div>
      {!loading && data ? (
        <div>
          {Array.isArray(data) && data?.length > 0 ? (
            <div className="table-data-watchlist w-[1840px] mt-0.5">
              <Table
                loading={loadingTb}
                showSorterTooltip={false}
                scroll={{ x: 1870 }}
                columns={columns}
                dataSource={data}
                rowClassName={rowClassName}
                pagination={{ defaultPageSize: 14, showSizeChanger: false }}
              />
            </div>
          ) : (
            <div className="grid place-content-center h-[710px] font-medium text-lg">
              <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                <div className="p-7">Chưa có mã chứng khoán nào</div>
                <div>
                  Bạn hãy thêm mã chứng khoán vào watchlist để theo dõi.
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid place-content-center h-[710px]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default TableBasic;
