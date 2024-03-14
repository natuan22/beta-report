import React from 'react'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ChartMultiColumn = ({ data, title, unit }) => {

    const totalVal = data?.map(
        (item) => +(item.totalVal / 1000000000)
    );
    const prevTotalVal = data?.map(
        (item) => +(item.prevTotalVal / 1000000000)
    );
    const avgTotalVal = data?.map(
        (item) => +(item.avgTotalVal / 1000000000)
    );
    const options = {
        chart: {
            backgroundColor: "transparent", // màu nền của biểu đồ
            style: {
                fontFamily: 'Roboto'
            }
        },
        accessibility: {
            enabled: false
        },
        credits: false,
        title: {
            text: '',
        },
        xAxis: {
            enabled: true,
            categories: data?.map(item => item.code),
            useHTML: true, // Cho phép sử dụng HTML trong nhãn
            labels: {
                formatter: function () {
                    const labelValue = this.value;
                    const words = labelValue.split(' ');
                    if (words.length > 2) {
                        words[2] = words[2].replace(words[2], `<br/>${words[2]}`);
                    }
                    return `<div style="color: black; font-size: 10px; font-weight: 600">${words.join(' ')}</div>`;
                },
                rotation: 0,
                align: 'center',
            },

        },
        yAxis: [
            {
                title: {
                    text: "",
                    style: {
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color'), // màu cho các nhãn trục y
                        fontSize: 10,
                        fontWeight: 600

                    }
                },
                gridLineWidth: 0.5,
            },

        ],
        legend: {
            enabled: true,
            align: 'center',
            layout: 'horizontal', // Chọn layout là 'horizontal' để hiển thị nằm ngang
            verticalAlign: 'top', // Đặt vị trí nằm trên cùng của biểu đồ
            itemStyle: {
                color: '#000',
                fontSize: '11px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
            },
            symbolPadding: 5,
            symbolWidth: 10,
        },
        series: [
            {
                type: "column",
                name: "Tuần hiện tại",
                data: totalVal,
                color: "#EF9C21"
            },
            {
                type: "column",
                name: "Tuần liền kề",
                data: prevTotalVal,
                color: '#1B68BB'
            },
            {
                type: "column",
                name: "GTGD ngành bình quân 4 tuần",
                data: avgTotalVal,
                color: '#0890B0'
            },



        ],
    };


    return (
        <div className='h-[230px] w-[760px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />

        </div>
    )
}

export default ChartMultiColumn