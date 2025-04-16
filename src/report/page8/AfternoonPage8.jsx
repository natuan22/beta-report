import moment from "moment";
import React, { useEffect, useState } from "react";
import { https } from "../../services/configService";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import TableAndTitle from "../utils/component/TableAndTitle";

const AfternoonPage8 = () => {
  const [topNetProprietaryBuySell, setTopNetProprietaryBuySell] = useState();
  const [topNetForeignBuySell, setTopNetForeignBuySell] = useState();
  const [topBuySellActive, setTopBuySellActive] = useState();

  useEffect(() => {
    const fetchDataTopNetProprietaryBuySell = async () => {
      try {
        const response = await https.get("api/v1/report/top-net-buy-sell?type=1&floor=HOSE");
        setTopNetProprietaryBuySell(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataTopNetForeignBuySell = async () => {
      try {
        const response = await https.get("api/v1/report/top-net-buy-sell?type=0&floor=HNX");
        setTopNetForeignBuySell(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataTopBuySellActive = async () => {
      try {
        const response = await https.get("api/v1/report/top-buy-sell-active?floor=HNX");
        setTopBuySellActive(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDataTopNetProprietaryBuySell();
    fetchDataTopNetForeignBuySell();
    fetchDataTopBuySellActive();
  }, []);

  return (
    <div className="h-[1152px] w-[800px]">
      <div className="header">
        <HeaderAfternoon />
      </div>

      <div className="cont h-[950px] items-center my-1">
        <div className="grid grid-cols-2 gap-y-[26px] mt-4">
            <div className="">
                <TableAndTitle name="Top mua ròng tự doanh sàn HOSE" headerTB="Giá trị mua ròng" noteTitle="3" data={topNetProprietaryBuySell?.buy}/>
            </div>

            <div className="">
                <TableAndTitle name="Top bán ròng tự doanh sàn HOSE" headerTB="Giá trị bán ròng" noteTitle="3" data={topNetProprietaryBuySell?.sell}/>
            </div>

            <div className="">
                <TableAndTitle name="Top mua ròng khối ngoại sàn HNX" headerTB="Giá trị mua ròng" data={topNetForeignBuySell?.buy}/>
            </div>

            <div className="">
                <TableAndTitle name="Top bán ròng khối ngoại sàn HNX" headerTB="Giá trị bán ròng" data={topNetForeignBuySell?.sell}/>
            </div>

            <div className="">
                <TableAndTitle name="Top mua chủ động sàn HNX" headerTB="Tỷ lệ M/B" noteTB="2" data={topBuySellActive?.MB}/>
            </div>

            <div className="">
                <TableAndTitle name="Top bán chủ động sàn HNX" headerTB="Tỷ lệ B/M" noteTB="2" data={topBuySellActive?.BM} type="BM"/>
            </div>
        </div>
        <i className="ml-[46px] mr-[36px] text-[13px] font-semibold mt-7 flex flex-col gap-y-2">
            <span>(1) Được tính bằng cách lấy KLGD của ngày hiện tại chia cho KLGD trung bình 20 phiên gần nhất (chỉ lấy những mã có KLGD trong phiên trên 200.000 cổ phiếu)</span>
            <span>(2) Thể hiện top cổ phiếu có tỷ lệ <span className="text-green-500 font-bold">M</span>ua (<span className="text-red-500 font-bold">B</span>án) / <span className="text-red-500 font-bold">B</span>án (<span className="text-green-500 font-bold">M</span>ua) chủ động mạnh trên thị trường (chỉ lấy những mã có KLGD trong phiên trên 200.000 cổ phiếu)</span>
            <span>(3) Số được thể hiện là dữ liệu của ngày <span className="font-bold">{moment(topNetProprietaryBuySell?.buy?.[0]?.date).format("DD.MM.yyyy")}</span></span>
        </i>
      </div>

      <div className="footer">
        <FooterAfternoon pageNum={7} />
      </div>
    </div>
  );
};

export default AfternoonPage8;
