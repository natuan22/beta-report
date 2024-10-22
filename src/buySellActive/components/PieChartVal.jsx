import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const PieChartVal = ({ data }) => {
  const [dataPie, setDataPie] = useState([]);
  const [hasData, setHasData] = useState(false);

  const isValidData = (buyData, sellData) => {
    return ([buyData.large, buyData.medium, buyData.small].every((val) => val >= 0) && [sellData.large, sellData.medium, sellData.small].every((val) => val >= 0));
  };

  useEffect(() => {
    if (!data) {
      setHasData(false);
      return;
    }

    const totalVal = data?.totalBuyVal + data?.totalSellVal;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (isValidData(data.buyValData || {}, data.sellValData || {})) {
      const createDataPie = (buyOrSellData, colorSet) => {
        return [
          { name: "Lớn",        y: (buyOrSellData.large  / totalVal) * 100, color: colorSet[0] },
          { name: "Trung bình", y: (buyOrSellData.medium / totalVal) * 100, color: colorSet[1] },
          { name: "Nhỏ",        y: (buyOrSellData.small  / totalVal) * 100, color: colorSet[2] },
        ];
      };
    
      const dataPieSell = createDataPie(data.sellValData, ["#d34037", "#812a24", "#572724"]);
      const dataPieBuy = createDataPie(data.buyValData, ["#00d060", "#0c7640", "#144d31"]);
    
      const combinedDataPie = [...dataPieSell, ...dataPieBuy];

      setDataPie(combinedDataPie);
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [data]);

  const options = {
    accessibility: { enabled: false },
    credits: false,
    chart: { type: "pie", backgroundColor: "transparent" },
    title: { text: "" },
    subtitle: { text: "" },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y !== 0
              ? `${formatNumberCurrency(this.percentage)}%`
              : null;
          },
          connector: { enabled: true, lineWidth: 0.5 },
          distance: 4,
        },
      },
    },
    tooltip: { valueSuffix: "%", enabled: false },
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
