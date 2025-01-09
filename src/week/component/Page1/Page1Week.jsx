import React from "react";
import img from "../../../app/asset/img/page1.png";
import getTimeWeek from "../../../helper/getTimeWeek";
import "../../utils/styles/text-outline.css"

const Page1Week = () => {
  const date = getTimeWeek();
  const dateParts = date.split(" - ");
  return (
    <div className="h-[1152px] w-[800px] relative  ">
      <img src={img} alt="img" width={800} height={1125} />
      <div className="absolute top-0 left-0 translate-x-[125px] translate-y-[488px]">
        <p
          className="text-[#fff] font-bold text-[62px] leading-[110px] tracking-wide my-1 font-[Poppins] text-outline"
        >
          {dateParts[0]} - {dateParts[1]}
        </p>
      </div>
      <div className="absolute top-0 left-0 translate-x-[128px] translate-y-[490px]">
        <p
          className="text-[#f4ae3f] font-bold text-[62px] leading-[110px] tracking-wide my-1 font-[Poppins]"
          // style={{ textShadow: "3px 3px 10px #00000080" }}
        >
          {dateParts[0]} - {dateParts[1]}
        </p>
        {/* <p
          className="text-[#f4ae3f] font-bold text-[100px] leading-[110px] tracking-wide my-2 font-[Poppins]"
          style={{ textShadow: "3px 3px 10px #00000080" }}
        >
          
        </p> */}
      </div>
    </div>
  );
};

export default Page1Week;
