import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const PieChartVal = ({ processedBuyData, processedSellData, totalBuyVal, totalSellVal }) => {
  const [dataPie, setDataPie] = useState([]);
  const [dataPieSell, setDataPieSell] = useState([]);
  const [dataPieBuy, setDataPieBuy] = useState([]);

  useEffect(() => {
    if (processedBuyData && processedSellData) {
      const dataPieSell = [
        { name: "Lớn",        y: +(processedSellData.large / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#d34037" },
        { name: "Trung bình", y: +(processedSellData.medium / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#812a24" },
        { name: "Nhỏ",        y: +(processedSellData.small / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#572724" }
      ];

      const dataPieBuy = [
        { name: "Lớn",        y: +(processedBuyData.large / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#00d060" },
        { name: "Trung bình", y: +(processedBuyData.medium / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#0c7640" },
        { name: "Nhỏ",        y: +(processedBuyData.small / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#144d31" }
      ]

      const combinedDataPie = [
        ...dataPieBuy.map((item) => ({ ...item, name: item.name  })), 
        ...dataPieSell.map((item) => ({ ...item, name: item.name  })), 
      ];

      setDataPieSell(dataPieSell);
      setDataPieBuy(dataPieBuy);
      setDataPie(combinedDataPie);
    }
  }, [processedBuyData, processedSellData, totalBuyVal, totalSellVal]);

  const options = {
    accessibility: { enabled: false },
    credits: false,
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: { text: "" },
    subtitle: { text: "" },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        borderRadius: "10%",
      },
    },
    tooltip: { valueSuffix: "%" },
    legend: {
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    series: [
      { name: "Tổng giao dịch", data: dataPie, size: "80%", innerSize: "70%" },
    ],
  };

  return (
    <div className="grid grid-cols-2 place-items-center">
      <div>
        <div className="font-semibold mb-2">
          Lệnh <span className="text-green-500 uppercase font-bold">mua</span>{" "}
          chủ động (
          <span className="text-green-500">
            {totalBuyVal > 0 || totalSellVal > 0
              ? `${((totalBuyVal / (totalBuyVal + totalSellVal)) * 100).toFixed(2)}%`
              : "-"}
          </span>
          )
        </div>
        {dataPieBuy &&
          dataPieBuy.map((item, index) => {
            return (
              <div className="flex items-center gap-2 mt-1" key={index}>
                <div
                  className={`rounded-[50%] bg-[${item.color}] w-[10px] h-[10px]`}
                ></div>
                <div>{item.y ? `${item.y}%` : "-"}</div>
                <div>{item.name}</div>
              </div>
            );
          })}
        <div className="font-semibold mb-2 mt-2">
          Lệnh <span className="text-red-500 uppercase font-bold">bán</span> chủ
          động (
          <span className="text-red-500">
            {totalBuyVal > 0 || totalSellVal > 0
              ? `${((totalSellVal / (totalBuyVal + totalSellVal)) * 100 ).toFixed(2)}%`
              : "-"}
          </span>
          )
        </div>
        {dataPieSell &&
          dataPieSell.map((item, index) => {
            return (
              <div className="flex items-center gap-2 mt-1" key={index}>
                <div
                  className={`rounded-[50%] bg-[${item.color}] w-[10px] h-[10px]`}
                ></div>
                <div>{item.y ? `${item.y}%` : "-"}</div>
                <div>{item.name}</div>
              </div>
            );
          })}
      </div>
      <div className="h-[300px] w-[250px]">
        {processedBuyData && processedSellData && totalBuyVal && totalSellVal ? (
          <PieChart
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        ) : (
          <div className="text-center mt-5 font-semibold"></div>
        )}
      </div>
    </div>
  );
};

export default PieChartVal;
