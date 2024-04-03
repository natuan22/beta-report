import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChartAfternoon = ({ data, title, unit }) => {
  const max = Math?.ceil(
    Math?.max(...data?.map((item) => item.value / 1000000000))
  );
  const min = Math?.floor(
    Math?.min(...data?.map((item) => item.value / 1000000000))
  );
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
                    <p style="color: #00429B; font-size: 12px; font-weight: bold;margin: 0px">${title} <span style="color: #000; font-size: 10px; font-weight: bold;"> (${unit})</span></p>
                    
            </div>`,
    },
    xAxis: {
      enabled: true,
      categories: data.map((item) => item.code),
      useHTML: true, // Cho phép sử dụng HTML trong nhãn
      labels: {
        formatter: function () {
          const labelValue = this.value;
          const words = labelValue.split(" ");
          const modifiedWords = words.map((word) =>
            word.replace(/(phụ|tùng)/g, "")
          );

          if (modifiedWords.length > 2) {
            modifiedWords[2] = modifiedWords[2].replace(
              modifiedWords[2],
              `<br/>${modifiedWords[2]}`
            );
          }

          return `<div style="color: black; font-size: 10px; font-weight: 600">${modifiedWords.join(
            " "
          )}</div>`;
        },
        rotation: 0,
        align: "center",
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
      tickInterval: Math.ceil(max / 5),
    },
    series: [
      {
        name: "",
        data: data.map((item) => {
          return {
            name: item.code,
            y: +(item.value / `${1000000000}`).toFixed(1),
            color: item.value > 0 ? "#26A69A" : "#EF5350",
          };
        }),
        color: "#1B68BB",
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
    <div className="h-[200px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ColumnChartAfternoon;
