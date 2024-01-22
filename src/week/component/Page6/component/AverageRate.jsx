import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'



const AverageRate = ({ data }) => {
    const [timeLine, setTimeLine] = useState()
    const [dataChart, setDataChart] = useState()
    const [maxVal, setMaxVal] = useState()
    const postion = ['Qua đêm', '1 Tuần', '2 Tuần', '1 Tháng'];
    const getColorByPosition = (position) => {
        switch (position) {
            case 'Qua đêm':
                return 'red';
            case '1 Tuần':
                return '#0155b7';
            case '2 Tuần':
                return '#56BE7E';
            case '1 Tháng':
                return '#7689DF';
            default:
                return 'black'; // Màu mặc định nếu không khớp
        }
    };
    useEffect(() => {
        if (data?.length > 0) {
            const uniqueDates = [...new Set(data?.map(item => moment(item.date).format('DD/MM')))];
            setTimeLine(uniqueDates);

            const result = [];
            data?.forEach(item => {
                const name = item.name;
                const value = +item.value.toFixed(2);
                const color = getColorByPosition(name); // Lấy màu sắc dựa trên tên

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                        color: color, // Thêm trường màu sắc vào đối tượng
                    });
                }
            });

            // Sắp xếp mảng theo thứ tự trong position
            result.sort((a, b) => postion.indexOf(a.name) - postion.indexOf(b.name));

            setDataChart(result);
        }
    }, [data]);
    useEffect(() => {
        if (dataChart?.length > 0) {
            setMaxVal(Math?.ceil(Math?.max(...dataChart[3].data?.map(item => (item)))))
        }
    }, [dataChart])
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
                max: maxVal,
                tickInterval: maxVal / 2,
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
        <div className=' w-[760px] h-[245px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default AverageRate