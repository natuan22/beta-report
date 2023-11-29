import React, { Fragment } from "react";
import logo from "../app/asset/img/logo.png";
import imgHeaderRight from '../app/asset/img/imgHeader.png'
import imgHeaderRight2 from '../app/asset/img/imgHeader2.png'



const Header = ({ date, type }) => {
    return (
        <Fragment>

            {type === 1 ?
                <div className="p-2 flex items-center">
                    <div className="header-left relative ">
                        <div className="header-left_top flex items-center justify-start mb-4">
                            <div className="logo">
                                <img src={logo} alt="logo" width={89} height={34} />
                            </div>
                            <div className="text ml-4 translate-y-[-2px]">
                                <div className="w-[324px]">
                                    <p className="text-[17px] font-bold  text-[#2163C6] m-0 tracking-wider" >Công ty Cổ Phần Chứng Khoán BETA</p>
                                </div>
                                <p className="text-[12px] font-bold text-[#FCA017] m-0 tracking-wide">Ấn bản được phát hành bởi BETA </p>
                            </div>
                        </div>

                        <div className="header-left_bot border-collapse border-orange-400 border-b-4 border-solid border-y-0 border-x-0 ">
                            <div className="flex items-baseline justify-start">
                                <div className="w-[370px]">
                                    <span className="text-[50px] text-[#0055B5] font-bold m-0 italic inline-block ">
                                        BẢN TIN SÁNG
                                    </span>
                                </div>
                                <p className="text-[#0C4587] font-bold text-[15px] ml-5 m-0">
                                    {date}
                                </p>
                            </div>
                        </div>


                        <div className="absolute bottom-0 left-[-30px] h-[2px] bg-[#66a0e9] w-[673px] translate-y-[9px] z-10"></div>
                        <div className="absolute bottom-0 right-0 h-[2px] bg-[#66a0e9] w-[195px] translate-y-[9px] translate-x-[385px] z-10"></div>
                    </div>
                    <div className="header-right">
                        <img src={imgHeaderRight} alt="img" width={211} height={141} className="translate-y-[16px] translate-x-[105px]" />
                    </div>
                </div>
                :
                <div className=" flex items-center  relative">
                    <div className="header-left flex items-center justify-start translate-y-[18px] translate-x-[10px]">
                        <div className="logo">
                            <img src={logo} alt="logo" width={89} height={34} />
                        </div>
                        <div className="text ml-2 translate-y-[-2px]">
                            <div className="w-[324px]">
                                <p className="text-[17px] font-bold  text-[#2163C6] m-0 tracking-wide " >Công ty Cổ Phần Chứng Khoán BETA</p>
                            </div>
                            <p className="text-[12px] font-bold text-[#FCA017] m-0 tracking-wide">Ấn bản được phát hành bởi BETA </p>
                        </div>
                    </div>
                    <div className="header-right">
                        <img src={imgHeaderRight2} alt="img" width={145} height={80} className="translate-x-[230px] translate-y-[2px]" />
                    </div>


                    <div className="absolute w-[850px] bottom-[5px] h-[1px] bg-[#116DDF]"></div>
                    <div className="absolute w-[850px] bottom-0 h-[3px] bg-[#FFB454]"></div>
                </div>
            }
        </Fragment>

    );
};

export default Header;

