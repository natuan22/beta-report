import { Tooltip } from "antd";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import formatNumber from "../../helper/formatNumber";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import { getColorWithValueReference } from "../../helper/getColorWithValueReference";

const TableBuySell = ({ data }) => {
  const formatVolume = (volume) =>
    volume >= 1000 ? `${formatNumber(volume / 1000)} K` : volume;

  return (
    <div>
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
          <div className="block w-full overflow-y-scroll sm:h-[650px] xs:h-[300px] xxs:h-[300px] bg-transparent border-1 border-[#0050AD] border-solid border-collapse">
            <table className="bg-transparent border-collapse w-full sm:text-base xs:text-[12.5px] xxs:text-[9px]">
              <thead
                className="bg-[#0050AD] z-10"
                style={{ position: "sticky", top: 0 }}
              >
                <tr className="text-white ">
                  <th className="font-semibold px-1 py-1 flex items-center justify-center">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div className="w-[300px] text-justify">
                          Khi cả dòng có tô màu xanh tức là lệnh Lớn Mua chủ
                          động (&gt;1 tỷ đồng/lệnh), tô dòng màu đỏ tức là lệnh
                          Lớn Bán chủ động (&gt;1 tỷ đồng/lệnh).
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
                  <th className="font-semibold px-1 py-1 text-right">+/-</th>
                  <th className="font-semibold px-3 py-1 text-right">%</th>
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
                            ? item.action === "S"
                              ? "bg-[#ff3747] bg-opacity-20"
                              : item.action === "B"
                              ? "bg-[#00f4b0] bg-opacity-20"
                              : "bg-transparent"
                            : "bg-transparent"
                        }
                      >
                        <td className="px-1 py-1 font-semibold flex">
                          <div className="w-[65%] text-center ml-2">
                            {item.time}
                          </div>
                          <div
                            className={`${
                              item.action === "S"
                                ? "text-red-500"
                                : "text-green-500"
                            } w-[20%]`}
                          >
                            {item.action === "S"
                              ? "B"
                              : item.action === "B"
                              ? "M"
                              : " "}
                          </div>
                        </td>
                        <td className="text-right px-1 py-1 font-semibold w-[17%]">
                          {formatVolume(item.volume)}
                        </td>
                        <td
                          className={`${getColorWithValueReference(
                            data.prevClosePrice,
                            item.matchPrice
                          )} text-right px-1 py-1 font-semibold w-[17%]`}
                        >
                          {formatNumber(item.matchPrice)}
                        </td>
                        <td className="text-right px-1 py-1 w-[17%]">
                          {formatNumber(item.priceChangeReference)}
                        </td>
                        <td
                          className={`${getColorBaseOnValue(
                            item.perChangeReference
                          )} text-right px-3 py-1 w-[17%]`}
                        >
                          {formatNumber(item.perChangeReference)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
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
