import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { https } from '../../../services/configService';
import moment from 'moment';



const StackingAreaChart = () => {
    const [data, setData] = useState([])
    const [hoveredValue, setHoveredValue] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await https.get('api/v1/report/ty-trong-dong-tien')
                setData(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        getData()
    }, [])
    const uniqueDates = [];

    const datesSet = new Set();
    Array.isArray(data) && data.map(item => {
        const date = item.date
        if (!datesSet.has(date)) {
            datesSet.add(date);
            uniqueDates.push(moment(date).format('DD/MM'));
        }
    })
    let caNhanPercent = [];
    let khoiNgoaiPercent = [];
    let tuDoanhPercent = [];

    for (let i = 0; i < data.length; i++) {
        let type = data[i].type;
        let percent = data[i].percent;

        switch (type) {
            case 0:
                khoiNgoaiPercent.push(+percent.toFixed(2))
                break;
            case 1:
                tuDoanhPercent.push(+percent.toFixed(2))
                break;
            case 2:
                caNhanPercent.push(+percent.toFixed(2))
                break;
            default:
                break;
        }
    }
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "area",
            zoomType: "x",
            backgroundColor: "transparent",
            style: {
                fontFamily: "Roboto",
            },

        },
        title: {
            useHTML: true,
            text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 14px; font-weight: bold;margin: 0px">Tỷ trọng dòng tiền các nhóm NĐT qua 60 phiên gần nhất</p>
                    <span style="color: #000; font-size: 10px; font-weight: bold;">ĐVT: %</span>
            </div>`,
            margin: -10
        },
        xAxis: {
            categories: uniqueDates,
            tickmarkPlacement: "on",
            title: {
                enabled: true,
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            crosshair: {
                color: "black",
                width: 3,
            },
        },
        yAxis: {

            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
                formatter: function () {
                    return this.value + "%";
                },
            },
            gridLineWidth: 0.5,
        },
        legend: {
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color'),
            },
            enabled: true,
            labelFormatter: function () {
                const hoveredPoint = hoveredValue?.find(
                    (point) => point.name === this.name
                );
                const valueString = hoveredPoint ? `: ${hoveredPoint.value}` : "";
                return `${this.name}${valueString}`;
            },
            align: 'center',
            verticalAlign: 'top',
            squareSymbol: true,
        },
        tooltip: {
            shared: true,
            useHTML: true,
            valueSuffix: " ",
            backgroundColor: "#fff",
            pointFormatter: function () {
                return (
                    '<span style="color:' +
                    this.series.color +
                    '">' +
                    this.series.name +
                    ": <b>" +
                    this.y +
                    "</b></span>  <b>" +
                    "</b><br/>"
                );
            },
        },
        plotOptions: {
            area: {
                stacking: "percent",
                lineColor: "#ffffff",
                lineWidth: 1,
                tooltip: {
                    valueSuffix: " ",
                },
            },
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
                tooltip: {
                    headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
                    pointFormat:
                        "<span style='color:{point.color}'>{series.name}: <b>{point.y}</b></span><br/>",
                    valueDecimals: 2,
                },
                point: {
                    events: {
                        mouseOver: function () {
                            const hoveredValues = [];
                            const xValue = this.x;
                            this.series.chart.series.forEach((series) => {
                                const point = series.data.find((point) => point.x === xValue);
                                if (point) {
                                    hoveredValues.push({
                                        name: series.name,
                                        color: series.color,
                                        value: point.y,
                                    });
                                }
                            });
                            setHoveredValue(hoveredValues);
                        },
                        mouseOut: function () {
                            setHoveredValue(null);
                        },
                    },
                },
            },
        },
        series: [
            {
                name: "Tự doanh",
                data: tuDoanhPercent,
                color: "#0056FF",
                lineColor: "#0056FF",
                lineWidth: 0.5,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Khối ngoại",
                data: khoiNgoaiPercent,
                color: "#0890B0",
                lineColor: "#0890B0",
                lineWidth: 0.5,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Cá nhân",
                data: caNhanPercent,
                color: "#EF9C21",
                lineColor: "#EF9C21",
                lineWidth: 0.5,
                marker: {
                    enabled: false,
                },
            },

        ],
    };
    return (
        <div className='h-[250px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default StackingAreaChart