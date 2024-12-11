import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChartADX = ({ data }) => {
  const date = data?.map((item) => moment(item.date).format("DD/MM"));
  // Lấy giá trị đầu tiên và cuối cùng của mảng date
  const dataADX = data?.map((item) => item.adx);
  const dataPDI = data?.map((item) => item.pdi);
  const dataMDI = data?.map((item) => item.mdi);
  const maxDataADX = Math?.ceil(Math.max(...dataADX));
  const maxDataPDI = Math?.ceil(Math.max(...dataPDI));
  const maxDataMDI = Math?.ceil(Math.max(...dataMDI));
  const minDataADX = Math?.floor(Math.min(...dataADX));
  const minDataPDI = Math?.floor(Math.min(...dataPDI));
  const minDataMDI = Math?.floor(Math.min(...dataMDI));

  const max = Math.max(maxDataADX, maxDataPDI, maxDataMDI);
  const min = Math.max(minDataADX, minDataPDI, minDataMDI);
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    title: {
      text: "",
    },
    xAxis: {
      type: "",
      categories: date,
      tickInterval: Math.ceil(date?.length / 6),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(date?.length / 5);

        for (let i = 0; i < date.length; i += interval) {
          tickPositions.push(i);
        }
        if (date.length - 1 !== tickPositions[tickPositions.length - 1]) {
          tickPositions.push(date.length - 1);
        }
        return tickPositions;
      },
      labels: {
        style: {
          fontSize: "10px", // Thiết lập kích thước font cho nhãn của trục x
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      max,
      min,
      tickInterval: max / 2,
      labels: {
        enabled: false, // Ẩn nhãn của cột y
      },
      plotLines: [
        {
          value: 35,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
          label: {
            text: "35",
            align: "left",
            x: -10,
            y: 3,
            style: {
              color: "black",
              fontSize: "8px",
              fontWeight: 600,
            },
          },
        },
        {
          value: 25,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
          label: {
            text: "25",
            align: "left",
            x: -10,
            y: 3,
            style: {
              color: "black",
              fontSize: "8px",
              fontWeight: 600,
            },
          },
        },
        {
          value: 15,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
          label: {
            text: "15",
            align: "left",
            x: -10,
            y: 3,
            style: {
              color: "black",
              fontSize: "8px",
              fontWeight: 600,
            },
          },
        },
      ],
      gridLineWidth: 0, // Ẩn lưới của trục y
    },
    legend: {
      enabled: false, // Tắt chú thích (legend)
    },
    series: [
      {
        name: "",
        data: dataADX,
        color: "#023E8A",
        lineWidth: 1,
      },
      {
        name: "",
        data: dataMDI,
        color: "#FF0000",
        lineWidth: 1,
      },
      {
        name: "",
        data: dataPDI,
        color: "#00BF63",
        lineWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[230px] h-[130px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "90%", width: "100%" } }}
      />
    </div>
  );
};

export default LineChartADX;
