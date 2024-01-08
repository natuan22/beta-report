import React from "react";
import HeaderWeek from "../../utils/HeaderWeek";
import FooterWeek from "../../utils/FooterWeek";
import logo from "../../../app/asset/img/logoWeek.png";
import img1 from "../../../app/asset/img/week1.png";
import img2 from "../../../app/asset/img/week2.png";
import img3 from "../../../app/asset/img/week3.png";
import img4 from "../../../app/asset/img/week4.png";
import img5 from "../../../app/asset/img/week5.png";
import { FaCircle, FaRegCircle } from "react-icons/fa";

const Page1Week = () => {
    return (
        <div className="h-[1480px] w-[800px]  ">
            <div className="bg-[#0155B7] h-fit">
                <div className="header bg-white flex items-center  translate-y-2 p-2 shadow-2xl">
                    <img
                        src={logo}
                        alt="logo"
                        width={144}
                        height={55}
                        className="translate-x-5"
                    />
                    <div className="title translate-x-[60px]">
                        <p className="my-2 text-[#0054B4]  text-[14px]  font-bold">
                            Công ty cổ phần chứng khoán BETA
                        </p>
                        <p className="my-2  text-[#E88C08] text-[14px] font-semibold  ">
                            Ấn phẩm được phát hành bởi BETA
                        </p>
                    </div>
                </div>

                <div className="h-[970px] w-ful content relative grid place-items-center">
                    <div className="bg-[#0155b7] w-[590px] h-[700px] shadow-2xl shadow-[#1931a9] flex  flex-col justify-start ">
                        <div className="flex flex-col justify-between h-[60%]">
                            <div className="text-center translate-y-[50px] ">
                                <p className="text-[49px] text-white font-bold my-4">
                                    NHỊP ĐẬP
                                </p>
                                <p className="text-[49px] text-white font-bold my-4">
                                    THỊ TRƯỜNG
                                </p>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="text-[49px] text-white font-bold">TUẦN</p>
                                <div className="bg-[#0155b7] shadow-xl shadow-[#1931a9] w-[230px] h-[200px]  text-center ml-[30px] flex flex-col justify-start translate-y-[20px]">
                                    <div className="mt-2">
                                        <p className="text-[#F89637] font-bold text-[31px]  my-2">
                                            18.12-
                                        </p>
                                        <p className="text-[#F89637] font-bold text-[31px] my-2">
                                            22.12.2023
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="img1 absolute   ">
                        <img src={img2} alt="img1" width={300} className="" />

                    </div>
                    <div className="img2 absolute  ">
                        <img src={img1} alt="img2" width='300px' height='300px' className="" />

                    </div>
                    <div className="img3 absolute  ">
                        <img src={img3} alt="img3" width='300px' height='300px' className="" />

                    </div>
                    <div className="img4 absolute  ">
                        <img src={img4} alt="img4" width='300px' height='300px' className="" />
                    </div>
                    <div className="img5 absolute  ">
                        <img src={img5} alt="img5" width='300px' height='300px' className="" />
                    </div>

                    <div className="absolute z-10 top-[190px] left-[0px] flex items-center justify-center">
                        <div className="w-[260px] bg-white h-[3px] "></div>
                        <span className="text-white translate-x-[-2px]">
                            <FaCircle />
                        </span>
                    </div>
                    <div className="absolute z-10 top-[485px] right-0 flex items-center justify-center">
                        <span className="text-white translate-x-[2px]">
                            <FaRegCircle />
                        </span>
                        <div className="w-[260px] bg-white h-[3px] "></div>
                    </div>
                </div>

                <div className="footer ">
                    <FooterWeek />
                </div>
            </div>
        </div>
    );
};

export default Page1Week;
