import React, { useEffect, useState } from "react";
import formatNumber from "../../../helper/formatNumber";
import { getColorBaseOnValue } from "../../../helper/getColorBaseOnValue";
import FooterAfternoon from "../../../report/utils/component/FooterAfternoon";
import { https } from "../../../services/configService";
import HeaderWeek from "../../utils/HeaderWeek";
import ColumnChart from "./component/ColumnChart";
import TableIndustry from "./component/TableIndustry";

const Page4Week = () => {
  const [rate, setRate] = useState();
  const [dataChartMetric, setDataChartMetric] = useState();
  const [dataChartIndustry, setDataChartIndustry] = useState();
  const [dataTable, setDataTable] = useState();
  const getData = async () => {
    try {
      const res = await https.get(
        "/api/v1/report/thi-truong-chung-khoan?type=1"
      );
      setRate(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDataChart = async () => {
    try {
      const res = await https.get(
        "api/v1/report/hieu-suat-sinh-loi-chi-so-theo-tuan"
      );
      setDataChartMetric(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataChartIndustry = async () => {
    try {
      const res = await https.get(
        "api/v1/report/hieu-suat-sinh-loi-nhom-nganh-theo-tuan"
      );
      setDataChartIndustry(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataTableIndustry = async () => {
    try {
      const res = await https.get("/api/v1/report/phan-nganh?type=1");
      setDataTable(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
    getDataChart();
    getDataChartIndustry();
    getDataTableIndustry();
  }, []);
  return (
    <div className="h-[1152px] w-[800px]">
      <div className="header h-[135px] ">
        <HeaderWeek />
      </div>

      <div className="content mt-[20px]  h-[950px] w-full flex flex-col items-center relative">
        <div className="relative">
          <div className="flex">
            <div className="h-[12px] w-[46px] bg-[#E88C08] skew-x-[45deg] translate-x-4 "></div>
            <div className="h-[12px] w-[700px] bg-[#0155B7]"></div>
            <div className="h-[12px] w-[46px] bg-[#E88C08] skew-x-[-45deg]  translate-x-[-16px] "></div>
          </div>

          <div className="flex">
            <div className="h-[12px] w-[46px] bg-[#E88C08] skew-x-[-45deg] translate-x-4"></div>
            <div className="h-[12px] w-[700px] bg-[#0155B7]"></div>
            <div className="h-[12px] w-[46px] bg-[#E88C08] skew-x-[45deg] translate-x-[-16px]"></div>
          </div>
          <div className="absolute z-10 top-0 left-0 w-full">
            <h2 className="m-0 text-white text-[12px] text-center leading-[24px]  font-semibold">
              Thống kê hiệu suất sinh lời
            </h2>
          </div>
        </div>
        <div>
          <div className="content-top w-[760px] flex items-start ">
            <div className="content-top_left table w-[420px] h-[374px] relative">
              <h2 className="text-[12px]  text-center text-[#00429B] m-0 translate-y-[4px]">
                Thị trường chứng khoán Việt Nam và Quốc tế
              </h2>
              <table className="bg-transparent border-collapse h-[315px] mt-2  w-full ">
                <thead className="bg-[#0155B7]  text-[12px]  border border-[#0155B7] border-solid border-collapse">
                  <tr className="text-white ">
                    <th className="font-semibold px-1 py-1 text-[12px] ">
                      Chỉ số
                    </th>
                    <th className="font-semibold px-1 py-1 text-[12px] ">
                      Điểm số
                    </th>
                    <th className="font-semibold px-1 py-1 text-[12px] ">%W</th>
                    <th className="font-semibold px-1 py-1 text-[12px] ">
                      %1M
                    </th>
                    <th className="font-semibold px-1 py-1  text-[12px]">
                      %YtD
                    </th>
                    <th className="font-semibold px-1 py-1  text-[12px]">
                      %YoY
                    </th>
                  </tr>
                </thead>
                <tbody className="border border-[#0155B7] border-solid border-collapse  ">
                  {rate?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className={` ${
                            item.name === "Dollar Index" ? "pb-1 pt-2" : "py-1"
                          } text-center  font-bold flex items-center text-[12px]  px-2`}
                        >
                          {item.name === "U.S.10Y"
                            ? `${item.name}(%)`
                            : item.name}
                        </td>
                        <td className="text-center  text-[12px] px-2">
                          {formatNumber(item.price)}
                        </td>
                        <td
                          className={`${getColorBaseOnValue(
                            item.week
                          )} text-[12px] text-center px-2 py-1 `}
                        >
                          {formatNumber(item.week)}%
                        </td>
                        <td
                          className={`${getColorBaseOnValue(
                            item.month
                          )} text-[12px] text-center px-2 py-1 `}
                        >
                          {formatNumber(item.month)}%
                        </td>
                        <td
                          className={`${getColorBaseOnValue(
                            item.ytd
                          )} text-[12px] text-center px-2 py-1 `}
                        >
                          {formatNumber(item.ytd)}%
                        </td>
                        <td
                          className={`${getColorBaseOnValue(
                            item.year
                          )} text-[12px] text-center px-2 py-1 `}
                        >
                          {formatNumber(item.year)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="absolute bottom-[56px] left-0 w-full h-[4px] bg-[#1B68BB] opacity-60"></div>
            </div>
            <div className=" chartMetric content-top_right chart  w-[340px] h-[374px]">
              <ColumnChart
                height={"100%"}
                title={"Hiệu suất sinh lời của các chỉ số trong tuần"}
                unit={"%"}
                data={dataChartMetric}
              />
            </div>
          </div>

          <div className="content-bot w-[760px]  flex items-center mt-5  ">
            <div className="table w-[420px] h-[480px]">
              <h2 className="text-[12px]  text-center text-[#00429B] my-1">
                Biến động giá một số ngành quan trọng
              </h2>

              <TableIndustry dataTable={dataTable} />
            </div>
            <div className=" w-[340px] h-[480px]">
              <ColumnChart
                height={"100%"}
                title={"Hiệu suất sinh lời theo các nhóm ngành (Tuần)"}
                unit={"%"}
                data={dataChartIndustry}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer translate-y-[-15px] ">
        <FooterAfternoon pageNum={3} />
      </div>
    </div>
  );
};

export default Page4Week;
