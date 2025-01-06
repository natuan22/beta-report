import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import formatNumber from "../helper/formatNumber";
import { getColorBaseOnValue } from "../helper/getColorBaseOnValue";
import { https } from "../services/configService";

const Page2 = () => {
  const [rate, setRate] = useState();
  const [interestRate, setInterestRate] = useState();
  const [goodsPrice, setGoodsPrice] = useState();
  const [stockMarket, setStockMarket] = useState();

  useEffect(() => {
    const fetchDataRate = async () => {
      try {
        const response = await https.get("api/v1/report/ty-gia");
        setRate(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataInterestRate = async () => {
      try {
        const response = await https.get("/api/v1/report/lai-suat");
        setInterestRate(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataGoodsPrice = async () => {
      try {
        const response = await https.get("/api/v1/report/hang-hoa");
        setGoodsPrice(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataStockMarket = async () => {
      try {
        const response = await https.get(
          "api/v1/report/thi-truong-chung-khoan"
        );
        setStockMarket(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDataRate();
    fetchDataInterestRate();
    fetchDataGoodsPrice();
    fetchDataStockMarket();
  }, []);

  return (
    <div className="h-[1152px] w-[800px]  ">
      <div className="header">
        <Header date={"21/11/2023"} type={2} />
      </div>
      <div className="title w-full relative mt-[10px] translate-x-[15px]">
        <div className=" h-[52px] grid place-items-center ">
          <h2 className="text-[20px] font-bold text-white text-center translate-y-[-25%]">
            THÔNG TIN TỔNG HỢP GỬI ĐẾN NHÀ ĐẦU TƯ
          </h2>
        </div>
        <div className="absolute top-0 z-[-1]">
          <div className="skew-x-[35deg] flex translate-y-[1px]">
            <div className="bg-[#E88C08] h-[26px] w-[25px] "></div>
            <div className="w-[730px] bg-[#0155B7] h-[26px]"></div>
          </div>
          <div className="skew-x-[-35deg] flex">
            <div className="bg-[#E88C08] h-[26px] w-[25px] "></div>
            <div className="w-[730px] bg-[#0155B7] h-[26px]"></div>
          </div>
        </div>
      </div>

      <div className="content-top w-[780px] h-[310px] z-10 relative  flex justify-evenly ml-2 mt-2 ">
        <div>
          <h2 className="text-[16px] font-bold text-[#0155B7] text-center my-1">
            Tỷ giá
          </h2>
          <table className="bg-transparent border-collapse w-[375px]  h-[90%]">
            <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
              <tr className="text-white ">
                <th className="font-semibold px-1 py-1  ">Ngoại tệ</th>
                <th className="font-semibold px-1 py-1  ">Thị giá</th>
                <th className="font-semibold px-1 py-1  ">%D</th>
                <th className="font-semibold px-1 py-1  ">%1M</th>
                <th className="font-semibold px-1 py-1  ">%YtD</th>
              </tr>
            </thead>
            <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
              {rate?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center px-2 py-1 font-bold flex items-center">
                      <img
                        src={`/assets/exchange_rate_flag/${item.code}.png`}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      {item.code}
                    </td>
                    <td className="text-center px-2 py-1">
                      {formatNumber(item.price)}
                    </td>
                    <td
                      className={`${getColorBaseOnValue(
                        item.day
                      )} text-center px-1 py-1`}
                    >
                      {formatNumber(item.day)}
                    </td>
                    <td
                      className={`${getColorBaseOnValue(
                        item.month
                      )} text-center px-1 py-1`}
                    >
                      {formatNumber(item.month)}
                    </td>
                    <td
                      className={`${getColorBaseOnValue(
                        item.ytd
                      )} text-center px-1 py-1`}
                    >
                      {formatNumber(item.ytd)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-[16px] font-bold text-[#0155B7] text-center my-1">
            Lãi suất bình quân liên ngân hàng
          </h2>
          <table className="bg-transparent border-collapse w-[375px]  h-[90%]">
            <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
              <tr className="text-white ">
                <th className="font-semibold px-1 py-1 ">Kỳ hạn</th>
                <th className="font-semibold px-1 py-1 ">Mức lãi suất</th>
                <th className="font-semibold px-1 py-1 ">%D</th>
                <th className="font-semibold px-1 py-1 ">%1M</th>
                <th className="font-semibold px-1 py-1 ">%YtD</th>
              </tr>
            </thead>
            <tbody className="border-1 border-[#0155B7] border-solid border-collapse  ">
              {interestRate?.map((item, index) => (
                <tr key={index}>
                  <td className="text-center px-1 py-3 font-semibold">
                    {item.code}
                  </td>
                  <td className="text-center px-2 py-3">
                    {formatNumber(item.price)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.day
                    )} text-center px-1 py-3`}
                  >
                    {formatNumber(item.day)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.month
                    )} text-center px-1 py-3`}
                  >
                    {formatNumber(item.month)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.ytd
                    )} text-center px-1 py-3`}
                  >
                    {formatNumber(item.ytd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-mid w-[790px] h-[300px] z-10 relative ml-2  ">
        <div className="w-[760px] translate-x-[10px]">
          <h2 className="text-[16px] font-bold text-[#0155B7] text-center m-1">
            Giá hàng hóa
          </h2>
          <table className="bg-transparent border-collapse w-[100%]">
            <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
              <tr className="text-white ">
                <th className="font-semibold px-2 py-1 text-left w-[182px] ">
                  Hàng hóa
                </th>
                <th className="font-semibold px-1 py-1 ">Thị giá</th>
                <th className="font-semibold px-1 py-1 ">%D</th>
                <th className="font-semibold px-1 py-1 ">%1M</th>
                <th className="font-semibold px-1 py-1 ">%YtD</th>
                <th className="font-semibold px-1 py-1 ">%YoY</th>
              </tr>
            </thead>
            <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
              {goodsPrice?.slice(0, 8)?.map((item, index) => (
                <tr key={index}>
                  <td className="text-left pl-2 py-1 font-semibold ">
                    {item.name}
                  </td>
                  <td className="text-center px-2 py-1">
                    {formatNumber(item.price)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.day
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.day)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.month
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.month)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.ytd
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.ytd)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.year
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.year)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-bot w-[790px] h-[300px] z-10 relative ml-2  ">
        <div className="w-[760px] translate-x-[10px]">
          <h2 className="text-[16px] font-bold text-[#0155B7] text-center m-1">
            Thị trường chứng khoán Việt Nam và Quốc tế
          </h2>
          <table className="bg-transparent border-collapse w-[100%]">
            <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
              <tr className="text-white ">
                <th className="font-semibold px-2 py-1 text-left w-[120px] ">
                  Chỉ số
                </th>
                <th className="font-semibold px-1 py-1 ">Điểm số</th>
                <th className="font-semibold px-1 py-1 ">%D</th>
                <th className="font-semibold px-1 py-1 ">%1M</th>
                <th className="font-semibold px-1 py-1 ">%YtD</th>
                <th className="font-semibold px-1 py-1 ">%YoY</th>
              </tr>
            </thead>
            <tbody className="border-1 border-[#0155B7] border-solid border-collapse ">
              {stockMarket?.map((item, index) => (
                <tr key={index}>
                  <td className="text-left pl-2 py-1 font-bold">{item.name}</td>
                  <td className="text-center px-2 py-1">
                    {formatNumber(item.price)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.day
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.day)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.month
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.month)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.ytd
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.ytd)}
                  </td>
                  <td
                    className={`${getColorBaseOnValue(
                      item.year
                    )} text-center px-1 py-1`}
                  >
                    {formatNumber(item.year)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Footer pageNum={2} />
      </div>
    </div>
  );
};

export default Page2;
