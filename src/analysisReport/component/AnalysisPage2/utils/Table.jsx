import React from "react";

const getColorBaseOnName = (value) => {
  if (value === "Tích cực") return "text-green-500";
  if (value === "Tiêu cực") return "text-red-500";
  if (value === "Trung lập") return "text-yellow-500";
};
const Table = ({ data }) => {
  return (
    <div className="relative">
      <div className="absolute w-[780px] h-[3px] bg-[#F89637] bottom-[55px] left-0 z-10"></div>
      <table className="w-[780px] h-[260px] border border-1 border-solid border-[#143A65] translate-y-[-25px] border-collapse">
        <thead className="bg-gradient-to-b from-[#143A65] to-[#0054B4]">
          <tr className="text-white font-semibold text-center ">
            <td className="p-1">Chỉ tiêu</td>
            <td className="p-1">Hàm đơn</td>
            <td className="p-1">Hàm mũ</td>
          </tr>
        </thead>

        <tbody className="">
          {data?.map((item, index) => {
            return (
              <tr className="text-center font-semibold" key={index}>
                <td className="  ">{item.name}</td>
                {item.name !== "SAR" ? (
                  <>
                    <td className={`${getColorBaseOnName(item.single)}  `}>
                      {item.single}
                    </td>
                    <td className={`${getColorBaseOnName(item.hat)}     `}>
                      {item.hat}
                    </td>
                  </>
                ) : (
                  <td
                    colSpan={2}
                    className={`${getColorBaseOnName(item.single)}  `}
                  >
                    {item.single}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
