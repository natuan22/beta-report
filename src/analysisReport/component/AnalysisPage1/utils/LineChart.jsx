import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChart = ({ data }) => {
  // Tạo mảng các ngày duy nhất
  const uniqueDates = Array.from(
    new Set(data.map((item) => moment(item.date).format("DD/MM")))
  );

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
    color: index === 0 ? "#FF8700" : index === 1 ? "#00BF63" : "#147DF5", // Lấy màu cho từng loại mã code
    yAxis: code === "VNINDEX" ? 0 : 1,
  }));

  // Tạo một đối tượng để lưu trữ giá trị lớn nhất và nhỏ nhất của từng loại mã code
  const codeMinMax = {};

  // Duyệt qua mảng dữ liệu và cập nhật giá trị lớn nhất và nhỏ nhất cho mỗi loại mã code
  data.forEach((item) => {
    if (!codeMinMax[item.code]) {
      codeMinMax[item.code] = [];
    }

    codeMinMax[item.code].push(item.value);
  });

  // Tạo một đối tượng để lưu trữ giá trị lớn nhất và nhỏ nhất của từng loại mã code
  const codeMaxMin = {};
  Object.keys(codeMinMax).forEach((code, index) => {
    const values = codeMinMax[code];
    const max = Math.ceil(Math.max(...values));
    const min = Math.floor(Math.min(...values));
    codeMaxMin[index] = { max, min };
  });

  // In ra giá trị lớn nhất và nhỏ nhất của từng loại mã code
  // console.log("Max and min values for each code:");
  // console.log(codeMaxMin);
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
        title: {
          text: null,
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
          },
        },
        crosshair: false,
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
      },
    ],
    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: "#FF8700", // màu cho các nhãn trục y
            fontSize: "11px",
            fontWeight: 600,
          },
        },
        gridLineWidth: 0.5,
        opposite: false,
        max: codeMaxMin[0].max,
        min: codeMaxMin[0].min,
      },
      {
        title: {
          text: "", // Tiêu đề của trục Y thứ hai
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: "#00BF63", // màu cho các nhãn trục y
            fontSize: "11px",
            fontWeight: 600,
          },
          // enabled: false,
        },
        opposite: true,
        gridLineWidth: 0.5,
        max: codeMaxMin[1].max,
        min: codeMaxMin[1].min,
      },
    ],
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
    <div className="h-[205px] translate-y-[-15px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default LineChart;
