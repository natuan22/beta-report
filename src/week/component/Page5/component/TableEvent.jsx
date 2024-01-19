import moment from 'moment'
import React from 'react'

const TableEvent = ({ data }) => {
    return (
        <div >
            <table className=" bg-transparent border-collapse w-full h-[319px]  ">
                <thead className="  border-1 border-[#0155B7] border-solid border-collapse">
                    <tr>
                        <th className="text-black font-bold text-[12px] border-1 border-y-0 border-l-0 px-1 py-2 w-[30px] border-solid border-collapse border-[#0155B7]  ">
                            Mã CP
                        </th>
                        <th className="text-black font-bold text-[12px] border-1 border-y-0 border-l-0 px-1 py-2 w-[10px] border-solid border-collapse border-[#0155B7]  ">
                            Sàn
                        </th>
                        <th className="text-black font-bold text-[12px] border-1 border-y-0 border-l-0 px-1 py-2 w-[50px] border-solid border-collapse border-[#0155B7]  ">
                            Ngày GDKHQ
                        </th>
                        <th className="text-black font-bold text-[12px] border-1 border-y-0 border-l-0 px-1 py-2 w-[50px] border-solid border-collapse border-[#0155B7]  ">
                            Ngày ĐKCC
                        </th>
                        <th className="text-black font-bold text-[12px] border-1 border-y-0 border-l-0 px-1 py-2 w-[60px] border-solid border-collapse border-[#0155B7]  ">
                            Ngày thực hiện
                        </th>
                        <th className="text-black font-bold text-[12px] border-1  border-y-0 border-l-0 px-1 py-2 w-[290px] border-solid border-collapse border-[#0155B7] ">
                            Nội dung
                        </th>
                    </tr>
                </thead>
                <tbody className="border-1 border-t-0 border-[#0155B7] border-solid border-collapse ">
                    {data?.map((item) => (
                        <tr>
                            <td className="text-[11px] font-bold text-center p-1   border-1 border-solid border-collapse border-[#0155B7] border-y-0 border-l-0  ">
                                {item.ticker}
                            </td>
                            <td className="text-[11px] font-semibold text-center p-1  border-1 border-solid border-collapse  border-[#0155B7]  border-y-0 border-l-0  ">
                                {item.floor}
                            </td>
                            <td className="text-[11px] font-semibold  text-center  p-1  border-1 border-solid border-collapse  border-[#0155B7] border-y-0 border-l-0 ">
                                {moment(item.date).format('YYYY-MM-DD')}
                            </td>
                            <td className="text-[11px] font-semibold  text-center p- 1  border-1 border-solid border-collapse border-[#0155B7] border-y-0 border-l-0 ">
                                {moment(item.NgayDKCC).format('YYYY-MM-DD')}
                            </td>
                            <td className="text-[11px] font-semibold  text-center p-1  border-1 border-solid border-collapse  border-[#0155B7] border-y-0 border-l-0  ">
                                {item.NgayThucHien == '' ? '' : moment(item.NgayThucHien).format('YYYY-MM-DD')}
                            </td>
                            <td className="text-[11px] fnt-semibold text-left p-1  border-1 border-solid border-collapse  border-[#0155B7] border-y-0 border-x-0   ">
                                {item.title}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableEvent