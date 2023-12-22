import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import { https } from "../../services/configService";
import formatNumber from "../../helper/formatNumber";
import DialogAddImgAndText from "../utils/component/DialogAddImgAndText";
const imgURL = process.env.REACT_APP_IMG_URL
const AfternoonPage2 = () => {
    const [data, setData] = useState();
    const [imgSrc, setImgSrc] = useState();
    const getData = async () => {
        try {
            const response = await https.get("api/v1/report/ban-tin-chieu-2");
            setData(response.data.data);
            setImgSrc(`${imgURL}${response.data.data.image}`)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    const onSubmitSuccess = () => {
        getData();
    };
    const getImgFromInput = (src) => {
        setImgSrc(src)
    }
    return (
        <div className="h-[1480px] w-[800px] relative">
            <div className="absolute top-0 right-0 z-10 translate-x-[300px] translate-y-[200px]">
                <DialogAddImgAndText getImgFromInput={getImgFromInput} onSubmitSuccess={onSubmitSuccess} />
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
                            <div className="content-bot_text1 min-h-[239px]">
                                <p className="my-1 text-[#00429B] underline text- underline-offset-1 font-bold">Nhận định thị trường:</p>
                                <p className="my-2 indent-[20px] text-justify leading-[22px] ">
                                    {data?.text[[0]]}
                                </p>
                            </div>
                            <div className="content-bot_img my-2">
                                <img src={imgSrc} width={675} height={367} alt="img" />
                            </div>
                            <div className="min-h-[140px]">
                                <p className=" my-2 content-bot_text2  indent-[22px]  text-justify leading-[20px]">
                                    {data?.text[[1]]}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}

            <div className="footer mt-[10px]">
                <FooterAfternoon pageNum={2} />
            </div>
        </div>
    );
};

export default AfternoonPage2;
