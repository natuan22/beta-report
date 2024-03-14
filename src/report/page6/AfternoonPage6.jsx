import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import { https } from "../../services/configService";
import LineChartGoodsPrice from "../../week/component/Page8/component/LineChartGoodsPrice";
import { IoIosStar } from "react-icons/io";
import RateLineChart from "../utils/component/RateLineChart";

const AfternoonPage6 = () => {
  const [data, setData] = useState();
  const [dataRateLineChart, setDataRateLineChart] = useState();

  const getData = async () => {
    try {
      const res = await https.get("api/v1/report/bien-dong-gia-ca-hang-hoa");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataRateLine = async () => {
    try {
      const res = await https.get("/api/v1/report/ty-gia-usd-eur");
      setDataRateLineChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
    getDataRateLine();
  }, []);

  return (
    <div className="h-[1480px] w-[800px]">
      <div className="header">
        <HeaderAfternoon />
      </div>

      <div className="cont h-[950px] flex flex-col items-center mb-2">
        {data ? (
          <div className="w-[760px] h-[930px] flex flex-col justify-evenly">
            <div className="cont-top flex justify-between w-full ">
              <div className="w-[370px]">
                <div className="flex items-center justify-center w-[250px]">
                  <span className="text-[18px] text-[#EF9C21] ">
                    <IoIosStar />
                  </span>
                  <h2 className="my-1 text-[#00429B] text-[14px]  ml-2">
                    Giá dầu Brent và giá khí tự nhiên
                  </h2>
                </div>
                <LineChartGoodsPrice
                  name1={"Dầu Brent (USD/Bbl)"}
                  name2={"Khí Gas (USD/MMBtu)"}
                  dataChart={data.data_0}
                />
              </div>
              <div className="w-[370px]">
                <div className="flex items-center justify-center w-[250px]">
                  <span className="text-[18px] text-[#EF9C21] ">
                    <IoIosStar />
                  </span>
                  <h2 className="my-1 text-[#00429B] text-[14px] ml-2">
                    Giá Đồng và giá Vàng
                  </h2>
                </div>
                <LineChartGoodsPrice
                  name1={"Đồng (USD/Lbs)"}
                  name2={"Vàng (USD/t.oz)"}
                  dataChart={data.data_1}
                />
              </div>
            </div>

            <div className="cont-mid flex justify-between w-full ">
              <div className="w-[370px]">
                <div className="flex items-center justify-center w-[250px]">
                  <span className="text-[18px] text-[#EF9C21] ">
                    <IoIosStar />
                  </span>
                  <h2 className="my-1 text-[#00429B] text-[14px]  ml-2">
                    Giá Thép HRC và giá Thép
                  </h2>
                </div>
                <LineChartGoodsPrice
                  name2={"Thép HRC (USD/T)"}
                  name1={"Thép (CNY/T)"}
                  dataChart={data.data_2}
                />
              </div>
              <div className="w-[370px]">
                <div className="flex items-center justify-center w-[250px]">
                  <span className="text-[18px] text-[#EF9C21] ">
                    <IoIosStar />
                  </span>
                  <h2 className="my-1 text-[#00429B] text-[14px] ml-2">
                    Giá Cotton và giá Đường
                  </h2>
                </div>
                <LineChartGoodsPrice
                  name1={"Bông (USD/Lbs)"}
                  name2={"Đường (USD/Lbs)"}
                  dataChart={data.data_3}
                />
              </div>
            </div>

            <div className="cont-bot flex justify-between w-full ">
              <div className="w-[370px]">
                <div className="flex items-center justify-center w-[250px]">
                  <span className="text-[18px] text-[#EF9C21] ">
                    <IoIosStar />
                  </span>
                  <h2 className="my-1 text-[#00429B] text-[14px]  ml-2">
                    Tỷ giá USD và EUR
                  </h2>
                </div>
                <RateLineChart data={dataRateLineChart} />
              </div>
              <div className="w-[370px]">
                <div className="flex items-center justify-center w-[250px]">
                  <span className="text-[18px] text-[#EF9C21] ">
                    <IoIosStar />
                  </span>
                  <h2 className="my-1 text-[#00429B] text-[14px] ml-2">
                    Chỉ số DXY và U.S.10Y
                  </h2>
                </div>
                <LineChartGoodsPrice
                  name1={"Dollar Index (điểm)"}
                  name2={"U.S.10Y (%)"}
                  dataChart={data.data_5}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="footer">
        <FooterAfternoon pageNum={5} />
      </div>
    </div>
  );
};

export default AfternoonPage6;
