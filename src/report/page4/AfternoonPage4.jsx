import React from 'react'
import HeaderAfternoon from '../utils/component/HeaderAfternoon'
import FooterAfternoon from '../utils/component/FooterAfternoon'

const AfternoonPage4 = () => {
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header'>

                <HeaderAfternoon />
            </div>


            <div className='content h-[900px] w-full flex flex-col justify-center items-center '>
                <div className='w-[90%]'>
                    <div className='content-top relative h-[300px]'>
                        <div className='absolute top-0 z-[-1]'>
                            <div className='skew-x-[35deg] flex translate-y-[1px]'>
                                <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                                <div className='w-[700px] bg-[#0155B7] h-[26px]'></div>
                            </div>
                            <div className='skew-x-[-35deg] flex'>
                                <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                                <div className='w-[700px] bg-[#0155B7] h-[26px]'></div>
                            </div>
                        </div>
                        <span className='absolute text-white font-bold top-[5%] translate-x-[-50%] left-[50%]'>
                            Dữ liệu vĩ mô
                        </span>
                    </div>

                    <div className='content-mid relative h-[300px]'  >
                        <div className='absolute top-0 z-[-1]'>
                            <div className='skew-x-[35deg] flex translate-y-[1px]'>
                                <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                                <div className='w-[700px] bg-[#0155B7] h-[26px]'></div>
                            </div>
                            <div className='skew-x-[-35deg] flex'>
                                <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                                <div className='w-[700px] bg-[#0155B7] h-[26px]'></div>
                            </div>
                        </div>
                        <span className='absolute text-white font-bold top-[5%] translate-x-[-50%] left-[50%]'>
                            Tin tức vĩ mô
                        </span>
                    </div>

                    <div className='content-bot relative h-[300px]'>
                        <div className='absolute top-0 z-[-1]'>
                            <div className='skew-x-[35deg] flex translate-y-[1px]'>
                                <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                                <div className='w-[700px] bg-[#0155B7] h-[26px]'></div>
                            </div>
                            <div className='skew-x-[-35deg] flex'>
                                <div className='bg-[#E88C08] h-[26px] w-[25px] '></div>
                                <div className='w-[700px] bg-[#0155B7] h-[26px]'></div>
                            </div>
                        </div>
                        <span className='absolute text-white font-bold top-[5%] translate-x-[-50%] left-[50%]'>
                            Tin tức doanh nghiệp
                        </span>
                    </div>
                </div>


            </div>

            <div className='footer mt-10'>
                <FooterAfternoon pageNum={4} />
            </div>
        </div>
    )
}

export default AfternoonPage4