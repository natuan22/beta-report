import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

const GauChartTech = ({ data }) => {
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'gauge',
            backgroundColor: "transparent", // màu nền của biểu đồ
        },
        title: {
            text: '',
            align: 'low', // Đặt tiêu đề ở dưới
            style: {
                fontSize: '16px', // Kích thước tiêu đề
                color: '#333' // Màu của tiêu đề
            },
            y: 30 // Đặt vị trí y để tiêu đề nằm bên dưới
        },
        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },
        // the value axis
        yAxis: {
            min: -8,
            max: 8,
            tickPosition: 'inside',
            tickColor: '#000',
            tickLength: 20,
            tickWidth: 0,
            minorTickInterval: null,
            labels: {
                enabled: false, // Disable the yAxis labels
            },
            lineWidth: 0,
            plotBands: [
                {
                    from: -8,
                    to: -4.8,
                    color: '#FF0000', // Rất tiêu cực
                    thickness: 30,

                },
                {
                    from: -4.8,
                    to: -1.6,
                    color: '#FFA500', // Tiêu cực
                    thickness: 30,

                },
                {
                    from: -1.6,
                    to: 1.6,
                    color: '#FFFF00', // Trung lập
                    thickness: 30,

                },
                {
                    from: 1.6,
                    to: 4.8,
                    color: '#00FF00', // Tích cực
                    thickness: 30,

                },
                {
                    from: 4.8,
                    to: 8,
                    color: '#008000', // Rất tích cực
                    thickness: 30,

                }
            ],
        },
        series: [{
            name: '',
            data: [data.positive + (-data.negative)],
            dataLabels: {
                borderWidth: 0,
                color: '#000',
                style: {
                    fontSize: '16px'
                },
                format: '{value}',
                enabled: true, // Cho phép hiển thị nhãn
                y: 40 // Vị trí của nhãn trên dial
            },
            dial: {
                radius: '80%',
                backgroundColor: '#000',
                baseWidth: 11,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: '#000',
                radius: 8
            }
        }]
    }

    return (
        <div className='relative'>
            <div className='h-[200px] w-[250px]'>
                <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
            </div>
            <div className='absolute bottom-[65px] left-[43px]'>
                <p className='m-0 text-[13px] font-bold'>Tín Hiệu Chỉ Báo Kỹ Thuật</p>
            </div>

            <div className='flex justify-between translate-y-[-30px]'>
                <div className='flex flex-col items-center text-red-400 font-semibold'>
                    <p className='m-0 text-[13px]'>Tiêu cực</p>
                    <p className='m-0 text-[13px]'>{data.negative}</p>
                </div>
                <div className='flex flex-col items-center text-yellow-400 font-semibold'>
                    <p className='m-0 text-[13px]'>Trung lập</p>
                    <p className='m-0 text-[13px]'>{data.neutral}</p>
                </div>
                <div className='flex flex-col items-center text-green-500 font-semibold'>
                    <p className='m-0 text-[13px]'>Tích cực</p>
                    <p className='m-0 text-[13px]'>{data.positive}</p>
                </div>
            </div>
        </div>
    )
}

export default GauChartTech
