import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const PieChartVal = ({ data }) => {
  const { buyValData, sellValData, totalBuyVal, totalSellVal } = data;
  const [dataPie, setDataPie] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (buyValData && sellValData && totalBuyVal && totalSellVal) {
      const isValidData = [
        buyValData.large,
        buyValData.medium,
        buyValData.small,
        sellValData.large,
        sellValData.medium,
        sellValData.small,
      ].some((val) => val >= 0);

      if (isValidData) {
        const dataPieSell = [
          { name: "Lớn",        y: +(sellValData.large / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#d34037" },
          { name: "Trung bình", y: +(sellValData.medium / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#812a24" },
          { name: "Nhỏ",        y: +(sellValData.small / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#572724" }
        ];

        const dataPieBuy = [
          { name: "Lớn",        y: +(buyValData.large / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#00d060" },
          { name: "Trung bình", y: +(buyValData.medium / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#0c7640" },
          { name: "Nhỏ",        y: +(buyValData.small / (totalBuyVal + totalSellVal) * 100).toFixed(2), color: "#144d31" }
        ]

        const combinedDataPie = [
          ...dataPieSell.map((item) => ({ ...item, name: item.name  })), 
          ...dataPieBuy.map((item) => ({ ...item, name: item.name  })), 
        ];

        setDataPie(combinedDataPie);
        setHasData(true); // Mark that there's valid data
      } else {
        setHasData(false); // No valid data to display
      }
    }
  }, [data]);

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
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.percentage:.2f}%</b> ",
          connector: {
            enabled: true,
            lineWidth: 0.5,
          },
          distance: 4,
        },
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
      { name: "Tổng giao dịch", data: dataPie.filter(item => item.y !== 0), size: "70%", innerSize: "70%" },
    ],
  };

  return (
    <div className="flex items-center justify-center">
      <div className="h-[350px] w-[460px]">
        {hasData ? (
          <PieChart
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        ) : (
          <div className="text-center mt-5 font-semibold">
            Chưa có dữ liệu giao dịch
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChartVal;
