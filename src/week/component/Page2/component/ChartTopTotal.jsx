import React from "react";
import Highcharts from "highcharts";
import { TbTriangleInverted } from "react-icons/tb";
import { FiTriangle } from "react-icons/fi";
import HighchartsReact from "highcharts-react-official";
import formatNumberChart from "../../../../helper/formatNumberChart";
const ChartTopTotal = ({ data, title }) => {
  const max = Math.ceil(
    Math.max(...data.map((item) => item.totalVal / 1000000000))
  );
  const min = Math.floor(
    Math.min(...data.map((item) => item.totalVal / 1000000000))
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
                    <p style="color: #00429B; font-size: 13px; font-weight: bold;margin: 0px">${title}</p>

                    <div style="display: flex;align-items: center;justify-content: space-evenly; ">
                        <p style="color: #000; font-size: 10px; font-weight: bold; ">ĐVT: tỷ VNĐ </p>

                        <div style="display: flex;align-items: center;justify-content: space-evenly; ">
                        <div style="    transform: translateY(-2px);display: flex;flex-direction: column;justify-content: center;align-items: center;">
                            
                        </div> 
                        <span style="font-size: 10px; vertical-align: middle; color: red, ">: +/-  % thay đổi giá</span>
                        </div>
                   
                    </div>
            </div>`,
    },
    xAxis: {
      categories: data.map((item) => item.code),
      labels: {
        step: 1,
        rotation: 0,
        align: "center",
        style: {
          color: "#000",
          fontWeight: "bold",
          fontSize: 10,
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "",
        },
        labels: {
          enabled: true,
          style: {
            fontSize: "10px",
            fontWeight: "bold",
          },
        },
        max,
        min,
        opposite: true,
        gridLineWidth: 0.5,
      },
      {
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
        opposite: false,
        gridLineWidth: 0.5,
      },
    ],
    series: [
      {
        type: "column",
        name: "",
        data: data.map((item) => ({
          y: item.totalVal / 1000000000,
          color: item.color,
        })),
        yAxis: 0,
        color: "#ff0000",
      },
      {
        type: "spline",
        name: "",
        data: data.map((item) => ({
          y: item.perChange,
          marker: {
            symbol: item.perChange >= 0 ? "triangle" : "triangle-down",
            fillColor: "none", // Màu sắc của marker
            lineColor: item.perChange >= 0 ? "#089C00" : "#FF0000", // Màu sắc đường viền của marker
            lineWidth: 1, // Độ rộng của đường viền của marker
          },
        })),
        yAxis: 1,
        color: "#ff0000",
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: false,
          formatter: function () {
            return `<div style="text-align: center; color: #000; font-size: 8px; font-weight: bold;">${formatNumberChart(
              this.point.perChange
            )}%</div>`;
          },
          style: {
            color: "#000",
            fontSize: "8px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
      },
      spline: {
        marker: {
          enabled: true, // Bật hiển thị marker
          symbol: "triangle", // Chọn biểu tượng của marker (có thể là circle, square, triangle, etc.)
          radius: 3, // Kích thước của marker
          fillColor: "transparent", // Màu sắc bên trong của marker
          lineColor: "#FF0000", // Màu sắc đường viền của marker
          lineWidth: 1, // Độ rộng của đường viền của marker
        },
        dataLabels: {
          enabled: true, // Bật hiển thị label
          formatter: function () {
            return formatNumberChart(this.y) + "%"; // Sử dụng hàm formatNumber để định dạng lại giá trị y
          }, // Định dạng của label (ở đây sử dụng giá trị y của điểm dữ liệu)
          style: {
            color: "#000", // Màu sắc của label
            fontSize: "8px", // Kích thước của label
            fontWeight: "bold", // Độ đậm của label
          },
        },
        lineWidth: 0,
      },
    },
  };

  return (
    <div className="h-[250px] relative  ">
      <div className="absolute top-0 left-0 translate-x-[176px] translate-y-[28px]">
        <div className="flex flex-col">
          <FiTriangle className="text-[#26a69a] text-[10px]  " />
          <TbTriangleInverted className="text-red-500  text-[10px]  " />
        </div>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ChartTopTotal;
