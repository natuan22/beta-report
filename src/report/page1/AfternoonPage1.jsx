import React, { useEffect, useState } from "react";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import ColumnChart from "../utils/component/ColumnChart";
import { https } from "../../services/configService";
import LineChart from "../utils/component/LineChart";



const AfternoonPage1 = () => {
    const [dataColumnChart1, setDataColumnChart1] = useState([])
    const [dataColumnChart2, setDataColumnChart2] = useState([])
    const [dataColumnChart3, setDataColumnChart3] = useState([])
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await https.get('/api/v1/report/ban-tin-chieu-1')
            setDataColumnChart1(response.data.data.chartTopMarket)
            setDataColumnChart2(response.data.data.chartTopForeign)
            setDataColumnChart3(response.data.data.chartTopTotalVal)
            setData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const renderStockAdvance = (stockAdvance) => {
        stockAdvance?.map(item => {
            return (
                <span>
                    {item.code} (+{item.value})
                </span>
            )
        })
    }
    const renderStockDecline = (stockDecline) => {
        stockDecline?.map(item => {
            return (
                <span>
                    {item.code} (-{item.value})
                </span>
            )
        })
    }



    return (
        <div className="h-[1480px] w-[800px]">
            <div className="header">
                <HeaderAfternoon />
            </div>
            {data ?
                <div className="content  w-full flex flex-col justify-center items-center  mt-[20px]">
                    <div className="flex w-[780px]">
                        <div className="content-left w-[55%] ">
                            <div className="content-left_top">
                                <h2 className="text-[#0D4381] text-[35px] font-bold m-0">GIẢM TỐC ĐỘT NGỘT</h2>
                                <p className="text-[#00429B] font-bold text-[18px] my-2 text-justify">
                                    Thị trường hạ nhiệt sau nhiều phiên tăng nóng, khối ngoại tiếp đà
                                    bán ròng mạnh
                                </p>
                                <p className="my-2 text-justify">
                                    <span className="text-[#00429B] font-bold">Diễn biến thị trường: </span>
                                    <span className="leading-[15px] ">
                                        Sau nhiều phiên tăng điểm bùng nổ, diễn biến chung tại các chỉ
                                        số chính có phần giảm tốc khi thị trường rung lắc mạnh trong
                                        vùng giá quan trọng. Dù mở cửa trong không khí tích cực đưa thị
                                        trường tăng điểm mạnh, tuy nhiên áp lực bán dâng cao đã khiến
                                        nhiều cổ phiếu Largecap khởi đầu đà giảm điểm. Việc thị trường
                                        mất đi trụ đỡ khiến các chỉ số chính đánh mất mốc tham chiếu và
                                        giằng co cho đến hết phiên giao dịch. Thị trường phân hóa mạnh
                                        trong trạng thái cân bằng, do đó độ rộng thị trường dường như
                                        không quá cách biệt với 268 mã giảm/223 mã cổ phiếu tăng.
                                    </span>
                                </p>
                            </div>
                            <div className="content-left-bot">
                                <p className="text-[#00429B] font-bold underline underline-offset-1">Điểm nhấn chính:</p>
                                <ul className="leading-[23px] translate-x-[-10px] text-sm text-justify font-[500]">
                                    <li className="mt-2">
                                        VN-Index {data.change} điểm ({(+data.perChange).toFixed(2)}%), đóng cửa tại mức {data.closePrice} điểm.
                                        HNX-Index {data.hnxChange} điểm ({data.hnxPerChange}%), đóng cửa tại mức {data.hnxClosePrice} điểm.
                                    </li>

                                    <li>Biên độ dao động ngày : {(+(data.highPrice - data.lowPrice)).toFixed(2)} điểm .</li>

                                    <li className="mt-2">
                                        Ngành đóng góp tăng nổi bật cho VN-Index: {data.industryAdvance?.code} ({(+data.industryAdvance?.value).toFixed(2)} điểm).
                                    </li>

                                    <li className="mt-2">
                                        Ngành đóng góp giảm nổi bật cho VN-Index: {data.industryDecline?.code} ({(+data.industryDecline?.value).toFixed(2)} điểm).
                                    </li>

                                    <li className="mt-2">
                                        Cổ phiếu đóng góp tăng điểm nổi bật: {renderStockAdvance(data?.stockAdvance)}.
                                    </li>

                                    <li className="mt-2">
                                        Cổ phiếu đóng góp giảm điểm nổi bật: {renderStockDecline(data?.stockDecline)}.
                                    </li>

                                    <li className="mt-2">
                                        Tổng giá trị giao dịch của VN-Index đạt 8.430 tỷ đồng, tăng
                                        3,49% so với phiên trước.
                                    </li>

                                    <li className="mt-2">
                                        Độ rộng thị trường: 245 mã tăng, 63 mã tham chiếu, 138 mã giảm
                                    </li>

                                    <li className="mt-2">
                                        Giao dịch ròng của khối ngoại: mua ròng 171,17 tỷ đồng trên sàn
                                        HOSE, tiêu điểm là HPG (63,03 tỷ), VHM (50,19 tỷ), SSI (34,87
                                        tỷ). Ở chiều ngược lại, khối ngoại bán ròng mạnh tại các cổ
                                        phiếu VIC (-34,08 tỷ), DXG (-22,12 tỷ), HCM (-11,23 tỷ).
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content-right w-[45%] h-[960px] flex flex-col items-center justify-evenly ">
                            <div className="content-right_lineChart  w-full">
                                <LineChart dataLineChart={data} />
                            </div>
                            <div className="content-right_columnChart1 w-full ">
                                <ColumnChart isChart3={false} tickInterval={0.5} data={dataColumnChart1} unit={'điểm'} currency={1} color='#26A69A' title={'Nhóm dẫn dắt thị trường sàn HOSE'} />
                            </div>
                            <div className="content-right_columnChart2 w-full ">
                                <ColumnChart isChart3={false} tickInterval={50} data={dataColumnChart2} unit={'tỷ VND'} currency={1000000000} color='#26A69A' title={'Top Khối ngoại giao dịch ròng sàn HOSE'} />
                            </div>
                            <div className="content-right_columnChart3  w-full">
                                <ColumnChart isChart3={true} tickInterval={100} min={0} data={dataColumnChart3} unit={'tỷ VND'} currency={1000000000} color='#1B68BB' title={'Top giá trị giao dịch sàn HOSE'} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>Loading....</div>}


            <div className="mt-[1px]" >
                <FooterAfternoon pageNum={1} />
            </div>
        </div>
    );
};

export default AfternoonPage1;
