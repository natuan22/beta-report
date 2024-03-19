import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import ColumnChart from "../utils/component/ColumnChart";
import { https } from "../../services/configService";
import LineChart from "../utils/component/LineChart";
import formatNumber from "../../helper/formatNumber";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import DialogAddText from "./component/DialogAddText";

const getSymbol = (value) => {
  if (value > 0) {
    return <span>+</span>;
  } else {
    return <span>-</span>;
  }
};
const getText = (value) => {
  if (value > 0) {
    return <span>tăng</span>;
  } else {
    return <span>giảm</span>;
  }
};

const AfternoonPage1 = () => {
  const [dataColumnChart1, setDataColumnChart1] = useState([]);
  const [dataColumnChart2, setDataColumnChart2] = useState([]);
  const [dataColumnChart3, setDataColumnChart3] = useState([]);
  const [data, setData] = useState();
  const [text, setText] = useState([]);
  const getData = async () => {
    try {
      const response = await https.get("/api/v1/report/ban-tin-chieu-1");
      setDataColumnChart1(response.data.data.chartTopMarket);
      setDataColumnChart2(response.data.data.chartTopForeign);
      setDataColumnChart3(response.data.data.chartTopTotalVal);
      setData(response.data.data);
      setText(response.data.data.text);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-[1480px] w-[800px]">
      <div className="header">
        <HeaderAfternoon />
      </div>
      {data ? (
        <div className="content  w-full flex flex-col justify-center items-center  mt-[20px] relative">
          <div className="absolute right-0 top-0 translate-x-[300px]">
            <DialogAddText getData={getData} />
          </div>
          <div className="flex w-[760px]">
            <div className="content-left w-[55%] ">
              {text.length > 0 ? (
                <div className="content-left_top max-h-[354px]">
                  <h2 className="text-[#0D4381] text-[35px] font-bold m-0">
                    {text[0]}
                  </h2>
                  <p className="text-[#00429B] font-bold text-[15px] my-2 text-justify">
                    {text[1]}
                  </p>
                  <p className="my-2 text-justify">
                    <p className="text-[#00429B] font-bold m-0">
                      Diễn biến thị trường:{" "}
                    </p>
                    <p className="leading-[20px] m-0 text-[14px] indent-[15px]  ">
                      {text[2]}
                    </p>
                  </p>
                </div>
              ) : (
                <div className="max-h-[354px]">Loading...</div>
              )}

              <div className="content-left-bot">
                <p className="text-[#00429B] font-bold underline underline-offset-1">
                  Điểm nhấn chính:
                </p>
                <ul className="leading-[23px] translate-x-[-15px] text-sm text-justify font-[500] ">
                  <li className="mt-2">
                    VN-Index {getText(data.perChange)}{" "}
                    <span className={`${getColorBaseOnValue(data.change)}`}>
                      {formatNumber(data.change)}
                    </span>{" "}
                    điểm{" "}
                    <span className={`${getColorBaseOnValue(data.change)}`}>
                      ({formatNumber(data.perChange)}%)
                    </span>
                    , đóng cửa tại mức {formatNumber(data.closePrice)} điểm.
                    HNX-Index {getText(data.hnxPerChange)}{" "}
                    <span className={`${getColorBaseOnValue(data.hnxChange)}`}>
                      {formatNumber(data.hnxChange)}
                    </span>{" "}
                    điểm{" "}
                    <span className={`${getColorBaseOnValue(data.hnxChange)}`}>
                      ({formatNumber(data.hnxPerChange)}%)
                    </span>
                    , đóng cửa tại mức {formatNumber(data.hnxClosePrice)} điểm.
                  </li>

                  <li>
                    Biên độ dao động ngày:{" "}
                    {formatNumber(data.highPrice - data.lowPrice)} điểm (
                    {formatNumber(data.highPrice)} -{" "}
                    {formatNumber(data.lowPrice)}).
                  </li>

                  <li className="mt-2">
                    Ngành đóng góp tăng nổi bật cho VN-Index:{" "}
                    {data.industryAdvance?.code} (
                    <span className="text-green-500">
                      {formatNumber(data.industryAdvance?.value)} điểm
                    </span>
                    ).
                  </li>

                  <li className="mt-2">
                    Ngành đóng góp giảm nổi bật cho VN-Index:{" "}
                    {data.industryDecline?.code} (
                    <span className="text-red-500">
                      {formatNumber(+data.industryDecline?.value)} điểm
                    </span>
                    ).
                  </li>

                  <li className="mt-2">
                    Cổ phiếu đóng góp tăng điểm nổi bật:{" "}
                    {data.stockAdvance.map((item, index) => (
                      <span key={item.code}>
                        {item.code}{" "}
                        <span className="text-green-500">
                          (+{formatNumber(item.value)})
                        </span>
                        {index !== data.stockAdvance.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    .
                  </li>

                  <li className="mt-2">
                    Cổ phiếu đóng góp giảm điểm nổi bật:{" "}
                    {data.stockDecline.map((item, index) => (
                      <span key={item.code}>
                        {item.code}{" "}
                        <span className="text-red-500">
                          ({formatNumber(item.value)})
                        </span>
                        {index !== data.stockDecline.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    .
                  </li>

                  <li className="mt-2">
                    Tổng giá trị giao dịch khớp lệnh của VN-Index đạt{" "}
                    {formatNumber(data.omVal / 1000000000)} tỷ đồng,{" "}
                    {getText(data.perOmVal)}
                    {""}{" "}
                    <span className={`${getColorBaseOnValue(data.perOmVal)}`}>
                      {formatNumber(data.perOmVal)}%
                    </span>{" "}
                    so với phiên trước. Bên cạnh đó, giá trị giao dịch thỏa
                    thuận là {formatNumber(data.ptVal / 1000000000)} tỷ đồng.
                  </li>

                  <li className="mt-2">
                    Độ rộng thị trường:{" "}
                    <span className="text-green-500">{data.advances}</span> mã
                    tăng,{" "}
                    <span className="text-yellow-500">{data.noChange}</span> mã
                    tham chiếu,{" "}
                    <span className="text-red-500">{data.declines}</span> mã
                    giảm.
                  </li>
                  {data.netVal > 0 ? (
                    <li className="mt-2">
                      Giao dịch ròng của khối ngoại: mua ròng{" "}
                      <span className={`text-green-500`}>
                        {formatNumber(data.netVal / 1000000000)}
                      </span>{" "}
                      tỷ đồng trên sàn HOSE, tiêu điểm là{" "}
                      {data.topBuy.map((item, index) => (
                        <span key={item.code}>
                          {item.code} ({formatNumber(item.value / 1000000000)}{" "}
                          tỷ đồng)
                          {index !== data.topBuy.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      . Ở chiều ngược lại, khối ngoại bán ròng mạnh tại các cổ
                      phiếu{" "}
                      {data.topSell.map((item, index) => (
                        <span key={item.code}>
                          {item.code} ({formatNumber(item.value / 1000000000)}{" "}
                          tỷ đồng)
                          {index !== data.topSell.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      .
                    </li>
                  ) : (
                    <li className="mt-2">
                      Giao dịch ròng của khối ngoại: bán ròng{" "}
                      <span className={`text-red-500`}>
                        {formatNumber(data.netVal / 1000000000)}
                      </span>{" "}
                      tỷ đồng trên sàn HOSE, tiêu điểm là{" "}
                      {data.topSell.map((item, index) => (
                        <span key={item.code}>
                          {item.code} ({formatNumber(item.value / 1000000000)}{" "}
                          tỷ đồng)
                          {index !== data.topBuy.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      . Ở chiều ngược lại, khối ngoại mua ròng mạnh tại các cổ
                      phiếu{" "}
                      {data.topBuy.map((item, index) => (
                        <span key={item.code}>
                          {item.code} ({formatNumber(item.value / 1000000000)}{" "}
                          tỷ đồng)
                          {index !== data.topSell.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      .
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="content-right w-[45%] h-[960px] flex flex-col items-center justify-evenly ">
              <div className="content-right_lineChart h-[250px]   w-full">
                <LineChart dataLineChart={data} />
              </div>
              <div className="content-right_columnChart1 w-full ">
                <ColumnChart
                  isChart3={false}
                  tickInterval={0.5}
                  data={dataColumnChart1}
                  unit={"điểm"}
                  currency={1}
                  color="#26A69A"
                  title={"Nhóm dẫn dắt thị trường sàn HOSE"}
                />
              </div>
              <div className="content-right_columnChart2 w-full ">
                <ColumnChart
                  isChart3={false}
                  tickInterval={50}
                  data={dataColumnChart2}
                  unit={"tỷ VND"}
                  currency={1000000000}
                  color="#26A69A"
                  title={"Top Khối ngoại giao dịch ròng sàn HOSE"}
                />
              </div>
              <div className="content-right_columnChart3  w-full">
                <ColumnChart
                  isChart3={true}
                  tickInterval={100}
                  min={0}
                  data={dataColumnChart3}
                  unit={"tỷ VND"}
                  currency={1000000000}
                  color="#1B68BB"
                  title={"Top giá trị giao dịch sàn HOSE"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}

      <div className="mt-[11px]">
        <FooterAfternoon pageNum={1} />
      </div>
    </div>
  );
};

export default AfternoonPage1;
