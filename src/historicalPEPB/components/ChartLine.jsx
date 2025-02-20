import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import "../styles/average-legend.css";

const ChartLine = ({ stock, data, chartKey, period }) => {
  const [timeLine, setTimeLine] = useState();
  const [dataChart, setDataChart] = useState([]);
  const [dataAverage, setDataAverage] = useState([]);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const uniqueDates = [
        ...new Set(
          data.data.map((item) => moment(item.date).format("DD/MM/YYYY"))
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
            dataLabels: {
              enabled: true,
              formatter: function () {
                const visibleSeries = this.series.chart.series.filter(
                  (s) => s.visible
                );

                // Kiểm tra nếu có bất kỳ series nào chứa "VNIndex" và nó đang hiển thị
                const hasVNIndexInVisibleSeries = visibleSeries.some((s) =>
                  s.name.toLowerCase().includes("vnindex")
                );

                // Nếu "VNIndex" đang được hiển thị, ẩn nhãn
                if (hasVNIndexInVisibleSeries) {
                  return null; // Ẩn nhãn nếu có "VNIndex" trong các series đang hiển thị
                }

                // Kiểm tra xem có series nào chứa " (Trung bình)" không
                const hasAverageSeries = visibleSeries.some((s) =>
                  s.name.includes(" (Trung bình)")
                );

                // Nếu không có series nào là " (Trung bình)", hiển thị giá trị cuối luôn
                if (!hasAverageSeries) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(2)
                    : null;
                }

                // Lấy tên cơ bản của các series (bỏ phần " (Trung bình)")
                const baseNames = visibleSeries.map((s) =>
                  s.name.replace(" (Trung bình)", "")
                );

                // Lấy tên cơ bản của series hiện tại
                const currentBaseName = this.series.name.replace(
                  " (Trung bình)",
                  ""
                );

                // Kiểm tra nếu tất cả các series có cùng tên cơ bản
                const isAllBaseNamesSame = baseNames.every(
                  (name) => name === currentBaseName
                );

                // Hiển thị nhãn chỉ khi tất cả các series có cùng tên cơ bản
                if (isAllBaseNamesSame) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(2) // Hiển thị giá trị cuối cùng
                    : null;
                }

                return null; // Ẩn nhãn nếu không thỏa mãn điều kiện
              },
              style: {
                color: "#000",
                fontSize: "11px",
                fontWeight: "bold",
                textOutline: "1px contrast",
              },
              y: 20, // Điều chỉnh vị trí dọc của nhãn
            },
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
            dataLabels: {
              enabled: true,
              formatter: function () {
                const visibleSeries = this.series.chart.series.filter(
                  (s) => s.visible
                );

                // Kiểm tra nếu có bất kỳ series nào chứa "VNIndex" và nó đang hiển thị
                const hasVNIndexInVisibleSeries = visibleSeries.some((s) =>
                  s.name.toLowerCase().includes("vnindex")
                );

                // Nếu "VNIndex" đang được hiển thị, ẩn nhãn
                if (hasVNIndexInVisibleSeries) {
                  return null; // Ẩn nhãn nếu có "VNIndex" trong các series đang hiển thị
                }

                // Kiểm tra xem có series nào chứa " (Trung bình)" không
                const hasAverageSeries = visibleSeries.some((s) =>
                  s.name.includes(" (Trung bình)")
                );

                // Nếu không có series nào là " (Trung bình)", hiển thị giá trị cuối luôn
                if (!hasAverageSeries) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(2)
                    : null;
                }

                // Lấy tên cơ bản của các series (bỏ phần " (Trung bình)")
                const baseNames = visibleSeries.map((s) =>
                  s.name.replace(" (Trung bình)", "")
                );

                // Lấy tên cơ bản của series hiện tại
                const currentBaseName = this.series.name.replace(
                  " (Trung bình)",
                  ""
                );

                // Kiểm tra nếu tất cả các series có cùng tên cơ bản
                const isAllBaseNamesSame = baseNames.every(
                  (name) => name === currentBaseName
                );

                // Hiển thị nhãn chỉ khi tất cả các series có cùng tên cơ bản
                if (isAllBaseNamesSame) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(2) // Hiển thị giá trị cuối cùng
                    : null;
                }

                return null; // Ẩn nhãn nếu không thỏa mãn điều kiện
              },
              style: {
                color: "#000",
                fontSize: "11px",
                fontWeight: "bold",
                textOutline: "1px contrast",
              },
              y: 20, // Điều chỉnh vị trí dọc của nhãn
            },
          };
        });

      const calculateAverage = (data, shouldFilter = false) => {
        // Nếu shouldFilter là true, lọc các giá trị không hợp lệ
        const filteredData = shouldFilter
          ? data.filter((value) => value >= 0 && value < 100)
          : data;

        // Tính tổng các giá trị hợp lệ
        const sum = filteredData.reduce((acc, value) => acc + value, 0);

        // Trả về trung bình cộng hoặc 0 nếu không có giá trị hợp lệ
        return filteredData.length > 0 ? sum / filteredData.length : 0;
      };

      // Sử dụng hàm cho peData (có lọc)
      const peAverageData = peData.map((series) => ({
        name: `${series.name} (Trung bình)`,
        data: Array(uniqueDates.length).fill(
          +calculateAverage(series.data, true).toFixed(2)
        ),
        color: series.color,
        dashStyle: "dot",
        visible: false,
        dataLabels: {
          enabled: true,
          formatter: function () {
            // Display data labels only for the last point in the series
            return this.point.index === this.series.data.length - 1
              ? this.point.y.toFixed(2)
              : null; // Return null to hide the label
          },
          style: {
            color: "#000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
      }));

      // Sử dụng hàm cho pbData (không lọc)
      const pbAverageData = pbData.map((series) => ({
        name: `${series.name} (Trung bình)`,
        data: Array(uniqueDates.length).fill(
          +calculateAverage(series.data).toFixed(2)
        ),
        color: series.color,
        dashStyle: "dot",
        visible: false,
        dataLabels: {
          enabled: true,
          formatter: function () {
            // Display data labels only for the last point in the series
            return this.point.index === this.series.data.length - 1
              ? this.point.y.toFixed(2)
              : null; // Return null to hide the label
          },
          style: {
            color: "#000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
      }));

      if (chartKey === "P/E") {
        setDataChart(peData);
        setDataAverage(peAverageData);
      } else {
        setDataChart(pbData);
        setDataAverage(pbAverageData);
      }
    }
  }, [data, stock, chartKey]);

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
      layout: "vertical",
      align: "center",
      verticalAlign: "top",
      enabled: true,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
      itemHiddenStyle: {
        textDecoration: "none",
      },
      x: -100,
      y: 0,
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2,
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
                            <div style="width: 40px">${chartKey}</div>
                            <div>Trung bình</div>
                       </div>`;

        const removeParentheses = (text) => text.replace(/\s*\(.*?\)\s*/g, "");

        this.points.forEach((point) => {
          // Kiểm tra nếu series đang được hiển thị không phải là một dòng trung bình
          if (!point.series.name.includes("Trung bình")) {
            const color = point.series.color;
            const seriesIndex = point.series.index;
            tooltip += `
                <div style="display: flex; align-items: center; margin-bottom: 3px;">
                    <div style="width: 10px; height: 10px; background-color: ${color}; margin-right: 5px;"></div>
                    <span style="color:${color}; width: 65px">${removeParentheses(point.series.name)}</span>
                    <span style="width: 60px;"><b>${formatNumberCurrency(point.y)}</b></span>
                    <span><b>${formatNumberCurrency(dataAverage[seriesIndex].data[0])}</b></span>
                    <br/>
                </div>`;
          }
        });

        return tooltip;
      },
    },
    series: [...dataChart, ...dataAverage],
  };

  return (
    <div>
      <div className="historical-pe-pb h-[500px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
      <div className="mx-[40px]">
          {chartKey} của {stock} ({formatNumberCurrency(data?.data?.length ? data.data[data.data.length - 1]?.[chartKey.replace(/\//g, "").toLowerCase()] || 0 : 0)} lần) đang:
          <ul>
            {(() => {
              const key = chartKey.replace(/\//g, "").toLowerCase();
              const latestValue = data?.data?.[data.data.length - 1]?.[key] || 0;
              const stockAvg = dataAverage?.[0]?.data?.[dataAverage[0].data.length - 1] || 0;
              const industryAvg = dataAverage?.[1]?.data?.[dataAverage[1].data.length - 1] || 0;
              
              const perChangeStock = stockAvg ? ((latestValue - stockAvg) / stockAvg) * 100 : 0;
              const perChangeIndustry = industryAvg ? ((latestValue - industryAvg) / industryAvg) * 100 : 0;

              const textChange = (value) => {
                if (value > 0) {
                  return <span><span className="text-red-500 font-semibold">Cao</span> hơn</span>;
                } else if (value < 0) {
                  return <span><span className="text-green-500 font-semibold">Thấp</span> hơn</span>;
                } else {
                  return <span className="text-yellow-500 font-semibold">Bằng</span>;
                }
              }

              const getColor = (value) => {
                if (value > 0) {
                  return "text-red-500";
                } else if (value < 0) {
                  return "text-green-500";
                } else {
                  return "text-yellow-500";
                }
              }

              return (
                <>
                  <li>{textChange(perChangeStock)} {chartKey} trung bình {period}Y của {stock} ({formatNumberCurrency(stockAvg)} lần) khoảng <span className={`${getColor(perChangeStock)} font-semibold`}>{stockAvg ? formatNumberCurrency(Math.abs(perChangeStock)) : 0}%</span></li>
                  <li>{textChange(perChangeIndustry)} {chartKey} trung bình {period}Y của ngành {data?.industry || "N/A"} ({formatNumberCurrency(industryAvg)} lần) khoảng <span className={`${getColor(perChangeIndustry)} font-semibold`}>{industryAvg ? formatNumberCurrency(Math.abs(perChangeIndustry)) : 0}%</span></li>
                </>
              );
            })()}
          </ul>
      </div>
    </div>
  );
};

export default ChartLine;
