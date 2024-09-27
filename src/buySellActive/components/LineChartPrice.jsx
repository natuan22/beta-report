import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const LineChartPrice = ({ data }) => {
  const [dataRenderLine, setDataRenderLine] = useState([]);
  const [dataRenderVol, setDataRenderVol] = useState([]);
  const [dataRenderMB, setDataRenderMB] = useState([]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const processData = (item) => {
      const dateTimeString = `${currentDate}T${item.formattedTime}Z`;
      const timestamp = new Date(dateTimeString).getTime();
      return { timestamp, item };
    };

    if (data?.data.length > 0) {
      const dataRender = data.data
        .map((item) => processData(item))
        .map(({ timestamp, item }) => [timestamp, item.formattedMatchPrice / 1000])
        .reverse();

      const dataRenderVol = data.data
        .map((item) => processData(item))
        .map(({ timestamp, item }) => ({ x: timestamp, y: item.formattedVol ? +item.formattedVol : 0, color: item.lastColor === "B" ? "red" : "green" }))
        .reverse();

      setDataRenderLine(dataRender);
      setDataRenderVol(dataRenderVol);
    }

    if (data?.dataMB.length > 0) {
      const dataRenderMB = data.dataMB
        .map((item) => processData(item))
        .map(({ timestamp, item }) => ({ x: timestamp, y: +item.value.toFixed(2) }))
        .filter(({ x }) => x >= Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 30))
        .reverse();

      setDataRenderMB(dataRenderMB)
    }
  }, [data]);

  const chartOptions = {
    accessibility: { enabled: false },
    credits: false,
    title: { text: "" },
    legend: { enabled: false },
    xAxis: {
      type: "datetime",
      tickInterval: 30 * 60 * 1000,
      min: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 0),
      max: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15, 0),
      labels: {
        rotation: 0,
        style: { color: "#000", fontSize: "9px" },
      },
    },
    yAxis: [
      {
        top: "5%",
        height: "50%",
        title: "",
        gridLineWidth: 0,
        plotLines: [
          {
            value: data?.prevClosePrice,
            color: "#EF9C21",
            dashStyle: "dot",
            width: 1.5,
            zIndex: 2,
          },
        ],
        labels: {
          style: { fontSize: "9px", fontWeight: "bold" },
        },
      },
      {
        top: "60%",
        height: "40%",
        title: "",
        gridLineWidth: 0,
        labels: {
          x: 22,
          style: { fontSize: "9px", fontWeight: "bold" },
        },
      },
      {
        top: "60%",
        height: "40%",
        gridLineWidth: 0,
        title: "",
        labels: {
          style: { fontSize: "9px", fontWeight: "bold" },
        },
        opposite: true,
      },
    ],
    plotOptions: {
      series: {
        marker: { radius: 1 },
        lineWidth: 2,
        color: "#000",
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y}</b><br/>`;
      },
    },
    series: [
      {
        type: "line",
        name: "Giá",
        data: dataRenderLine.length ? dataRenderLine : [null],
        yAxis: 0,
        zoneAxis: "y",
        zones: [
          { value: data?.prevClosePrice, color: "red" },
          { color: "green" },
        ],
      },
      {
        type: "column",
        name: "Volume",
        data: dataRenderVol.length ? dataRenderVol : [null],
        yAxis: 1,
      },
      {
        type: "line",
        name: "M/B",
        data: dataRenderMB.length ? dataRenderMB : [null],
        yAxis: 2,
        zoneAxis: "y",
        zones: [
          {
            value: 1, // Giá trị tách màu (nếu giá trị dưới 1 thì màu đỏ, còn trên 1 thì màu xanh)
            color: "#d92323",
          },
          {
            color: "#24bf0f",
          },
        ],
      },
    ],
  };

  return (
    <div>
      {data ? (
        <div className="h-[714px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ):(
        <div className="text-center mt-5 font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default LineChartPrice;
