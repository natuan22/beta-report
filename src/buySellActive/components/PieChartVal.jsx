import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import React, { useEffect, useState } from "react";

const PieChartVal = ({ data }) => {
  const [dataPie, setDataPie] = useState([]);
  const [hasData, setHasData] = useState(false);

  const isValidData = (buyData, sellData) => {
    return [
      buyData.large,
      buyData.medium,
      buyData.small,
      sellData.large,
      sellData.medium,
      sellData.small,
    ].some((val) => val >= 0);
  };

  useEffect(() => {
    if (data) {
      // Destructure buyValData và sellValData
      const {
        large: buyLarge = 0,
        medium: buyMedium = 0,
        small: buySmall = 0,
      } = data.buyValData || {};
      const {
        large: sellLarge = 0,
        medium: sellMedium = 0,
        small: sellSmall = 0,
      } = data.sellValData || {};
      const totalVal = data.totalBuyVal + data.totalSellVal;

      // Kiểm tra tính hợp lệ của dữ liệu
      if (isValidData(data.buyValData || {}, data.sellValData || {})) {
        const dataPieSell = [
          {
            name: "Lớn",
            y: +((sellLarge / totalVal) * 100).toFixed(2),
            color: "#d34037",
          },
          {
            name: "Trung bình",
            y: +((sellMedium / totalVal) * 100).toFixed(2),
            color: "#812a24",
          },
          {
            name: "Nhỏ",
            y: +((sellSmall / totalVal) * 100).toFixed(2),
            color: "#572724",
          },
        ];

        const dataPieBuy = [
          {
            name: "Lớn",
            y: +((buyLarge / totalVal) * 100).toFixed(2),
            color: "#00d060",
          },
          {
            name: "Trung bình",
            y: +((buyMedium / totalVal) * 100).toFixed(2),
            color: "#0c7640",
          },
          {
            name: "Nhỏ",
            y: +((buySmall / totalVal) * 100).toFixed(2),
            color: "#144d31",
          },
        ];

        const combinedDataPie = [...dataPieSell, ...dataPieBuy];

        setDataPie(combinedDataPie);
        setHasData(true);
      } else {
        setHasData(false);
      }
    }
  }, [data]);

  const options = {
    accessibility: { enabled: false },
    credits: false,
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: { text: "" },
    subtitle: { text: "" },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.percentage:.2f}%</b> ",
          connector: {
            enabled: true,
            lineWidth: 0.5,
          },
          distance: 4,
        },
      },
    },
    tooltip: { valueSuffix: "%" },
    legend: {
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    series: [
      {
        name: "Tổng giao dịch",
        data: dataPie.filter((item) => item.y !== 0),
        size: "70%",
        innerSize: "70%",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center">
      {hasData ? (
        <div className="h-[335px]">
          <PieChart
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[329px] text-center mt-5 font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default PieChartVal;
