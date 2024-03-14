import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChart = ({ data, type }) => {
  const max = Math?.ceil(Math?.max(...data?.map((item) => item.value)));
  const min = Math?.floor(Math?.min(...data?.map((item) => item.value)));
  // console.log(max)
  const date = data?.map((item) => moment(item.date).format("DD/MM"));
  // Lấy giá trị đầu tiên và cuối cùng của mảng date

  const plotLineValue = (type) => {
    if (type === 1) {
      return [
        {
          value: 70,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "70",
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
          value: 30,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "30",
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
    } else if (type === 2) {
      return [
        {
          value: 100,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "100",
            align: "left",
            x: -11,
            y: 2,
            style: {
              color: "black",
              fontSize: "7px",
              fontWeight: 600,
            },
          },
        },
        {
          value: -100,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "-100",
            align: "left",
            x: -11,
            y: 2,
            style: {
              color: "black",
              fontSize: "6.5px",
              fontWeight: 600,
            },
          },
        },
      ];
    } else if (type === 3) {
      return [
        {
          value: -20,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "-20",
            align: "left",
            x: -11,
            y: 3,
            style: {
              color: "black",
              fontSize: "8px",
              fontWeight: 600,
            },
          },
        },
        {
          value: -50,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "-50",
            align: "left",
            x: -11,
            y: 3,
            style: {
              color: "black",
              fontSize: "8px",
              fontWeight: 600,
            },
          },
        },
        {
          value: -80,
          color: "gray",
          dashStyle: "dash", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 1,
          zIndex: 2,
          label: {
            text: "-80",
            align: "left",
            x: -11,
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

  const isZone = (type) => {
    if (type === 1)
      return [
        {
          value: 30, // Giá trị tách màu (nếu giá trị dưới 30 thì màu xanh)
          color: "green",
        },
        {
          value: 70, // Giá trị tách màu (nếu giá trị dưới 70 thì màu xanh lá)
          color: "#023E8A",
        },
        {
          color: "red", // Màu mặc định (giá trị trên 70 thì màu đỏ)
        },
      ];
    else return null;
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
      plotLines: plotLineValue(type),
      gridLineWidth: 0, // Ẩn lưới của trục y
    },
    legend: {
      enabled: false, // Tắt chú thích (legend)
    },
    series: [
      {
        name: "Dữ liệu",
        data: data?.map((item) => item.value),
        color: "#023E8A",
        lineWidth: 1,
        zoneAxis: "y",
        zones: isZone(type),
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
