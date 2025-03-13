import React from "react";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../../helper/getColorBaseOnValue";
import formatNumber from "../../../helper/formatNumber";

const TableAndTitle = ({ name, headerTB, noteTitle, noteTB, data }) => {
  
  return (
    <div>
      <div className="flex justify-center -translate-y-2">
        <div className="absolute z-[-2] translate-x-1">
          <div className="skew-x-[35deg] flex translate-y-[1px]">
            <div className="bg-[#FFB243] h-[12px] w-[10px]"></div>
            <div className="w-[300px] bg-[#9CC9FE] h-[12px]"></div>
          </div>
          <div className="skew-x-[-35deg] flex">
            <div className="bg-[#FFB243] h-[12px] w-[10px]"></div>
            <div className="w-[300px] bg-[#9CC9FE] h-[12px]"></div>
          </div>
        </div>
        <div className="w-[270px] h-[24px] grid place-items-center">
          <h2 className={`text-[12px] font-bold text-[#000] text-center ${noteTitle ? 'my-0.5' : 'my-1'}`}>
            {name} {noteTitle ? <sup>({noteTitle})</sup> : null}
          </h2>
        </div>
      </div>
      <div className="flex justify-center">
        <table className="bg-transparent border-collapse h-[150px] mt-1">
          <thead className="bg-[#0155B7]  text-[12px]  border border-[#0155B7] border-solid border-collapse">
            <tr className="text-white">
              <th className="font-semibold px-1 py-1">Mã</th>
              <th className="font-semibold px-1 py-1">Thị giá</th>
              <th className="font-semibold px-1 py-1">%D</th>
              <th className="font-semibold px-1 py-1 w-[62px] flex"><div>{headerTB}</div>{noteTB ? <sup className="flex items-center -translate-x-1">({noteTB})</sup> : null}</th>
              <th className="font-semibold px-1 py-1 w-[65px]">KLGD <br></br>(Cổ phiếu)
              </th>
              <th className="font-semibold px-1 py-1 w-[62px]">GTGD <br></br>(Tỷ đồng)</th>
            </tr>
          </thead>
          <tbody className="border border-[#0155B7] border-solid border-collapse">
            {data?.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="text-center font-bold text-[12px] px-2.5 py-1">
                  {item.code}
                </td>
                <td className="text-center text-[12px] px-2.5 py-1.5">
                  {formatNumberCurrency(item.price)}
                </td>
                <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center px-2.5 py-1.5`}>
                  {formatNumber(item.day)}
                </td>
                <td className={`${getColorBaseOnValue(item.point)} text-[12px] text-center px-2.5 py-1.5`}>
                  {formatNumber(item.point)}
                </td>
                <td className="text-center text-[12px] px-2.5 py-1.5">
                  {formatNumberCurrency(item.volume)}
                </td>
                <td className="text-center text-[12px] px-2.5 py-1.5">
                  {formatNumberCurrency(item.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAndTitle;
