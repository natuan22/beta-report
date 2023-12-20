import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ColumnChart = ({ data, unit, title, color, currency, tickInterval, isChart3 }) => {
    const max = Math.ceil(Math.max(...data.map(item => (item.value / currency))));
    const [min, setMin] = useState(0);

    useEffect(() => {
        if (isChart3) {
            setMin(0);
        } else {
            const calculatedMin = Math.floor(Math.min(...data.map(item => (item.value / currency))));
            setMin(calculatedMin);
        }
    }, [data, currency, isChart3]);
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
                    <p style="color: #00429B; font-size: 14px; font-weight: bold;margin: 0px">${title}</p>
                    <span style="color: #000; font-size: 10px; font-weight: bold;">ĐVT: ${unit}</span>
            </div>`
        },
        xAxis: {
            categories: data.map(item => item.code),
            labels: {
                step: 1,
                rotation: -45,
                align: 'center',
                style: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 10,
                }
            },
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold'
                }
            },
            opposite: true,
            gridLineWidth: 0.5,
            min,
            max,
            tickInterval
        },
        series: [
            {
                name: '',
                data: data.map(item => {


                    return {
                        name: item.code,
                        y: +(item.value / `${currency}`).toFixed(1),
                        color: item.value > 0 ? `${color}` : "#EF5350"
                    }
                }),
            },

        ],
        legend: {
            enabled: false, // Tắt legend
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}', // Hiển thị giá trị trên cột với 1 số thập phân
                    style: {
                        color: '#000',
                        fontSize: '8px',
                        fontWeight: 'bold',
                        textOutline: '1px contrast' // Tạo viền cho văn bản để nổi bật trên nền đen
                    }
                }
            }
        },
    };
    return (
        <div className='h-[240px]  '>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default ColumnChart