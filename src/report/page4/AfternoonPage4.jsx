import React, { useEffect, useState } from 'react'
import HeaderAfternoon from '../utils/component/HeaderAfternoon'
import FooterAfternoon from '../utils/component/FooterAfternoon'
import { https } from '../../services/configService'
import { getColorBaseOnValue } from '../../helper/getColorBaseOnValue'
import formatNumber from '../../helper/formatNumber'
import DialogNews from '../../component/DialogNews'

const AfternoonPage4 = () => {
    const [rate, setRate] = useState()
    const [interestRate, setInterestRate] = useState()
    const [goodsPrice, setGoodsPrice] = useState()
    const [newsForeign, setNewsForeign] = useState(
        []
    );
    const [newsDomestic, setNewsDomestic] = useState(
        []
    );
    const [newsEnterprise, setNewsEnterprise] = useState(
        []
    );
    const [events, setEvents] = useState();
    useEffect(() => {
        const fetchDataEvent = async () => {
            try {
                const response = await https.get("api/v1/report/lich-su-kien");
                setEvents(response.data.data);
            } catch (err) { }
        };

        fetchDataEvent();
    }, []);
    useEffect(() => {
        const fetchDataRate = async () => {
            try {
                const response = await https.get('api/v1/report/ty-gia')
                setRate(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        const fetchDataInterestRate = async () => {
            try {
                const response = await https.get('/api/v1/report/lai-suat')
                setInterestRate(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }



        const fetchDataGoodsPrice = async () => {
            try {
                const response = await https.get('/api/v1/report/hang-hoa')
                setGoodsPrice(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }



        fetchDataRate()
        fetchDataInterestRate()
        fetchDataGoodsPrice()
    }, [])

    const handleCatchDataNews = (arrNews, type) => {
        if (type === "trong-nuoc") {
            setNewsDomestic(arrNews);
        } else if (type === "quoc-te") {
            setNewsForeign(arrNews);
        } else if (type === "doanh-nghiep") {
            setNewsEnterprise(arrNews);
        }
    };
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header'>

                <HeaderAfternoon />
            </div>


            <div className='content h-[900px] w-full flex flex-col items-center '>
                <div className='w-[99%]'>
                    <div className='content w-[760px] '>
                        <div className='content-top flex  justify-around translate-x-[-6px] '>

                            <div className='content-top_left w-[235px]'>
                                <h2 className='text-[13px] font-bold text-[#0155B7] text-center my-1'>Tỷ giá</h2>
                                <table className='bg-transparent border-collapse h-[337px]   '>
                                    <thead className='bg-[#0155B7]  text-[12px]  border-1 border-[#0155B7] border-solid border-collapse'>
                                        <tr className='text-white '>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Ngoại tệ</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Thị giá</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%D</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%1M</th>
                                            <th className='font-semibold px-1 py-1  text-[px]'>%YtD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
                                        {rate?.map(item => {
                                            return (
                                                <tr>
                                                    <td className='text-center px-2 py-1 font-bold flex items-center text-[12px]'>
                                                        <img src={`/${item.code}.png`} alt="icon" width={20} height={20} />
                                                        {item.code}
                                                    </td>
                                                    <td className='text-center px-2 py-1 text-[12px]'>{formatNumber(item.price)}</td>
                                                    <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center px-1 py-1`}>{(item.day).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1 py-1`}>{(item.month).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center px-1 py-1`}>{(item.year).toFixed(2)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className='content-top_mid w-[234px] '>
                                <h2 className='text-[13px] font-bold text-[#0155B7] text-center my-1'>Lãi suất bình quân liên ngân hàng</h2>
                                <table className='bg-transparent border-collapse h-[337px]  '>
                                    <thead className='bg-[#0155B7]  text-[12px]  border-1 border-[#0155B7] border-solid border-collapse'>
                                        <tr className='text-white  '>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >Kỳ hạn</th>
                                            <th className='font-semibold px-1 py-1 text-[10px]  ' >Mức lãi suất</th>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >%D</th>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >%1M</th>
                                            <th className='font-semibold px-1 py-1  text-[10px]' >%YtD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
                                        {interestRate?.map(item => {
                                            return (
                                                <tr>
                                                    <td className='text-center px-2 py-1 font-bold  items-center text-[12px]' >
                                                        {item.code}
                                                    </td>
                                                    <td className='text-center px-2 py-1 text-[12px] '>{formatNumber(item.price)}</td>
                                                    <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center px-1 py-1`}>{(item.day).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1 py-1`}>{(item.month).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center px-1 py-1`}>{(item.year).toFixed(2)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className='content-top_right w-[235px] translate-x-[-7px]'>
                                <h2 className='text-[13px] font-bold text-[#0155B7] text-center m-1'>Giá hàng hóa</h2>
                                <table className='bg-transparent border-collapse   '>
                                    <thead className='bg-[#0155B7]  text-[12px]  border-1 border-[#0155B7] border-solid border-collapse'>
                                        <tr className='text-white '>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Hàng hóa</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Thị giá</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%D</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%1M</th>
                                            <th className='font-semibold px-1 py-1  text-[px]'>%YtD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
                                        {goodsPrice?.map(item => {
                                            return (
                                                <tr>
                                                    <td className='text-center px-2 py-1 font-bold  items-center text-[12px]' >
                                                        {item.name}
                                                    </td>
                                                    <td className='text-center px-2 py-1 text-[12px] '>{formatNumber(item.price)}</td>
                                                    <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center px-1 py-1`}>{(item.day).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1 py-1`}>{(item.month).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center px-1 py-1`}>{(item.year).toFixed(2)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='content-mid relative'>
                            <div className='absolute top-0 right-0 translate-x-[400px] flex flex-col justify-around h-[150px]'>
                                <DialogNews
                                    handleCatchDataNews={handleCatchDataNews}
                                    type={"quốc tế"}
                                    query={"quoc-te"}
                                    idQuery={0}
                                />
                                <DialogNews
                                    handleCatchDataNews={handleCatchDataNews}
                                    type={"trong nước"}
                                    query={"trong-nuoc"}
                                    idQuery={1}
                                />
                                <DialogNews
                                    handleCatchDataNews={handleCatchDataNews}
                                    type={"doanh nghiệp"}
                                    query={"doanh-nghiep"}
                                    idQuery={2}
                                />
                            </div>
                            <div className="content-top w-[790px] h-[250px] z-10 relative mt-1  ">
                                <div
                                    className={` flex justify-between w-full h-[80%]  `}
                                >
                                    <div className="content-top_left w-[45%]  ">
                                        <h2 className="titile font-[800] text-[15px] text-[#0155B7] text-center  py-1 m-0 ">
                                            QUỐC TẾ
                                        </h2>
                                        {newsForeign.length > 0 ? (
                                            <div className="newsForeign ">
                                                <ul className='my-0'>
                                                    {newsForeign?.map((item) => (
                                                        <li className="text-[14px] font-semibold mt-2 ">
                                                            <span className="line-clamp-2">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-center mt-10 font-semibold">
                                                Vui lòng chọn tin tức....
                                            </p>
                                        )}
                                    </div>
                                    <div className="content-top_right w-[50%]   mr-5 ">
                                        <h2 className="titile font-[800] text-[15px] text-[#0155B7]  text-center m-0  py-1">
                                            TRONG NƯỚC
                                        </h2>
                                        {newsDomestic.length > 0 ? (
                                            <div className="newsDomestic ">
                                                <ul className='my-0'>
                                                    {newsDomestic?.map((item) => (
                                                        <li className="text-[14px] font-semibold mt-2">
                                                            <span className="line-clamp-2">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-center mt-10 font-semibold">
                                                Vui lòng chọn tin tức....
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='content-bot flex justify-around'>

                            <div className="content-bot_left  w-[48%] ml-3 ">
                                <h2 className="titile font-[800] text-[15px] text-[#0155B7] text-center m-0  py-1">
                                    LỊCH SỰ KIỆN
                                </h2>
                                <div className="events">
                                    <table className=" bg-transparent border-collapse w-full   ">
                                        <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
                                            <tr>
                                                <th className="text-white font-semibold text-[12px] leading-8 text-start pl-2 w-[80px]  ">
                                                    Mã cổ phiếu
                                                </th>
                                                <th className="text-white font-semibold text-[12px] leading-8 text-center">
                                                    Ngày GDKHQ
                                                </th>
                                                <th className="text-white font-semibold text-[12px] leading-8 text-center ">
                                                    Nội dung
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
                                            {events?.slice(0, 8)?.map((item) => (
                                                <tr>
                                                    <td className="text-[12px] font-bold text-center py-1  px-2">
                                                        {item.ticker}
                                                    </td>
                                                    <td className="text-[12px] font-bold text-center py-1  px-2">
                                                        {item.date}
                                                    </td>
                                                    <td className="text-[12px] font-semibold  px-2">
                                                        {item.title}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="content-bot_left h-full w-[45%]  ">
                                <h2 className="titile font-[800] text-[15px] text-[#0155B7] text-center m-0  py-1">
                                    DOANH NGHIỆP
                                </h2>
                                {newsEnterprise.length > 0 ? (
                                    <div className="newsEnterpise">
                                        <ul>
                                            {newsEnterprise?.map((item) => {
                                                const parts = item.split(":");
                                                let beforeColon = "";
                                                let afterColon = "";
                                                // Kiểm tra xem có đúng một dấu ':' trong chuỗi hay không
                                                if (parts.length === 2) {
                                                    // Phần trước dấu ':' (trim() để loại bỏ khoảng trắng thừa)
                                                    beforeColon = parts[0].trim();

                                                    // Phần sau dấu ':' (trim() để loại bỏ khoảng trắng ở đầu và cuối)
                                                    afterColon = parts[1].trim();

                                                } else {
                                                    console.log("Không tìm thấy dấu : trong chuỗi.");
                                                }
                                                return (
                                                    <li className="mb-1 ">
                                                        <span className="text-[12px] text-[#064BAD] font-bold">
                                                            {beforeColon}:{" "}
                                                        </span>
                                                        <span className="text-[12px] font-semibold  ">
                                                            {afterColon}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-center mt-10 font-semibold">
                                        Vui lòng chọn tin tức....
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>



                </div>


            </div>

            <div className='footer mt-[90px]'>
                <FooterAfternoon pageNum={4} />
            </div>
        </div>
    )
}

export default AfternoonPage4