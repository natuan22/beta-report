import React from "react";
import img from '../../../app/asset/img/page1.png'
import getTimeWeek from "../../../helper/getTimeWeek";

const Page1Week = () => {
    const date = getTimeWeek()
    const dateParts = date.split(' - ');
    return (
        <div className="h-[1480px] w-[800px] relative  ">
            <img src={img} alt="img" width={800} height={1125} />
            <div className="absolute top-0 left-0 translate-x-[430px] translate-y-[420px]  ">
                <p className="text-[#f89637] font-bold text-[35px] my-1 tracking-wider font-mono text-center ">
                    {dateParts[0]}-
                </p>
                <p className="text-[#f89637] font-bold text-[35px] my-2 tracking-wider font-mono">
                    {dateParts[1]}
                </p>
            </div>
        </div>
    );
};

export default Page1Week;
