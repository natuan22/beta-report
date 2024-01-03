import React from 'react'
import logo from '../../app/asset/img/logoWeek.png'
import imgHeader from '../../app/asset/img/headerWeek.png'
const HeaderWeek = () => {
    return (
        <div className='h-[120px] w-[800px]'>
            <div className='flex items-center  relative'>


                <div className='header-left flex flex-col items-center  relative  '>
                    <div className='header-left_top flex translate-x-1 '>
                        <img src={logo} alt="logo" width={144} height={55} />
                        <div className='title ml-2'>
                            <p className='m-0 text-[#E88C08] text-[23px] font-bold'>Công ty cổ phần chứng khoán BETA</p>
                            <p className='m-0 text-[#0054B4] text-[20px] font-semibold  '>Ấn phẩm được phát hành bởi BETA</p>
                        </div>
                    </div>
                    <div className='header-left_bot'>
                        <p className='m-0 text-[40px] text-[#0155B7] font-bold'>NHỊP ĐẬP THỊ TRƯỜNG </p>
                    </div>

                    <div className='absolute bg-[#FFB800] bottom-[-10px] left-0 w-[75%] h-[3px]'>

                    </div>
                    <div className='absolute bg-[#0055B6] bottom-[-15px] left-0 w-[75%] h-[3px]'>

                    </div>
                </div>

                <div className='absolute bottom-[-14px] right-[155px]'>
                    <span className='text-[23px] font-[500] text-[#0055B6]'>
                        Tuần: 18.12 - 22.12.2023
                    </span>
                </div>


                <div className='header-right relative'>
                    <img src={imgHeader} alt="img" width={240} />
                    <div className='absolute bg-[#FFB800] bottom-0 right-0 w-[65%] translate-x-[25px] h-[3px]'>

                    </div>
                    <div className='absolute bg-[#0055B6] bottom-[-5px] right-0 w-[65%] translate-x-[25px] h-[3px]'>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeaderWeek