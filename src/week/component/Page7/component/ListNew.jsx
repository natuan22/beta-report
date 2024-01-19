import React from 'react'

const ListNew = ({ data, type }) => {
    return (
        <div className='flex flex-col justify-start' >
            <div className='flex items-center w-[112px] h-[30px] justify-evenly'>
                <div className='bg-[#0155B7] w-[5px] h-[30px]'></div>
                <div>
                    <p className='m-0 text-[#00429B] font-bold text-[14px]'>{type}</p>
                </div>
            </div>
            <div className='listNews min-h-[900px]'>
                {data?.map(item => {
                    return (
                        <div className='mb-2 min-h-[110px] ' >
                            <p className='my-1 text-justify font-bold text-[13px]'>{item.title}</p>
                            <p className='mt-2  text-justify font-semibold text-[12px] max-h-[80px] line-clamp-3 indent-4 leading-[20px]'>
                                {item.sub_title}
                            </p>
                        </div>
                    )
                })}
            </div >

        </div >
    )
}

export default ListNew