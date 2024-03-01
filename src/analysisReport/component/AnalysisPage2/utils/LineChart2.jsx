import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const LineChart = ({ data }) => {
    // Tạo mảng chứa các ngày
    const dates = data?.map(item => moment(item.date).format('DD/MM'));

    // Tạo mảng chứa dữ liệu cho đường 1 (k)
    const dataK = data?.map(item => item.k);
    const dataD = data?.map(item => item.d);
    const maxDataK = Math?.ceil(Math.max(...dataK));
    const maxDataD = Math?.ceil(Math.max(...dataD));
    const max = Math.max(maxDataK, maxDataD);
    const tickInterval = max / 2;
    // Tạo mảng chứa dữ liệu cho đường 2 (d)

    const options = {
        accessibility: {
            enabled: false
        },
        credits: false,
        title: {
            text: ''
        },
        xAxis: {
            categories: dates,
            tickInterval: Math.ceil(dates?.length / 6),
            tickPositioner: function () {
                const tickPositions = [];
                const interval = Math.ceil(dates?.length / 5);

                for (let i = 0; i < dates.length; i += interval) {
                    tickPositions.push(i);
                }
                if (dates.length - 1 !== tickPositions[tickPositions.length - 1]) {
                    tickPositions.push(dates.length - 1);
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
            tickInterval

        },
        legend: {
            enabled: false,
            layout: 'horizontal', // Chú thích hiển thị dưới dạng ngang
            align: 'center', // Căn giữa chú thích
            verticalAlign: 'top', // Đặt chú thích ở phía trên
            borderWidth: 0 // Không có viền xung quanh chú thích
        },
        series: [{
            name: 'K',
            data: dataK,
            color: '#FF8700'
        }, {
            name: 'D',
            data: dataD,
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

export default LineChart;
