import React from "react";
import { getColorBaseOnValue } from "../../../../helper/getColorBaseOnValue";
import formatNumber from "../../../../helper/formatNumber";

const GoodsPrice = ({ data }) => {
  return (
    <div>
      <table className="bg-transparent border-collapse w-[370px] h-[245px] text-[11px]">
        <thead className="bg-[#0155B7]  border border-[#0155B7] border-solid border-collapse">
          <tr className="text-white ">
            <th className="font-semibold px-2 py-1 text-left w-[120px] ">
              Hàng hóa
            </th>
            <th className="font-semibold px-1 py-1 ">Thị giá</th>
            <th className="font-semibold px-1 py-1 ">%W</th>
            <th className="font-semibold px-1 py-1 ">%1M</th>
            <th className="font-semibold px-1 py-1 ">%YtD</th>
            <th className="font-semibold px-1 py-1 ">%YoY</th>
          </tr>
        </thead>
        <tbody className="border border-[#0155B7] border-solid border-collapse ">
          {data?.slice(0, 8)?.map((item) => (
            <tr>
              <td className="text-left pl-2 py-1 font-semibold text-[11px] ">
                {item.name}
              </td>
              <td className="text-center px-2 py-1 text-[11px]">
                {formatNumber(item.price)}
              </td>
              <td
                className={`${getColorBaseOnValue(
                  item.day
                )} text-center px-1 py-1 text-[11px]`}
              >
                {formatNumber(item.day)}
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
                  item.year
                )} text-center px-1 py-1 text-[11px]`}
              >
                {formatNumber(item.year)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoodsPrice;
