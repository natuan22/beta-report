import React from "react";
import formatNumber from "../../../../helper/formatNumber";
import { getColorBaseOnValue } from "../../../../helper/getColorBaseOnValue";

const TableRate = ({ data }) => {
  return (
    <div>
      <table className="bg-transparent border-collapse w-[370px] text-[11px] h-[290px]">
        <thead className="bg-[#0155B7]  border border-[#0155B7] border-solid border-collapse">
          <tr className="text-white">
            <th className="font-semibold px-1 py-1 w-[80px]">Ngoại tệ</th>
            <th className="font-semibold px-1 py-1">Thị giá</th>
            <th className="font-semibold px-1 py-1">%W</th>
            <th className="font-semibold px-1 py-1">%1M</th>
            <th className="font-semibold px-1 py-1">%YtD</th>
            <th className="font-semibold px-1 py-1">%YoY</th>
          </tr>
        </thead>
        <tbody className="border border-[#0155B7] border-solid border-collapse ">
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center px-2 py-1 font-bold flex items-center text-[11px]">
                  <img
                    src={`/assets/exchange_rate_flag/${item.code}.png`}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  {item.code}
                </td>
                <td className="text-center px-2 py-1 text-[11px]">
                  {formatNumber(item.price)}
                </td>
                <td
                  className={`${getColorBaseOnValue(
                    item.week
                  )} text-center px-1 py-1 text-[11px]`}
                >
                  {formatNumber(item.week)}
                </td>
                <td
                  className={`${getColorBaseOnValue(
                    item.month
                  )} text-center px-1 py-1 text-[11px]`}
                >
                  {formatNumber(item.month)}
                </td>
                <td
                  className={`${getColorBaseOnValue(
                    item.ytd
                  )} text-center px-1 py-1 text-[11px]`}
                >
                  {formatNumber(item.ytd)}
                </td>
                <td
                  className={`${getColorBaseOnValue(
                    item.yoy
                  )} text-center px-1 py-1 text-[11px]`}
                >
                  {formatNumber(item.yoy)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableRate;
