import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6"

const getLineCorlor = (value) => {
    if (value > 0) return '#039B3B'
    if (value < 0) return 'red'
}
const getArrow = (value) => {
    if (value < 0) return <FaArrowDownLong />
    if (value > 0) return <FaArrowUpLong />
}
const LineChart = ({ dataLineChart }) => {
    const dataRender = dataLineChart.chart?.map(item => ([item.time, item.value]))
    const chartOptions = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'spline',
            backgroundColor: 'transparent'
        },
        title: {
            useHTML: true,
            text: `<div style=" text-align: center" >
            <p style="color: #00429B; font-size: 14px; font-weight: bold;margin: 0px">Biến động chỉ số VN-Index trong phiên</p>
    </div>`
        },
        xAxis: {
            type: "datetime",
            tickInterval: 60 * 60 * 1000,
            min: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 0),
            max: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15, 0),
            labels: {
                rotation: 0,
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px'
                },
            },
        },
        yAxis: {
            title: '',
            plotLines: [
                {
                    value: dataLineChart.prevClosePrice,
                    color: '#EF9C21',
                    dashStyle: 'dot', // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
                    width: 2,
                    zIndex: 2,
                    // label: {
                    //     text: (dataLineChart.prevClosePrice.toFixed(2)),
                    //     align: 'right',
                    //     x: 5,
                    //     y: -10,
                    //     zIndex: 10,
                    //     style: {
                    //         fontSize: '9px', // Chỉnh kích thước font size tại đây
                    //         fontWeight: 'bold'
                    //     },

                    // },
                },
            ],
            gridLineWidth: 0, // Ẩn lưới của trục y
            labels: {
                enabled: true, // Ẩn giá trị của trục y
                style: {
                    fontSize: '12px', // Chỉnh kích thước font chữ của giá trị
                    fontWeight: 'bold'
                },
            },
        },
        legend: {
            enabled: false, // Tắt legend
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 1, // Tắt marker
                },
                lineWidth: 2,
                color: "#000"
            },
        },
        series: [{
            name: 'Dữ liệu',
            data: dataRender,
            zoneAxis: 'y',
            zones: [
                {
                    value: dataLineChart.prevClosePrice, // Giá trị tách màu (nếu giá trị dưới 5 thì màu đỏ, còn trên 5 thì màu xanh)
                    color: 'red',
                },
                {
                    color: 'green',
                },
            ],
        },
        ],

    };


    return (
        <div className='flex flex-col items-center   '>
            <div className='h-[265px] w-[350px]   grid place-items-center  '>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ style: { height: '70%', width: '100%' } }} />

            </div>
        </div>
    )
}

export default LineChart  