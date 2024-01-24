import React from 'react'
import logo from '../../app/asset/img/logoWeek.png'
import imgHeader from '../../app/asset/img/headerWeek.png'
import getTimeWeek from '../../helper/getTimeWeek'

const HeaderLandscape = () => {
    return (
        <div className='w-[1112px] flex items-center h-[120px] relative '>

            <div className='logo w-[70%] relative'>
                <div className='flex ml-2 mt-2'>
                    <img src={logo} width={144} height={55} alt="logo" />
                    <div className='title ml-5'>
                        <p className='m-0 text-[#E88C08] text-[23px] font-bold'>Công ty cổ phần chứng khoán BETA</p>
                        <p className='m-0 text-[#0054B4] text-[20px] font-semibold  '>Ấn phẩm được phát hành bởi BETA</p>
                    </div>
                </div>
                <div className='w-[85%]'>
                    <h2 className='text-[35px] m-0 text-[#0155B7] text-end'>NHỊP ĐẬP THỊ TRƯỜNG </h2>
                </div>
                <div className='absolute bottom-[-9px] left-0 w-[620px] h-[2px] bg-[#FFB800]'>
                </div>
                <div className='absolute bottom-[-14px] left-0 w-[620px] h-[2px] bg-[#0055B6]'>
                </div>
            </div>
            <div className='absolute bottom-[-20px] right-[240px]'>
                <span className='text-[23px] font-[500] text-[#0055B6]'>
                    Tuần: {getTimeWeek()}
                </span>
            </div>
            <div className='img w-[30%] relative flex justify-end '>
                <img src={imgHeader} alt="img" width={240} />
                <div className='absolute bottom-[-3px] left-0 w-[400px] h-[2px] bg-[#FFB800] translate-x-[100px]'>
                </div>
                <div className='absolute bottom-[-8px] left-0 w-[400px] h-[2px] bg-[#0055B6] translate-x-[100px]'>
                </div>
            </div>
        </div>
    )
}

export default HeaderLandscape