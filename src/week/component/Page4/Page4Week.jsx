import React, { useEffect, useState } from 'react'
import HeaderWeek from '../../utils/HeaderWeek'
import FooterAfternoon from '../../../report/utils/component/FooterAfternoon'
import { getColorBaseOnValue } from '../../../helper/getColorBaseOnValue'
import formatNumber from '../../../helper/formatNumber'
import { https } from '../../../services/configService'

const Page4Week = () => {
    const [rate, setRate] = useState()

    const getData = async () => {
        try {
            const res = await https.get('/api/v1/report/thi-truong-chung-khoan?type=1')
            setRate(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header'>
                <HeaderWeek />
            </div>

            <div className='content h-[980px] w-full flex flex-col items-center relative'>
                <div className='mt-[20px]'>
                    <div className='content-top w-[760px]'>
                        <div className='content-top_left table w-[420px] h-[360px]'>
                            <table className='bg-transparent border-collapse h-[325px] mt-2  w-full  '>
                                <thead className='bg-[#0155B7]  text-[12px]  border border-[#0155B7] border-solid border-collapse'>
                                    <tr className='text-white '>
                                        <th className='font-semibold px-1 py-1 text-[px] '>Chỉ số</th>
                                        <th className='font-semibold px-1 py-1 text-[px] '>Điểm số</th>
                                        <th className='font-semibold px-1 py-1 text-[px] '>%W</th>
                                        <th className='font-semibold px-1 py-1 text-[px] '>%1M</th>
                                        <th className='font-semibold px-1 py-1  text-[px]'>%YtD</th>
                                        <th className='font-semibold px-1 py-1  text-[px]'>%YoY</th>
                                    </tr>
                                </thead>
                                <tbody className="border border-[#0155B7] border-solid border-collapse ">
                                    {rate?.map(item => {
                                        return (
                                            <tr>
                                                <td className='text-center  font-bold flex items-center text-[12px] '>
                                                    {item.name}
                                                </td>
                                                <td className='text-center  text-[12px] px-1'>{formatNumber(item.price)}</td>
                                                <td className={`${getColorBaseOnValue(item.week)} text-[12px] text-center px-1 `}>{formatNumber(item.week)}</td>
                                                <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1 `}>{formatNumber(item.month)}</td>
                                                <td className={`${getColorBaseOnValue(item.ytd)} text-[12px] text-center px-1 `}>{formatNumber(item.ytd)}</td>
                                                <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center px-1 `}>{formatNumber(item.year)}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className='content-top_right chart  w-[340px]'>

                        </div>
                    </div>


                    <div className='content-bot [760px]'>
                        <div></div>
                        <div></div>
                    </div>

                </div>


            </div>


            <div className='footer'>
                <FooterAfternoon pageNum={3} />

            </div>
        </div>
    )
}

export default Page4Week