import React from "react";
import formatNumber from "../../../../helper/formatNumber";
import { getColorBaseOnValue } from "../../../../helper/getColorBaseOnValue";

const InterestRateTable = ({ data }) => {
  return (
    <div>
      <table className="bg-transparent border-collapse w-[370px]   text-[11px] h-[245px]">
        <thead className="bg-[#0155B7]  border border-[#0155B7] border-solid border-collapse">
          <tr className="text-white ">
            <th className="font-semibold px-1 py-1 ">Kỳ hạn</th>
            <th className="font-semibold px-1 py-1 ">Mức lãi suất</th>
            <th className="font-semibold px-1 py-1 ">%W</th>
            <th className="font-semibold px-1 py-1 ">%1M</th>
            <th className="font-semibold px-1 py-1 ">%YtD</th>
            <th className="font-semibold px-1 py-1 ">%YoY</th>
          </tr>
        </thead>
        <tbody className="border border-[#0155B7] border-solid border-collapse  ">
          {data?.map((item, index) => (
            <tr key={index}>
              <td className="text-center px-1 py-3 font-semibold text-[11px]">
                {item.code}
              </td>
              <td className="text-center px-2 py-3 text-[11px]">
                {formatNumber(item.price)}
              </td>
              <td
                className={`${getColorBaseOnValue(
                  item.week
                )} text-center px-1 py-3 text-[11px]`}
              >
                {formatNumber(item.week)}
              </td>
              <td
                className={`${getColorBaseOnValue(
                  item.month
                )} text-center px-1 py-3 text-[11px]`}
              >
                {formatNumber(item.month)}
              </td>
              <td
                className={`${getColorBaseOnValue(
                  item.ytd
                )} text-center px-1 py-3 text-[11px]`}
              >
                {formatNumber(item.ytd)}
              </td>
              <td
                className={`${getColorBaseOnValue(
                  item.yoy
                )} text-center px-1 py-3 text-[11px]`}
              >
                {formatNumber(item.yoy)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterestRateTable;
