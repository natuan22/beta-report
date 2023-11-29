import React, { useEffect, useState } from 'react'
import HeaderMarket from '../component/HeaderMarket'
import { homNay } from '../helper/getDate'
import Footer from '../component/Footer'
import { https } from '../services/configService'
import SplineChart from '../component/SplineChart'

const Page5 = () => {
    const [data, setData] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await https.get('api/v1/report/ket-phien-sang')
                setData(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    console.log({ data })
    return (
        <div className="h-[1480px] w-[800px] relative  ">
            <div className="header">
                <HeaderMarket date={homNay} />
            </div>
            <div className='w-full flex flex-col items-center'>
                <div className='content-top w-[780px] flex'>
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
                    <div className='content-top_right w-[35%] bg-red-300 z-10 '>

                    </div>
                </div>
            </div>


            <div className='content-mid'></div>

            <div className='content-bot'></div>
            <div>
                <Footer pageNum={5} />
            </div>
        </div>
    )
}

export default Page5