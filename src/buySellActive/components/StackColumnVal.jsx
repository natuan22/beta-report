import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const StackColumnVal = ({ processedBuyData, processedSellData }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (processedBuyData && processedSellData) {
      const dataSeries = [
        { name: "Lớn",        data: [{ y: +(processedBuyData.large / 1_000_000_000).toFixed(2), color: "#00d060" }, { y: +(processedSellData.large / 1_000_000_000).toFixed(2), color: "#d34037" }]},
        { name: "Trung bình", data: [{ y: +(processedBuyData.medium / 1_000_000_000).toFixed(2), color: "#0c7640" }, { y: +(processedSellData.medium / 1_000_000_000).toFixed(2), color: "#812a24" }]},
        { name: "Nhỏ",        data: [{ y: +(processedBuyData.small / 1_000_000_000).toFixed(2), color: "#144d31" }, { y: +(processedSellData.small / 1_000_000_000).toFixed(2), color: "#572724" }]},
      ];

      setSeries(dataSeries);
    }
  }, [processedBuyData, processedSellData]);

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
    },
    yAxis: {
      title: "",
      min: 0,
      gridLineWidth: 0,
      stackLabels: {
        enabled: false,
      },
      labels: {
        align: "right", // Canh chỉnh label về phía bên phải
        style: {
          fontSize: "9px", // Độ lớn của chữ trục y
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
      {processedBuyData && processedSellData ? (
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
