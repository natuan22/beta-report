import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment/moment';

const ChartNetVal = ({ data }) => {
    const dataForeign = data?.map(
        (item) => +item.net_foreign.toFixed(2)
    );
    const dataProprietary = data?.map(
        (item) => +item.net_proprietary.toFixed(2)
    );
    const dataRetail = data?.map(
        (item) => +item.net_retail.toFixed(2)
    );
    const timeLine = data?.map((item) =>
        moment(item.date).format("DD/MM")
    );
    const dataExchange = data?.map((item) => item.exchange_price);


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
            text: "",
            style: {
                color: 'white'
            }
        },
        xAxis: {
            categories: timeLine?.reverse(),
            labels: {
                style: {
                    color: 'black', // màu cho các nhãn trục x
                    fontWeight: 600,
                    fontSize: '10px'
                }
            },
            title: {
                style: {
                    color: localStorage.getItem('color') // màu cho tiêu đề trục x
                }
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
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    }
                },
                gridLineWidth: 0.5,
            },
            {
                title: {
                    text: "VNINDEX",
                    style: {
                        color: 'black',
                        fontSize: '10px',
                        fontWeight: 600,
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    }
                },
                opposite: true,
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
                name: "Khối Ngoại",
                data: dataForeign?.reverse(),
                yAxis: 0,
                color: "#FF0000"
            },
            {
                type: "column",
                name: "Tự Doanh",
                data: dataProprietary?.reverse(),
                yAxis: 0,
                color: '#5388D8'
            },
            {
                type: "column",
                name: "Cá nhân và tổ chức trong ngước",
                data: dataRetail?.reverse(),
                yAxis: 0,
                color: '#FFB800'
            },
            {
                type: "spline",
                name: "Chỉ số VN-INDEX",
                data: dataExchange?.reverse(),
                yAxis: 1,
                color: '#00429B',
                marker: {
                    enabled: false // Tắt marker cho đường line
                }
            },
        ],
    };
    return (
        <div className='h-[215px] w-[760px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />

        </div>
    )
}

export default ChartNetVal