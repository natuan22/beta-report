import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import { https } from "../../services/configService";
import formatNumber from "../../helper/formatNumber";
import testBanner from "../../app/asset/img/testBanner.png";
import DialogAddImgAndText from "../utils/component/DialogAddImgAndText";
const AfternoonPage2 = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await https.get("api/v1/report/ban-tin-chieu-2");
                setData(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    return (
        <div className="h-[1480px] w-[800px] relative">
            <div className="absolute top-0 right-0 z-10 translate-x-[300px] translate-y-[200px]">
                <DialogAddImgAndText />
            </div>
            <div className="header">
                <HeaderAfternoon />
            </div>
            {data ? (
                <div className="content h-[980px] w-full flex flex-col items-center">
                    <div className="w-[95%]">
                        <div className="content-top my-[10px]">
                            <table className="bg-transparent border-collapse w-[100%]">
                                <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
                                    <tr className="text-white ">
                                        <th className="font-semibold px-2 py-1 text-left w-[120px] ">
                                            Chỉ số
                                        </th>
                                        <th className="font-semibold px-1 py-1 ">Điểm số</th>
                                        <th className="font-semibold px-1 py-1 ">%D</th>
                                        <th className="font-semibold px-1 py-1 ">%1M</th>
                                        <th className="font-semibold px-1 py-1 ">%YtD</th>
                                        <th className="font-semibold px-1 py-1 ">%YoY</th>
                                        <th className="font-semibold px-1 py-1 ">GTGD (tỷ VNĐ)</th>
                                    </tr>
                                </thead>
                                <tbody className="border-1 ">
                                    {data.table?.map((item) => (
                                        <tr className="border-[#0155B7] border-solid border-[0.5px] border-l-0 border-r-0 border-collapse font-semibold ">
                                            <td className="text-left pl-2 py-1 font-bold">
                                                {item.name}
                                            </td>
                                            <td className="text-center px-2 py-1">
                                                {formatNumber(item.price)}
                                            </td>
                                            <td className={` text-center px-1 py-1`}>
                                                {formatNumber(item.day)}
                                            </td>
                                            <td className={` text-center px-1 py-1`}>
                                                {formatNumber(item.month)}
                                            </td>
                                            <td className={` text-center px-1 py-1`}>
                                                {formatNumber(item.year)}
                                            </td>
                                            <td className={` text-center px-1 py-1`}>
                                                {formatNumber(item.year)}
                                            </td>
                                            <td className={` text-center px-1 py-1`}>
                                                {formatNumber(item.totalVal / 1000000000)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="content-bot w-full flex flex-col items-center justify-center">
                            <div className="content-bot_text1">
                                <p className="my-1 text-[#00429B] underline underline-offset-1 font-bold">Nhận định thị trường:</p>
                                <p className="my-2 indent-[20px] text-justify leading-[20px] ">
                                    Trong phiên giao dịch ngày 07/09/2023, áp lực chốt lời tại
                                    vùng đỉnh cũ cùng với áp lực bán ròng của khối nhà đầu tư nước
                                    ngoài với giá trị gần 900 tỷ đồng tập trung chủ yếu nhóm cổ
                                    phiếu lớn đã khiến chỉ số VN-Index đứt mạch tăng liên tiếp,
                                    đóng cửa tại mốc 1.243,14 điểm, giảm nhẹ 2,36 điểm (-0,19%),
                                    thanh khoản khớp lệnh tăng 2,99% so với phiên giao dịch hôm
                                    qua và trên mức bình quân 20 phiên giao dịch. Theo quan điểm
                                    kỹ thuật, chỉ số VN-Index nằm trên các đường MA10, MA20 và chỉ
                                    báo SAR hàm ý xu hướng tăng ngắn hạn vẫn đang được duy trì.
                                    Các chỉ báo kỹ thuật như MACD và (DI+, DI-) vẫn đang cho tín
                                    hiệu tích cực củng cố cho xu hướng tăng hiện tại. Đường MA20
                                    (1.214,25 điểm) sẽ đóng vai trò hỗ trợ gần nhất cho VN-Index.
                                    Trong khi đó, chỉ số VN-Index vẫn đang trong vùng kháng cự
                                    mạnh 1.240 – 1.250 điểm tương ứng với vùng đỉnh cũ.
                                </p>
                            </div>
                            <div className="content-bot_img my-2">
                                <img src={testBanner} alt="" />
                            </div>
                            <div className=" my-2 content-bot_text2  indent-[20px] text-justify leading-[20px]">
                                Áp lực chốt lời sẽ vẫn duy trì ở mức cao khi chỉ số VN-Index
                                đang ở trong vùng đỉnh cũ. Do đó, đối với nhà đầu tư có tỷ trọng
                                cổ phiếu cao nên cân nhắc cẩn trọng khi tiếp tục gia tăng vị thế
                                mua mới cổ phiếu, đặc biệt là sử dụng đòn bẩy. Tuy nhiên, nếu
                                vượt qua vùng kháng cự mạnh 1.240 – 1.250 điểm kèm theo thanh
                                khoản tốt, VN-Index sẽ hướng đến vùng kháng cự cao hơn tại 1.280
                                – 1.300 điểm. Trong khi đó, nhà đầu tư có tỷ trọng cổ phiếu thấp
                                có thể tận dụng những nhịp rung lắc, điều chỉnh để mua tích lũy
                                dần cổ phiếu của những doanh nghiệp có nền tảng cơ bản tốt và có
                                triển vọng tăng trưởng những quý cuối năm khi các chỉ số vĩ mô
                                đang dần cải thiện cùng với mặt bằng lãi suất thấp hơn trong
                                thời gian tới.
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}

            <div className="footer mt-[5px]">
                <FooterAfternoon pageNum={2} />
            </div>
        </div>
    );
};

export default AfternoonPage2;
