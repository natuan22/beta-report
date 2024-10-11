import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PriceStep = ({ data }) => {
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (data && data.matchPriceGroups && data.matchPriceGroups.length > 0) {
      const sortedData = data.matchPriceGroups
        .map((item) => ({
          category: item.category,
          totalBuy: item.totalBuy,
          totalSell: item.totalSell,
          atc: item.atc,
          ato: item.ato,
        }))
        .sort((a, b) => b.category - a.category); // Sắp xếp theo price

      const categories = sortedData.map((item) => item.category);

      const series = [
        {
          name: "ATC & ATO",
          data: sortedData.map(({ atc }) => ({
            y: +(atc / 1_000_000_000).toFixed(1),
            color: "gray",
            name: "ATC",
          })),
          color: "gray",
        },
        {
          name: null,
          linkedTo: ":previous",
          data: sortedData.map(({ ato }) => ({
            y: +(ato / 1_000_000_000).toFixed(1),
            color: "gray",
            name: "ATO",
          })),
          color: "gray",
        },
        {
          name: "Bán chủ động",
          data: sortedData.map(({ totalSell }) => ({
            y: +(totalSell / 1_000_000_000).toFixed(1),
            color: "red",
          })),
          color: "red",
        },
        {
          name: "Mua chủ động",
          data: sortedData.map(({ totalBuy }) => ({
            y: +(totalBuy / 1_000_000_000).toFixed(1),
            color: "green",
          })),
          color: "green",
        },
      ];

      setCategories(categories);
      setSeries(series);
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [data]); // Xử lý dữ liệu chỉ khi `data` thay đổi

  const options = {
    accessibility: { enabled: false },
    credits: false,
    chart: { type: "bar" },
    title: { text: "" },
    xAxis: {
      categories,
      title: {
        text: "Nghìn VNĐ",
        style: { fontSize: "9px", fontWeight: "bold" },
      },
      labels: {
        style: {
          fontSize: "9px",
          fontWeight: "700",
        },
      },
    },
    yAxis: {
      title: { text: "Tỷ VNĐ", style: { fontSize: "9px", fontWeight: "bold" } },
      min: 0,
      gridLineWidth: 0,
      labels: { style: { fontSize: "9px", fontWeight: "bold" } },
    },
    legend: {
      enabled: true,
      verticalAlign: "top",
      itemStyle: { fontWeight: "bold", fontSize: "11px" },
    },
    plotOptions: {
      series: {
        turboThreshold: 100_000_000_000,
      },
      bar: {
        stacking: "normal",
        dataLabels: {
          enabled: data?.matchPriceGroups?.length <= 20,
          formatter: function () {
            return this.y !== 0 ? this.y : null;
          },
          style: {
            color: "#fff", // Màu chữ trắng
            textOutline: "1px black", // Viền đen
            fontWeight: "bold", // Đậm chữ
          },
        },
      },
    },
    series,
    tooltip: {
      shared: false,
      useHTML: true,
      backgroundColor: "#fff",
      pointFormatter: function () {
        return `<span style="color:${this.color}">●</span> ${
          this.name || this.series.name
        }: <b>${this.y}</b> tỷ<br/>`;
      },
    },
  };

  return (
    <div className="h-[653px]">
      {hasData ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      ) : (
        <div className="text-center pt-[53px] pr-[16px] font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default PriceStep;
