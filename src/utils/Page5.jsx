import React, { useEffect, useState } from 'react'
import HeaderMarket from '../component/HeaderMarket'
import { homNay } from '../helper/getDate'
import Footer from '../component/Footer'
import { https } from '../services/configService'
import SplineChart from '../component/SplineChart'

const Page5 = () => {
    const [data, setData] = useState()
    const [dataHose, setDataHose] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await https.get('api/v1/report/ket-phien-sang')
                setData(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        const fetchDataHose = async () => {
            try {
                const response = await https.get('api/v1/report/ket-phien-sang-hose')
                setDataHose(response.data.data)
            } catch (err) {
                console.log(err)
            }

        }

        fetchDataHose()
        fetchData()
    }, [])
    console.log(dataHose)

    return (
        <div className="h-[1480px] w-[800px] relative  ">
            <div className="header">
                <HeaderMarket date={homNay} />
            </div>
            <div className='w-full flex flex-col items-center'>
                <div className='content-top w-[780px] flex justify-between'>
                    <div className='content-top_left w-[65%]'>
                        <h2 className='text-center text-[#E88C08] m-1'>DIỄN BIẾN KẾT PHIÊN SÁNG</h2>
                        {data?.length > 0 ?
                            <div className='card-body grid grid-cols-2 gap-5 '>
                                <div className='card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl' >
                                    <SplineChart data={data[3]} />
                                </div>
                                <div className='card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl' >
                                    <SplineChart data={data[0]} />

                                </div>
                                <div className='card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl' >
                                    <SplineChart data={data[2]} />

                                </div>
                                <div className='card-content h-[260px] border-1 border-solid border-collapse border-[#064BAD] rounded-xl' >
                                    <SplineChart data={data[1]} />

                                </div>
                            </div>
                            : <div>Loading....</div>}
                    </div>
                    {dataHose ?
                        <div className='content-top_right w-[30%]  z-10 '>
                            <h2 className='text-center m-1 text-[#E88C08]'>TẠI HOSE</h2>
                            <div className='marketWidth'>
                                <p className='text-[20px] font-semibold'>ĐỘ RỘNG</p>
                                <p className='text-end m-0 text-[17px]'>mã</p>
                                <div className='numOfStock flex items-center justify-evenly'>
                                    <div className='increase bg-[#22C55E] w-[30%] text-center font-semibold text-[20px] border border-solid border-collapse border-[#fffff]' >{dataHose?.advance}</div>
                                    <div className='noChange bg-[#F3D11A] w-[30%] text-center font-semibold text-[20px] border border-solid border-collapse border-[#fffff]' >{dataHose?.noChange}</div>
                                    <div className='decrease bg-[#FF0000] w-[30%] text-center font-semibold text-[20px] border border-solid border-collapse border-[#fffff]' >{dataHose?.decline}</div>
                                </div>
                            </div>
                            <div className='netForeign'>
                                <p className='text-[20px] font-semibold'>KHỐI NGOẠI</p>

                                {dataHose.netVal > 0 ?
                                    <p > Mua ròng:
                                        <span className='text-green-500 text-[20px] font-semibold mx-2'>
                                            {(dataHose.netVal / 1000000000).toFixed(2)}
                                        </span>
                                        tỷ đồng</p>
                                    :
                                    <p > Bán ròng:
                                        <span className='text-red-500 text-[20px] font-semibold mx-2'>
                                            {(dataHose.netVal / 1000000000).toFixed(2)}
                                        </span>
                                        tỷ đồng</p>

                                }
                                <p>Trong đó:</p>
                                <div>
                                    <div className='buy border-1 border-dashed border-collapse border-[#22C55E]'>
                                        <span className='text-green-500 font-bold'>MUA</span> <span>ròng mạnh</span>
                                        <div className='flex flex-wrap '>
                                            {dataHose.buy.map(item => {
                                                return (
                                                    <div className='flex w-[50%] justify-evenly'>
                                                        <span className='text-start'>{item.code}:</span> <span className='ml-2'>{(item.netVal / 1000000000).toFixed(2)}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='sell border-1 border-dashed border-collapse border-[#FF0000] mt-5'>
                                        <span className='text-red-500 font-bold'>BÁN</span> <span>ròng mạnh</span>
                                        <div className='flex flex-wrap '>
                                            {dataHose.sell.map(item => {
                                                return (
                                                    <div className='flex w-[50%] justify-evenly'>
                                                        <span className='text-start'>{item.code}:</span> <span className='ml-2'>{(item.netVal / 1000000000).toFixed(2)}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div>Loading.....</div>}

                </div>
            </div>


            <div className='content-mid'></div>

            <div className='content-bot'></div>
            <div className='mt-10'>
                <Footer pageNum={5} />
            </div>
        </div>
    )
}

export default Page5