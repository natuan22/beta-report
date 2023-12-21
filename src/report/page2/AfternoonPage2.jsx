import React from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import DialogAddImg from "../utils/component/DialogAddImg";

const AfternoonPage2 = () => {
    return (
        <div className="h-[1480px] w-[800px] relative">
            <div>
                <DialogAddImg />
            </div>
            <div className="header">
                <HeaderAfternoon />
            </div>

            <div className="content h-[1000px]">
                <div className="content-top">

                </div>
                <div className="content-bot">
                    <div className="content-bot_text1"></div>
                    <div className="content-bot_img"></div>
                    <div className="content-bot_text2"></div>
                </div>
            </div>

            <div className="footer">
                <FooterAfternoon pageNum={2} />
            </div>
        </div>
    );
};

export default AfternoonPage2;
