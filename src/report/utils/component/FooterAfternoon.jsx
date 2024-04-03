import React from "react";

const FooterAfternoon = ({ pageNum }) => {
  return (
    <div className="w-[800px] h-[35px] bg-gradient-to-r from-[#143964]  to-[#0055B6] relative flex flex-col justify-center ">
      <div className="flex justify-between items-center  font-semibold text-white px-3">
        <p className="m-0 ">Trang {pageNum}</p>
        <p className="m-0 ">www.bsi.com.vn</p>
      </div>

      <div className="w-full h-[4px] bg-gradient-to-r from-[#FFB454]  to-[#FF8659] absolute top-0  "></div>
    </div>
  );
};

export default FooterAfternoon;
