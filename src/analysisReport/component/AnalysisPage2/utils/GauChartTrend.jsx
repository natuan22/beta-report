import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

const GauChartTrend = ({ data }) => {
  // Tính toán các giá trị cho biểu đồ
  const calculateChartValues = (data) => {
    const positive = data.positive;
    const negative = data.negative;

    const max = positive + negative;
    const min = -max;
    const step = max / 5;
    const resultArray = [];

    for (let i = 0; i <= 5; i++) {
      const currentValue = parseFloat((min + step * 2 * i).toFixed(2));
      resultArray.push(currentValue);
    }

    return resultArray;
  };

  // Tìm giá trị max và min trong mảng
  const findMaxMin = (arr) => {
    if (arr.length === 0) {
      return null;
    }

    const max = Math.max(...arr);
    const min = Math.min(...arr);

    return { max, min };
  };

  const chartValues = calculateChartValues(data);
  const resultMaxMin = findMaxMin(chartValues);

  const colorBands = [
    {
      from: chartValues[0],
      to: chartValues[1],
      color: "#FF0000",
      thickness: 20,
      label: {
        text: "Rất tiêu cực",
        align: "center",
        verticalAlign: "top",
        x: 27,
        y: 14,
        rotation: -71,
        style: { fontSize: "7px", fontWeight: 600 },
      },
    }, // Rất tiêu cực
    {
      from: chartValues[1],
      to: chartValues[2],
      color: "#FFA500",
      thickness: 20,
      label: {
        text: "Tiêu cực",
        align: "center",
        verticalAlign: "top",
        x: 40,
        y: 21,
        rotation: -36,
        style: {
          fontSize: "9px",
          fontWeight: 600,
        },
      },
    }, // Tiêu cực
    {
      from: chartValues[2],
      to: chartValues[3],
      color: "#FFFF00",
      thickness: 20,
      label: {
        text: "Trung lập",
        align: "center",
        verticalAlign: "top",
        x: 61,
        y: 25,
        style: {
          fontSize: "9px",
          fontWeight: 600,
        },
      },
    }, // Trung lập
    {
      from: chartValues[3],
      to: chartValues[4],
      color: "#00FF00",
      thickness: 20,
      label: {
        text: "Tích cực",
        align: "center",
        verticalAlign: "top",
        x: -31,
        y: 21,
        rotation: 37,
        style: {
          fontSize: "9px",
          fontWeight: 600,
        },
      },
    }, // Tích cực
    {
      from: chartValues[4],
      to: chartValues[5],
      color: "#008000",
      thickness: 20,
      label: {
        text: "Rất tích cực",
        align: "center",
        verticalAlign: "top",
        x: -18,
        y: 14,
        rotation: 70,
        style: {
          fontSize: "7px",
          fontWeight: 600,
        },
      },
    }, // Rất tích cực
  ];

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "gauge",
      backgroundColor: "transparent", // màu nền của biểu đồ
    },
    title: {
      text: "",
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },
    // the value axis
    yAxis: {
      min: resultMaxMin.min,
      max: resultMaxMin.max,
      tickPosition: "inside",
      tickColor: "#000",
      tickLength: 20,
      tickWidth: 0,
      minorTickInterval: null,
      labels: {
        enabled: false, // Disable the yAxis labels
      },
      lineWidth: 0,
      plotBands: colorBands,
    },
    series: [
      {
        name: "",
        data: [data.positive + -data.negative],
        dataLabels: {
          borderWidth: 0,
          color: "#000",
          style: {
            fontSize: "16px",
          },
          format: "{value}",
          enabled: true, // Cho phép hiển thị nhãn
          y: 40, // Vị trí của nhãn trên dial
        },
        dial: {
          radius: "80%",
          backgroundColor: "#000",
          baseWidth: 11,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "#000",
          radius: 8,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <div className="h-[200px] w-[250px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
      <div className="absolute bottom-[65px] left-[43px]">
        <p className="m-0 text-[13px] font-bold">Tín Hiệu Đường Xu Hướng</p>
      </div>

      <div className="flex justify-between translate-y-[-30px]">
        <div className="flex flex-col items-center text-red-400 font-semibold">
          <p className="m-0 text-[13px]">Tiêu cực</p>
          <p className="m-0 text-[13px]">{data.negative}</p>
        </div>
        <div className="flex flex-col items-center text-yellow-400 font-semibold">
          <p className="m-0 text-[13px]">Trung lập</p>
          <p className="m-0 text-[13px]">{data.neutral}</p>
        </div>
        <div className="flex flex-col items-center text-green-500 font-semibold">
          <p className="m-0 text-[13px]">Tích cực</p>
          <p className="m-0 text-[13px]">{data.positive}</p>
        </div>
      </div>
    </div>
  );
};

export default GauChartTrend;
