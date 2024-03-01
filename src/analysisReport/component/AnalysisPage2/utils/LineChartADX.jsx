import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const LineChartADX = ({ data }) => {
    const date = data?.map(item => moment(item.date).format('DD/MM'))
    // Lấy giá trị đầu tiên và cuối cùng của mảng date
    const dataADX = data?.map(item => item.adx);
    const dataPDI = data?.map(item => item.pdi);
    const dataMDI = data?.map(item => item.mdi);
    const maxDataADX = Math?.ceil(Math.max(...dataADX));
    const maxDataPDI = Math?.ceil(Math.max(...dataPDI));
    const maxDataMDI = Math?.ceil(Math.max(...dataMDI));
    const minDataADX = Math?.floor(Math.min(...dataADX));
    const minDataPDI = Math?.floor(Math.min(...dataPDI));
    const minDataMDI = Math?.floor(Math.min(...dataMDI));

    const max = Math.max(maxDataADX, maxDataPDI, maxDataMDI);
    const min = Math.max(minDataADX, minDataPDI, minDataMDI)
    console.log(max)
    const options = {
        accessibility: {
            enabled: false
        },
        credits: false,
        title: {
            text: ''
        },
        xAxis: {
            type: '',
            categories: date,
            tickInterval: Math.ceil(date?.length / 6),
            tickPositioner: function () {
                const tickPositions = [];
                const interval = Math.ceil(date?.length / 5);

                for (let i = 0; i < date.length; i += interval) {
                    tickPositions.push(i);
                }
                if (date.length - 1 !== tickPositions[tickPositions.length - 1]) {
                    tickPositions.push(date.length - 1);
                }
                return tickPositions;
            },
            labels: {
                style: {
                    fontSize: '10px',  // Thiết lập kích thước font cho nhãn của trục x
                    fontWeight: 600
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            max,
            min,
            tickInterval: max / 2

        },
        legend: {
            enabled: false // Tắt chú thích (legend)
        },
        series: [{
            name: '',
            data: dataADX,
            color: '#FF8700'
        }, {
            name: '',
            data: dataMDI,
            color: '#023E8A'
        },
        {
            name: '',
            data: dataPDI,
            color: '#023E8A'
        }]
    };

    return (
        <div className='w-[230px] h-[130px]'>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "90%", width: "100%" } }}
            />
        </div>
    );
};

export default LineChartADX;
