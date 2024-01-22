import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import formatNumber from "../../../../helper/formatNumber";
import moment from "moment/moment";
import formatNumberChart from "../../../../helper/formatNumberChart";
const ChartTopForeignTotal = ({ data, title }) => {

    const max = Math.ceil(Math.max(...data.map((item) => item.netVal / 1000000000)));
    const min = Math.floor(Math.min(...data.map((item) => item.value / 1000000000)));
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "column",
            backgroundColor: "transparent",
        },
        title: {
            useHTML: true,
            text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 13px; font-weight: bold;margin: 0px">${title}</p>

                    <div style="display: flex;align-items: center;justify-content: space-between; ">
                        <p style="color: #000; font-size: 10px; font-weight: bold; ">ĐVT: tỷ VNĐ </p>

                        <div style="width: 30px ; height: 2px; background-color: #0155B7; transform: translateX(15px)"></div>
                        <span style="font-size: 10px; vertical-align: middle; color: red, ">Lũy kế</span>
                        </div>
                   
                    </div>
            </div>`,
        },
        xAxis: {
            categories: data.map((item) => moment(item.date).format('DD/MM')),
            labels: {
                step: 1,
                rotation: 0,
                align: "center",
                style: {
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 10,
                },
            },
        },
        yAxis: [
            {
                title: {
                    text: "",
                },
                labels: {
                    enabled: true,
                    style: {
                        fontSize: "10px",
                        fontWeight: "bold",
                    },
                },

                opposite: true,
                gridLineWidth: 0.5,
            },
            {
                title: {
                    text: "",
                },
                labels: {
                    enabled: true,
                    style: {
                        fontSize: "10px",
                        fontWeight: "bold",
                    },
                },
                opposite: false,
                gridLineWidth: 0.5,
            }
        ],
        series: [
            {
                type: "column",
                name: "",
                data: data.map((item) => ({
                    y: item.netVal / 1000000000,
                    color: item.netVal >= 0 ? "#26A69A" : "#EF5350",
                })),
                yAxis: 0,
                color: "#ff0000",
                dataLabels: {
                    enabled: true, // Bật hiển thị label cho cột
                    formatter: function () {
                        return formatNumberChart(this.y);
                    },
                    style: {
                        color: '#000',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textOutline: '1px contrast',
                    },
                },
            },
            {
                type: "line",
                name: "",
                data: data.map((item, index) => ({
                    y: item.value / 1000000000,
                    marker: {
                        symbol: item.value >= 0 ? 'triangle' : 'triangle-down',
                        fillColor: 'none', // Màu sắc của marker
                        lineColor: item.value >= 0 ? '#089C00' : '#FF0000', // Màu sắc đường viền của marker
                        lineWidth: 1, // Độ rộng của đường viền của marker
                    },
                    dataLabels: {
                        enabled: index === data.length - 1, // Chỉ hiển thị label cho điểm cuối cùng
                        formatter: function () {
                            return formatNumberChart(this.y);
                        },
                        style: {
                            color: '#000',
                            fontSize: '10px',
                            fontWeight: 'bold',
                        },
                    },
                })),

                yAxis: 0,
                color: "#0155B7"
            },
        ],

        legend: {
            enabled: false,
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false,
                    formatter: function () {
                        return `<div style="text-align: center; color: #000; font-size: 8px; font-weight: bold;">${formatNumber(this.point.perChange)}%</div>`;
                    },
                    style: {
                        color: "#000",
                        fontSize: "8px",
                        fontWeight: "bold",
                        textOutline: "1px contrast",
                    },
                },
            },
            line: {
                marker: {
                    enabled: true, // Bật hiển thị marker
                    symbol: 'triangle', // Chọn biểu tượng của marker (có thể là circle, square, triangle, etc.)
                    radius: 0, // Kích thước của marker
                    fillColor: 'transparent', // Màu sắc bên trong của marker
                    lineColor: '#FF0000', // Màu sắc đường viền của marker
                    lineWidth: 1,// Độ rộng của đường viền của marker
                },
                dataLabels: {
                    enabled: true, // Bật hiển thị label
                    formatter: function () {
                        return formatNumber(this.y / 1000000000); // Sử dụng hàm formatNumber để định dạng lại giá trị y
                    }, // Định dạng của label (ở đây sử dụng giá trị y của điểm dữ liệu)
                    style: {
                        color: '#000', // Màu sắc của label
                        fontSize: '10px', // Kích thước của label
                        fontWeight: 'bold', // Độ đậm của label
                    },
                },
                lineWidth: 1,
            },
        },
    };

    return (
        <div className="h-[250px]  ">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
            />
        </div>
    );
};

export default ChartTopForeignTotal;
