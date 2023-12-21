import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { https } from '../../../services/configService';
import moment from 'moment/moment';



const AreaChart = () => {
    const [data, setData] = useState([])
    const max = Math.ceil(Math.max(...data.map(item => (item.value / 1000000000))));
    console.log(max)
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await https.get('api/v1/report/thanh-khoan-thi-truong')
                setData(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])

    console.log(data)
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "area",
            backgroundColor: "transparent",
        },
        title: {
            useHTML: true,
            text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 14px; font-weight: bold;margin: 0px">Thanh khoản thị trường qua 60 phiên gần nhất</p>
                    <span style="color: #000; font-size: 10px; font-weight: bold;">ĐVT: tỷ VNĐ</span>
            </div>`
        },
        xAxis: {
            labels: {
                style: {
                    color: "#000",
                    fontSize: '9px',
                    fontWeight: '600'
                },
            },
            categories: data?.map(item => moment(item.date).format("DD/MM")).reverse()
        },
        yAxis: {

            labels: {
                style: {
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: '600'
                },
            },
            opposite: true,
            gridLineWidth: 0.5,
            max,
            tickInterval: Math.ceil(max / 2)
        },

        legend: {
            enabled: false,
        },
        series: [

            {
                name: "",
                data: data?.map((item) => +(item.value / 1000000000).toFixed(2)).reverse(),
                color: "#1B68BB",
                opacity: "1",
                lineColor: "#1B68BB",
                lineWidth: 1,
                marker: {
                    enabled: false,
                },
            },
        ],
    };
    return (
        <div className='h-[180px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default AreaChart