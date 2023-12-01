import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { https } from "../services/configService";
import { homNay } from "../helper/getDate";
import DialogNews from "../component/DialogNews";





const Page1 = () => {
    const [newsForeign, setNewsForeign] = useState(JSON.parse(localStorage.getItem(`selectedNews-quoc-te`)) || []);
    const [newsDomestic, setNewsDomestic] = useState(JSON.parse(localStorage.getItem(`selectedNews-trong-nuoc`)) || []);
    const [newsEnterprise, setNewsEnterprise] = useState();
    const [events, setEvents] = useState();
    console.log({ newsForeign })
    useEffect(() => {

        const fetchDataEnterprise = async () => {
            try {
                const response = await https.get("api/v1/report/tin-doanh-nghiep");

                setNewsEnterprise(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchDataEvent = async () => {
            try {
                const response = await https.get("api/v1/report/lich-su-kien");
                setEvents(response.data.data);
            } catch (err) { }
        };

        fetchDataEnterprise();
        fetchDataEvent();
    }, []);



    const handleCatchDataNews = (arrNews, type) => {
        if (type === 'trong-nuoc') {
            setNewsDomestic(arrNews)
        } else if (type === 'quoc-te') {
            setNewsForeign(arrNews)
        }
    }


    return (
        <div className="h-[1480px] w-[800px] relative  ">
            <div className="absolute top-[30%] right-0 translate-x-[300px] ">
                <div className="flex flex-col justify-between h-[100px]">
                    <DialogNews handleCatchDataNews={handleCatchDataNews} type={'quốc tế'} query={'quoc-te'} />
                    <DialogNews handleCatchDataNews={handleCatchDataNews} type={'trong nước'} query={'trong-nuoc'} />
                </div>
            </div>
            <div className="header">
                <Header date={homNay} type={1} />
            </div>
            <div className="content-top w-[790px] h-[430px] z-10 relative mt-5  ">
                <div
                    className={` flex justify-between w-full h-[80%] bg-worldBackground bg-no-repeat bg-cover bg-center `}
                >
                    <div className="content-top_left w-[45%] translate-x-[15px] ">
                        <h2 className="titile font-[800] text-[20px] text-[#0155B7] text-center border-1 border-x-0  border-solid border-collapse border-[#116DDF] py-1 ">
                            QUỐC TẾ
                        </h2>
                        {newsForeign.length > 0 ?
                            <div className="newsForeign ">
                                <ul>
                                    {newsForeign?.map((item) => (
                                        <li className="text-[14px] font-semibold mt-3 ">
                                            <span className="line-clamp-2">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            : <p className="text-center mt-10 font-semibold">Vui lòng chọn tin tức....</p>}

                    </div>
                    <div className="content-top_right w-[48%] bg-vnBackground bg-no-repeat bg-[length:220px_260px] bg-right-bottom  mr-5 ">
                        <h2 className="titile font-[800] text-[20px] text-[#0155B7]  text-center border-1 border-x-0 border-solid border-collapse border-[#116DDF] py-1">
                            TRONG NƯỚC
                        </h2>
                        {newsDomestic.length > 0 ?
                            <div className="newsDomestic ">
                                <ul>
                                    {newsDomestic?.map((item) => (
                                        <li className="text-[14px] font-semibold mt-3">
                                            <span className="line-clamp-2">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            : <p className="text-center mt-10 font-semibold">Vui lòng chọn tin tức....</p>}

                    </div>
                </div>
            </div>

            <div className="content-bot w-[790px] h-[461px] z-10 relative  flex justify-between  bg-cityBackground bg-no-repeat bg-cover ">
                <div>

                </div>
                <div className="content-bot_left h-full w-[45%] translate-y-[-60px]  ">
                    <h2 className="titile font-[800] text-[20px] text-[#0155B7] text-center border-1 border-x-0  border-solid border-collapse border-[#116DDF] py-1">
                        DOANH NGHIỆP
                    </h2>
                    <div className="newsEnterpise">
                        <ul>
                            {
                                newsEnterprise?.map(item => (
                                    <li className="mb-1 ">
                                        <span className="text-[12px] text-[#064BAD] font-bold">{item.ticker}:</span> <span className="text-[12px] font-semibold  ">{item.title}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="content-bot_left h-full w-[48%] ml-3 translate-y-[-60px] translate-x-[-15px]">
                    <h2 className="titile font-[800] text-[20px] text-[#0155B7] text-center border-1 border-x-0  border-solid border-collapse border-[#116DDF] py-1" >
                        LỊCH SỰ KIỆN
                    </h2>
                    <div className="events">
                        <table className=" bg-transparent border-collapse w-full  ">
                            <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse" >
                                <tr  >
                                    <th className="text-white font-semibold text-[12px] leading-8 text-start pl-2 w-[82px] ">Mã cổ phiếu</th>
                                    <th className="text-white font-semibold text-[12px] leading-8 text-center">Nội dung</th>
                                </tr>
                            </thead>
                            <tbody className="border-1 border-[#0155B7] border-solid border-collapse " >
                                {events?.map(item => (
                                    <tr>
                                        <td className="text-[12px] font-bold text-center py-1  px-2">{item.ticker}</td>
                                        <td className="text-[12px] font-semibold  px-2">{item.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <Footer pageNum={1} />
            </div>
        </div>
    );
};

export default Page1;
