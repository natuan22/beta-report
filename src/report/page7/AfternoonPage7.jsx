import React, { useEffect, useState } from "react";
import { https } from "../../services/configService";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import TableAndTitle from "../utils/component/TableAndTitle";

const AfternoonPage7 = () => {
  const [topContributingStocks, setTopContributingStocks] = useState();
  const [topNetForeignBuySell, setTopNetForeignBuySell] = useState();
  const [topSuddenVol, setTopSuddenVol] = useState();
  const [topBuySellActive, setTopBuySellActive] = useState();

  useEffect(() => {
    const fetchDataTopContributingStocks = async () => {
      try {
        const response = await https.get("api/v1/report/top-contributing-stocks");
        setTopContributingStocks(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataTopNetForeignBuySell = async () => {
      try {
        const response = await https.get("api/v1/report/top-net-buy-sell?type=0&floor=HOSE");
        setTopNetForeignBuySell(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataTopSuddenVol = async () => {
      try {
        const response = await https.get("api/v1/report/top-sudden-vol");
        setTopSuddenVol(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataTopBuySellActive = async () => {
      try {
        const response = await https.get("api/v1/report/top-buy-sell-active?floor=HOSE");
        setTopBuySellActive(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchDataTopContributingStocks();
    fetchDataTopNetForeignBuySell();
    fetchDataTopSuddenVol();
    fetchDataTopBuySellActive();
  }, []);

  return (
    <div className="h-[1152px] w-[800px]">
      <div className="header">
        <HeaderAfternoon />
      </div>

      <div className="cont h-[950px] grid grid-cols-2 items-center my-1">
        <div className="">
          <TableAndTitle name="Top đóng góp tăng sàn HOSE" headerTB="Điểm đóng góp" data={topContributingStocks?.stock_advance}/>
        </div>

        <div className="">
          <TableAndTitle name="Top đóng góp giảm sàn HOSE" headerTB="Điểm đóng góp" data={topContributingStocks?.stock_decline}/>
        </div>

        <div className="">
          <TableAndTitle name="Top mua ròng khối ngoại sàn HOSE" headerTB="Giá trị mua ròng" data={topNetForeignBuySell?.buy}/>
        </div>

        <div className="">
          <TableAndTitle name="Top bán ròng khối ngoại sàn HOSE" headerTB="Giá trị bán ròng" data={topNetForeignBuySell?.sell}/>
        </div>

        <div className="">
          <TableAndTitle name="Top tăng giá có khối lượng đột biến sàn HOSE" headerTB="Tỷ lệ KLGD" noteTB="1" data={topSuddenVol?.desc}/>
        </div>

        <div className="">
          <TableAndTitle name="Top giảm giá có khối lượng đột biến sàn HOSE" headerTB="Tỷ lệ KLGD" noteTB="1" data={topSuddenVol?.asc}/>
        </div>

        <div className="">
          <TableAndTitle name="Top mua chủ động sàn HOSE" headerTB="Tỷ lệ M/B" noteTB="2" data={topBuySellActive?.MB}/>
        </div>

        <div className="">
          <TableAndTitle name="Top bán chủ động sàn HOSE" headerTB="Tỷ lệ B/M" noteTB="2" data={topBuySellActive?.BM} type="BM"/>
        </div>
      </div>

      <div className="footer">
        <FooterAfternoon pageNum={6} />
      </div>
    </div>
  );
};

export default AfternoonPage7;
