import React from "react";
import logo from "../../../app/asset/img/logoAfternoon.png";
import { homNay } from "../../../helper/getDate";
const HeaderAnalysis = ({ type }) => {
  return (
    <div className="h-[100px] w-[800px] bg-gradient-to-b from-[#143A65] to-[#0054B4] relative">
      <div className="absolute top-[103px] left-0 translate-x-[10px] w-[780px] h-[4px] bg-[#F89637]"></div>
      <div className="flex justify-evenly  h-full">
        <div className="w-[25%]">
          <img src={logo} alt="" width={155} height={80} />
        </div>
        {type === 1 ? (
          <div className="w-[75%] flex flex-col  justify-center">
            <p className="m-0 text-[40px] translate-x-[-35px] text-white font-bold">
              Báo cáo Phân tích kỹ thuật{" "}
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {type === 2 ? (
          <div className="w-[75%] flex flex-col text-center justify-center -translate-x-10">
            <p className="m-0 text-[25px] text-white font-bold">
              Báo cáo Phân tích kỹ thuật{" "}
            </p>
            <p className="m-0 text-white text-[12.5px]">
              Báo cáo này cung cấp các thông tin chung về Phân tích kỹ thuật
              cùng một số thông tin sơ lược về cơ bản cho cổ phiếu được yêu cầu.
              Báo cáo được tạo tự động bởi hệ thống sản phẩm B-Sign sở hữu bởi
              <br></br>Công ty Cổ phần Chứng khoán BETA{" "}
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {type === 3 ? (
          <div className="w-[75%] flex flex-col text-center justify-center -translate-x-10">
            <p className="m-0 text-[25px] text-white font-bold">
              Các sản phẩm công nghệ từ BETA{" "}
            </p>
            <p className="m-0 text-white text-[12.5px]">
              Báo cáo này cung cấp các thông tin chung về Phân tích kỹ thuật
              cùng một số thông tin sơ lược về cơ bản cho cổ phiếu được yêu cầu.
              Báo cáo được tạo tự động bởi hệ thống sản phẩm B-Sign sở hữu bởi
              <br></br>Công ty Cổ phần Chứng khoán BETA{" "}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {type === 1 ? (
        <div className="absolute bottom-[10px] right-[35px]">
          <p className="m-0 text-white font-semibold text-[12px]">
            <i>Ngày: {homNay}</i>
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HeaderAnalysis;
