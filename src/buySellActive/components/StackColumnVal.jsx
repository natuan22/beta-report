import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const StackColumnVal = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [hasData, setHasData] = useState(false);

  const formatStackLabel = (isBuySeries, totalValue, value) => {
    const percentage = isBuySeries ? (data?.totalBuyVal / totalValue) * 100 : (data?.totalSellVal / totalValue) * 100;

    const color = isBuySeries ? "#22c55e" : "#ef4444";
    return `<span style="color: ${color};">${formatNumberCurrency(value)} (${totalValue > 0 ? `${formatNumberCurrency(percentage)}%` : "-"})</span>`;
  };

  const createSeriesData = (buy, sell) => [
    { name: "Lớn",        data: [{ y: buy.large  / 1_000_000_000, color: "#00d060" }, { y: sell.large  / 1_000_000_000, color: "#d34037" }] },
    { name: "Trung bình", data: [{ y: buy.medium / 1_000_000_000, color: "#0c7640" }, { y: sell.medium / 1_000_000_000, color: "#812a24" }] },
    { name: "Nhỏ",        data: [{ y: buy.small  / 1_000_000_000, color: "#144d31" }, { y: sell.small  / 1_000_000_000, color: "#572724" }] },
  ];

  useEffect(() => {
    if (!data?.totals) {
      setHasData(false);
      return;
    }

    const { buy = {}, sell = {} } = data.totals;

    // Ensure data is valid before proceeding
    const isValid = Object.values({ ...buy, ...sell }).every((val) => val >= 0);
    if (!isValid) {
      setHasData(false);
      return;
    }

    setSeries(createSeriesData(buy, sell));
    setHasData(true);
  }, [data]);

  const options = {
    accessibility: { enabled: false },
    credits: false,
    chart: { type: "column" },
    title: { text: "" },
    xAxis: { categories: ["Mua", "Bán"], labels: { style: { fontSize: "12px", fontWeight: "bold" } }},
    yAxis: {
      min: 0,
      gridLineWidth: 0,
      stackLabels: {
        enabled: true,
        formatter: function () {
          const isBuySeries = this.x === 0;
          return formatStackLabel(isBuySeries, data.totalBuyVal + data.totalSellVal, this.total);
        },
        style: { fontWeight: "bold" },
      },
      title: { text: "Tỷ VNĐ", style: { fontSize: "9px", fontWeight: "bold" }},
      labels: { align: "right", style: { fontSize: "9px", fontWeight: "bold" }},
    },
    legend: { enabled: false },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: { enabled: true, formatter: function () { return this.y !== 0 ? formatNumberCurrency(this.y) : null }},
      },
    },
    series,
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${formatNumberCurrency(this.y)}</b> tỷ đồng</span><br/>`;
      },
    },
  };

  return (
    <div>
      {hasData ? (
        <div className="h-[313px]">
          <HighchartsReact 
            highcharts={Highcharts} 
            options={options} 
            containerProps={{ style: { height: "100%", width: "100%" } }} 
          />
        </div>
      ) : (
        <div className="h-[297px] text-center mt-5 font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default StackColumnVal;
