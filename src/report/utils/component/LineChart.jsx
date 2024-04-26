import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import formatNumber from "../../../helper/formatNumber";

const getCorlor = (value) => {
  if (value > 0) return "text-green-500";
  if (value < 0) return "text-red-500";
};
const getArrow = (value) => {
  if (value < 0) return <FaCaretDown />;
  if (value > 0) return <FaCaretUp />;
};
const LineChart = ({ dataLineChart }) => {
  const dataRender = dataLineChart.chart?.map((item) => [
    item.time,
    item.value,
  ]);
  const chartOptions = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      useHTML: true,
      text: `<div style=" text-align: center" >
            <p style="color: #00429B; font-size: 14px; font-weight: bold;margin: 0px">Biến động chỉ số VN-Index trong phiên</p>
    </div>`,
    },
    xAxis: {
      type: "datetime",
      tickInterval: 60 * 60 * 1000,
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
        style: {
          color: "#000",
          fontSize: "9px",
        },
      },
    },
    yAxis: {
      title: "",
      plotLines: [
        {
          value: dataLineChart.prevClosePrice,
          color: "#EF9C21",
          dashStyle: "dot", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
          // label: {
          //     text: (dataLineChart.prevClosePrice.toFixed(2)),
          //     align: 'right',
          //     x: 5,
          //     y: -10,
          //     zIndex: 10,
          //     style: {
          //         fontSize: '9px', // Chỉnh kích thước font size tại đây
          //         fontWeight: 'bold'
          //     },

          // },
        },
      ],
      gridLineWidth: 0, // Ẩn lưới của trục y
      labels: {
        enabled: true, // Ẩn giá trị của trục y
        style: {
          fontSize: "12px", // Chỉnh kích thước font chữ của giá trị
          fontWeight: "bold",
        },
      },
    },
    legend: {
      enabled: false, // Tắt legend
    },
    plotOptions: {
      series: {
        marker: {
          radius: 1, // Tắt marker
        },
        lineWidth: 2,
        color: "#000",
      },
    },
    series: [
      {
        name: "Dữ liệu",
        data: dataRender,
        zoneAxis: "y",
        zones: [
          {
            value: dataLineChart.prevClosePrice, // Giá trị tách màu (nếu giá trị dưới 5 thì màu đỏ, còn trên 5 thì màu xanh)
            color: "red",
          },
          {
            color: "green",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-between   ">
      <div className="h-[230px] w-[350px]  flex flex-col items-center justify-start  ">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ style: { height: "90%", width: "100%" } }}
        />
        <div className="flex items-center h-[15px] mb-2">
          <p className="font-bold m-0 text-[10px] ">
            <span className={`${getCorlor(dataLineChart.perChange)} `}>
              {getArrow(dataLineChart.perChange)}
            </span>
            VNINDEX:
            <span
              className={`${getCorlor(dataLineChart.perChange)} font-bold ml-2`}
            >
              {formatNumber(dataLineChart.closePrice)} {"  "}
            </span>
            <span className={`${getCorlor(dataLineChart.perChange)} font-bold`}>
              {formatNumber(dataLineChart.change)}/
              {formatNumber(dataLineChart.perChange)}
            </span>
          </p>
          <p className="font-bold m-0 text-[10px] ml-2">
            <span className={`${getCorlor(dataLineChart.perChange)} `}>
              {getArrow(dataLineChart.perChange)}
            </span>
            GTGD:
            <span className={` text-black font-bold ml-2`}>
              {formatNumber(dataLineChart.totalVal / 1000000000)} tỷ đồng {"  "}
            </span>
          </p>
        </div>
        <div className="flex h-[15px] text-[10px] font-bold justify-evenly w-[90%] ">
          <p className="m-0">
            <span className="text-green-500">Tăng:</span>{" "}
            {dataLineChart.advances}{" "}
          </p>
          <p className="m-0">
            <span className="text-[#EF4444]">Giảm:</span>{" "}
            {dataLineChart.declines}{" "}
          </p>
          <p className="m-0">
            <span className="text-[#A3862D]">Tham chiếu:</span>{" "}
            {dataLineChart.noChange}
          </p>
          <p className="m-0">
            <span className="text-[#7F3CCD]">Trần:</span>{" "}
            {dataLineChart.ceilingStocks}{" "}
          </p>
          <p className="m-0">
            <span className="text-[#05B8BF]">Sàn:</span>{" "}
            {dataLineChart.floorStocks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
