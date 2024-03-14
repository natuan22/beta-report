import React, { useEffect, useState } from "react";
import HeaderWeek from "../../utils/HeaderWeek";
import FooterWeek from "../../utils/FooterWeek";
import { https } from "../../../services/configService";
import ListNew from "./component/ListNew";
import DialogAddNews from "./component/DialogAddNews";

const Page7Week = () => {
  const [dataDomestic, setDataDomestic] = useState([]);
  const [dataForeign, setDataForeign] = useState([]);
  const getDataDomestic = async () => {
    try {
      const res = await https.get("api/v1/report/tin-trong-nuoc?quantity=7");
      setDataDomestic(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDataForeign = async () => {
    try {
      const res = await https.get("api/v1/report/tin-quoc-te", {
        params: {
          quantity: 7,
        },
      });
      setDataForeign(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getDataDomestic();
    // getDataForeign();
  }, []);

  const handleCatchDataNews = (arrNews, type) => {
    if (type === "trong-nuoc") {
      setDataDomestic(arrNews);
    } else if (type === "quoc-te") {
      setDataForeign(arrNews);
    }
  };

  return (
    <div className="h-[1480px] w-[800px] relative">
      <div className="header h-[135px]">
        <HeaderWeek />
      </div>
      <div className="absolute top-0 right-0 translate-x-[300px] translate-y-[200px] h-[100px] flex flex-col items-center justify-between">
        <div>
          <DialogAddNews
            type={"trong nước"}
            query={"trong-nuoc"}
            idQuery={4}
            handleCatchDataNews={handleCatchDataNews}
          />
        </div>
        <div>
          <DialogAddNews
            type={"quốc tế"}
            query={"quoc-te"}
            idQuery={3}
            handleCatchDataNews={handleCatchDataNews}
          />
        </div>
      </div>
      <div className="content h-[945px] w-full flex flex-col items-center mt-2">
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
              Các tin tức nổi bật trong tuần qua
            </h2>
          </div>
        </div>

        <div className="w-[760px] flex items-center justify-between mt-2">
          <div className="cont-left foreign w-[370px]">
            <ListNew type={"Tin quốc tế"} data={dataForeign} />
          </div>
          <div className="cont-right domestic w-[370px]">
            <ListNew type={"Tin trong nước"} data={dataDomestic} />
          </div>
        </div>
      </div>

      <div className="footer">
        <FooterWeek pageNum={6} />
      </div>
    </div>
  );
};

export default Page7Week;
