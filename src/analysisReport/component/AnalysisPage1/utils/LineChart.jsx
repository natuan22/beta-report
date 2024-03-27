import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChart = ({ data, type }) => {
  // Tạo mảng các ngày duy nhất
  const uniqueDates = [
    ...new Set(data?.map((item) => moment(item.date).format("DD/MM"))),
  ];

  // Tạo mảng dữ liệu cho từng loại mã code
  const seriesData = {};
  data.forEach((item) => {
    if (!seriesData[item.code]) {
      seriesData[item.code] = [];
    }
    seriesData[item.code].push([moment(item.date).format("DD/MM"), item.value]);
  });
  // Chuyển đổi dữ liệu thành dạng series cho biểu đồ
  const series = Object.keys(seriesData).map((code, index) => ({
    name: code,
    data: seriesData[code],
    color: code === "VNINDEX" ? "#FF8700" : "#00BF63", // Lấy màu cho từng loại mã code
    // color: code === 0 ? "#FF8700" : index === 1 ? "#00BF63" : "#147DF5", // Lấy màu cho từng loại mã code
  }));

  const max = Math?.ceil(Math?.max(...data?.map((item) => item.value)) ?? 0);
  const min = Math?.floor(Math?.min(...data?.map((item) => item.value)) ?? 0);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    legend: {
      enabled: true,
      verticalAlign: "top", // Đặt legend ở trên
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
      itemMarginTop: 3, // Khoảng cách giữa các mục trong legend
      symbolRadius: 0, // Kích thước của marker trong legend
      labelFormatter: function () {
        return (
          '<span style="font-size: 12px; font-weight: bold; color: #333333">' +
          this.name +
          "</span>"
        );
      },
    },
    xAxis: [
      {
        categories: uniqueDates,
        tickInterval: Math.ceil(uniqueDates?.length / 6),
        tickPositioner: function () {
          const tickPositions = [];
          const interval = Math.ceil(uniqueDates?.length / 5);

          for (let i = 0; i < uniqueDates.length; i += interval) {
            tickPositions.push(i);
          }
          if (
            uniqueDates.length - 1 !==
            tickPositions[tickPositions.length - 1]
          ) {
            tickPositions.push(uniqueDates.length - 1);
          }
          return tickPositions;
        },
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },
    ],
    yAxis: {
      title: {
        text: "",
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        style: {
          fontSize: "11px",
        },
      },
      gridLineWidth: 0.5,
      max: max,
      min: min,
      tickInterval: Math.ceil(max / 11),
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2, // Giá trị bán kính marker
        },
      },
    },
    tooltip: {
      split: true,
    },
    series: series,
  };
  return (
    <div
      className={`${
        type === 1 ? "h-[210px]" : "h-[300px]"
      } translate-y-[-15px]`}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default LineChart;
