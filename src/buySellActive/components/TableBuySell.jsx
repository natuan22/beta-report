import { Tooltip } from "antd";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import formatNumber from "../../helper/formatNumber";

const TableBuySell = ({ data }) => {
  const formatVolume = (volume) =>
    volume >= 1000 ? `${formatNumber(volume / 1000)} K` : volume;

  return (
    <div>
      <div className="flex justify-around pb-1 font-semibold">
        <div>KL: {formatVolume(data?.totalVol)}</div>
        <div>
          M:{" "}
          <span className="text-green-500">
            {formatVolume(data?.totalBuyVol)}
          </span>
        </div>
        <div>
          B:{" "}
          <span className="text-red-500">
            {formatVolume(data?.totalSellVol)}
          </span>
        </div>
      </div>

      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
          <div className="block w-full overflow-y-scroll h-[689px] bg-transparent bg-[#0155B7] border-1 border-[#0155B7] border-solid border-collapse">
            <table className="bg-transparent border-collapse w-full">
              <thead
                className="bg-[#0155B7] z-10"
                style={{ position: "sticky", top: 0 }}
              >
                <tr className="text-white ">
                  <th className="font-semibold px-1 py-1 flex items-center justify-center">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div className="w-[396px] text-justify">
                          Khi cả dòng có tô màu xanh tức là lệnh Lớn vừa Mua chủ
                          động (&gt;1 tỷ đồng/lệnh), tô dòng màu đỏ là lệnh vừa
                          Bán chủ động.
                        </div>
                      }
                      color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
                    >
                      <BsInfoCircle className="cursor-pointer" />
                    </Tooltip>
                    <span className="pl-2">Tất cả GD</span>
                  </th>
                  <th className="font-semibold px-1 py-1 text-right">KL</th>
                  <th className="font-semibold px-1 py-1 text-right">Giá</th>
                  <th className="font-semibold px-3 py-1 text-right">+/-</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data?.data?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={
                          item.highlight
                            ? item.lastColor === "S"
                              ? "bg-[#00f4b0] bg-opacity-20"
                              : item.lastColor === "B"
                              ? "bg-[#ff3747] bg-opacity-20"
                              : "bg-transparent"
                            : "bg-transparent"
                        }
                      >
                        <td className="px-1 py-1 font-semibold flex">
                          <div className="w-[65%] text-center ml-2">
                            {item.formattedTime}
                          </div>
                          <div
                            className={`${
                              item.lastColor === "S"
                                ? "text-green-500"
                                : "text-red-500"
                            } w-[20%]`}
                          >
                            {item.lastColor === "S"
                              ? "M"
                              : item.lastColor === "O" || item.lastColor === "C" || item.lastColor === "P" || !item.lastColor
                              ? " "
                              : "B"}
                          </div>
                        </td>
                        <td className="text-right px-1 py-1 font-semibold w-[22%]">
                          {formatVolume(item.formattedVol)}
                        </td>
                        <td
                          className={`${
                            item.formattedMatchPrice / 1000 >
                            data.prevClosePrice
                              ? "text-green-500"
                              : item.formattedMatchPrice / 1000 <
                                data.prevClosePrice
                              ? "text-red-500"
                              : "text-yellow-500"
                          } text-right px-1 py-1 font-semibold w-[22%]`}
                        >
                          {formatNumber(item.formattedMatchPrice / 1000)}
                        </td>
                        <td className="text-right px-3 py-1 w-[22%]">
                          {formatNumber(item.formattedChangeValue / 1000)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="text-center mt-5 font-semibold">
                        Chưa có dữ liệu giao dịch
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBuySell;
