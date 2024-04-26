import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React from "react";

const ColumnChartPage3 = ({ data, title, unit }) => {
  const max = Math?.ceil(
    Math?.max(...data?.map((item) => item.value / 1000000000))
  );
  const min = Math?.floor(
    Math?.min(...data?.map((item) => item.value / 1000000000))
  );
  const categories = data.map((item) => moment(item.date).format("DD/MM"));

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      useHTML: true,
      text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 12px; font-weight: bold;margin: 0px">${title}</p>
                    <span style="color: #000; font-size: 10px; font-weight: bold;">ĐVT: ${unit}</span>
            </div>`,
    },
    xAxis: {
      visible: true,
      categories,
      crosshair: true,
      tickInterval: Math.ceil(categories?.length / 6),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(categories?.length / 5);

        for (let i = 0; i < categories.length; i += interval) {
          tickPositions.push(i);
        }
        if (categories.length - 1 !== tickPositions[tickPositions.length - 1]) {
          tickPositions.push(categories.length - 1);
        }
        return tickPositions;
      },
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      visible: true,
      title: {
        text: "",
      },
      labels: {
        enabled: false,
        style: {
          fontSize: "10px",
          fontWeight: "bold",
        },
      },
      opposite: true,
      gridLineWidth: 1,
      max,
      min,
      tickInterval: 300,
    },
    series: [
      {
        name: "",
        data: data.map((item) => ({
          y: item.value / 1000000000,
          color: item.value < 0 ? "#FF0000" : "#26a69a", // Chọn màu dựa trên giá trị
        })),
      },
    ],
    legend: {
      enabled: false, // Tắt legend
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}", // Hiển thị giá trị trên cột với 1 số thập phân
          style: {
            color: "#000",
            fontSize: "8px",
            fontWeight: "bold",
            textOutline: "1px contrast", // Tạo viền cho văn bản để nổi bật trên nền đen
          },
        },
      },
    },
  };

  return (
    <div className="h-[180px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ColumnChartPage3;
