import React from "react";
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
  }));

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
      },
    ],
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: 10,
          fontWeight: 600,
        },
      },
      gridLineWidth: 0.5,
      crosshair: false,
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
