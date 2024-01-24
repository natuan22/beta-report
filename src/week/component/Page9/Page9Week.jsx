import React, { useEffect, useState } from 'react'
import HeaderLandscape from '../../utils/HeaderLandscape'
import FooterLandscape from '../../utils/FooterLandscape'
import { https } from '../../../services/configService'
import formatNumber from '../../../helper/formatNumber'

const Page9Week = () => {
    const [data, setData] = useState()
    const getData = async () => {
        try {
            const res = await https.get('/api/v1/report/co-phieu-khuyen-nghi-tuan')
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='h-[800px] w-[1480px] relative'>
            <div className='header h-[120px]'>
                <HeaderLandscape />
            </div>

            <div className='cont h-[625px] w-[1112px] mt-3 flex flex-col items-center'>

                <div className='relative mt-2 '>
                    <div className='flex'>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[45deg] translate-x-4 '></div>
                        <div className='h-[12px] w-[950px] bg-[#0155B7]'></div>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[-45deg]  translate-x-[-16px] '></div>
                    </div>

                    <div className='flex'>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[-45deg] translate-x-4'></div>
                        <div className='h-[12px] w-[950px] bg-[#0155B7]'></div>
                        <div className='h-[12px] w-[46px] bg-[#E88C08] skew-x-[45deg] translate-x-[-16px]' ></div>
                    </div>
                    <div className='absolute z-10 top-0 left-0 w-full'>
                        <h2 className='m-0 text-white text-[12px] text-center leading-[24px]  font-semibold'>
                            Danh sách cổ phiếu theo dõi khuyến nghị
                        </h2>
                    </div>
                </div>

                <div className='table-cont w-[1050px] mt-5 '>
                    <table className="bg-transparent border-collapse w-full">
                        <thead className="bg-[#0155B7]  border border-[#0155B7] border-solid border-collapse">
                            <tr className="text-white ">
                                <th className="font-semibold px-1 py-1 text-[11px] ">Mã CP</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[100px]  ">Ngày</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[80px] ">Giá khuyến nghị</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[80px] ">Giá mục tiêu</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[80px] ">Giá dừng lỗ</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Tỷ suất sinh <br />lời kỳ vọng</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[80px] ">Thời gian nắm giữ dự kiến (tháng)</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[85px] ">Ghi chú</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Giá thị trường</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  w-[60px] ">Tỷ suất lợi nhuận</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[80px] ">Giá bán</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[60px] ">Tỷ suất sinh lời/lỗ</th>
                                <th className="font-semibold px-1 py-1 text-[11px] w-[60px]  ">Thời gian nắm giữ (tháng)</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  w-[85px]">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody className="border border-[#0155B7] border-solid border-collapse ">
                            {data?.length > 0 ?
                                data.map((item) => {

                                    return (
                                        <tr className='text-center text-[14px] '>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse font-bold '>{item.code}</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>{item.date}</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>{formatNumber(item.gia_khuyen_nghi)}</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>{formatNumber(item.gia_muc_tieu)}</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>{formatNumber(item.gia_dung_lo)}</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>{formatNumber(item.ty_suat_sinh_loi_ky_vong)}%</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>{item.thoi_gian_nam_giu_du_kien}</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>mua được</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>10,0000</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>1</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>10,000</td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>1 </td>
                                            <td className='border border-[#0155B7] border-solid border-y-0 border-collapse '>1 tháng 1 ngày</td>
                                            <td className=' '>mua đươc</td>
                                        </tr>
                                    )
                                })


                                : <div>Loading....</div>}

                        </tbody>
                    </table>
                </div>

            </div>

            <div className='footer mt-1 w-[1112px]'>
                <FooterLandscape pageNum={8} />
            </div>
        </div>
    )
}

export default Page9Week