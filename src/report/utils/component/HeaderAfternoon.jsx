import React from 'react'
import logo from '../../../app/asset/img/logoAfternoon.png'
const HeaderAfternoon = () => {
    return (
        <div className='w-[800px] bg-gradient-to-r from-[#143964]  to-[#063366] flex'>
            <div className='logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='text relative'>
                <h2>
                    BẢN TIN THỊ TRƯỜNG CUỐI NGÀY
                </h2>
                <div></div>
            </div>
        </div>
    )
}

export default HeaderAfternoon



