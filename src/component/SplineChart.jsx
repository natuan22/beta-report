import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getColorBaseOnValue } from '../helper/getColorBaseOnValue';

const getLineCorlor = (value) => {
    if (value > 0) return '#039B3B'
    if (value < 0) return 'red'
}
const SplineChart = ({ data }) => {
    console.log(data)
    const dataRender = data.chart.map(item => item.value)
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
            text: '',
        },
        xAxis: {
            visible: false, // Ẩn trục x
        },
        yAxis: {
            visible: false, // Ẩn trục y
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
                color: getLineCorlor(data.change)
            },
        },
        series: [{
            name: 'Dữ liệu',
            data: dataRender,
        }],
    };


    return (
        <div className='flex flex-col items-center   '>
            <h3 className='m-1 font-semibold text-[25px]'>{data.code}</h3>
            <p className={`${getColorBaseOnValue(data.change)} font-semibold m-1 text-[25px]`}>{data.change.toFixed(2)} <span className='text-[21px]'>điểm</span> </p>
            <p className={`${getColorBaseOnValue(data.perChange)} font-semibold m-1 text-[25px]`}>{data.perChange.toFixed(2)}%</p>
            <div className='h-[150px] w-[230px] grid place-items-center  '>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ style: { height: '100%', width: '90%' } }} />
            </div>
        </div>
    )
}

export default SplineChart