import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import formatNumber from '../../../../helper/formatNumber';

const CustomBarChart = ({ data, title, unit, height }) => {
    const vnIndexIndex = data?.findIndex(item => item.name === 'VNINDEX');
    const chartConfig = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "bar",
            backgroundColor: "transparent",
        },
        title: {
            useHTML: true,
            text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 12px; font-weight: bold;margin: 0px; text-align:center">${title}</p>
                    <span style="color: #000; font-size: 10px; font-weight: bold;">ĐVT: ${unit}</span>
            </div>`
        },
        legend: {
            enabled: false,
        },
        series: [{
            name: 'Giảm',
            data: data?.map(item => ({
                y: +item.value.toFixed(2),
                color: item.value >= 0 ? '#039B3B' : '#EF5350',
            })),
            dataLabels: {
                enabled: true,
                inside: false,
                // formatter: function () {
                //     // Hiển thị nhãn trên cả cột ở giữa và cột ngoài cùng
                //     if (this.point.x === 0 || this.point.x === this.series.data.length - 1 || this.point.x === Math.floor(this.series.data.length / 2)) {
                //         return this.y.toFixed(2);
                //     } else {
                //         return null;
                //     }
                // },
                style: {
                    color: '#000', // Màu chữ
                    fontSize: '10px',
                    textOutline: 'none'
                },
            },
        }],
        xAxis: [{
            categories: data?.map(item => item.name),
            reversed: true,
            opposite: false,
            title: {
                text: null,

            },
            labels: {
                formatter: function () {
                    const labelValue = this.value;
                    const words = labelValue.split(' ');
                    if (words.length > 2) {
                        words[2] = words[2].replace(words[2], `<br/>${words[2]}`);
                    }
                    return `<div style="color: black; font-size: 11px; font-weight: 600; margin-top:10px">${words.join(' ')}</div>`;
                },
                rotation: 0,
                align: 'right',
            },
            plotBands: [{
                from: vnIndexIndex - 0.4,
                to: vnIndexIndex + 0.4,
                color: 'transparent', // Màu của vùng được bọc viền
                borderWidth: 1, // Độ rộng của đường viền\
                borderColor: '#E88C08', // Màu của đường viền
                dashStyle: 'dash', // Loại đường nét đứt

            }],


        }],
        yAxis: {
            gridLineWidth: 1,
            title: {
                text: null,
            },
            labels: {
                style: {
                    color: 'black',
                    fontSize: '11px',
                    fontWeight: 500
                },
            },
            tickInterval: 1

        },
        plotOptions: {
            bar: {
                borderWidth: 0,
                borderRadius: 0, // Đặt giá trị này về 0 để tắt borderRadius
                colorByPoint: true,
            },
        },
    };

    return (
        <div className='h-full'>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartConfig}
                containerProps={{ style: { height: `${height}`, width: '100%' } }}
            />
        </div>
    );
};

export default CustomBarChart;
