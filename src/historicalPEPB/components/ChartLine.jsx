import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ChartLine = ({ stock, data, chartKey }) => {
  const [timeLine, setTimeLine] = useState();
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    if (data?.data?.length > 0) {
      const uniqueDates = [
        ...new Set(
          data.data.map((item) => moment(item.from).format("DD/MM/YYYY"))
        ),
      ];
      setTimeLine(uniqueDates);

      const keys = [
        "pe",
        "pb",
        "industryPe",
        "industryPb",
        "indexPe",
        "indexPb",
      ];
      const colors = [
        "#009565",
        "#FF2A37",
        "#00F1A0",
        "#FF9BA3",
        "#FBAC20",
        "#FBAC20",
      ];

      const transformedData = keys.map((key, index) => {
        return {
          name: key,
          data: data.data.map((item) => item[key]),
          color: colors[index], 
        };
      });

      const peData = transformedData
        .filter((item) => item.name.toLowerCase().includes("pe"))
        .map((item) => {
          let newName;
          let dashStyle = undefined;
          switch (item.name) {
            case "pe":
              newName = stock;
              break;
            case "industryPe":
              newName = `Ngành (${data.industry})`;
              dashStyle = "dash";
              break;
            case "indexPe":
              newName = "VNindex";
              break;
            default:
              newName = item.name;
          }
          return {
            ...item,
            name: newName,
            dashStyle,
          };
        });

      const pbData = transformedData
        .filter((item) => item.name.toLowerCase().includes("pb"))
        .map((item) => {
          let newName;
          let dashStyle = undefined;
          switch (item.name) {
            case "pb":
              newName = stock;
              break;
            case "industryPb":
              newName = `Ngành (${data.industry})`;
              dashStyle = "dash";
              break;
            case "indexPb":
              newName = "VNindex";
              break;
            default:
              newName = item.name;
          }
          return {
            ...item,
            name: newName,
            dashStyle,
          };
        });

      if (chartKey === "P/E") {
        setDataChart(peData);
      } else {
        setDataChart(pbData);
      }
    }
  }, [data]);

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
      text: `${chartKey}`,
    },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px",
        },
      },
      tickInterval: Math.ceil(timeLine?.length / 7),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(timeLine?.length / 7);

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
          },
        },
        gridLineWidth: 0.5,
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "top",
      enabled: true,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2, // Giá trị bán kính marker
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      formatter: function () {
        let tooltip = `<div style="display: flex; margin-bottom: 5px;">
                            <div style="width: 80px">${this.x}</div>
                            <div>${chartKey}</div>
                       </div>`;

        const removeParentheses = (text) => text.replace(/\s*\(.*?\)\s*/g, "");

        this.points.forEach((point) => {
          const color = point.series.color;
          tooltip += `
          <div style="display: flex; align-items: center; margin-bottom: 3px;">
            <div style="width: 10px; height: 10px; background-color: ${color}; margin-right: 5px;"></div>
            <span style="color:${color}; width: 65px">${removeParentheses(point.series.name)} </span><b>${point.y}</b><br/>
          </div>`;
        });
        return tooltip;
      },
    },
    series: dataChart,
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ChartLine;
