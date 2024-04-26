import React, { useEffect, useState } from "react";
import formatNumber from "../../../helper/formatNumber";
import { https } from "../../../services/configService";
import FooterAnalysis from "../utils/FooterAnalysis";
import HeaderAnalysis from "../utils/HeaderAnalysis";
import ColumnChart from "./utils/ColumnChart";
import GauChartGen from "./utils/GauChartGen";
import GauChartTech from "./utils/GauChartTech";
import GauChartTrend from "./utils/GauChartTrend";
import LineChart from "./utils/LineChart";
import LineChart2 from "./utils/LineChart2";
import LineChartADX from "./utils/LineChartADX";
import Table from "./utils/Table";

const getColorBaseOnName = (value) => {
  if (value === "Tích cực") return "text-green-500";
  if (value === "Tiêu cực") return "text-red-500";
  if (value === "Trung lập") return "text-yellow-400";
};

const AnalysisPage2 = ({ stock }) => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const res = await https.get("api/v1/report/chi-so-ky-thuat", {
        params: {
          stock,
        },
      });
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!stock && stock.split("")?.length < 3) return;
    getData();
  }, [stock]);
  // console.log("data,", data.macdHistogram.chart);
  return (
    <div className="h-[1480px] w-[800px] relative">
      <div className="header">
        <HeaderAnalysis />
      </div>

      <div className="content w-[800px] flex flex-col items-center  h-[990px]">
        <div className="cont-top flex justify-around w-[780px] translate-y-[-30px] relative">
          {data ? (
            <>
              <div className=" w-[250px] translate-y-[10px]">
                <GauChartTech data={data.technicalSignal} />
              </div>
              <div className=" w-[250px] translate-y-[10px]">
                <GauChartGen data={data.generalSignal} />
              </div>
              <div className=" w-[250px] translate-y-[10px]">
                <GauChartTrend data={data.trendSignal} />
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {data ? (
          <div className="cont-mid flex justify-between w-[780px] translate-y-[-40px] pt-3">
            <div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    RSI <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(data.rsi.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.rsi.rate
                      )} font-semibold`}
                    >
                      {data.rsi.rate}
                    </span>
                  </p>
                </div>
                <LineChart data={data.rsi.chart} type={1} />
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    CCI <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(data.cci.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.cci.rate
                      )} font-semibold`}
                    >
                      {data.cci.rate}
                    </span>
                  </p>
                </div>
                <LineChart data={data.cci.chart} type={2} />
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    Williams %R
                    <span className="font-normal text-[15px] "> (14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(data.williams.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.williams.rate
                      )} font-semibold`}
                    >
                      {data.williams.rate}
                    </span>
                  </p>
                </div>
                <LineChart data={data.williams.chart} type={3} />
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    ADX <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <div className="m-0 mb-1 mr-1">
                    Giá trị:{" "}
                    <span className="text-[#023E8A] font-semibold">
                      {formatNumber(data.adx.value.adx)}
                    </span>
                    <div className="ml-[49px]">
                      <span className="text-[#00BF63] font-semibold">
                        {formatNumber(data.adx.value.pdi)}
                      </span>
                      <span className="text-[#FF0000] px-1 font-semibold">
                        {formatNumber(data.adx.value.mdi)}
                      </span>
                    </div>
                  </div>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.adx.rate
                      )} font-semibold`}
                    >
                      {data.adx.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] left-[40px] z-10">
                    <div className="grid grid-cols-3">
                      <div className="flex items-center justify-end w-[50px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#00BF63] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">DI+</p>
                      </div>
                      <div className="flex items-center w-[50px]">
                        <div className="w-[15px] h-[2px] bg-[#FF0000] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">DI-</p>
                      </div>
                      <div className="flex items-center w-[50px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">ADX</p>
                      </div>
                    </div>
                  </div>
                  <LineChartADX data={data.adx.chart} />
                </div>
              </div>
            </div>

            <div className="chart ">
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    STOCHASTIC{" "}
                    <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="text-[#F89637] font-semibold">
                      {formatNumber(data.stochastic.value.k)}
                    </span>
                    <span className="px-1 text-[#023E8A] font-semibold">
                      {formatNumber(data.stochastic.value.d)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.stochastic.rate
                      )} font-semibold`}
                    >
                      {data.stochastic.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] left-[20px] z-10">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center justify-end w-[100px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#F89637] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%K</p>
                      </div>
                      <div className="flex items-center w-[100px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%D</p>
                      </div>
                    </div>
                  </div>
                  <LineChart2 data={data.stochastic.chart} type={1} />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px] mr-1">
                  <h2 className="m-0 mb-1 text-[17px]">
                    STOCHASTIC RSI{" "}
                    <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="text-[#F89637] font-semibold">
                      {formatNumber(data.stochasticRsi.value.k)}
                    </span>
                    <span className="px-1 text-[#023E8A] font-semibold">
                      {formatNumber(data.stochasticRsi.value.d)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.stochasticRsi.rate
                      )} font-semibold`}
                    >
                      {data.stochasticRsi.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] left-[20px] z-10">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center justify-end w-[100px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#F89637] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%K</p>
                      </div>
                      <div className="flex items-center w-[100px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%D</p>
                      </div>
                    </div>
                  </div>
                  <LineChart2 data={data.stochasticRsi.chart} type={1} />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">MACD</h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="text-[#F89637] font-semibold">
                      {formatNumber(data.macd.value.macd)}
                    </span>
                    <span className="px-1 text-[#023E8A] font-semibold">
                      {formatNumber(data.macd.value.signal)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.macd.rate
                      )} font-semibold`}
                    >
                      {data.macd.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] -left-[35px] z-10">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center justify-end w-[130px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#F89637] mr-1"></div>
                        <p className="m-0 text-[11px] font-semibold">
                          MACD (12,26)
                        </p>
                      </div>
                      <div className="flex items-center w-[130px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[11px] font-semibold">
                          MACD Signal (12,26,9)
                        </p>
                      </div>
                    </div>
                  </div>
                  <LineChart2 data={data.macd.chart} type={""} />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">MACD Histogram</h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(data.macdHistogram.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        data.macdHistogram.rate
                      )} font-semibold`}
                    >
                      {data.macdHistogram.rate}
                    </span>
                  </p>
                </div>
                <div className="-translate-y-[10px]">
                  <ColumnChart data={data.macdHistogram.chart} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {data ? (
          <div className="cont-bot translate-y-[-20px]">
            <Table data={data.table} />
          </div>
        ) : (
          <div>Loading....</div>
        )}
      </div>

      <div className="footer">
        <FooterAnalysis pageNum={2} />
      </div>
    </div>
  );
};

export default AnalysisPage2;
