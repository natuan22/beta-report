import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChart = ({ data, type }) => {
  // Tạo mảng chứa các ngày
  const dates = data?.map((item) => moment(item.date).format("DD/MM"));

  // Tạo mảng chứa dữ liệu cho đường 1 (k)
  const dataK = data?.map((item) => item.k);
  const dataD = data?.map((item) => item.d);
  const maxDataK = Math?.ceil(Math.max(...dataK));
  const maxDataD = Math?.ceil(Math.max(...dataD));
  const max = Math.max(maxDataK, maxDataD);
  const tickInterval = max / 2;
  // Tạo mảng chứa dữ liệu cho đường 2 (d)

  const plotLineValue = (type) => {
    if (type === 1) {
      return [
        {
          value: 80,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "80",
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
          value: 50,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "50",
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
          value: 20,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "20",
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
      ];
    } else {
      return [
        {
          value: 0,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "0",
            align: "left",
            x: -10,
            y: 4,
            style: {
              color: "black",
              fontSize: "11px",
              fontWeight: 600,
            },
          },
        },
      ];
    }
  };

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    title: {
      text: "",
    },
    xAxis: {
      categories: dates,
      tickInterval: Math.ceil(dates?.length / 6),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(dates?.length / 5);

        for (let i = 0; i < dates.length; i += interval) {
          tickPositions.push(i);
        }
        if (dates.length - 1 !== tickPositions[tickPositions.length - 1]) {
          tickPositions.push(dates.length - 1);
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
      tickInterval,
      labels: {
        enabled: false, // Ẩn nhãn của cột y
      },
      plotLines: plotLineValue(type),
      gridLineWidth: 0, // Ẩn lưới của trục y
    },
    legend: {
      enabled: false,
      layout: "horizontal", // Chú thích hiển thị dưới dạng ngang
      align: "center", // Căn giữa chú thích
      verticalAlign: "top", // Đặt chú thích ở phía trên
      borderWidth: 0, // Không có viền xung quanh chú thích
    },
    series: [
      {
        name: "K",
        data: dataK,
        color: "#FF8700",
        lineWidth: 1,
      },
      {
        name: "D",
        data: dataD,
        color: "#023E8A",
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

export default LineChart;
