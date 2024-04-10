import React, { useEffect, useState } from "react";
import HeaderWeek from "../../utils/HeaderWeek";
import FooterWeek from "../../utils/FooterWeek";
import { https } from "../../../services/configService";
import { getColorBaseOnValue } from "../../../helper/getColorBaseOnValue";
import formatNumber from "../../../helper/formatNumber";
import ChartColumn from "./component/ChartColumn";
import ChartTopTotal from "./component/ChartTopTotal";
import ChartTopForeignTotal from "./component/ChartTopForeignTotal";
import AddText from "./component/AddText";
import ColumnChart1 from "./component/ChartColumn1";

const getText = (value) => {
  if (value > 0) return <span>tăng</span>;
  if (value < 0) return <span>giảm</span>;
};

const Page2Week = ({ role }) => {
  const [data, setData] = useState();
  const [text, setText] = useState();
  const getData = async () => {
    try {
      const res = await https.get("api/v1/report/ban-tin-tuan-1");
      setData(res.data.data);
      setText(res.data.data.text);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleGetTextInpur = (text) => {
    setText(text);
    getData();
  };
  return (
    <div className="h-[1480px] w-[800px] relative">
      <div className="header rotate-0">
        <HeaderWeek />
      </div>

      {role === "V0U1S" ? (
        <div className="absolute top-0 right-0 translate-x-[250px] translate-y-[250px]">
          <AddText handleGetTextInpur={handleGetTextInpur} />
        </div>
      ) : (
        <div></div>
      )}

      {data ? (
        <div className="content h-[945px] w-full flex flex-col items-center mt-[25px]">
          <div className="w-[790px] ">
            <div className="content-top flex items-center justify-evenly w-full h-[460px]">
              {text?.length > 0 ? (
                <div className="content-top_lef  w-[364px] h-[455px] bg-[#EF9C211C] px-3 py-1 ">
                  <h2 className="m-0 text-[23px] text-[#1B68BB] ">{text[0]}</h2>
                  <p className="m-0 text-[17px] text-[#1B68BB] font-bold">
                    {text[1]}
                  </p>
                  <p className="my-1 text-[#1B68BB] text-[13px] font-bold  underline underline-offset-1">
                    Diễn biến thị trường:{" "}
                  </p>
                  <p className="text-[13px] max-h-[401px] indent-[20px] text-justify my-1 leading-[24px] font-semibold ">
                    {text[2]}
                  </p>
                </div>
              ) : (
                <div>Loading...</div>
              )}

              <div className="content-top_right w-[364px] h-[455px] bg-[#EF9C211C] px-3 py-1">
                <p className="my-1 text-[#1B68BB] font-bold  underline underline-offset-1">
                  Điểm nhấn chính trong tuần:{" "}
                </p>
                <div className="text-[14px]  text-justify  my-1 leading-[21px] font-semibold ">
                  <p className="my-1 text-[11px] ">
                    • VN-Index {getText(data.change)}{" "}
                    <span
                      className={`${getColorBaseOnValue(
                        data.change
                      )} text-[13px]`}
                    >
                      {formatNumber(data.change)}
                    </span>{" "}
                    điểm{" "}
                    <span
                      className={`${getColorBaseOnValue(
                        data.perChange
                      )} text-[13px]`}
                    >
                      ({formatNumber(data.perChange)}%)
                    </span>
                    , đóng cửa tại mức{" "}
                    <span className="text-[13px] font-bold">
                      {formatNumber(data.closePrice)}
                    </span>{" "}
                    điểm. HNX-Index {getText(data.hnxChange)}{" "}
                    <span
                      className={`${getColorBaseOnValue(
                        data.hnxChange
                      )} text-[13px]`}
                    >
                      {formatNumber(data.hnxChange)}
                    </span>{" "}
                    điểm{" "}
                    <span
                      className={`${getColorBaseOnValue(
                        data.hnxPerChange
                      )} text-[13px]`}
                    >
                      ({formatNumber(data.hnxPerChange)}%)
                    </span>
                    , đóng cửa tại mức{" "}
                    <span className="text-[13px] font-bold">
                      {formatNumber(data.hnxClosePrice)}
                    </span>{" "}
                    điểm.
                  </p>
                  <p className="my-1 text-[11px] font-semibold ">
                    • Ngành đóng góp{" "}
                    <span className="text-green-600 text-[12px]">tăng</span> nổi
                    bật cho VN-Index:{" "}
                    {data.industryAdvance ? (
                      <span>
                        {data.industryAdvance.code}{" "}
                        <span className="text-green-600 text-[13px]">
                          ({formatNumber(data.industryAdvance.value)})
                        </span>
                      </span>
                    ) : (
                      <span>không có cổ phiếu đóng góp nổi bật</span>
                    )}
                    . Ngành đóng góp{" "}
                    <span className="text-red-600 text-[12px]">giảm</span> nổi
                    bật cho VN-Index:{" "}
                    {data.industryDecline ? (
                      <span>
                        {data.industryDecline.code}{" "}
                        <span className="text-red-600 text-[13px]">
                          ({formatNumber(data.industryDecline.value)})
                        </span>
                        .
                      </span>
                    ) : (
                      <span>không có cổ phiếu đóng góp nổi bật</span>
                    )}
                  </p>
                  <p className="my-1 text-[11px] font-semibold ">
                    • Cổ phiếu đóng góp tăng điểm nổi bật:{" "}
                    {data.stockAdvance.map((item, index) => (
                      <span
                        className="text-green-600 text-[12px]"
                        key={item.code}
                      >
                        {item.code} <span>(+{formatNumber(item.point)})</span>
                        {index !== data.stockAdvance.length - 1 ? ", " : ""}
                      </span>
                    ))}{" "}
                    . Cổ phiếu đóng góp giảm điểm nổi bật:{" "}
                    {data.stockDecline.map((item, index) => (
                      <span
                        className="text-red-600 text-[12px]"
                        key={item.code}
                      >
                        {item.code} <span>({formatNumber(item.point)})</span>
                        {index !== data.stockDecline.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    .
                  </p>
                  <p className="my-1 text-[11px] font-semibold ">
                    • Tổng giá trị giao dịch khớp lệnh của VN-Index đạt{" "}
                    <span className="font-bold text-[12px]">
                      {formatNumber(data.omVal / 1000000000)}
                    </span>{" "}
                    tỷ đồng, <span>{getText(data.perOmVal)}</span>{" "}
                    <span
                      className={`${getColorBaseOnValue(
                        data.perOmVal
                      )} text-[12px]`}
                    >
                      {formatNumber(data.perOmVal)}%
                    </span>{" "}
                    so với tuần trước. Bên cạnh đó, giá trị giao dịch thỏa thuận
                    là <span>{formatNumber(data.ptVal / 1000000000)}</span> tỷ
                    đồng. Độ rộng thị trường:{" "}
                    <span className="text-green-600">{data.advances}</span> mã
                    tăng,{" "}
                    <span className="text-[#fec01d]">{data.noChange}</span> mã
                    tham chiếu,{" "}
                    <span className="text-red-600">{data.declines}</span> mã
                    giảm.
                  </p>
                  <p className="my-1 text-[11px] font-semibold ">
                    {data.netVal > 0 ? (
                      <span>
                        • Trong tuần giao dịch ròng của khối ngoại:{" "}
                        <span className="text-green-600 text-[13px] font-bold">
                          mua
                        </span>{" "}
                        ròng{" "}
                        <span className="text-green-600 text-[13px]">
                          {formatNumber(data.netVal / 1000000000)}
                        </span>{" "}
                        tỷ đồng trên sàn HOSE, tiêu điểm là{" "}
                        {data.topBuy.map((item, index) => (
                          <span key={item.code}>
                            <span className="text-green-600 text-[12px]">
                              {item.code}
                            </span>{" "}
                            <span>
                              ({formatNumber(item.point / 1000000000)} tỷ đồng)
                            </span>
                            {index !== data.topBuy.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        . Ở chiều ngược lại, khối ngoại{" "}
                        <span className="text-red-600 text-[13px] font-bold">
                          bán
                        </span>{" "}
                        ròng mạnh tại các cổ phiếu{" "}
                        {data.topSell.map((item, index) => (
                          <span key={item.code}>
                            <span className="text-red-600 text-[12px]">
                              {item.code}
                            </span>{" "}
                            <span>
                              ({formatNumber(item.point / 1000000000)} tỷ đồng)
                            </span>
                            {index !== data.topSell.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        .
                      </span>
                    ) : (
                      <>
                        • Trong tuần giao dịch ròng của khối ngoại:{" "}
                        <span className="text-red-600 text-[13px] font-bold">
                          bán
                        </span>{" "}
                        ròng{" "}
                        <span className="text-red-600 text-[13px]">
                          {formatNumber(data.netVal / 1000000000)}
                        </span>{" "}
                        tỷ đồng trên sàn HOSE, tiêu điểm là{" "}
                        {data.topSell.map((item, index) => (
                          <span key={item.code}>
                            <span className="text-red-600 text-[12px]">
                              {item.code}
                            </span>{" "}
                            <span>
                              ({formatNumber(item.point / 1000000000)} tỷ đồng)
                            </span>
                            {index !== data.topSell.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        . Ở chiều ngược lại, khối ngoại{" "}
                        <span className="text-green-600 text-[13px] font-bold">
                          mua
                        </span>{" "}
                        ròng mạnh tại các cổ phiếu{" "}
                        {data.topBuy.map((item, index) => (
                          <span key={item.code}>
                            <span className="text-green-600 text-[12px]">
                              {item.code}
                            </span>{" "}
                            <span>
                              ({formatNumber(item.point / 1000000000)} tỷ đồng)
                            </span>
                            {index !== data.topBuy.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid place-items-center">
              <div className="content-bot flex justify-evenly flex-wrap w-full">
                <div className="chartTopMarket w-[370px] h-[237px]">
                  <ChartColumn
                    unit={"điểm ảnh hưởng chỉ số"}
                    currency={1}
                    title={"Nhóm dẫn dắt thị trường sàn HOSE qua 1 tuần"}
                    data={data.chartTopMarket}
                    translateX={""}
                  />
                </div>
                <div className="chartTopForeign w-[370px] h-[237px]">
                  <ColumnChart1
                    unit={"tỷ VNĐ"}
                    currency={1000000000}
                    title={"Top NĐTNN giao dịch ròng sàn HOSE qua 1 tuần"}
                    data={data.chartTopForeign}
                    translateX={""}
                  />
                </div>
                <div className="chartTopTotal w-[370px] h-[237px]">
                  <ChartTopTotal
                    title={"Top giá trị giao dịch sàn HOSE qua 1 tuần"}
                    data={data.chartTopTotalVal}
                  />
                </div>
                <div className="chartTopTotalForeign w-[370px] h-[237px]">
                  <ChartTopForeignTotal
                    title={"GTGD của NĐTNN theo tuần"}
                    data={data.chartTopForeignTotalVal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading.....</div>
      )}

      <div className="footer">
        <FooterWeek pageNum={1} />
      </div>
    </div>
  );
};

export default Page2Week;
