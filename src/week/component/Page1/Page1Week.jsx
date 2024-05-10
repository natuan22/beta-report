import React from "react";
import img from "../../../app/asset/img/page1.png";
import getTimeWeek from "../../../helper/getTimeWeek";

const Page1Week = () => {
  const date = getTimeWeek();
  const dateParts = date.split(" - ");
  return (
    <div className="h-[1480px] w-[800px] relative  ">
      <img src={img} alt="img" width={800} height={1125} />
      <div className="absolute top-0 left-0 translate-x-[50px] translate-y-[585px]">
        <p
          className="text-[#0254b8] font-bold text-[100px] leading-[110px] tracking-wide my-1 font-[Poppins]"
          style={{ textShadow: "3px 3px 10px #00000080" }}
        >
          {dateParts[0]} -
        </p>
        <p
          className="text-[#0254b8] font-bold text-[100px] leading-[110px] tracking-wide my-2 font-[Poppins]"
          style={{ textShadow: "3px 3px 10px #00000080" }}
        >
          {dateParts[1]}
        </p>
      </div>
    </div>
  );
};

export default Page1Week;
