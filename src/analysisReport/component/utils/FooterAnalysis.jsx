import React from 'react'

const FooterAnalysis = ({ pageNum }) => {
    return (
        <div className='w-[800px] h-[15px] flex flex-col items-center relative'>
            {pageNum === 4 ? <></> :

                <div className='absolute top-[-4px] left-0 translate-x-[10px] w-[780px] h-[4px] bg-[#F89637]'>
                </div>}

            <div className='flex justify-between w-[95%] text-[#023E8A] font-bold'>
                <p className='m-0'>Trang {pageNum}</p>
                <p className='m-0 translate-x-[-15px]'>
                    www.bsi.com.vn
                </p>
            </div>
            <div className='absolute -bottom-[17px] bg-gradient-to-b from-[#143A65] to-[#0054B4] w-full h-[8px] '>
            </div>
        </div>
    )
}

export default FooterAnalysis