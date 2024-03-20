import React from 'react'
import { getColorBaseOnValue } from '../../../../helper/getColorBaseOnValue'
import formatNumber from '../../../../helper/formatNumber'

const Table = ({ data }) => {
    return (
        <div >
            <table className='w-[330px] h-[100px]'>
                <thead>
                    <tr className='text-[13px] font-bold text-center '>
                        <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2'>Biến động giá (%)</td>
                        <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2'>1 Tháng</td>
                        <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2'>3 Tháng</td>
                        <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2'>Từ đầu năm</td>
                    </tr>
                </thead>
                <tbody>
                    {data ?
                        data.map((item, index) => {
                            return (
                                <tr key={index} className='text-center text-[13px] font-semibold'>
                                    <td>{item.code}</td>
                                    <td className={`${getColorBaseOnValue(item.month)} `}>{formatNumber(item.month)}%</td>
                                    <td className={`${getColorBaseOnValue(item.month_3)} `}>{formatNumber(item.month_3)}%</td>
                                    <td className={`${getColorBaseOnValue(item.ytd)} `}>{formatNumber(item.ytd)}%</td>
                                </tr>
                            )
                        })
                        : <div>Loading...</div>}
                </tbody>
            </table>
        </div>
    )
}

export default Table