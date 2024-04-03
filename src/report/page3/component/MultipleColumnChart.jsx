import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MultipleColumnChart = ({ data, legend, title, unit }) => {
  const totalVal = data?.map((item) => +(item.totalVal / 1000000000));
  const prevTotalVal = data?.map((item) => +(item.prevTotalVal / 1000000000));
  const avgTotalVal = data?.map((item) => +(item.avgTotalVal / 1000000000));
  const options = {
    chart: {
      backgroundColor: "transparent", // màu nền của biểu đồ
      style: {
        fontFamily: "Roboto",
      },
    },
    accessibility: {
      enabled: false,
    },
    credits: false,
    title: {
      useHTML: true,
      text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 12px; font-weight: bold;margin: 0px">${title} <span style="color: #000; font-size: 10px; font-weight: bold;"> ${unit}</span></p>
                    
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
          if (words.length > 2) {
            words[2] = words[2].replace(words[2], `<br/>${words[2]}`);
          }
          return `<div style="color: black; font-size: 10px; font-weight: 600">${words.join(
            " "
          )}</div>`;
        },
        rotation: 0,
        align: "center",
      },
    },
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
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
            fontSize: 10,
            fontWeight: 600,
          },
        },
        gridLineWidth: 0.5,
      },
    ],
    legend: {
      align: "center",

      enabled: legend,
      align: "center",
      itemStyle: {
        color: "#000", // Màu cho văn bản trong legend
        fontSize: "11px", // Kích thước font cho văn bản trong legend
        fontWeight: "bold", // Độ đậm của văn bản trong legend
        whiteSpace: "nowrap", // Ngăn chặn xuống dòng trong legend
      },
      symbolPadding: 5, // Khoảng cách giữa biểu tượng và văn bản trong legend
      symbolWidth: 10, // Độ rộng của biểu tượng trong legend
    },
    series: [
      {
        type: "column",
        name: "Phiên hiện tại",
        data: totalVal,
        color: "#EF9C21",
      },
      {
        type: "column",
        name: "Phiên liền kề",
        data: prevTotalVal,
        color: "#1B68BB",
      },
      {
        type: "column",
        name: "GTGD  20 phiên",
        data: avgTotalVal,
        color: "#0890B0",
      },
    ],
  };

  return (
    <div className="h-[154px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default MultipleColumnChart;
