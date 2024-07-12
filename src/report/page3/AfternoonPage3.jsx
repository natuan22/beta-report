import React, { useEffect, useState } from "react";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import formatNumber from "../../helper/formatNumber";
import { https } from "../../services/configService";
import AreaChart from "../utils/component/AreaChart";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import StackingAreaChart from "../utils/component/StackingAreaChart";
import ColumnChartAfternoon from "./component/ColumnChartAfternoon";
import ColumnChartPage3 from "./component/ColumnChartPage3";
import MultipleColumnChart from "./component/MultipleColumnChart";

const getArrow = (value) => {
  if (value < 0)
    return (
      <p className="text-red-500 m-0">
        <FaDownLong />
      </p>
    );
  if (value > 0)
    return (
      <p className="text-green-500 m-0">
        <FaUpLong />
      </p>
    );
};

const AfternoonPage3 = () => {
  const [dataColumChartLeft, setDataColumnChartLeft] = useState([]);
  const [dataColumChartRight, setDataColumnChartRight] = useState([]);
  const [dataColumnForeign, setDataColumnForeign] = useState([]);
  const [dataColumnIndividual, setDataColumnIndividual] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataMultipleColumn1, setDataMultipleColumn1] = useState([]);
  const [dataMultipleColumn2, setDataMultipleColumn2] = useState([]);
  const getData = async (type) => {
    try {
      const response = await https.get("/api/v1/report/dong-tien-rong", {
        params: {
          type,
        },
      });
      if (type === 0) {
        setDataColumnChartLeft(response.data.data);
      } else if (type === 1) {
        setDataColumnChartRight(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getDataTable = async () => {
    try {
      const response = await https.get("/api/v1/report/phan-nganh");
      const data = response.data.data;

      // Tìm đối tượng có industry là "Tài nguyên"
      const taiNguyenObject = data.find(
        (item) => item.industry === "Tài nguyên"
      );

      // Nếu tìm thấy đối tượng, thay đổi các giá trị như mong muốn
      if (taiNguyenObject) {
        taiNguyenObject.day_change_percent = -0.8;
        taiNguyenObject.week_change_percent = 0.3;
        taiNguyenObject.month_change_percent = -0.32;
        taiNguyenObject.ytd = 15.89;
      }

      // Cập nhật state hoặc làm gì đó với data mới
      setDataTable(data);
    } catch (err) {
      console.error(err);
    }
  };
  const getData2 = async (type) => {
    try {
      const response = await https.get("api/v1/report/top-mua-ban-rong", {
        params: {
          type,
        },
      });
      if (type === 0) {
        setDataColumnForeign(response.data.data);
      } else if (type === 1) {
        setDataColumnIndividual(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getDataMultipleColumn = async () => {
    try {
      const response = await https.get("api/v1/report/bien-dong-gtgd");

      setDataMultipleColumn1(response.data.data.slice(0, 4));
      setDataMultipleColumn2(response.data.data.slice(4));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData(0);
    getData(1);
    getDataTable();
    getData2(0);
    getData2(1);
    getDataMultipleColumn();
  }, []);
  return (
    <div className="h-[1152px] w-[800px]">
      <div className="relative">
        <div className="header">
          <HeaderAfternoon />
        </div>

        <div className="absolute top-[100px] z-10 w-full flex flex-col items-center">
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
                      <th className="font-semibold px-2 py-1 text-left     ">
                        Phân ngành
                      </th>
                      <th className="font-semibold px-1 py-1 text-[12px] w-[40px]   ">
                        %D
                      </th>
                      <th className="font-semibold px-1 py-1  text-[12px] w-[40px]   ">
                        %W
                      </th>
                      <th className="font-semibold px-1 py-1 text-[12px]  w-[40px]   ">
                        %M
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
                          className=" border-[#0155B7] border-y-0  border-collapse border-1 bor border-solid text-[13px] font-semibold"
                        >
                          <td className="text-left  py-1 font-bold  text-[11px] text-[#00429B] w-[135px] px-1 ">
                            {item.industry}
                          </td>
                          <td className="text-center pr-2 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px]  flex flex-col items-center">
                            <div className="flex items-center justify-between w-[40px]">
                              {getArrow(item.day_change_percent)}
                              <p className="m-0">
                                {formatNumber(item.day_change_percent)}%
                              </p>
                            </div>
                          </td>
                          <td
                            className={`text-center pr-2 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] x   `}
                          >
                            <div className="flex items-center justify-between w-[40px]">
                              {getArrow(item.week_change_percent)}
                              <p className="m-0">
                                {" "}
                                {formatNumber(item.week_change_percent)}%
                              </p>
                            </div>
                          </td>
                          <td
                            className={`text-center pr-2 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px]  flex flex-col items-center `}
                          >
                            <div className="flex items-center justify-between w-[40px] ">
                              {getArrow(item.month_change_percent)}
                              <p className="m-0">
                                {formatNumber(item.month_change_percent)}%
                              </p>
                            </div>
                          </td>
                          <td
                            className={`text-center  w-[90px] px-1 py-1 border-[#0155B7] border-y-0 border-r-0 border-collapse border-1 bor border-solid text-[11px] `}
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
              <div className="areaChart">
                <AreaChart />
              </div>
              <div className="stackingAreaChart">
                <StackingAreaChart />
              </div>
              <div className="columnChart">
                <ColumnChartPage3
                  title={"Dòng tiền ròng khối ngoại qua 20 phiên gần nhất"}
                  unit={"tỷ VNĐ"}
                  data={dataColumChartLeft}
                />
              </div>
            </div>
            <div className="content-right  w-[50%] flex flex-col items-center justify-center">
              <div className="columnChart-1 w-full">
                <MultipleColumnChart
                  legend={false}
                  title={"Biến động GTGD một số ngành quan trọng"}
                  unit={" (tỷ VNĐ)"}
                  data={dataMultipleColumn1}
                />
                <MultipleColumnChart
                  legend={true}
                  title={""}
                  unit={""}
                  data={dataMultipleColumn2}
                />
              </div>
              <div className="columnChart-2 w-full">
                <ColumnChartAfternoon
                  title={"Top ngành mua bán ròng khối ngoại"}
                  unit={"tỷ VNĐ"}
                  data={dataColumnForeign}
                />
              </div>
              <div className="columnChart-3 w-full">
                <ColumnChartAfternoon
                  title={"Top ngành mua bán ròng tự doanh"}
                  unit={"tỷ VNĐ"}
                  data={dataColumnIndividual}
                />
              </div>
              <div className="columnChart-4 w-full">
                <ColumnChartPage3
                  title={"Dòng tiền ròng tự doanh qua 20 phiên gần nhất"}
                  unit={"tỷ VNĐ"}
                  data={dataColumChartRight}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="footer mt-[10px]">
          <FooterAfternoon pageNum={3} />
        </div>
      </div>
    </div>
  );
};

export default AfternoonPage3;
