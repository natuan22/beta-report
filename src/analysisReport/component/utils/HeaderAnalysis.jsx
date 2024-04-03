import React from "react";
import logo from "../../../app/asset/img/logoAfternoon.png";
import { homNay } from "../../../helper/getDate";

const HeaderAnalysis = () => {
  return (
    <div className="h-[100px] w-[800px] bg-gradient-to-b from-[#143A65] to-[#0054B4] relative">
      <div className="absolute top-[103px] left-0 translate-x-[10px] w-[780px] h-[4px] bg-[#F89637]"></div>
      <div className="flex justify-evenly  h-full">
        <div className="w-[25%]">
          <img src={logo} alt="" width={155} height={80} />
        </div>
        <div className="w-[75%] flex flex-col  justify-center">
          <p className="m-0 text-[40px] translate-x-[-35px] text-white font-bold">
            Báo cáo Phân tích kỹ thuật{" "}
          </p>
        </div>
      </div>
      <div className="absolute bottom-[10px] right-[35px]">
        <p className="m-0 text-white font-semibold text-[12px]">
          <i>Ngày: {homNay}</i>
        </p>
      </div>
    </div>
  );
};

export default HeaderAnalysis;
