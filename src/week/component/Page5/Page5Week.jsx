import React, { useEffect, useState } from "react";
import { https } from "../../../services/configService";
import FooterWeek from "../../utils/FooterWeek";
import HeaderWeek from "../../utils/HeaderWeek";
import ChartMultiColumn from "./component/ChartMultiColumn";
import ChartNetVal from "./component/ChartNetVal";
import TableEvent from "./component/TableEvent";

const Page5Week = () => {
  const [dataChartMulti, setDataChartMulti] = useState();
  const [dataTableEvent, setDataTableEvent] = useState();
  const [dataNetVal, setDataNetVal] = useState();
  const getDataChartMulti = async () => {
    try {
      const res = await https.get("/api/v1/report/bien-dong-gtgd?type=1");
      setDataChartMulti(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataChartNetVal = async () => {
    try {
      const res = await https.get("/api/v1/stock/net-transaction-value", {
        params: {
          exchange: "VNINDEX",
        },
      });
      setDataNetVal(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDataTableEvent = async () => {
    try {
      const res = await https.get("/api/v1/report/lich-su-kien");
      setDataTableEvent(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDataChartMulti();
    getDataTableEvent();
    getDataChartNetVal();
  }, []);

  return (
    <div className="h-[1480px] w-[800px]">
      <div className="header h-[135px]">
        <HeaderWeek />
      </div>

      <div className="content  h-[945px] w-full flex flex-col items-center mt-[10px]">
        {/* cont-top */}
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
              Biến động GTGD một số ngành quan trọng (tỷ VNĐ)
            </h2>
          </div>
        </div>

        <div className="multiColumn h-[230px] ">
          <ChartMultiColumn data={dataChartMulti} />
        </div>

        {/* cont-mid */}
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
              GTGD ròng của các nhóm nhà đầu tư (tỷ VNĐ)
            </h2>
          </div>
        </div>

        <div className="chartNetVal h-[215px]">
          <ChartNetVal data={dataNetVal} />
        </div>

        {/* cont-bot */}
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
              Lịch sự kiện
            </h2>
          </div>
        </div>
        <div className="tableEvent h-[330px] w-[760px] mt-[10px]">
          <TableEvent data={dataTableEvent} />
        </div>
      </div>

      <div className="footer">
        <FooterWeek pageNum={4} />
      </div>
    </div>
  );
};

export default Page5Week;
