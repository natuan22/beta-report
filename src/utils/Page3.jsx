import React from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
const Page3 = () => {
    return (
        <div className="h-[1480px] w-[800px] ">
            <div className="header">
                <Header date={"21/11/2023"} type={2} />
            </div>

            <div className="content-top">
                <div className="title text-center">
                    <h2
                        className="m-0 text-[30px] text-[#064BAD] "
                        style={{ textShadow: "-2px 3px 3px #E88C08 " }}
                    >
                        NHẬN ĐỊNH THỊ TRƯỜNG
                    </h2>
                    <h2
                        className="m-0 text-[30px] text-[#064BAD] "
                        style={{ textShadow: "-2px 3px 3px #E88C08 " }}
                    >
                        ĐẦU PHIÊN
                    </h2>
                </div>
                <div className="text bg-[#E5EFFF] h-[350px] rounded-3xl border-dashed border-[2px] border-[#064BAD] p-5 ">
                    <span className="text-justify text-base">
                        Theo quan điểm kỹ thuật, chỉ số VN-Index đang trong quá trình hồi
                        phục, mặc dù vẫn đang nằm trong kênh xu hướng giảm ngắn hạn nhưng đã
                        xuất hiện các tín hiệu kỹ thuật tích cực hơn, mở ra khả năng đảo
                        chiều xu hướng ngắn hạn khi chỉ số VN-Index duy trì nằm trên đường
                        MA10, chỉ báo MACD và SAR đã cho tín hiệu tích cực về xu hướng ngắn
                        hạn. Hiện tại, chỉ số VN-Index đang có vùng hỗ trợ trung hạn tại
                        1.000 – 1.020 điểm, trong khi đường MA10 sẽ đóng vai trò hỗ ngắn
                        hạn, bên cạnh đó, vùng 1.095 - 1.115 điểm sẽ đóng vai trò kháng cự
                        khi thị trường tiếp tục hồi phục. Để xu hướng tăng được xác lập, chỉ
                        số VN-Index cần phải vượt qua vùng 1.095 - 1.115 điểm (tương ứng với
                        vùng được bao bởi MA20 và MA200), điều này cũng sẽ giúp cho xu hướng
                        dài hạn của thị trường trở lại trạng thái tích cực về mặt kỹ thuật,
                        khi đó kỳ vọng thị trường sẽ thu hút dòng tiền cải thiện tốt hơn.
                    </span>
                </div>
            </div>
            <div className="content-bot"></div>

            <div className="mt-10">
                <Footer pageNum={3} />
            </div>
        </div>
    );
};

export default Page3;
