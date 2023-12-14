import React, { useEffect, useState } from "react";
import HeaderMarket from "../component/HeaderMarket";
import { homNay } from "../helper/getDate";
import Footer from "../component/Footer";
import { https } from "../services/configService";
import SplineChart from "../component/SplineChart";
import formatNumber from "../helper/formatNumber";
const Page5 = () => {
    const [data, setData] = useState();
    const [dataHose, setDataHose] = useState();
    const [dataContribute, setDataContribute] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await https.get("api/v1/report/ket-phien-sang");
                setData(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchDataHose = async () => {
            try {
                const response = await https.get("api/v1/report/ket-phien-sang-hose");
                setDataHose(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchDataTopContribute = async () => {
            try {
                const response = await https.get("api/v1/report/top-dong-gop-diem-so");
                setDataContribute(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDataHose();
        fetchData();
        fetchDataTopContribute();
    }, []);


    return (
        <div className="h-[1480px] w-[800px] relative  ">
            <div className="header">
                <HeaderMarket date={homNay} />
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="content-top w-[780px] flex justify-around">
                    <div className="content-top_left w-[65%]">
                        <h2 className="text-center text-[#E88C08] m-1">
                            DIỄN BIẾN KẾT PHIÊN SÁNG
                        </h2>
                        {data?.length > 0 ? (
                            <div className="card-body grid grid-cols-2 gap-5 ">
                                <div className="card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl">
                                    <SplineChart data={data[0]} />
                                </div>
                                <div className="card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl">
                                    <SplineChart data={data[1]} />
                                </div>
                                <div className="card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl">
                                    <SplineChart data={data[3]} />
                                </div>
                                <div className="card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl">
                                    <SplineChart data={data[2]} />
                                </div>
                            </div>
                        ) : (
                            <div>Loading....</div>
                        )}
                    </div>
                    {dataHose ? (
                        <div className="content-top_right w-[30%]  z-10 ">
                            <h2 className="text-center m-1 text-[#E88C08]">TẠI HOSE</h2>
                            <div className="marketWidth">
                                <p className="text-[20px] font-semibold m-0">ĐỘ RỘNG</p>
                                <p className="text-end m-0 text-[17px]">mã</p>
                                <div className="numOfStock flex items-center justify-evenly">
                                    <div className="increase bg-[#22C55E] w-[30%] text-center font-semibold text-[20px] border border-solid border-collapse border-[#fffff]">
                                        {dataHose?.advance}
                                    </div>
                                    <div className="noChange bg-[#F3D11A] w-[30%] text-center font-semibold text-[20px] border border-solid border-collapse border-[#fffff]">
                                        {dataHose?.noChange}
                                    </div>
                                    <div className="decrease bg-[#FF0000] w-[30%] text-center font-semibold text-[20px] border border-solid border-collapse border-[#fffff]">
                                        {dataHose?.decline}
                                    </div>
                                </div>
                            </div>
                            <div className="netForeign h-[80%] flex flex-col justify-evenly">
                                <p className="text-[20px] font-semibold m-1">KHỐI NGOẠI</p>

                                {dataHose.netVal > 0 ? (
                                    <p className="my-0 indent-[15px] font-semibold">
                                        Mua ròng:
                                        <span className="text-green-500 text-[20px] font-semibold mx-2  ">
                                            {(dataHose.netVal / 1000000000).toFixed(2)}
                                        </span>
                                        tỷ đồng
                                    </p>
                                ) : (
                                    <p className="my-0 indent-[15px] font-semibold">
                                        Bán ròng:
                                        <span className="text-red-500 text-[20px] font-semibold mx-2  ">
                                            {(dataHose.netVal / 1000000000).toFixed(2)}
                                        </span>
                                        tỷ đồng
                                    </p>
                                )}
                                <div className="flex flex-col justify-between h-[385px]">
                                    <p className="my-1 font-semibold">Trong đó:</p>
                                    <div className="buy border-1 border-dashed border-collapse border-[#22C55E] h-[140px]">
                                        <div className="text-center">
                                            <span className="text-green-500 font-bold">MUA</span>
                                            <span className="ml-2">ròng mạnh (tỷ đồng)</span>
                                        </div>
                                        <div className="flex flex-wrap p-2  ">
                                            {dataHose.buy.map((item) => {
                                                return (<div className=" w-[100%] flex justify-evenly">
                                                    <span className=" w-[40%] font-semibold m-0 text-center">
                                                        {item.code}
                                                    </span>
                                                    <span className="w-[40%] m-0">
                                                        : {(formatNumber(item.netVal / 1000000000))}
                                                    </span>
                                                </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="sell border-1 border-dashed border-collapse border-[#FF0000] mt-5 h-[140px]">
                                        <div className="text-center">
                                            <span className="text-red-500 font-bold">BÁN </span>
                                            <span className="ml-2">ròng mạnh (tỷ đồng)</span>
                                        </div>

                                        <div className="flex  flex-wrap p-2 ">
                                            {dataHose.sell.map((item) => {
                                                return (
                                                    <div className=" w-[100%] flex justify-evenly  ">
                                                        <p className="w-[40%] font-semibold m-0 text-center">
                                                            {item.code}
                                                        </p>
                                                        <p className=" w-[40%] m-0">
                                                            :  {formatNumber(item.netVal / 1000000000)}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading.....</div>
                    )}
                </div>
            </div >

            <div className="content-mid mt-4 h-[120px] flex flex-col justify-center items-center">
                <div className=" w-[95%] flex flex-col justify-between h-full ">
                    <p className="text-[22px] font-semibold border-1 border-dashed border-collapse border-[#064BAD] px-4 py-1 rounded-2xl w-fit m-0 ">
                        TOP ĐÓNG GÓP ĐIỂM SỐ CHO VN-INDEX
                    </p>
                    {dataContribute ? (
                        <div className="text-justify indent-[15px]">
                            <span className="indent-4">Dẫn đầu nhóm cổ phiếu đóng góp </span>
                            {dataContribute.change > 0 ? (
                                <>
                                    <span>tăng là:</span>
                                    {dataContribute.stock_advance.map((item, index) => {
                                        const isLastItem =
                                            index === dataContribute.stock_advance.length - 1;
                                        return (
                                            <span className="text-green-500 ml-1 font-semibold">
                                                {item.code} (+{formatNumber(item.point)} điểm){isLastItem ? "." : ","}
                                            </span>
                                        );
                                    })}
                                </>
                            ) : (
                                <span>
                                    <span>giảm là:</span>
                                    {dataContribute.stock_decline.map((item, index) => {
                                        const isLastItem =
                                            index === dataContribute.stock_decline.length - 1;
                                        return (
                                            <span className="text-red-500 ml-1 font-semibold">
                                                {item.code} ({formatNumber(item.point)} điểm)
                                                {isLastItem ? "." : ","}
                                            </span>
                                        );
                                    })}
                                </span>
                            )}
                            <span>
                                {" "}
                                Ở chiều ngược lại, các mã đóng góp{" "}
                                {dataContribute.change > 0 ? "giảm" : "tăng"} nổi bật là:{" "}
                            </span>
                            {dataContribute.change > 0 ? (
                                <>
                                    {dataContribute.stock_decline.map((item, index) => {
                                        const isLastItem =
                                            index === dataContribute.stock_decline.length - 1;

                                        return (
                                            <span className="text-red-500 ml-1 font-semibold">
                                                {item.code} {""}({formatNumber(item.point)} điểm)
                                                {isLastItem ? "." : ","}
                                            </span>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {dataContribute.stock_advance.map((item, index) => {
                                        const isLastItem =
                                            index === dataContribute.stock_advance.length - 1;

                                        return (
                                            <span className="text-green-500 ml-1 font-semibold">
                                                {item.code} {""}
                                                (+{item.point.toFixed(2)} điểm)
                                                {isLastItem ? "." : ","}
                                            </span>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    ) : (
                        <div>Loading....</div>
                    )}
                </div>
            </div>

            <div className="content-bot grid place-items-center h-[195px] relative ">
                {dataContribute ? (
                    <div className="bg-[#FCB040] w-[95%] h-[130px]  bg-opacity-70  rounded-2xl indent-5 leading-7 text-justify p-2">
                        <p>
                            VN-INDEX chốt phiên sáng nay{" "}
                            {dataContribute.change > 0 ? "tăng" : "giảm"}{" "}
                            <span className={`font-semibold ${dataContribute.change > 0 ? "text-green-500" : "text-red-500"}`}>{formatNumber(dataContribute.change)}</span>{" "}
                            điểm (<span className={`font-semibold ${dataContribute.perChange > 0 ? "text-green-500" : "text-red-500"}`}>{formatNumber(dataContribute.perChange)}%</span>) trong đó ghi nhận
                            tổng giá trị giao dịch đạt{" "}
                            <span className="font-semibold">
                                {(formatNumber(dataContribute.totalVal / 10000000000))}
                            </span>{" "}
                            tỷ đồng, {dataContribute.perChangeVal > 0 ? "tăng" : "giảm"}{" "}
                            <span className={`font-semibold ${dataContribute.perChangeVal > 0 ? "text-green-500" : "text-red-500"}`}>
                                {formatNumber(dataContribute.perChangeVal)}%
                            </span>{" "}
                            so với phiên giao dịch sáng trước. Độ rộng thị trường nghiêng về
                            sắc{" "}
                            {dataContribute.advance > dataContribute.decline ? (
                                <span className="text-green-500 font-semibold">xanh </span>
                            ) : (
                                <span className="text-red-500 font-semibold">đỏ </span>
                            )}
                            với
                            {dataContribute.advance > dataContribute.decline ? (
                                <span>
                                    {" "}
                                    {dataContribute.advance} cổ phiếu{" "}
                                    <span className="font-semibold text-green-500">tăng</span> so
                                    với{" "} {dataContribute.decline} mã cổ phiếu <span className="font-semibold text-red-500">giảm</span>
                                </span>
                            ) : (
                                <span>
                                    {" "}
                                    {dataContribute.decline} cổ phiếu{" "}
                                    <span className="font-semibold text-red-500">giảm</span> so
                                    với{" "} {dataContribute.advance} mã cổ phiếu <span className="font-semibold text-green-500">tăng.</span>
                                </span>
                            )}
                        </p>
                    </div>
                ) : (
                    <div>Loading....</div>
                )}

                <div className="absolute top-[10px] right-[20px] bg-white border-1 border-solid border-collapse border-[#E88C08] w-[220px] h-[40px] rounded-full grid place-items-center ">
                    <p className="m-0 text-center font-semibold  ">TỔNG HỢP DIỄN BIẾN</p>
                </div>
            </div>
            <div className="mt-1">
                <Footer pageNum={5} />
            </div>
        </div >
    );
};

export default Page5;
