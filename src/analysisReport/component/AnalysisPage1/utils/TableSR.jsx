import React from "react";
import formatNumberPage3 from "../../../../helper/formatNumberPage3";

const TableSR = ({ data }) => {
  return (
    <div>
      <table className="translate-x-[-1px] w-[330px]  h-[130px]">
        <thead>
          <tr className="text-[12px] font-bold text-center">
            <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2">
              Hỗ trợ
            </td>
            <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2 w-[101px]">
              Giá (VNĐ)
            </td>
            <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2 ">
              Kháng cự
            </td>
            <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2 w-[100px]">
              Giá (VNĐ)
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>S1</td>
            <td>{data && formatNumberPage3(Number(data.table[0]))}</td>
            <td>R1</td>
            <td>{data && formatNumberPage3(Number(data.table[3]))}</td>
          </tr>
          <tr className="text-center">
            <td>S2</td>
            <td>{data && formatNumberPage3(Number(data.table[1]))}</td>
            <td>R2</td>
            <td>{data && formatNumberPage3(Number(data.table[4]))}</td>
          </tr>
          <tr className="text-center">
            <td>S3</td>
            <td>{data && formatNumberPage3(Number(data.table[2]))}</td>
            <td>R3</td>
            <td>{data && formatNumberPage3(Number(data.table[5]))}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSR;
