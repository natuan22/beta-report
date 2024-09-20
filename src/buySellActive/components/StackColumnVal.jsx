import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const StackColumnVal = ({ data }) => {
  const { buyValData, sellValData, totalBuyVal, totalSellVal } = data;
  
  const [series, setSeries] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (buyValData && sellValData) {
      const isValidData = [
        buyValData.large,
        buyValData.medium,
        buyValData.small,
        sellValData.large,
        sellValData.medium,
        sellValData.small,
      ].some((val) => val > 0); // Check if there's any positive transaction data

      if (isValidData) {
        const dataSeries = [
          { name: "Lớn",        data: [{ y: +(buyValData.large / 1_000_000_000).toFixed(2), color: "#00d060" }, { y: +(sellValData.large / 1_000_000_000).toFixed(2), color: "#d34037" }]},
          { name: "Trung bình", data: [{ y: +(buyValData.medium / 1_000_000_000).toFixed(2), color: "#0c7640" }, { y: +(sellValData.medium / 1_000_000_000).toFixed(2), color: "#812a24" }]},
          { name: "Nhỏ",        data: [{ y: +(buyValData.small / 1_000_000_000).toFixed(2), color: "#144d31" }, { y: +(sellValData.small / 1_000_000_000).toFixed(2), color: "#572724" }]},
        ];

        setSeries(dataSeries);

        setHasData(true);
      } else {
        setHasData(false);
      }
    }
  }, [buyValData, sellValData]);

  // Cấu hình biểu đồ
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: ["Mua", "Bán"],
      labels: {
        style: {
          fontSize: "9px", // Độ lớn của chữ trục y
          fontWeight: "bold"
        },
      },
    },
    yAxis: {
      title: "",
      min: 0,
      gridLineWidth: 0,
      stackLabels: {
        enabled: true,
        formatter: function () {
          const isBuySeries = this.x === 0;
          const totalValue = totalBuyVal + totalSellVal;
          const percentage = isBuySeries ? (totalBuyVal / totalValue) * 100 : (totalSellVal / totalValue) * 100;

          const color = isBuySeries ? '#22c55e' : '#ef4444';

          return `<span style="color: ${color};">${this.total} (${totalValue > 0 ? `${percentage.toFixed(2)}%` : "-"})</span>`;
        },
        style: {
          fontWeight: "bold"
        }
      },
      title:{
        text: "Tỷ VNĐ",
        style: {
          fontSize: "9px", // Độ lớn của chữ trục y
          fontWeight: "bold"
        },
      },
      labels: {
        align: "right", // Canh chỉnh label về phía bên phải
        style: {
          fontSize: "9px", // Độ lớn của chữ trục y
          fontWeight: "bold"
        },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: series,
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return (
          '<span style="color:' +
          this.color +
          '">●</span> ' +
          this.series.name +
          ": <b>" +
          this.y +
          "</b> tỷ</span><br/>"
        );
      },
    },
  };

  return (
    <div>
      {hasData ? (
        <div className="h-[300px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="text-center mt-5 font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default StackColumnVal;
