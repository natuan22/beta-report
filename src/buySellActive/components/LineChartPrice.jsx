import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import "../utils/styles/hide-legend-icon.css";
import "../utils/styles/triangleLineChart.css";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const LineChartPrice = ({ data }) => {
  const [seriesConfigLineChart, setSeriesConfigLineChart] = useState(0);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (data?.data.length > 0) {
      const dataReversed = [...data.data].reverse();

      const dataRenderLine = dataReversed.map((item) => [
        item.timestamp,
        item.matchPrice,
      ]);

      const dataRenderVol = dataReversed.map((item) => ({
        x: item.timestamp,
        y: item.volume,
        color:
          item.action === "B" ? "green" : item.action === "S" ? "red" : "black",
      }));

      const dataRenderMB = dataReversed
        .map((item) => ({
          x: item.timestamp,
          y:
            item.totalSellVolToNow !== 0
              ? +(item.totalBuyVolToNow / item.totalSellVolToNow).toFixed(2)
              : 0, // Sử dụng null nếu phép chia sẽ dẫn đến Infinity
        }))
        .filter(
          (item) =>
            item.x >=
            Date.UTC(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              9,
              30
            )
        );

      const dataRenderArea = dataReversed.map((item) => {
        const totalValueDifference = +(
          (item.totalBuyValToNow - item.totalSellValToNow) /
          1_000_000_000
        ).toFixed(2);
        return {
          x: item.timestamp,
          y: totalValueDifference,
          color: totalValueDifference > 0 ? "green" : "red",
        };
      });

      // Cấu hình series option 1: Volume và M/B
      const seriesOption1 = [
        {
          type: "column",
          name: "Khối lượng",
          data: dataRenderVol.length ? dataRenderVol : [null],
          yAxis: 1,
          dataLabels: {
            enabled: false,
          },
        },
        {
          type: "line",
          name: "M/B",
          data: dataRenderMB.length ? dataRenderMB : [null],
          yAxis: 2,
          zoneAxis: "y",
          zones: [{ value: 1, color: "#d92323" }, { color: "#24bf0f" }],
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.index === this.series.data.length - 1
                ? formatNumberCurrency(this.point.y)
                : null;
            },
            style: {
              color: "#000",
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
        },
      ];

      // Cấu hình series option 2: Lũy kế
      const seriesOption2 = [
        {
          type: "area",
          name: "Lũy kế",
          data: dataRenderArea.length ? dataRenderArea : [null],
          yAxis: 1,
          zoneAxis: "y",
          zones: [{ value: 0, color: "#d92323" }, { color: "#24bf0f" }],
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.index === this.series.data.length - 1
                ? formatNumberCurrency(this.point.y)
                : null;
            },
            style: {
              color: "#000",
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
        },
      ];

      const combinedSeries = [
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
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.index === this.series.data.length - 1
                ? formatNumberCurrency(this.point.y)
                : null;
            },
            style: {
              color: "#000",
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
        },
        ...(seriesConfigLineChart === 0 ? seriesOption1 : seriesOption2), // Chọn series cấu hình dựa vào `seriesConfig`
      ];

      setSeriesData(combinedSeries);
    }
  }, [data, seriesConfigLineChart]);

  const chartOptions = {
    accessibility: { enabled: false },
    credits: false,
    title: { text: "" },
    legend: {
      enabled: true,
      verticalAlign: "top",
      itemStyle: { fontWeight: "bold", fontSize: "11px" },
    },
    xAxis: {
      type: "datetime",
      tickInterval: 30 * 60 * 1000,
      min: Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0
      ),
      max: Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        15,
        0
      ),
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
        title: {
          text: seriesConfigLineChart === 0 ? "" : "Tỷ VNĐ",
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
        turboThreshold: 100_000_000,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return `<span style="color:${this.color}">●</span> ${
          this.series.name
        }: <b>${formatNumberCurrency(this.y)}</b><br/>`;
      },
    },
    series: seriesData || [null],
  };

  return (
    <div>
      <div className="w-fit">
        <button
          className={`custom-btn-line cursor-pointer ${
            seriesConfigLineChart === 0 ? "active-btn-line" : "btn-2-line"
          }`}
          onClick={() => setSeriesConfigLineChart(0)}
        >
          Khối lượng M/B chủ động
        </button>
        <button
          className={`cursor-pointer md:mt-0 sm:mt-4 xs:mt-4 xxs:mt-4 custom-btn-line ml-4 md:translate-x-0 sm:translate-x-[-16px] xs:translate-x-[-16px] xxs:translate-x-[-16px] ${
            seriesConfigLineChart === 1 ? "active-btn-line" : "btn-2-line"
          }`}
          onClick={() => setSeriesConfigLineChart(1)}
        >
          Lũy kế
        </button>
      </div>
      {data ? (
        <div>
          {seriesConfigLineChart === 0 ? (
            <div className={`${seriesData ? "moving-left-div" : ""} opacity-0`}>
              <div className="relative flex z-10 top-[35px] 2xl:left-[359px] xl:left-[352px] lg:left-[370px] md:left-[240px] sm:left-[70px] xs:left-[45px] xxs:left-[29px] w-[16px] h-[2px]">
                <div className="w-[8px] h-[2px] bg-[#008000]"></div>
                <div className="w-[8px] h-[2px] bg-[#ff0000]"></div>
              </div>
              <div className="relative z-10 top-[27px] 2xl:left-[421px] xl:left-[417px] lg:left-[435px] md:left-[307px] sm:left-[137px] xs:left-[111px] xxs:left-[136px] w-[8px] h-[6px]">
                <div className="absolute" id="triangle-topright-line"></div>
                <div id="triangle-bottomleft-line"></div>
              </div>
              <div className="relative flex z-10 xs:top-[27px] 2xl:left-[519px] xl:left-[513px] lg:left-[530px] md:left-[403px] sm:left-[230px] xs:left-[205px] xxs:left-[29px] xxs:top-[45px] w-[16px] h-[2px]">
                <div className="w-[8px] h-[2px] bg-[#008000]"></div>
                <div className="w-[8px] h-[2px] bg-[#ff0000]"></div>
              </div>
            </div>
          ) : (
            <div
              className={`${seriesData ? "moving-right-div" : ""} opacity-0`}
            >
              <div className="relative flex z-10 top-[35px] 2xl:left-[401px] xl:left-[395px] lg:left-[412px] md:left-[284px] sm:left-[115px] xs:left-[90px] xxs:left-[62px] w-[16px] h-[2px]">
                <div className="w-[8px] h-[2px] bg-[#008000]"></div>
                <div className="w-[8px] h-[2px] bg-[#ff0000]"></div>
              </div>
              <div className="relative z-10 top-[45px] 2xl:left-[462px] xl:left-[457px] lg:left-[476px] md:left-[345px] sm:left-[177px] xs:left-[151px] xxs:left-[123px] w-[8px] h-[8px]">
                <div className="relative flex top-[-16px] left-[2px] z-10 w-[16px] h-[2px]">
                  <div className="w-[6px] h-[2px] bg-[#008000]"></div>
                  <div className="w-[6px] h-[2px] bg-[#ff0000]"></div>
                </div>
                <div className="relative flex top-[-15px] left-[4px] z-10 w-[16px] h-[2px]">
                  <div className="w-[4px] h-[2px] bg-[#008000]"></div>
                  <div className="w-[4px] h-[2px] bg-[#ff0000]"></div>
                </div>
                <div className="relative flex top-[-14px] left-[6px] z-10 w-[16px] h-[2px]">
                  <div className="w-[1.5px] h-[2px] bg-[#008000]"></div>
                  <div className="w-[1.5px] h-[2px] bg-[#ff0000]"></div>
                </div>
              </div>
            </div>
          )}
          <div className="h-[672px] line-chart-mb">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center mt-5 font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default LineChartPrice;
