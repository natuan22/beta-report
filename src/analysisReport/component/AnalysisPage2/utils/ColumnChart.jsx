import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const ColumnChart = ({ data }) => {
  const max = Math?.ceil(Math?.max(...data?.map((item) => item.value)));
  const min = Math?.floor(Math?.min(...data?.map((item) => item.value)));
  const date = data?.map((item) => moment(item.date).format("DD/MM"));
  // Lấy giá trị đầu tiên và cuối cùng của mảng date

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
      tickInterval: max / 2,
      labels: {
        enabled: false, // Ẩn nhãn của cột y
      },
      max,
      min,
      plotLines: [
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
      ],
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
        zones: [
          {
            value: 0, // Giá trị tách màu (nếu giá trị dưới 30 thì màu xanh)
            color: "red",
          },
          {
            color: "green", // Màu mặc định (giá trị trên 70 thì màu đỏ)
          },
        ],
        type: "column",
      },
    ],
  };

  return (
    <div className="w-[230px] h-[130px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ColumnChart;
