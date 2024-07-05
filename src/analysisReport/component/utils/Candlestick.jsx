import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Modal } from "antd";

const Candlestick = ({ data }) => {
  const maxVolume = Math.max(...data.map((item) => item.volume));
  const maxNet = Math.max(...data.map((item) => item.net));
  const [isModalZoomOpen, setIsModalZoomOpen] = useState(false);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    rangeSelector: {
      enabled: false, // Ẩn selector ngày
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false, // Vô hiệu hóa thanh cuộn
    },
    title: {
      text: "",
    },
    legend: {
      enabled: true,
      align: "center", // căn giữa
      verticalAlign: "top", // hiển thị ở trên
      layout: "horizontal", // sắp xếp theo chiều ngang
      symbolRadius: 0, // Kích thước của marker trong legend
      itemDistance: 5, // Giảm khoảng cách giữa các legend
      itemStyle: {
        fontSize: "8px", // Độ lớn của chữ trong legend
        fontWeight: 600,
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%m|%y", this.value);
        },
        style: {
          fontSize: "9px",
        },
      },
      tickInterval: 1 * 24 * 3600 * 1000,
    },
    yAxis: [
      {
        top: "-10%",
        height: "70%",
        gridLineWidth: 0,
        labels: {
          align: "right", // Canh chỉnh label về phía bên phải
          x: 10, // Dịch chuyển label về phía trái
          style: {
            fontSize: "9px", // Độ lớn của chữ trục y
          },
        },
      },
      {
        top: "54%",
        height: "20%",
        gridLineWidth: 0,
        labels: {
          align: "right", // Canh chỉnh label về phía bên phải
          x: 10, // Dịch chuyển label về phía trái
          style: {
            fontSize: "9px", // Độ lớn của chữ trục y
          },
        },
        plotLines: [
          {
            value: maxVolume, // Sử dụng giá trị tối đa của dữ liệu volume cho vị trí của đường nét đứt
            color: "black", // Màu của đường nét đứt
            dashStyle: "dash", // Loại nét đứt của đường nét đứt
            width: 1, // Độ rộng của đường nét đứt
            zIndex: 3, // Vị trí đường nét đứt trên biểu đồ
            label: {
              text: "Khối lượng giao dịch - MA(Volume,20)", // Chú thích cho đường nét đứt
              align: "center", // Canh chỉnh chú thích
              x: 0, // Dịch chuyển chú thích theo trục x
              y: -5, // Dịch chuyển chú thích theo trục y
              style: {
                fontSize: "9px", // Độ lớn của chữ trong chú thích
                color: "black", // Màu chữ trong chú thích
              },
            },
          },
        ],
      },
      {
        top: "79%",
        height: "21%",
        gridLineWidth: 0,
        labels: {
          align: "right", // Canh chỉnh label về phía bên phải
          x: 10, // Dịch chuyển label về phía trái
          style: {
            fontSize: "8px", // Độ lớn của chữ trục y
          },
        },
        plotLines: [
          {
            value: maxNet, // Sử dụng giá trị tối đa của dữ liệu volume cho vị trí của đường nét đứt
            color: "black", // Màu của đường nét đứt
            dashStyle: "dash", // Loại nét đứt của đường nét đứt
            width: 1, // Độ rộng của đường nét đứt
            zIndex: 3, // Vị trí đường nét đứt trên biểu đồ
            label: {
              text: "Giao dịch nước ngoài", // Chú thích cho đường nét đứt
              align: "center", // Canh chỉnh chú thích
              x: 0, // Dịch chuyển chú thích theo trục x
              y: -5, // Dịch chuyển chú thích theo trục y
              style: {
                fontSize: "9px", // Độ lớn của chữ trong chú thích
                color: "black", // Màu chữ trong chú thích
              },
            },
          },
        ],
      },
    ],
    plotOptions: {
      candlestick: {
        lineColor: "red", // Màu của candlestick khi giá mở cao hơn giá đóng
        upLineColor: "green", // Màu của viền candlestick khi giá đóng cao hơn giá mở
      },
    },
    series: [
      {
        type: "candlestick",
        name: "Giá",
        data: data.map((item) => [
          item.date,
          item.openPrice,
          item.highPrice,
          item.lowPrice,
          item.closePrice,
        ]),
        dataGrouping: {
          units: [["day", [1]]],
        },
        color: "red", // Màu cho candlestick giảm giá
        upColor: "green", // Màu cho candlestick tăng giá
      },
      {
        type: "line",
        name: "MA10",
        data: data.map((item) => [item.date, +item.ma10.toFixed(2)]),
        color: "#f83434",
        lineWidth: 1,
      },
      {
        type: "line",
        name: "MA20",
        data: data.map((item) => [item.date, +item.ma20.toFixed(2)]),
        color: "#222ae6",
        lineWidth: 1,
      },
      {
        type: "line",
        name: "MA50",
        data: data.map((item) => [item.date, +item.ma50.toFixed(2)]),
        color: "#16405c",
        lineWidth: 1,
      },
      {
        type: "line",
        name: "MA100",
        data: data.map((item) => [item.date, +item.ma100.toFixed(2)]),
        color: "#ce8416",
        lineWidth: 1,
      },
      {
        type: "line",
        name: "MA200",
        data: data.map((item) => [item.date, +item.ma200.toFixed(2)]),
        color: "#59158e",
        lineWidth: 1,
      },
      {
        type: "scatter",
        name: "SAR",
        data: data.map((item) => [item.date, item.sar]),
        marker: {
          symbol: "circle", // Loại ký hiệu dot
          radius: 1, // Đường kính của dot
        },
        color: "#4ccd99",
      },
      {
        type: "column",
        name: "Volume",
        showInLegend: false,
        data: data.map((item) => {
          const color = item.openPrice > item.closePrice ? "red" : "green";
          return { x: item.date, y: item.volume, color: color };
        }),
        yAxis: 1,
        dataGrouping: {
          units: [["day", [1]]],
        },
      },
      {
        type: "line",
        name: "Volume MA20",
        showInLegend: false,
        data: data.map((item) => [item.date, item.volume_ma20]),
        yAxis: 1,
        dataGrouping: {
          units: [["day", [1]]],
        },
        color: "#111ae4",
        lineWidth: 1,
      },
      {
        type: "column",
        name: "Net",
        showInLegend: false,
        data: data.map((item) => [item.date, item.net]),
        yAxis: 2,
        dataGrouping: {
          units: [["day", [1]]],
        },
        colorByPoint: true, // Cho phép màu được xác định theo từng điểm dữ liệu
        zones: [
          {
            value: 0, // Giá trị âm
            color: "red", // Màu đỏ
          },
          {
            color: "green", // Màu xanh (mặc định cho giá trị dương)
          },
        ],
      },
    ],
  };

  const showModalZoom = () => {
    setIsModalZoomOpen(true);
  };

  const handleZoomOk = () => {
    setIsModalZoomOpen(false);
  };

  const handleZoomCancel = () => {
    setIsModalZoomOpen(false);
  };

  return (
    <div>
      <div className="h-[365px] -translate-y-[8px]">
        <div className="relative left-[66px] z-10 top-[27px] w-[8px] h-[8px]">
          <div className="absolute" id="triangle-topright"></div>
          <div id="triangle-bottomleft"></div>
          <div className="ml-[22.5rem] absolute -top-[4.8px] opacity-[45%] hover:opacity-[80%] hover:bg-black hover:bg-opacity-10 rounded-sm h-[18px]">
            <MdOutlineZoomOutMap
              className="cursor-pointer w-[16px] h-[16px]"
              onClick={showModalZoom}
            />
          </div>
          <Modal
            centered
            width={1400}
            open={isModalZoomOpen}
            onOk={handleZoomOk}
            onCancel={handleZoomCancel}
            footer={null}
            className="zoom-conditions"
          >
            <div className="h-[850px]">
              <div className="relative left-[517px] z-10 top-[27px] w-[8px] h-[8px]">
                <div className="absolute" id="triangle-topright"></div>
                <div id="triangle-bottomleft"></div>
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
              />
            </div>
          </Modal>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
    </div>
  );
};

export default Candlestick;
