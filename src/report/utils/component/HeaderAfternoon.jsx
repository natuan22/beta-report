import React from 'react'
import logo from '../../../app/asset/img/logoAfternoon.png'
import { currentDate } from '../../../helper/getDateAfternoonNew'
const HeaderAfternoon = () => {
    return (
        <div className='w-[800px] bg-gradient-to-r from-[#143964]  to-[#0055B6] relative  h-[96px]'>
            <div className='flex items-center justify-around'>
                <div className='logo'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='text relative '>
                    <h2 className='m-0 text-[30px] text-white'>
                        BẢN TIN THỊ TRƯỜNG CUỐI NGÀY
                    </h2>
                    <div className='absolute bottom-[-25px] text-center w-full z-10 '>
                        <p className='text-white m-0'>
                            {currentDate}
                        </p>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 w-full h-[4px] bg-gradient-to-r from-[#FFB454]  to-[#FF8659] '>
            </div>
        </div>
    )
}

export default HeaderAfternoon



