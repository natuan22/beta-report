import React, { useEffect, useState } from "react";
import HeaderAnalysis from "../utils/HeaderAnalysis";
import FooterAnalysis from "../utils/FooterAnalysis";
import { https } from "../../../services/configService";
import GauChartTech from "./utils/GauChartTech";
import GauChartGen from "./utils/GauChartGen";
import GauChartTrend from "./utils/GauChartTrend";
import LineChart from "./utils/LineChart";
import formatNumber from "../../../helper/formatNumber";
import LineChart2 from "./utils/LineChart2";
import LineChartADX from "./utils/LineChartADX";
import Table from "./utils/Table";

const AnalysisPage2 = ({ stock }) => {
    const [data, setData] = useState()
    const getData = async () => {
        try {
            const res = await https.get('api/v1/report/chi-so-ky-thuat', {
                params: {
                    stock
                }
            })
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (!stock && stock.split('')?.length < 3) return
        getData()
    }, [stock])
    console.log('data,', data)
    return (
        <div className="h-[1480px] w-[800px] relative">
            <div className="header">
                <HeaderAnalysis />
            </div>

            <div className="content w-[800px] flex flex-col items-center  h-[990px]">
                <div className="cont-top flex justify-around w-[780px] translate-y-[-30px] relative">
                    <div className="absolute flex top-[50px]">
                        <div className="flex items-center  w-[130px]">
                            <div className="w-[13px] h-[13px] bg-[#FF0000] mr-1"></div>
                            <p className="m-0 text-[15px] font-semibold">: Rất tiêu cực</p>
                        </div>
                        <div className="flex items-center  w-[130px]">
                            <div className="w-[13px] h-[13px] bg-[#FFA500] mr-1"></div>
                            <p className="m-0 text-[15px] font-semibold">: Tiêu cực</p>
                        </div>
                        <div className="flex items-center  w-[130px]">
                            <div className="w-[13px] h-[13px] bg-[#FFFF00] mr-1"></div>
                            <p className="m-0 text-[15px] font-semibold">: Trung lập</p>
                        </div>
                        <div className="flex items-center  w-[130px]">
                            <div className="w-[13px] h-[13px] bg-[#00FF00] mr-1"></div>
                            <p className="m-0 text-[15px] font-semibold">: Tích cực</p>
                        </div>
                        <div className="flex items-center  w-[130px]">
                            <div className="w-[13px] h-[13px] bg-[#008000] mr-1"></div>
                            <p className="m-0 text-[15px] font-semibold">: Rất tích cực</p>
                        </div>
                    </div>
                    {data ?
                        <>
                            <div className=" w-[250px] translate-y-[30px]">
                                <GauChartTech data={data.technicalSignal} />
                            </div>
                            <div className=" w-[250px] translate-y-[30px]">
                                <GauChartGen data={data.generalSignal} />
                            </div>
                            <div className=" w-[250px] translate-y-[30px]">
                                <GauChartTrend data={data.trendSignal} />
                            </div>
                        </>
                        : <div>Loading...</div>}
                </div>
                {data ?
                    <div className="cont-mid flex justify-between w-[780px] translate-y-[-30px]">
                        <div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">RSI <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.rsi.value)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.rsi.rate}</p>
                                </div>
                                <LineChart data={data.rsi.chart} />
                            </div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">CCI <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.cci.value)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.cci.rate}</p>
                                </div>
                                <LineChart data={data.cci.chart} />
                            </div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">Williams %R
                                        <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.williams.value)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.williams.rate}</p>
                                </div>
                                <LineChart data={data.williams.chart} />
                            </div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">ADX <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.adx.value.adx)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.adx.rate}</p>
                                </div>
                                <LineChartADX data={data.adx.chart} />
                            </div>

                        </div>

                        <div className="chart ">
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">STOCHASTIC <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.stochastic.value.k)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.stochastic.rate}</p>
                                </div>
                                <LineChart2 data={data.stochastic.chart} />
                            </div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">STOCHASTIC RSI <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.stochasticRsi.value.k)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.stochasticRsi.rate}</p>
                                </div>
                                <LineChart2 data={data.stochasticRsi.chart} />
                            </div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">MACD <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.macd.value.macd)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.macd.rate}</p>
                                </div>
                                <LineChart2 data={data.macd.chart} />
                            </div>
                            <div className="flex justify-between ">
                                <div className="h-[130px]">
                                    <h2 className="m-0 mb-1 text-[17px]">MACD Histogram <span className="font-normal text-[15px] ">(14)</span></h2>
                                    <p className="m-0 mb-1">Giá trị: {formatNumber(data.macdHistogram.value)}</p>
                                    <p className="m-0 mb-1">Đánh giá: {data.macdHistogram.rate}</p>
                                </div>
                                <LineChart data={data.macdHistogram.chart} />
                            </div>
                        </div>
                    </div>

                    : <div>Loading...</div>}
                {

                    data ?
                        <div className="cont-bot translate-y-[-20px]">
                            <Table data={data.table} />
                        </div> : <div>Loading....</div>
                }

            </div>

            <div className="footer">
                <FooterAnalysis pageNum={2} />
            </div>
        </div>
    );
};

export default AnalysisPage2;
