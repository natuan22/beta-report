import React from 'react'

const Footer = ({ pageNum }) => {
    return (
        <div className='h-[50px] w-[800px] bg-gradient-to-r from-blue-900 to-[#0054B4] relative' >
            <div className='flex items-center justify-between translate-y-[-18px] p-2 '>
                {pageNum === 5 ? <p className='text-[12px] text-white font-bold ml-2 leading-4'></p> : <p className='text-[12px] text-white font-bold ml-2 leading-4'>Trang {pageNum}</p>}

                <p className='text-[14px] text-white font-bold mr-2 leading-4'>Đồng hành cùng BETA</p>
            </div>


            <div className='absolute w-[100%] h-[2px] bg-gradient-to-r from-[#FFB454] to-[#FF8659] top-[50%] translate-y-[-50%]'></div>

            <div className='absolute bottom-1 right-4'>
                <span className='font-bold text-white text-[12px]'>www.bsi.com.vn</span>
            </div>

        </div >
    )
}

export default Footer