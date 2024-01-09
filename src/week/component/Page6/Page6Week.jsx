import React from 'react'
import HeaderWeek from '../../utils/HeaderWeek'
import FooterWeek from '../../utils/FooterWeek'

const Page6Week = () => {
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header h-[135px]'>
                <HeaderWeek />
            </div>

            <div className='content h-[950px]'></div>


            <div className='footer'>
                <FooterWeek />
            </div>
        </div>
    )
}

export default Page6Week