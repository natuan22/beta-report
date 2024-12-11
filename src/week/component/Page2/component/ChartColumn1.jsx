import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { FiTriangle } from "react-icons/fi";
import { TbTriangleInverted } from "react-icons/tb";
import formatNumber from "../../../../helper/formatNumber";
import formatNumberChart from "../../../../helper/formatNumberChart";

const ColumnChart1 = ({ data, title, unit, currency, translateX }) => {
  const max = Math.ceil(Math.max(...data.map((item) => item.point / currency)));
  const min = Math.floor(
    Math.min(...data.map((item) => item.point / currency))
  );
  //
  //
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

                    <div style="display: flex;align-items: center;justify-content: space-around; ">
                        <p style="color: #000; font-size: 10px; font-weight: bold; ">ĐVT: ${unit} </p>

                        <div style="display: flex;align-items: center;justify-content: space-evenly; ">
                        <div style="    transform: translateY(-2px);display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <span style="font-size: 14px; vertical-align: middle;  ">
                        </span>
                        <span style="font-size: 14px; vertical-align: middle; ">

                        </span>
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
        tickInterval: max / 2,
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
          y: item.point / currency,
          color: item.point >= 0 ? "#26A69A" : "#EF5350", // Xác định màu sắc cho giá trị dương và âm
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
            return `<div style="text-align: center; color: #000; font-size: 8px; font-weight: bold;">${formatNumber(
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
    <div className="h-[250px] relative ">
      {translateX != null ? (
        <div
          className={`absolute top-0 left-0 translate-x-[195px] translate-y-[28px]`}
        >
          <div className="flex flex-col">
            <FiTriangle className="text-[#26a69a] text-[10px]  " />
            <TbTriangleInverted className="text-red-500  text-[10px]  " />
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ColumnChart1;
