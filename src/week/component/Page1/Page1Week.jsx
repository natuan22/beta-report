import React from 'react'
import HeaderWeek from '../../utils/HeaderWeek'
import FooterWeek from '../../utils/FooterWeek'


const Page1Week = () => {
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header'>
                <HeaderWeek />
            </div>

            <div className='h-[900px]'>

            </div>

            <div className='footer '>
                <FooterWeek />
            </div>
        </div>
    )
}

export default Page1Week