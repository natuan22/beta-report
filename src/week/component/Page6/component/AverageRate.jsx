import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'



const AverageRate = ({ data }) => {
    const [timeLine, setTimeLine] = useState()
    const [dataChart, setDataChart] = useState()

    useEffect(() => {
        if (data?.length > 0) {
            const uniqueDates = [...new Set(data?.map(item => moment(item.date).format('DD/MM')))];
            setTimeLine(uniqueDates)
            const result = [];
            data?.forEach(item => {
                const name = item.name;
                const value = +item.value.toFixed(2);

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                    });
                }
            })

            setDataChart(result)
        }
    }, [data])
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'spline',
            backgroundColor: 'transparent',
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px',
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
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    },
                },
                gridLineWidth: 0.5,
            },
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
                opposite: true,
                gridLineWidth: 0.5,
            },
        ],
        legend: {
            align: 'center',
            verticalAlign: 'top',
            enabled: true,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            },

        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            },
        },
        series: dataChart,
    };
    return (
        <div className=' w-[760px] h-[275px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default AverageRate