import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

const LineChartGoodsPrice = ({ dataChart, name1, name2 }) => {
  const [dataRender, setDataRender] = useState();
  const [maxLeft, setMaxLeft] = useState();
  const [maxRight, setMaxRight] = useState();
  const [minLeft, setMinLeft] = useState();
  const [minRight, setMinRight] = useState();

  const [timeLine, setTimeLine] = useState();
  useEffect(() => {
    if (dataChart?.length > 0) {
      const uniqueDates = [
        ...new Set(dataChart?.map((item) => moment(item.date).format("DD/MM/YY"))),
      ].map((date) => date.slice(0, -3)); // Cắt bỏ 3 ký tự cuối cùng (/YY)
      setTimeLine(uniqueDates);

      const result = [];
      dataChart?.forEach((item) => {
        const name =
          item.name === name1
            ? `${name1}, cột trái`
            : item.name === name2
            ? `${name2}, cột phải`
            : item.name;
        const value = +item.value.toFixed(2);

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          result.push({
            name: name,
            data: [value],
          });
        }
      });
      const updatedData = result.map((item, index) => {
        const yAxisValue = item.name === `${name1}, cột trái` ? 0 : 1;

        // Trả về một đối tượng mới với key yAxis đã được thêm
        return { ...item, yAxis: yAxisValue };
      });
      setDataRender(updatedData);
    }
  }, [dataChart]);
  useEffect(() => {
    if (dataRender?.length > 0) {
      setMaxLeft(
        Math.ceil(Math.max(...dataRender[0].data?.map((item) => item)))
      );
      setMinLeft(
        Math?.floor(Math?.min(...dataRender[0].data?.map((item) => item)))
      );
      setMaxRight(
        Math.ceil(Math.max(...dataRender[1].data?.map((item) => item)))
      );
      setMinRight(
        Math?.floor(Math?.min(...dataRender[1].data?.map((item) => item)))
      );
    }
  }, [dataRender]);
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px",
          fontWeight: 600,
        },
      },
      tickInterval: Math.ceil(timeLine?.length / 6),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(timeLine?.length / 5);

        for (let i = 0; i < timeLine.length; i += interval) {
          tickPositions.push(i);
        }
        if (timeLine.length - 1 !== tickPositions[tickPositions.length - 1]) {
          tickPositions.push(timeLine.length - 1);
        }
        return tickPositions;
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
            fontSize: "11px",
            fontWeight: 600,
          },
        },
        gridLineWidth: 0.5,
        opposite: false,
        max: maxLeft,
        min: minLeft,
      },
      {
        title: {
          text: "", // Tiêu đề của trục Y thứ hai
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
            fontSize: "11px",
            fontWeight: 600,
          },
        },
        opposite: true,
        gridLineWidth: 0.5,
        max: maxRight,
        min: minRight,
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "top",
      enabled: true,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
        fontSize: "11px",
      },
      layout: "horizontal", // Thay đổi layout thành 'horizontal'
      itemMarginTop: 1, // Khoảng cách giữa các mục legend
    },
    plotOptions: {
      series: {
        marker: {
          radius: 0, // Giá trị bán kính marker
        },
      },
    },
    series: dataRender,
  };
  return (
    <div className="h-[246px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default LineChartGoodsPrice;
