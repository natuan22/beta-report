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
const resourceURL = process.env.REACT_APP_IMG_URL;

const AnalysisPage1 = ({ stock }) => {
  // console.log(stock);
  const [data, setData] = useState();
  const [dataChart, setDataChart] = useState();
  const [dataTable, setDataTable] = useState();
  const [dataColumn, setDataColumn] = useState();
  const [imgSrc, setImgSrc] = useState();

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
  return (
    <div className="h-[1480px] w-[900px] relative">
      <div className="absolute top-[300px] left-[900px] z-30 w-full">
        <DialogAddTechnicalReportInfor
          stock={stock}
          getImgFromInput={getImgFromInput}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      <div className="header">
        <HeaderAnalysis type={1} />
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
            <div className="lineChart translate-y-[-35px]">
              <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[30px] z-30  text-center p-1  tran ">
                <h2 className="text-white font-semibold text-[12px] m-0 leading-[19px] ">
                  Tương quan biến động giá cổ phiếu{" "}
                  <span className="uppercase">{stock}</span> trong 1 năm (%)
                </h2>
              </div>
              {dataChart ? (
                <LineChart data={dataChart} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div className="table translate-y-[-60px] ">
              <Table data={dataTable} />
            </div>
            <div className="table-2 translate-y-[-60px] ">
              <TableSR data={data} />
            </div>
            <div className="translate-y-[-50px] font-bold text-[#023E8A] uppercase pl-1 text-[13px] overflow-visible whitespace-nowrap">
              Chuyên Viên Phân Tích: {data && data.analyst_name}
            </div>
          </div>

          <div className="cont-right w-[450px] mr-1 ">
            <div className="h-[150px]  w-[450px] flex items-center justify-between ">
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
                    {data && formatNumberPage3(Number(data.gia_thi_truong))}{" "}
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
                      formatNumber(Number(data.loi_nhuan_ky_vong))}{" "}
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

            <div className="imgPrice w-[450px] pt-1">
              <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[30px]  text-center p-1 ">
                <h2 className="text-white font-semibold text-[15px] m-0 leading-[25px]">
                  Biểu đồ giá
                </h2>
              </div>
              <img
                // src={data ? `${resourceURL}${data.img}` : ""}
                src={imgSrc}
                alt="img"
                width={450}
                height={200}
              />
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

                {data ? (
                  <div className="text w-[450px]">
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
