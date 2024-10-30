import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";

const ScatterChart = ({ data }) => {
  const [series, setSeries] = useState([
    {
      name: "Hiệu suất sinh lời",
      id: "Hiệu suất sinh lời",
      marker: {
        symbol: "circle",
      },
      data: [], // Initial empty data array
    },
  ]);

  useEffect(() => {
    if (data) {
      const updatedSeries = series.map((s) => {
        return {
          ...s,
          data: data.map((item) => [
            item.name.replace("MA_", ""),
            +(item.total * 100).toFixed(2),
          ]),
        };
      });
      setSeries(updatedSeries);
    }
  }, [data]);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "scatter",
      backgroundColor: "transparent",
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "HIỆU SUẤT SINH LỜI THEO ĐƯỜNG MA",
      style: {
        color: "#0050AD", // Change title color
      },
    },
    xAxis: {
      title: {
        text: "MA",
        align: "high",
        y: -50,
      },
      type: "category",
    },
    yAxis: {
      lineWidth: 1,
      title: {
        align: "high",
        offset: 0,
        text: "Hiệu suất (%)",
        rotation: 0,
        y: -15,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      scatter: {
        marker: {
          symbol: "circle",
          radius: 3.5,
          lineWidth: 1, // Set the line width for the marker border
          lineColor: "rgba(5, 141, 199, 1)", // Marker border color
        },
        jitter: {
          x: 0.005,
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return `<span style="color:${this.color}">●</span>MA ${this.name}: <b>${formatNumberCurrency(this.y)} %</b><br/>`;
      },
    },
    series: series,
    colors: ["rgb(255,255,255)"], //Fill color marker
  };
  return (
    <div className="h-[237px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ScatterChart;
