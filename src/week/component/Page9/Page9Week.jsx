import React from 'react'
import HeaderWeek from '../../utils/HeaderWeek'
import FooterWeek from '../../utils/FooterWeek'

const Page9Week = () => {
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header h-[135px]'>
                <HeaderWeek />
            </div>
            <div className='cont h-[950px] w-full mt-3 flex flex-col items-center'>
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
                            Danh sách cổ phiếu theo dõi khuyến nghị
                        </h2>
                    </div>
                </div>

                <div className='table-cont w-[780px] mt-5'>
                    <table className="bg-transparent border-collapse w-full">
                        <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
                            <tr className="text-white ">
                                <th className="font-semibold px-1 py-1 text-[11px] ">Mã CP</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Ngày</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Giá khuyến nghị</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Giá mục tiêu</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Giá dừng lỗ</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Tỷ suất sinh lời kỳ vọng</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Thời gian nắm giữ dự kiến (tháng)</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Ghi chú</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Giá thị trường</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Tỷ suất lợi nhuận</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Giá bán</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Tỷ suất sinh lời/lỗ</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Thời gian nắm giữ(tháng)</th>
                                <th className="font-semibold px-1 py-1 text-[11px]  ">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">

                        </tbody>
                    </table>
                </div>

            </div>

            <div className='footer'>
                <FooterWeek pageNum={8} />
            </div>
        </div>
    )
}

export default Page9Week