import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChart = ({ data }) => {
  const max = Math?.ceil(Math?.max(...data?.map((item) => item.value)));
  const min = Math?.floor(Math?.min(...data?.map((item) => item.value)));
  // console.log(max)
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
      max,
      min,
      tickInterval: max / 2,
    },
    legend: {
      enabled: false, // Tắt chú thích (legend)
    },
    series: [
      {
        name: "Dữ liệu",
        data: data?.map((item) => item.value),
        color: "#023E8A",
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
