import React from 'react'
import HeaderAfternoon from '../utils/component/HeaderAfternoon'
import FooterAfternoon from '../utils/component/FooterAfternoon'

const AfternoonPage3 = () => {
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header'>
                <HeaderAfternoon />
            </div>

            <div className='content relative h-[1000px]' >
                <div className='absolute top-0 z-[-1]'>
                    <div className='skew-x-[35deg] flex translate-y-[1px]'>
                        <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                        <div className='w-[740px] bg-[#0155B7] h-[26px]'></div>
                    </div>
                    <div className='skew-x-[-35deg] flex'>
                        <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                        <div className='w-[740px] bg-[#0155B7] h-[26px]'></div>
                    </div>
                </div>
                <span className='absolute text-white font-bold top-[12px] translate-x-[-50%] left-[50%] z-10'>
                    Thống kê giao dịch
                </span>
            </div>

            <div className='footer'>
                <FooterAfternoon pageNum={3} />
            </div>
        </div>
    )
}

export default AfternoonPage3