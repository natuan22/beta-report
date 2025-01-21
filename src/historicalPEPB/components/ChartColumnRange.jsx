import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const ChartColumnRange = ({ data, chartKey }) => {
  const [timeLine, setTimeLine] = useState();

  useEffect(() => {
    if (data?.length > 0) {
      const uniqueDates = [...new Set(data.map((item) => item.code))];
      setTimeLine(uniqueDates);
    }
  }, [data, chartKey]);

  const options = {
    accessibility: { enabled: false },
    credits: false,
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: { text: `Định giá ${chartKey}` },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
    yAxis: [
      {
        title: { text: "" },
        labels: {
          enabled: false,
          style: { fontSize: "10px", fontWeight: "bold" },
        },
        gridLineWidth: 0,
      },
    ],
    plotOptions: { columnrange: { dataLabels: { enabled: true } } },
    series: [
      {
        type: "columnrange",
        name: `Vùng biến động ${chartKey}`,
        data: data?.map((item) => [
          item[`min_${chartKey.replace(/\//g, "")}`],
          item[`max_${chartKey.replace(/\//g, "")}`],
        ]),
        color: chartKey === "P/E" ? {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(142,217,115,1)"],
            [0.3, "rgba(180,229,162,1)"],
            [0.5, "rgba(217,242,208,1)"],
            [0.7, "rgba(180,229,162,1)"],
            [1, "rgba(142,217,115,1)"],
          ],
        } : {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(255,192,0,1)"],
            [0.3, "rgba(228,227,165,1)"],
            [0.5, "rgba(253,249,197,1)"],
            [0.7, "rgba(228,227,165,1)"],
            [1, "rgba(255,192,0,1)"],
        ],
        },
      },
      {
        type: "spline",
        name: "Hôm nay",
        data: data?.map((item) => +item[`latest_${chartKey.replace(/\//g, "")}`].toFixed(1)),
        color: "#FBAC20",
        marker: {
          symbol: "diamond", // Chọn biểu tượng của marker (có thể là circle, square, triangle, etc.)
          radius: 6, // Kích thước của marker
          fillColor: chartKey === "P/E" ? "#ffff00" : "#00b050", // Màu sắc bên trong của marker
          lineColor: "#ea7233", // Màu sắc đường viền của marker
          lineWidth: 1, // Độ rộng của đường viền của marker
        },
        lineWidth: 0,
        dataLabels: {
          enabled: true,
          backgroundColor: chartKey === "P/E" ? "#ffff00" : "#00b050",
          style: { color: "#002060" },
          x: -30,
          y: 11,
        },
      },
      {
        type: "line",
        name: "Average",
        data: data?.map((item) => +item[`avg_${chartKey.replace(/\//g, "")}`].toFixed(1)),
        color: "#FBAC20",
        marker: { symbol: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAFCAYAAABW1IzHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAbSURBVChTY1SMn/WfgY6ACUrTDYxaSGXAwAAAp/4CI6zvStQAAAAASUVORK5CYII=)" },
        lineWidth: 0,
        dataLabels: {
          enabled: true,
          backgroundColor: "#76badb",
          style: { color: "#000" },
          x: 35,
          y: 11,
        },
      },
      {
        type: "line",
        name: "+1 Std",
        data: data?.map((item) => +item[`plus_1_std_${chartKey.replace(/\//g, "")}`].toFixed(1)),
        color: "#FBAC20",
        marker: { symbol: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAFCAYAAABW1IzHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAbSURBVChTY3wro/KfgY6ACUrTDYxaSGXAwAAA0wkCNmuac+kAAAAASUVORK5CYII=)" },
        lineWidth: 0,
      },
      {
        type: "line",
        name: "-1 Std",
        data: data?.map((item) => +item[`minus_1_std_${chartKey.replace(/\//g, "")}`].toFixed(1)),
        color: "#FBAC20",
        marker: { symbol: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAFCAYAAABW1IzHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAbSURBVChTY3wro/KfgY6ACUrTDYxaSGXAwAAA0wkCNmuac+kAAAAASUVORK5CYII=)" },
        lineWidth: 0,
      },
    ],
  };

  return (
    <div className="h-[500px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ChartColumnRange;
