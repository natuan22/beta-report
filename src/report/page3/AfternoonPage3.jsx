import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import AreaChart from "../utils/component/AreaChart";
import StackingAreaChart from "../utils/component/StackingAreaChart";
import { https } from "../../services/configService";
import ColumnChartPage3 from "./component/ColumnChartPage3";
import formatNumber from "../../helper/formatNumber";
import { FaDownLong, FaUpLong } from "react-icons/fa6"

const getArrow = (value) => {
    if (value < 0) return <span className="text-red-500"> <FaDownLong /></span>;
    if (value > 0) return <span className="text-green-500"><FaUpLong /></span>;
};

const AfternoonPage3 = () => {
    const [dataColumChartLeft, setDataColumnChartLeft] = useState([])
    const [dataColumChartRight, setDataColumnChartRight] = useState([])
    const [dataTable, setDataTable] = useState([])
    const getData = async (type) => {
        try {
            const response = await https.get('/api/v1/report/dong-tien-rong', {
                params: {
                    type
                }
            })
            if (type === 0) {
                setDataColumnChartLeft(response.data.data)
            } else if (type === 1) {
                setDataColumnChartRight(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const getDataTable = async () => {
        try {
            const response = await https.get('/api/v1/report/phan-nganh')
            setDataTable(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getData(0)
        getData(1)
        getDataTable()
    }, [])
    return (
        <div className="h-[1480px] w-[800px] relative">
            <div className="header relative ">
                <HeaderAfternoon />
            </div>

            <div className="absolute top-[115px] z-10 w-full flex flex-col items-center" >
                <div>
                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                        <div className="bg-[#E88C08] h-[20px] w-[25px] "></div>
                        <div className="w-[700px] bg-[#0155B7] h-[20px]"></div>
                    </div>
                    <div className="skew-x-[-35deg] flex">
                        <div className="bg-[#E88C08] h-[20px] w-[25px] "></div>
                        <div className="w-[700px] bg-[#0155B7] h-[20px]"></div>
                    </div>
                </div>

            </div>

            <div className="content  h-[926px] mt-[55px] w-full flex flex-col items-center ">
                <div className="w-[750px] flex">
                    <div className="content-left w-[60%]">
                        <div className="table">
                            <table className="bg-transparent w-[100%] border-[#0155B7] border-solid border-1 border-collapse">
                                <thead className="bg-[#0155B7] border-1 border-[#0155B7] border-solid border-collapse">
                                    <tr className="text-white">
                                        <th className="font-semibold px-2 py-1 text-left w-[120px]    ">
                                            Phân ngành
                                        </th>
                                        <th className="font-semibold px-1 py-1   ">%D</th>
                                        <th className="font-semibold px-1 py-1   ">%W</th>
                                        <th className="font-semibold px-1 py-1   ">%M</th>
                                        <th className="font-semibold px-1 py-1   ">Độ rộng ngành</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {dataTable?.map((item, index) => {
                                        let numOfHigh = item.high;
                                        let numOfLow = item.low;
                                        let numOfIncrease = item.increase;
                                        let numOfDecrease = item.decrease;
                                        let numOfEqual = item.equal;
                                        let total = numOfHigh + numOfLow + numOfIncrease + numOfDecrease + numOfEqual;

                                        return (
                                            <tr key={index} className=" border-[#0155B7] border-y-0  border-collapse border-1 bor border-solid text-[13px] font-semibold">
                                                <td className="text-left  py-1 font-bold  text-[11px] text-[#00429B] w-[125px] ">
                                                    {item.industry}
                                                </td>
                                                <td className="text-center px-2 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] ">
                                                    {getArrow(item.day_change_percent)}  {formatNumber(item.day_change_percent)} %
                                                </td>
                                                <td className={`text-center px-1 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] `}>
                                                    {getArrow(item.week_change_percent)} {formatNumber(item.week_change_percent)} %
                                                </td>
                                                <td className={`text-center px-1 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] `}>
                                                    {getArrow(item.month_change_percent)} {formatNumber(item.month_change_percent)} %
                                                </td>
                                                <td className={`text-center px-1 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] `}>
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
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                        <div className="areaChart">
                            <AreaChart />
                        </div>
                        <div className="stackingAreaChart">
                            <StackingAreaChart />
                        </div>
                        <div className="columnChart">
                            <ColumnChartPage3 title={'Dòng tiền ròng khối ngoại qua 20 phiên gần nhất'} unit={'tỷ VNĐ'} data={dataColumChartLeft} />
                        </div>
                    </div>
                    <div className="content-right  w-[40%] flex flex-col items-center justify-between">
                        <div className="columnChart-1">
                            <ColumnChartPage3 title={'Dòng tiền ròng khối ngoại qua 20 phiên gần nhất'} unit={'tỷ VNĐ'} data={dataColumChartLeft} />
                        </div>
                        <div className="columnChart-2">
                            <ColumnChartPage3 title={'Dòng tiền ròng khối ngoại qua 20 phiên gần nhất'} unit={'tỷ VNĐ'} data={dataColumChartLeft} />
                        </div>
                        <div className="columnChart-3">
                            <ColumnChartPage3 title={'Dòng tiền ròng khối ngoại qua 20 phiên gần nhất'} unit={'tỷ VNĐ'} data={dataColumChartLeft} />
                        </div>
                        <div className="columnChart-4">
                            <ColumnChartPage3 title={'Dòng tiền ròng khối ngoại qua 20 phiên gần nhất'} unit={'tỷ VNĐ'} data={dataColumChartLeft} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <FooterAfternoon pageNum={3} />
            </div>
        </div>
    );
};

export default AfternoonPage3;
