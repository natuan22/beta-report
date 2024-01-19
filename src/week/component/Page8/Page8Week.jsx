import React, { useEffect, useState } from 'react'
import HeaderWeek from '../../utils/HeaderWeek'
import FooterWeek from '../../utils/FooterWeek'
import { IoIosStar } from "react-icons/io";
import LineChartGoodsPrice from './component/LineChartGoodsPrice';
import { https } from '../../../services/configService';
const Page8Week = () => {
    const [data, setData] = useState()

    const getData = async () => {
        try {
            const res = await https.get('api/v1/report/bien-dong-gia-ca-hang-hoa')
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header h-[135px]'>
                <HeaderWeek />
            </div>
            <div className='content h-[970px] mt-3 w-full flex flex-col items-center'>
                <div className='relative'>
                    <div className='flex'>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[45deg] translate-x-4 '></div>
                        <div className='h-[12px] w-[700px] bg-[#0155B7]'></div>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[-45deg]  translate-x-[-16px] '></div>
                    </div>

                    <div className='flex'>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[-45deg] translate-x-4'></div>
                        <div className='h-[12px] w-[700px] bg-[#0155B7]'></div>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[45deg] translate-x-[-16px]' ></div>
                    </div>
                    <div className='absolute z-10 top-0 left-0 w-full'>
                        <h2 className='m-0 text-white text-[12px] text-center leading-[24px]  font-semibold'>
                            Biến động giá cả hàng hóa
                        </h2>
                    </div>

                </div>
                {data ?
                    <div className='w-[760px] h-[930px] flex flex-col justify-evenly'>
                        <div className='cont-top flex justify-between w-full '>
                            <div className='w-[370px]'>
                                <div className='flex items-center justify-center w-[250px]'>
                                    <span className='text-[18px] text-[#EF9C21] '>
                                        <IoIosStar />
                                    </span>
                                    <h2 className='my-1 text-[#00429B] text-[14px]  ml-2'>
                                        Giá dầu Brent và giá khí tự nhiên
                                    </h2>
                                </div>
                                <LineChartGoodsPrice name1={'Dầu Brent (USD/Bbl)'} name2={'Khí Gas (USD/MMBtu)'} dataChart={data.data_0} />
                            </div>
                            <div className='w-[370px]'>
                                <div className='flex items-center justify-center w-[250px]'>
                                    <span className='text-[18px] text-[#EF9C21] '>
                                        <IoIosStar />
                                    </span>
                                    <h2 className='my-1 text-[#00429B] text-[14px] ml-2'>
                                        Giá Đồng và giá Vàng
                                    </h2>
                                </div>
                                <LineChartGoodsPrice name1={'Đồng (USD/Lbs)'} name2={'Vàng (USD/t.oz)'} dataChart={data.data_1} />
                            </div>
                        </div>


                        <div className='cont-mid flex justify-between w-full '>
                            <div className='w-[370px]'>
                                <div className='flex items-center justify-center w-[250px]'>
                                    <span className='text-[18px] text-[#EF9C21] '>
                                        <IoIosStar />
                                    </span>
                                    <h2 className='my-1 text-[#00429B] text-[14px]  ml-2'>
                                        Giá Thép HRC và giá Thép
                                    </h2>
                                </div>
                                <LineChartGoodsPrice name2={'Thép HRC (USD/T)'} name1={'Thép (CNY/T)'} dataChart={data.data_2} />
                            </div>
                            <div className='w-[370px]'>
                                <div className='flex items-center justify-center w-[250px]'>
                                    <span className='text-[18px] text-[#EF9C21] '>
                                        <IoIosStar />
                                    </span>
                                    <h2 className='my-1 text-[#00429B] text-[14px] ml-2'>
                                        Giá Cotton và giá Đường
                                    </h2>
                                </div>
                                <LineChartGoodsPrice name1={'Bông (USD/Lbs)'} name2={'Đường (USD/Lbs)'} dataChart={data.data_3} />
                            </div>
                        </div>


                        <div className='cont-bot flex justify-between w-full '>
                            <div className='w-[370px]'>
                                <div className='flex items-center justify-center w-[250px]'>
                                    <span className='text-[18px] text-[#EF9C21] '>
                                        <IoIosStar />
                                    </span>
                                    <h2 className='my-1 text-[#00429B] text-[14px]  ml-2'>
                                        Giá Cao su và giá Ure
                                    </h2>
                                </div>
                                <LineChartGoodsPrice name1={'Cao su (USD Cents/Kg)'} name2={'Ure (USD/T)'} dataChart={data.data_4} />
                            </div>
                            <div className='w-[370px]'>
                                <div className='flex items-center justify-center w-[250px]'>
                                    <span className='text-[18px] text-[#EF9C21] '>
                                        <IoIosStar />
                                    </span>
                                    <h2 className='my-1 text-[#00429B] text-[14px] ml-2'>
                                        Chỉ số DXY và U.S.10Y
                                    </h2>
                                </div>
                                <LineChartGoodsPrice name1={'Dollar Index'} name2={'U.S.10Y'} dataChart={data.data_5} />
                            </div>
                        </div>



                    </div>
                    : <div>Loading...</div>}


            </div>
            <div className='footer '>
                <FooterWeek pageNum={7} />
            </div>
        </div>
    )
}

export default Page8Week