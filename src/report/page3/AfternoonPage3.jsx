import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import AreaChart from "../utils/component/AreaChart";
import StackingAreaChart from "../utils/component/StackingAreaChart";
import { https } from "../../services/configService";
import ColumnChartPage3 from "./component/ColumnChartPage3";
import formatNumber from "../../helper/formatNumber";
import { FaDownLong, FaUpLong } from "react-icons/fa6"
import ColumnChartAfternoon from "./component/ColumnChartAfternoon";
import MultipleColumnChart from "./component/MultipleColumnChart";

const getArrow = (value) => {
    if (value < 0) return <span className="text-red-500"> <FaDownLong /></span>;
    if (value > 0) return <span className="text-green-500"><FaUpLong /></span>;
};

const AfternoonPage3 = () => {
    const [dataColumChartLeft, setDataColumnChartLeft] = useState([])
    const [dataColumChartRight, setDataColumnChartRight] = useState([])
    const [dataColumnForeign, setDataColumnForeign] = useState([])
    const [dataColumnIndividual, setDataColumnIndividual] = useState([])
    const [dataTable, setDataTable] = useState([])
    const [dataMultipleColumn1, setDataMultipleColumn1] = useState([])
    const [dataMultipleColumn2, setDataMultipleColumn2] = useState([])
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
    const getData2 = async (type) => {
        try {
            const response = await https.get('api/v1/report/top-mua-ban-rong', {
                params: {
                    type
                }
            })
            if (type === 0) {
                setDataColumnForeign(response.data.data)
            } else if (type === 1) {
                setDataColumnIndividual(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const getDataMultipleColumn = async () => {
        try {
            const response = await https.get('api/v1/report/bien-dong-gtgd')

            setDataMultipleColumn1(response.data.data.slice(0, 4));
            setDataMultipleColumn2(response.data.data.slice(4));
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getData(0)
        getData(1)
        getDataTable()
        getData2(0)
        getData2(1)
        getDataMultipleColumn()
    }, [])
    return (
        <div className="h-[1480px] w-[800px] relative">
            <div className="header relative ">
                <HeaderAfternoon />
            </div>

            <div className="absolute top-[100px] z-10 w-full flex flex-col items-center" >
                <div className="relative">
                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                        <div className="bg-[#E88C08] h-[20px] w-[25px] "></div>
                        <div className="w-[700px] bg-[#0155B7] h-[20px]"></div>
                    </div>
                    <div className="skew-x-[-35deg] flex">
                        <div className="bg-[#E88C08] h-[20px] w-[25px] "></div>
                        <div className="w-[700px] bg-[#0155B7] h-[20px]"></div>
                    </div>
                    <div className="absolute top-0 left-[50%]  translate-x-[-50%] translate-y-[-10%]">
                        <h2 className="text-white text-[15px]">Thống kê giao dịch </h2>
                    </div>
                </div>
            </div>


            <div className="content  h-[926px] mt-[55px] w-full flex flex-col items-center ">
                <div className="w-[750px] flex">
                    <div className="content-left w-[50%]">
                        <div className="table">
                            <table className="bg-transparent w-[100%] border-[#0155B7] border-solid border-1 border-collapse">
                                <thead className="bg-[#0155B7] border-1 border-[#0155B7] border-solid border-collapse">
                                    <tr className="text-white">
                                        <th className="font-semibold px-2 py-1 text-left w-[120px]    ">
                                            Phân ngành
                                        </th>
                                        <th className="font-semibold px-1 py-1 text-[12px]   ">%D</th>
                                        <th className="font-semibold px-1 py-1  text-[12px]  ">%W</th>
                                        <th className="font-semibold px-1 py-1 text-[12px]   ">%M</th>
                                        <th className="font-semibold px-1 py-1  text-[12px]  ">Độ rộng ngành</th>
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
                                                <td className={`text-center  w-[10%] px-1 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] `}>
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
                    <div className="content-right  w-[50%] flex flex-col items-center justify-center">
                        <div className="columnChart-1 w-full">
                            <MultipleColumnChart legend={false} title={'Dòng tiền ròng khối ngoại qua 20 phiên gần nhất'} unit={'ĐVT: tỷ VNĐ'} data={dataMultipleColumn1} />
                            <MultipleColumnChart legend={true} title={''} unit={''} data={dataMultipleColumn2} />
                        </div>
                        <div className="columnChart-2 w-full">
                            <ColumnChartAfternoon title={'Top ngành mua bán ròng khối ngoại'} unit={'tỷ VNĐ'} data={dataColumnForeign} />
                        </div>
                        <div className="columnChart-3 w-full">
                            <ColumnChartAfternoon title={'Top ngành mua bán ròng tự doanh'} unit={'tỷ VNĐ'} data={dataColumnIndividual} />
                        </div>
                        <div className="columnChart-4 w-full">
                            <ColumnChartPage3 title={'Dòng tiền ròng tự doanh qua 20 phiên gần nhất'} unit={'tỷ VNĐ'} data={dataColumChartRight} />
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
