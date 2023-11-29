import React, { Fragment } from "react";
import logo from "../app/asset/img/logo.png";
import imgHeaderRight from '../app/asset/img/imgHeader.png'

const HeaderMarket = ({ date, type }) => {
    return (
        <Fragment>
            <div className="p-2 flex items-center justify-between">
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
                        <div className="w-[480px]" >
                            <div >
                                <span className="text-[40px] text-[#0055B5] font-bold m-0 italic inline-block ">
                                    DIỄN BIẾN THỊ TRƯỜNG
                                </span>
                            </div>
                            <p className="text-[#0C4587] font-bold text-[20px] ml-5 m-0 text-end">
                                PHIÊN SÁNG {date}
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-[-30px] h-[2px] bg-[#66a0e9] w-[673px] translate-y-[9px] z-10"></div>
                    <div className="absolute bottom-0 right-0 h-[2px] bg-[#66a0e9] w-[203px] translate-y-[9px] translate-x-[385px] z-10"></div>
                </div>
                <div className="header-right translate-x-[4px] translate-y-[23px]">
                    <img src={imgHeaderRight} alt="img" width='100%' height='100%' />
                </div>
            </div>

        </Fragment>

    );
};

export default HeaderMarket;

