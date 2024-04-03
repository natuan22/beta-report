import React, { useEffect, useState } from "react";
import HeaderWeek from "../../utils/HeaderWeek";
import FooterWeek from "../../utils/FooterWeek";
import GoodsPrice from "./component/GoodsPrice";
import TableRate from "./component/TableRate";
import RateLineChart from "./component/RateLineChart";
import AverageRate from "./component/AverageRate";
import { https } from "../../../services/configService";
import InterestRateTable from "./component/InterestRateTable";

const Page6Week = () => {
  const [dataAverageRateChart, setDataAverageRateChart] = useState();
  const [dataGoodsPrice, setDataGoodsPrice] = useState();
  const [dataTableRate, setDataTableRate] = useState();
  const [dataRateLineChart, setDataRateLineChart] = useState();
  const [dataInterestRateTable, setDataInterestRateTable] = useState();
  const getDataAverageRateChart = async () => {
    try {
      const res = await https.get(
        "/api/v1/report/lai-suat-binh-quan-lien-ngan-hang"
      );
      setDataAverageRateChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataGoodsPrice = async () => {
    try {
      const res = await https.get("/api/v1/report/hang-hoa");
      setDataGoodsPrice(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataTableRate = async () => {
    try {
      const res = await https.get("/api/v1/report/ty-gia");
      setDataTableRate(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataRateLineChart = async () => {
    try {
      const res = await https.get("/api/v1/report/ty-gia-usd-eur");
      setDataRateLineChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataInterestRateTable = async () => {
    try {
      const res = await https.get("/api/v1/report/lai-suat");
      setDataInterestRateTable(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDataGoodsPrice();
    getDataAverageRateChart();
    getDataTableRate();
    getDataRateLineChart();
    getDataInterestRateTable();
  }, []);
  return (
    <div className="h-[1480px] w-[800px]">
      <div className="header h-[135px]">
        <HeaderWeek />
      </div>

      <div className="content h-[945px] w-full mt-3 flex flex-col items-center">
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
              Dữ liệu vĩ mô
            </h2>
          </div>
        </div>
        <div className="cont-top flex justify-between w-[760px] h-[260px]">
          <div className="w-[370px] h-[245px]">
            <h2 className="my-1 text-[14px] text-[#0155B7] text-center ">
              Giá hàng hóa
            </h2>
            <GoodsPrice data={dataGoodsPrice} />
          </div>
          <div className="w-[370px] h-[245px]">
            <h2 className="my-1 text-[14px] text-[#0155B7] text-center ">
              Lãi suất bình quân liên ngân hàng
            </h2>

            <InterestRateTable data={dataInterestRateTable} />
          </div>
        </div>
        <div className="cont-mid flex justify-between w-[760px] h-[340px] mt-[25px]">
          <div className="w-[360px] h-[270px]">
            <h2 className="my-1 text-[14px] text-[#0155B7] text-center ">
              Tỷ giá
            </h2>

            <TableRate data={dataTableRate} />
          </div>
          <div className="w-[360px] h-[270px">
            <h2 className="my-1 text-[14px] text-[#0155B7] text-center ">
              Tỷ giá USD và EUR
            </h2>

            <RateLineChart data={dataRateLineChart} />
          </div>
        </div>
        <div className="cont-bot w-[760px] h-[245px]">
          <h2 className="my-1 text-[14px] text-[#0155B7] text-left ">
            Lãi suất BQ liên Ngân hàng (%/năm)
          </h2>
          <AverageRate data={dataAverageRateChart} />
        </div>
      </div>

      <div className="footer">
        <FooterWeek pageNum={5} />
      </div>
    </div>
  );
};

export default Page6Week;
