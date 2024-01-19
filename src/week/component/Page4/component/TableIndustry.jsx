import React from 'react'
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import formatNumber from '../../../../helper/formatNumber';

const getArrow = (value) => {
    if (value < 0)
        return (
            <span className="text-red-500 ">
                <FaDownLong />
            </span>
        );
    if (value > 0)
        return (
            <span className="text-green-500 ">
                <FaUpLong />
            </span>
        );
};


const TableIndustry = ({ dataTable }) => {
    return (
        <div >
            <table className="bg-transparent  w-[420px] h-[460px]   border-[#0155B7] border-solid border-1 border-collapse">

                <thead className="bg-[#0155B7] border-1 border-[#0155B7] border-solid border-collapse">
                    <tr className="text-white">
                        <th className="font-semibold px-2 py-1 text-left     ">
                            Phân ngành
                        </th>

                        <th className="font-semibold px-1 py-1  text-[12px]    ">
                            %W
                        </th>
                        <th className="font-semibold px-1 py-1 text-[12px]     ">
                            %M
                        </th>
                        <th className="font-semibold px-1 py-1 text-[12px]    ">
                            %YtD
                        </th>
                        <th className="font-semibold px-1 py-1  text-[12px]  ">
                            Độ rộng ngành
                        </th>
                    </tr>
                </thead>

                <tbody className="">
                    {dataTable?.map((item, index) => {
                        let numOfHigh = item.high;
                        let numOfLow = item.low;
                        let numOfIncrease = item.increase;
                        let numOfDecrease = item.decrease;
                        let numOfEqual = item.equal;
                        let total =
                            numOfHigh +
                            numOfLow +
                            numOfIncrease +
                            numOfDecrease +
                            numOfEqual;

                        return (
                            <tr
                                key={index}
                                className="  text-[13px] font-semibold"
                            >
                                <td className="text-left  py-1 font-bold  text-[11px] text-[#00429B]  px-1 border border-solid border-collapse border-[#0155B7] border-y-0 border-l-0 border-r ">
                                    {item.industry}
                                </td>
                                <td className="text-center px-1 py-1  text-[11px] border border-solid border-collapse border-[#0155B7] border-y-0 border-l-0 border-r  ">
                                    <div>
                                        {getArrow(item.week_change_percent)}
                                        <span className="m-0">{formatNumber(item.week_change_percent)}%</span>
                                    </div>
                                </td>
                                <td className={`text-center px-1 py-1  text-[11px] border border-solid border-collapse border-[#0155B7] border-y-0 border-l-0 border-r    `}>
                                    <div>
                                        {getArrow(item.month_change_percent)}
                                        <span className="m-0"> {formatNumber(item.month_change_percent)}%</span>
                                    </div>
                                </td>
                                <td className={`text-center px-1 py-1  text-[11px] border border-solid border-collapse border-[#0155B7] border-y-0 border-l-0 border-r   `}>
                                    <div>
                                        {getArrow(item.ytd)}
                                        <span className="m-0">{formatNumber(item.ytd)}%</span>
                                    </div>
                                </td>
                                <td
                                    className={`text-center   px-1 py-1  text-[11px] `}
                                >
                                    <div className="flex">
                                        <div
                                            className="bg-purple-500 h-2.5"
                                            style={{
                                                width: `${(item.high / total) * 100}%`,
                                            }}
                                        ></div>
                                        <div
                                            className="h-2.5 bg-green-500"
                                            style={{
                                                width: `${(item.increase / total) * 100}%`,
                                            }}
                                        ></div>
                                        <div
                                            className="bg-yellow-400 h-2.5"
                                            style={{
                                                width: `${(item.equal / total) * 100}%`,
                                            }}
                                        ></div>
                                        <div
                                            className="bg-red-500 "
                                            style={{
                                                width: `${(item.decrease / total) * 100}%`,
                                            }}
                                        ></div>
                                        <div
                                            className="bg-blue-400 h-2.5"
                                            style={{
                                                width: `${(item.low / total) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableIndustry