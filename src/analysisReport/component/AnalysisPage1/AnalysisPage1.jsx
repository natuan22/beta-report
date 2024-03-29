import React, { useEffect, useState } from "react";
import HeaderAnalysis from "../utils/HeaderAnalysis";
import FooterAnalysis from "../utils/FooterAnalysis";
import { https } from "../../../services/configService";
import formatNumber from "../../../helper/formatNumber";
import formatNumberPage3 from "../../../helper/formatNumberPage3";
import LineChart from "./utils/LineChart";
import Table from "./utils/Table";
import TableSR from "./utils/TableSR";
// import img from "../../../app/asset/img/testBanner.png";
import ColumnChart from "./utils/ColumnChart";
import DialogAddTechnicalReportInfor from "./utils/DialogAddTechnicalReportInfor";
import convertUrlToDataURL from "../../../helper/convertUrlToDataURL";
import "./styles/analysisPage1.css";
import GauChartGenAnalReportAuto from "../utils/GauChartGenAnalReportAuto";
import Candlestick from "../utils/Candlestick";
import calculateChartValues from "../../../helper/calculateChartValues";

const resourceURL = process.env.REACT_APP_IMG_URL;
const getColorBaseOnName = (value) => {
  if (value === "Tích cực") return "text-green-500";
  if (value === "Tiêu cực") return "text-red-500";
  if (value === "Trung lập") return "text-yellow-500";
};
const AnalysisPage1 = ({ stock, type }) => {
  // console.log(stock);
  const [data, setData] = useState();
  const [dataAnalysis, setDataAnalysis] = useState();
  const [dataChart, setDataChart] = useState();
  const [dataTable, setDataTable] = useState();
  const [dataColumn, setDataColumn] = useState();
  const [imgSrc, setImgSrc] = useState();
  const [maxType, setMaxType] = useState("");
  const getDataAnalysis = async () => {
    try {
      const res = await https.get("api/v1/report/chi-so-ky-thuat", {
        params: {
          stock,
        },
      });
      setDataAnalysis(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getStockPage1 = async () => {
    try {
      const res = await https.get("api/v1/report/thong-tin-co-phieu", {
        params: {
          stock,
        },
      });
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataChart = async () => {
    try {
      const res = await https.get("api/v1/report/tuong-quan-bien-dong-gia", {
        params: {
          stock,
        },
      });
      setDataChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataTable = async () => {
    try {
      const res = await https.get("api/v1/report/bien-dong-gia", {
        params: {
          stock,
        },
      });
      setDataTable(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataColumnChart = async () => {
    try {
      const res = await https.get("api/v1/report/thong-ke-lenh-mua-ban", {
        params: {
          stock,
        },
      });
      setDataColumn(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!stock && stock.split("")?.length < 3) return;
    getStockPage1();
    getDataChart();
    getDataTable();
    getDataColumnChart();
    getDataAnalysis();
  }, [stock]);
  // console.log(stock, data);

  const onSubmitSuccess = () => {
    getStockPage1();
  };
  const getImgFromInput = (src) => {
    setImgSrc(src);
  };

  useEffect(() => {
    if (data && data.img) {
      convertUrlToDataURL(`${resourceURL}${data.img}`).then((dataUrl) => {
        setImgSrc(dataUrl);
      });
    } else {
      setImgSrc("");
    }
  }, [data]);
  useEffect(() => {
    if (dataAnalysis) {
      const arrValues = calculateChartValues(dataAnalysis.generalSignal);
      const { positive, negative } = dataAnalysis.generalSignal;
      const value = positive + -negative;

      switch (true) {
        case value >= arrValues[0] && value <= arrValues[1]:
          setMaxType("Rất tiêu cực");
          break;
        case value >= arrValues[1] && value <= arrValues[2]:
          setMaxType("Tiêu cực");
          break;
        case value >= arrValues[2] && value <= arrValues[3]:
          setMaxType("Trung lập");
          break;
        case value >= arrValues[3] && value <= arrValues[4]:
          setMaxType("Tích cực");
          break;
        case value >= arrValues[4] && value <= arrValues[5]:
          setMaxType("Rất tích cực");
          break;
        default:
          setMaxType("Không xác định");
      }
    }
  }, [dataAnalysis]);
  return (
    <div className="h-[1480px] w-[900px] relative">
      <div className="absolute top-[300px] left-[860px] z-30 w-[223px]">
        {type === 1 ? (
          <DialogAddTechnicalReportInfor
            stock={stock}
            getImgFromInput={getImgFromInput}
            onSubmitSuccess={onSubmitSuccess}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="header">
        <HeaderAnalysis />
      </div>

      <div className="content w-[800px] flex flex-col items-center  h-[990px]">
        <div className="w-[790px] flex h-full justify-between ">
          <div className="cont-left w-[330px] ">
            {data ? (
              <div className="h-[555px]">
                <div className="stock-info flex flex-col justify-around h-[150px] w-full ">
                  <div className="flex items-center justify-around ">
                    {stock ? (
                      <img
                        src={`/logo_${stock.toUpperCase()}.png`}
                        alt="stock"
                        width="25%"
                      />
                    ) : (
                      <>Loading...</>
                    )}

                    <div className="w-[210px]">
                      <p className="m-0 text-[#0055B6] font-bold text-[40px]">
                        {data.code}
                      </p>
                      <p className="m-0 text-[#FF8700] font-bold ">
                        {data.companyName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#023E8A] font-bold m-0">
                      Ngành cấp II:{" "}
                      <span className="text-black font-semibold">
                        {data.LV2}
                      </span>{" "}
                    </p>
                    <p className="text-[#023E8A] font-bold m-0">
                      Ngành cấp IV:{" "}
                      <span className="text-black font-semibold">
                        {data.LV4}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full pt-1">
                  <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[30px]">
                    <h2 className="text-white text-[15px] leading-[25px] font-semibold text-center m-0">
                      Thông tin cổ phiếu
                    </h2>
                  </div>
                  {type === 1 ? (
                    <div></div>
                  ) : (
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Thị giá (đồng/CP)
                      </p>
                      <p className="text-[#0249A4] m-1 ">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold">
                        {formatNumberPage3(data.gia_thi_truong * 1000)}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Vốn hóa thị trường (tỷ đồng)
                    </p>
                    <p className="text-[#0249A4] m-1 ">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.marketCap / 1000000000)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Số CP đang lưu hành (triệu CP)
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1  w-[25%] text-end font-semibold">
                      {formatNumber(data.shareout / 1000000)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Giá cao nhất 52 tuần (đồng)
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumberPage3(data.high)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Giá thấp nhất 52 tuần (đồng)
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumberPage3(data.low)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      KLCP trung bình 20 phiên (CP)
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumberPage3(data.kl)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      GTGD trung bình 20 phiên{" "}
                      <span className="text-[13px]">(tỷ đồng)</span>
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.gia_tri / 1000000000)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">EPS (đồng/CP)</p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.EPS)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">P/E (lần)</p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.PE)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">BVPS (đồng/CP)</p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.BVPS)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">P/B (lần)</p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.PB)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Tỷ lệ sở hữu nước ngoài
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.nuoc_ngoai)}%
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Tỷ lệ sở hữu nhà nước
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold">
                      {formatNumber(data.nha_nuoc)}%
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading....</div>
            )}
            <div
              className={`lineChart ${
                type === 1 ? "translate-y-[-35px]" : "translate-y-[-6.5px]"
              }`}
            >
              <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[30px] z-30  text-center p-1  tran ">
                <h2 className="text-white font-semibold text-[12px] m-0 leading-[19px] ">
                  Tương quan biến động giá cổ phiếu{" "}
                  <span className="uppercase">{stock}</span> trong 1 năm (%)
                </h2>
              </div>
              {dataChart ? (
                <LineChart data={dataChart} type={type} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div
              className={`table ${
                type === 1 ? "translate-y-[-60px]" : "translate-y-[-20px]"
              } `}
            >
              <Table data={dataTable} type={type} />
            </div>
            {type === 1 ? (
              <div className="table-2 translate-y-[-60px] ">
                <TableSR data={data} />
              </div>
            ) : (
              <div></div>
            )}
            {type === 1 ? (
              <div className="translate-y-[-50px] font-bold text-[#023E8A] uppercase pl-1 text-[13px] overflow-visible whitespace-nowrap">
                Chuyên Viên Phân Tích: {data && data.analyst_name}
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="cont-right w-[450px] mr-1 ">
            {type === 1 ? (
              <div className="h-[150px] w-[450px] flex items-center justify-between">
                <div className="w-[150px] text-center h-[120px]">
                  <p className="m-0 font-bold text-[16px]">Khuyến nghị</p>
                  {data && data.is_sell.toUpperCase() === "MUA" ? (
                    <p
                      style={{ textShadow: "-2px 3px 3px #95e4bf " }}
                      className="text-green-500 uppercase font-bold text-[60px] m-0"
                    >
                      {data && data.is_sell}
                    </p>
                  ) : (
                    <p
                      style={{ textShadow: "-2px 3px 3px #e4a095 " }}
                      className="text-red-500 uppercase font-bold text-[60px] m-0"
                    >
                      {data && data.is_sell}
                    </p>
                  )}
                </div>
                <div className="bg-[#AECFF6] w-[300px] h-[120px] flex flex-col items-center justify-center ">
                  <div className="flex items-center justify-between mt-1">
                    <p className="m-0 w-[155px] text-[14px] font-semibold">
                      Giá mục tiêu {data && data.thoi_gian_nam_giu}{" "}
                    </p>
                    <p className="w-[5px] m-0">:</p>
                    <p className="m-0 w-[110px] text-[13px] font-bold">
                      {data && formatNumberPage3(Number(data.gia_muc_tieu))}{" "}
                      đồng/CP
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="m-0 w-[155px] text-[14px] font-semibold">
                      Giá thị trường
                    </p>
                    <p className="w-[5px] m-0">:</p>
                    <p className="m-0 w-[110px] text-[13px] font-bold">
                      {data &&
                        formatNumberPage3(
                          Number(data.gia_thi_truong) * 1000
                        )}{" "}
                      đồng/CP
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="m-0 w-[155px] text-[14px] font-semibold">
                      Lợi nhuận kỳ vọng
                    </p>
                    <p className="w-[5px] m-0">:</p>
                    <p className="m-0 w-[110px] text-[13px] font-bold text-start text-[#00BF63]">
                      {data &&
                        formatNumber(
                          ((Number(data.gia_muc_tieu) -
                            Number(data.gia_thi_truong * 1000)) /
                            Number(data.gia_thi_truong * 1000)) *
                            100
                        )}{" "}
                      %
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="m-0 w-[155px] text-[14px] font-semibold">
                      Giá bán dừng lỗ
                    </p>
                    <p className="w-[5px] m-0">:</p>
                    <p className="m-0 w-[110px] text-[13px] font-bold">
                      {data && formatNumberPage3(Number(data.gia_ban_dung_lo))}{" "}
                      đồng/CP
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[150px] w-[450px] flex items-center justify-between">
                <div className="w-[202px] text-center h-[120px]">
                  <p className="m-0 font-bold text-[16px] pt-2">
                    Tín hiệu kỹ thuật tổng hợp
                  </p>
                  <p
                    style={{
                      textShadow:
                        maxType === "Rất tích cực"
                          ? "-2px 3px 3px #95e4bf"
                          : maxType === "Tích cực"
                          ? "-2px 3px 3px #95e4bf"
                          : maxType === "Tiêu cực"
                          ? "-2px 3px 3px #e4a095"
                          : maxType === "Rất tiêu cực"
                          ? "-2px 3px 3px #e4a095"
                          : "-2px 3px 3px #FACC15",
                    }}
                    className={`${
                      maxType === "Rất tích cực"
                        ? "text-green-500"
                        : maxType === "Tích cực"
                        ? "text-green-500"
                        : maxType === "Tiêu cực"
                        ? "text-red-500"
                        : maxType === "Rất tiêu cực"
                        ? "text-red-500"
                        : "text-yellow-500"
                    } uppercase font-bold text-[30px] text-center m-0 pt-5 overflow-visible whitespace-nowrap`}
                  >
                    {maxType}
                  </p>
                </div>
                <div className="w-[248px]">
                  {dataAnalysis ? (
                    <GauChartGenAnalReportAuto
                      data={dataAnalysis.generalSignal}
                    />
                  ) : (
                    <div className="text-center">Loading...</div>
                  )}
                </div>
              </div>
            )}

            <div className="imgPrice w-[450px] pt-1">
              <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[30px]  text-center p-1 ">
                <h2 className="text-white font-semibold text-[15px] m-0 leading-[25px]">
                  Biểu đồ giá
                </h2>
              </div>
              {type === 1 ? (
                <img
                  // src={data ? `${resourceURL}${data.img}` : ""}
                  src={imgSrc}
                  alt="img"
                  width={450}
                  height={200}
                />
              ) : (
                <div>
                  {dataAnalysis ? (
                    <Candlestick data={dataAnalysis.chart} />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              )}

              <div className="columnChart ">
                <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[30px] z-30  text-center p-1  tran ">
                  <h2 className="text-white font-semibold text-[15px] m-0 leading-[19px] ">
                    Thống kê lệnh Mua- Bán chủ động (nghìn CP)
                  </h2>
                </div>
                <div className="translate-y-[5px] z-0">
                  {dataColumn ? (
                    <ColumnChart data={dataColumn} />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
                {type === 1 ? (
                  <div>
                    {data ? (
                      <div className="text w-[450px]" id="content_analysis">
                        <h2 className="m-0 text-[15px] text-[#023E8A]">
                          {data.text[0]}
                        </h2>
                        <p className="m-0 text-[14px] text-justify">
                          <div
                            dangerouslySetInnerHTML={{ __html: data.text[1] }}
                          ></div>
                        </p>

                        <h2 className="m-0 text-[15px] text-[#023E8A]">
                          Rủi ro xu hướng
                        </h2>
                        <p className="m-0 text-[14px] text-justify">
                          {data.text[2]}
                        </p>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                ) : (
                  <div>
                    {dataAnalysis ? (
                      <div className="flex">
                        <table className="w-full h-[250px] border-y-[1px] border-l-[1px] border-r-[0.5px] border-solid border-[#143A65] border-collapse">
                          <thead className="bg-gradient-to-b from-[#024A9B] to-[#0568D8]">
                            <tr className="text-white font-semibold text-center text-[14px]">
                              <td className="p-1">Chỉ báo</td>
                              <td className="p-1">Tín hiệu</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="font-semibold">
                              <td className="text-left">RSI</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.rsi.rate
                                )}`}
                              >
                                {dataAnalysis.rsi.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">CCI</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.cci.rate
                                )}`}
                              >
                                {dataAnalysis.cci.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">Williams %R</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.williams.rate
                                )}`}
                              >
                                {dataAnalysis.williams.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">DI+ DI-</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.rsi.rate
                                )}`}
                              >
                                {dataAnalysis.rsi.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">STOCHASTIC</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.stochastic.rate
                                )}`}
                              >
                                {dataAnalysis.stochastic.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">STOCHASTIC RSI</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.stochasticRsi.rate
                                )}`}
                              >
                                {dataAnalysis.stochasticRsi.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">MACD</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.macd.rate
                                )}`}
                              >
                                {dataAnalysis.macd.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left">MACD Histogram</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataAnalysis.macdHistogram.rate
                                )}`}
                              >
                                {dataAnalysis.macdHistogram.rate}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="w-full h-[250px] border-y-[1px] border-r-[1px] border-l-0 border-solid border-[#143A65] border-collapse">
                          <thead className="bg-gradient-to-b from-[#024A9B] to-[#0568D8]">
                            <tr className="text-white font-semibold text-center text-[14px]">
                              <td className="p-1">Đường trung bình động</td>
                              <td className="p-1">Tín hiệu</td>
                            </tr>
                          </thead>

                          <tbody className="">
                            {dataAnalysis.table?.map((item, index) => {
                              return (
                                <tr
                                  className="text-center font-semibold"
                                  key={index}
                                >
                                  <td className="">{item.name}</td>
                                  <td
                                    className={`text-center ${getColorBaseOnName(
                                      item.single
                                    )}`}
                                  >
                                    {item.single}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <FooterAnalysis pageNum={1} />
      </div>
    </div>
  );
};

export default AnalysisPage1;
