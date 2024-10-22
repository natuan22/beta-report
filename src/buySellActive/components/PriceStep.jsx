import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../utils/styles/underline-mock.css";

const formatNumberCurrency = (number) => {
  if(number === null) return null
  const strNumber = number.toFixed(1);

  // Tách phần âm, phần nguyên và phần thập phân
  const isNegative = strNumber.startsWith("-");
  const absoluteValue = isNegative ? strNumber.slice(1) : strNumber;
  const [integerPart, decimalPart] = absoluteValue.includes('.') ? absoluteValue.split('.') : [absoluteValue, null];

  // Làm tròn phần nguyên nếu số lớn hơn 1000
  const roundedIntegerPart = Math.abs(number) > 1000 ? Math.round(Math.abs(number)).toString() : integerPart;

  // Định dạng phần nguyên bằng cách thêm dấu chấm sau mỗi ba chữ số từ cuối lên đầu
  const formattedIntegerPart = roundedIntegerPart.length > 3 ?
      roundedIntegerPart.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\.|\.($|\.)|,$/g, '') :
      roundedIntegerPart;

  // Nếu có phần thập phân, thì kết hợp phần nguyên và phần thập phân
  let formattedNumber;
  if (decimalPart !== null && Math.abs(number) < 1000) {
      formattedNumber = `${isNegative ? '-' : ''}${formattedIntegerPart},${decimalPart.padEnd(1, '0')}`;
  } else {
      formattedNumber = `${isNegative ? '-' : ''}${formattedIntegerPart}`;
  }

  return formattedNumber;
}

const PriceStep = ({ data }) => {
  const [state, setState] = useState({ categories: [], series: [], hasData: false, isChartValue: true });

  // Tính toán maxDatayAxis
  const maxDatayAxis = useMemo(() => {
    if (!data) return 0;

    const maxValue = Math.max(
      ...data.matchPriceGroups.map((item) => {
        const totalValue = state.isChartValue
          ? (item.totalValBuy + item.totalValSell + item.atcVal + item.atoVal) /
            1_000_000_000
          : (item.totalVolBuy + item.totalVolSell + item.atcVol + item.atoVol) /
            1_000;
  
        return totalValue;
      })
    );

    // Nếu maxValue lớn hơn 0 và là số nguyên, thì dùng Math.ceil
    return maxValue > 0 && maxValue % 1 === 0 ? Math.ceil(maxValue) : maxValue;
  }, [data, state.isChartValue]);

  // Tạo một callback để tránh re-render không cần thiết
  const handleChangeChart = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isChartValue: !prevState.isChartValue,
    }));
  }, []);

  // Tách các sự kiện hover của ATC và ATO
  const handleMouseOver = useCallback(function (isAtc) {
    const atoSeriesIndex = isAtc ? 1 : 0;

    if (this && this.chart) {
      this.update({ dataLabels: { enabled: true }});

      if (this.chart.series[atoSeriesIndex]) {
        this.chart.series[atoSeriesIndex].update({ dataLabels: { enabled: true }});
      }
    }
  }, []);

  const handleMouseOut = useCallback(function (isAtc) {
    const atoSeriesIndex = isAtc ? 1 : 0;

    if (this && this.chart) {
      this.update({ dataLabels: { enabled: false }});

      if (this.chart.series[atoSeriesIndex]) {
        this.chart.series[atoSeriesIndex].update({ dataLabels: { enabled: false }});
      }
    }
  }, []);

  // Xử lý dữ liệu và tính toán
  const chartData = useMemo(() => {
    if (!data?.matchPriceGroups?.length) return { categories: [], series: [], hasData: false };

    const sortedData = data.matchPriceGroups
      .map((item) => ({
        category: item.category,
        totalValBuy: item.totalValBuy,
        totalValSell: item.totalValSell,
        atcVal: item.atcVal,
        atoVal: item.atoVal,
        totalVolBuy: item.totalVolBuy,
        totalVolSell: item.totalVolSell,
        atcVol: item.atcVol,
        atoVol: item.atoVol,
      }))
      .sort((a, b) => b.category - a.category); // Sắp xếp theo giá

    const categories = sortedData.map((item) => item.category);

    const createSeriesData = (key, isAtc) => ({
      name: isAtc ? "ATC & ATO" : null,
      data: sortedData.map((item) => ({
        y: state.isChartValue ? item[key] / 1_000_000_000 : item[key] / 1_000,
        color: "gray",
        name: isAtc ? "ATC" : "ATO",
      })),
      color: "gray",
      events: {
        mouseOver: function () { handleMouseOver.call(this, isAtc) },
        mouseOut: function () { handleMouseOut.call(this, isAtc) },
      },
    });

    const seriesVal = [
      createSeriesData("atcVal", true),
      { ...createSeriesData("atoVal", false), linkedTo: ":previous" },
      { name: "Bán chủ động", data: sortedData.map(({ totalValSell }) => ({ y: totalValSell / 1_000_000_000, color: "red" })), color: "red" },
      { name: "Mua chủ động", data: sortedData.map(({ totalValBuy }) => ({ y: totalValBuy / 1_000_000_000, color: "green" })), color: "green" },
    ];

    const seriesVol = [
      createSeriesData("atcVol", true),
      { ...createSeriesData("atoVol", false), linkedTo: ":previous" },
      { name: "Bán chủ động", data: sortedData.map(({ totalVolSell }) => ({ y: totalVolSell / 1_000, color: "red" })), color: "red" },
      { name: "Mua chủ động", data: sortedData.map(({ totalVolBuy }) => ({ y: totalVolBuy / 1_000, color: "green" })), color: "green" },
    ];

    return {
      categories,
      series: state.isChartValue ? seriesVal : seriesVol,
      hasData: true,
    };
  }, [data, state.isChartValue, handleMouseOut, handleMouseOver]);

  // Cập nhật state chỉ khi dữ liệu thay đổi
  useEffect(() => {
    if (chartData.categories.length > 0 && (state.categories !== chartData.categories || state.series !== chartData.series)) {
      setState((prevState) => ({
        ...prevState,
        categories: chartData.categories,
        series: chartData.series,
        hasData: chartData.hasData,
      }));
    }
  }, [chartData, state.categories, state.series]);

  const addMouseWheelEvent = (chart) => {
    // Xóa sự kiện trước đó (nếu có) để tránh lặp lại
    if (chart.container.onwheel) {
      chart.container.onwheel = null;
    }

    // Thêm sự kiện cuộn chuột
    chart.container.addEventListener("wheel", (e) => {
      e.preventDefault(); // Ngăn chặn cuộn trang

      const xAxis = chart.xAxis[0];
      const extremes = xAxis.getExtremes();
      const delta = e.deltaY > 0 ? 1 : -1; // Kiểm tra hướng cuộn

      let newMin = extremes.min + delta * 1; // Điều chỉnh hệ số cuộn nếu cần
      let newMax = extremes.max + delta * 1; // Điều chỉnh hệ số cuộn nếu cần

      // Kiểm tra để đảm bảo newMin và newMax nằm trong giới hạn
      newMin = Math.max(extremes.dataMin, Math.min(newMin, extremes.dataMax - (extremes.max - extremes.min)));
      newMax = Math.min(extremes.dataMax, Math.max(newMax, extremes.dataMin + (extremes.max - extremes.min)));

      if (newMin > extremes.dataMin && newMax < extremes.dataMax) {
        chart.yAxis.forEach((yAxis) => {
          yAxis.update({ stackLabels: { enabled: false } }, true);
        });
      }

      // Cập nhật cực trị nếu có thay đổi
      if (newMin !== extremes.min || newMax !== extremes.max) {
        // Cập nhật x-axis
        xAxis.setExtremes(newMin, newMax);

        chart.yAxis.forEach((yAxis) => {
          yAxis.update({ stackLabels: { enabled: true } }, false);
        });

        // Vẽ lại chart bao gồm stack labels, series, và x-axis labels
        chart.redraw();
      }
    });
  }

  const options = useMemo(() => {
    return {
      accessibility: { enabled: false },
      credits: false,
      chart: {
        type: "bar",
        // events: {
        //   load: function () {
        //     const chart = this;
        //     // Gán sự kiện cuộn chuột ngay sau khi biểu đồ load
        //     addMouseWheelEvent(chart);
        //   },
        // },
      },
      title: { text: "" },
      xAxis: {
        categories: state.categories,
        max: state.categories.length > 16 ? 15 : state.categories.length - 1,
        min: 0,
        scrollbar: { enabled: state.categories.length > 16 },
        labels: {
          style: { fontSize: "11px", fontWeight: "bold" },
          formatter: function () {
            const color = this.value === data?.prevClosePrice ? "#eab308" : this.value < data?.prevClosePrice ? "#ef4444" : "#22c55e";

            return `<span style="color: ${color}">${formatNumberCurrency(this.value)}</span>`;
          },
          useHTML: true,
        },
      },
      yAxis: {
        title: { text: state.isChartValue ? "Tỷ VNĐ" : "Nghìn cổ phiếu (CP)", style: { fontSize: "9px", fontWeight: "bold" }},
        max: maxDatayAxis,
        gridLineWidth: 0,
        labels: { style: { fontSize: "9px", fontWeight: "bold" } },
        stackLabels: {
          enabled: true,
          formatter: function () {
            const total = data?.matchPriceGroups.reduce((acc, item) => {
              if (state.isChartValue) 
                  return acc + (item.totalValBuy + item.totalValSell + item.atcVal + item.atoVal) / 1_000_000_000;
              else return acc + (item.totalVolBuy + item.totalVolSell + item.atcVol + item.atoVol) / 1_000;
            }, 0);

            const percentage = (this.total / total) * 100;
              
            return `<span>${formatNumberCurrency(this.total)} (${total > 0 ? `${formatNumberCurrency(percentage)}%` : "-" })</span>`;
          },
          style: { fontWeight: "bold", fontSize: "10px" },
        },
      },
      legend: { enabled: true, verticalAlign: "top", itemStyle: { fontWeight: "bold", fontSize: "11px" }},
      plotOptions: {
        series: {
          turboThreshold: 100_000_000,
          events: {
            mouseOver: function () { this.update({ dataLabels: { enabled: true }}) },
            mouseOut: function () { this.update({ dataLabels: { enabled: false }}) },
          },
        },
        bar: {
          stacking: "normal",
          dataLabels: {
            enabled: false, // Disable data labels by default
            formatter: function () { return this.y !== 0 ? formatNumberCurrency(this.y) : null },
            style: { color: "#fff", textOutline: "1px black", fontWeight: "bold" },
          },
        },
      },
      series: state.series,
      tooltip: {
        enabled: false,
        shared: false,
        useHTML: true,
        backgroundColor: "#fff",
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${ this.name || this.series.name }: <b>${this.y}</b> ${ state.isChartValue ? "tỷ đồng" : "nghìn CP" }<br/>`;
        },
      },
    };
  }, [state.categories, state.series, data, maxDatayAxis, state.isChartValue]);

  return (
    <div>
      {state.hasData ? (
        <div className="h-[635px] price-step">
          <div className="flex gap-4">
            <div
              onClick={handleChangeChart}
              className="bg-white py-1 font-bold text-[#0050AD] hover:text-[#008eecd0] cursor-pointer border-0 text-[15px] relative"
            >
              <span className="underline-mock">
                {state.isChartValue ? "Khối lượng" : "Giá trị"}
              </span>
            </div>
          </div>
          <HighchartsReact
            key={state.categories.length > 16 ? 'long-data' : 'short-data'}
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="text-center pt-[53px] pr-[16px] font-semibold">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default PriceStep;
