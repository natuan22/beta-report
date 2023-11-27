import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import iconDeco from "../app/asset/img/iconDeco.png";
import { https } from "../services/configService";

const Page3 = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await https.get("api/v1/report/nhan-dinh-thi-truong");
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    console.log(data);
    return (
        <div className="h-[1480px] w-[800px] ">
            <div className="header">
                <Header date={"21/11/2023"} type={2} />
            </div>

            <div className="content-top flex flex-col items-center justify-evenly h-[580px] mt-[10px]  ">
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
                <div
                    className="text bg-[#E5EFFF] h-[480px] rounded-3xl border-dashed border-[2px] border-[#064BAD] p-5 w-[760px] relative  "

                >
                    <div className="absolute top-[10px] left-[30px]">
                        <img src={iconDeco} alt="" />
                    </div>
                    <div className="flex flex-col items-center justify-center h-full ">
                        <p className=" text-base leading-6 text-justify indent-[20px] line-clamp-[8] ">
                            {data?.text[0]}
                        </p>
                        <p className=" text-base leading-6 text-justify indent-[20px] line-clamp-[7] ">
                            {data?.text[1]}
                        </p>
                    </div>

                    <div className="absolute bottom-[15px] right-[30px]">
                        <img src={iconDeco} alt="" />
                    </div>
                </div>
            </div>

            <div className="content-bot  flex flex-col items-center  h-[400px]">
                <div className="title text-center">
                    <h2
                        className="m-0 text-[30px] text-[#064BAD] "
                        style={{ textShadow: "-2px 3px 3px #E88C08 " }}
                    >
                        CỔ PHIẾU KHUYẾN NGHỊ CỦA BETA
                    </h2>
                </div>

                <div className={`stockRecommend   w-[800px] ${data?.stock.length > 2 ? 'flex flex-wrap items-center justify-center' : 'flex flex-col justify-center items-center'}`}>
                    {data?.stock.map((item) => {
                        return (
                            <div className="stock-card flex  items-center   w-[47%] my-[5px] border-1 border-collapse border-solid border-[#116DDF] mr-2 rounded-lg  ">
                                <div className="flex flex-col items-center w-[130px] h-auto ">
                                    <img
                                        src={`/logo_${item.code}.png`}
                                        alt="imgStock"
                                        width='55%'
                                        height='55%'
                                        className=""
                                    />
                                </div>
                                <div className="stock-card_content w-[300px]   ">
                                    <p className="m-1">Mã: <span className="font-bold ml-2">{(item.code)}</span> </p>
                                    <p className="m-1">Giá khuyến nghị: <span className="font-bold ml-2">{(item.gia_khuyen_nghi / 1000).toFixed(2)}</span></p>
                                    <p className="m-1">Giá mục tiêu: <span className="font-bold ml-2">{(item.gia_muc_tieu / 1000).toFixed(2)}</span></p>
                                    <p className="m-1">Giá ngưng lỗ: <span className="font-bold ml-2"> {(item.Gia_ngung_lo / 1000).toFixed(2)}</span> </p>
                                    <p className="m-1">Tỷ suất sinh lời kỳ vọng: <span className="font-bold ml-2"> {(item.lai_suat).toFixed(2)} %</span> </p>
                                    <p className="m-1">Thời gian nắm giữ: <span className="font-bold ml-2"> {item.thoi_gian}</span> </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="">
                <Footer pageNum={3} />
            </div>
        </div>
    );
};

export default Page3;
