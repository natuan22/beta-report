import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getApi } from "../helper/getApi";
import { message, Skeleton, Table, Tooltip } from "antd";
import { getColorBaseOnValue } from "../helper/getColorBaseOnValue";
import formatNumberCurrency from "../helper/formatNumberCurrency";
import socket from "../helper/socket";
import moment from "moment/moment";

const BackTest = () => {
  const rowHeight = 39;
  const maxHeight = 279;
  const [data, setData] = useState();

  const [socketConnected, setSocketConnected] = useState(false);

  const [fromDate, setFromDate] = useState(dayjs().subtract(1, "month"));
  const [toDate, setToDate] = useState(dayjs());
  const [loading, setLoading] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();
  const warning = (type, text) => {
    messageApi.open({ type, content: text });
  };

  const fetchData = async () => {
    if (!fromDate || !toDate) {
      warning("warning", "Hãy chọn ngày để kiểm tra hiệu suất sinh lời");
    } else {
      try {
        const data = await getApi(`/api/v1/investment/back-test-trading-tool?from=${dayjs(fromDate).format("YYYY-MM-DD")}&to=${dayjs(toDate).format("YYYY-MM-DD")}`);
        const dataWithKey = Array.isArray(data) && data?.map((item, index) => ({ ...item, key: index }));

        setData(dataWithKey);
        setLoading(false);
        setSocketConnected(true)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-[#d9e9fd]";
    } else {
      // Dòng chẵn màu #d9e9fd
      return "bg-white";
    }
  };

  const mappedData = Array.isArray(data) && Array.from(new Set(data.map((item) => item.code))).map((code) => ({ text: code, value: code }));

  useEffect(() => {
    // Hàm thêm style trực tiếp vào các phần tử có class 'ant-dropdown'
    const applyCustomStyles = () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown-menu-light");
      dropdowns.forEach((dropdown) => {
        dropdown.style.removeProperty("background-color");
        // Áp dụng các style trực tiếp nếu chưa có
        if (!dropdown.style.getPropertyValue("inset")) {
          dropdown.style.setProperty("background-color", "white", "important");
        }
      });
    };

    // Gọi hàm applyCustomStyles lần đầu tiên khi component mount
    applyCustomStyles();

    // Nếu bạn muốn lắng nghe sự thay đổi DOM (khi phần tử mới xuất hiện)
    const observer = new MutationObserver(applyCustomStyles);
    observer.observe(document.body, { childList: true, subtree: true });

    // Dọn dẹp observer và xóa style khi component unmount
    return () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown-menu-light");
      dropdowns.forEach((dropdown) => {
        // Xóa style khi component unmount
        dropdown.style.removeProperty("background-color");
      });
      // Dừng việc quan sát DOM khi component unmount
      observer.disconnect();
    };
  }, []);

  const columns = [
    {
      title: "Mã",
      dataindex: "code",
      align: "center",
      //   width: 100,
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.priceChange
            )} text-center font-bold text-base`}
          >
            {record.code}
          </div>
        );
      },
      filters: mappedData,
      filterSearch: true,
      onFilter: (value, record) => record.code.includes(value),
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Trạng thái",
      dataindex: "status",
      align: "center",
      //   width: 130,
      render: (_, record) => {
        return (
          <div className={`text-center font-bold text-base`}>
            {record.status === 1 ? (
              <div>
                <span className="text-green-500">Mua</span> - {""}
                <span className="text-red-500">Bán</span>
              </div>
            ) : (
              <div className="text-green-500">Mua</div>
            )}
          </div>
        );
      },
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Giá mua",
      dataindex: "priceBuy",
      align: "center",
      //   width: 110,
      render: (_, record) => {
        return (
          <div className={`text-center text-base`}>
            <Tooltip
              placement="right"
              title={<span className="">{moment(record.startDate).format("DD/MM/YYYY")}</span>}
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              {formatNumberCurrency(record.priceBuy)}
            </Tooltip>
          </div>
        );
      },
      sorter: (a, b) => a.priceBuy - b.priceBuy,
    },
    {
      title: "Giá bán",
      dataindex: "priceSell",
      align: "center",
      //   width: 110,
      render: (_, record) => {
        return (
          <div className={`text-center text-base`}>
            {record.status === 1 ? (
              <Tooltip
                placement="right"
                title={<span className="">{moment(record.endDate).format("DD/MM/YYYY")}</span>}
                color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
              >
                {formatNumberCurrency(record.priceSell)}
              </Tooltip>
            ) : (
              <div></div>
            )}
          </div>
        );
      },
      sorter: (a, b) => a.priceSell - b.priceSell,
    },
    {
      title: "Giá (*)",
      dataindex: "priceStar",
      align: "center",
      //   width: 110,
      render: (_, record) => {
        return (
          <div className={`text-center text-base`}>
            {record.status === 0 ? (
              <Tooltip
                placement="right"
                title={<span className="">{moment(record.endDate).format("DD/MM/YYYY")}</span>}
                color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
              >
                {formatNumberCurrency(record.priceStar)}
              </Tooltip>
            ) : (
              <div></div>
            )}
          </div>
        );
      },
      sorter: (a, b) => a.priceStar - b.priceStar,
    },
    {
      title: "Giá hiện tại",
      dataindex: "priceNow",
      align: "center",
      //   width: 140,
      render: (_, record) => {
        return (
          <div className={`text-center text-base`}>
            {formatNumberCurrency(record.priceNow)}
          </div>
        );
      },
      sorter: (a, b) => a.priceNow - b.priceNow,
    },
    {
      title: "Hiệu xuất sinh lời (%)",
      dataindex: "priceChange",
      align: "center",
      width: 230,
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.priceChange
            )} text-center text-base`}
          >
            {formatNumberCurrency(record.priceChange)}
          </div>
        );
      },
      sorter: (a, b) => a.priceChange - b.priceChange,
    },
  ];

  useEffect(() => {
    if (socketConnected && data?.length > 0) {
      // Lắng nghe sự kiện socket
      const handleSocketResponse = (res) => {
        const newData = [...data];

        // Tìm và cập nhật `priceNow` cho những mục không có `status = 0` khi socket kết nối
        data.forEach((item, i) => {
          if (item.code === res[0].code) {
            newData[i] = { ...item, priceNow: res[0].priceNow };
          }
        });

        // Tìm và cập nhật mục có `status = 0` chỉ khi `toDate.isSame(dayjs(), 'day')`
        if (toDate.isSame(dayjs(), 'day')) {
          const index = data.findIndex((item) => item.code === res[0].code && item.status === 0);
          if (index !== -1) {
            newData[index] = { ...data[index], ...res[0] };
          }
        }
        
        // Cập nhật state
        setData(newData);
      };
  
      socket.on(`listen-back-test-ma-co-phieu`, handleSocketResponse);
  
      return () => {
        socket.off(`listen-back-test-ma-co-phieu`, handleSocketResponse);
      };
    }
  }, [socketConnected, data, toDate]);

  return (
    <div>
      {contextHolder}
      <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
        HIỆU SUẤT SINH LỜI
      </div>
      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="2xl:col-span-3 xl:col-span-full col-span-full mx-auto">
          <div className="py-3 sm:px-[50px] xs:px-[2px] flex xs:gap-5 xxs:gap-1 items-center">
            <div className="text-[#0050AD] font-semibold w-[33px]">Từ: </div>
            <DatePicker
              format="DD/MM/YYYY"
              margin="normal"
              minDate={dayjs("2024-10-01")}
              disableFuture
              formatDate={(date) => dayjs(date).format("DD/MM/YYYY")}
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
              sx={{
                "& .MuiInputBase-input": {
                  width: "151px",
                  padding: "8.5px 14px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#EFB508",
                  paddingRight: "19px",
                },
                "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root":
                  { color: "#000" },
              }}
            />
          </div>
          <div className="py-3 sm:px-[50px] xs:px-[2px] flex xs:gap-5 xxs:gap-1 items-center">
            <div className="text-[#0050AD] font-semibold">Đến: </div>
            <DatePicker
              format="DD/MM/YYYY"
              margin="normal"
              minDate={dayjs("2024-11-01")}
              disableFuture
              formatDate={(date) => dayjs(date).format("DD/MM/YYYY")}
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
              sx={{
                "& .MuiInputBase-input": {
                  width: "151px",
                  padding: "8.5px 14px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#EFB508",
                  paddingRight: "19px",
                },
                "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root":
                  { color: "#000" },
              }}
            />
            <div className="text-[#0050AD] font-semibold">(*)</div>
          </div>
        </div>
        <div className="table-antd-betasmart 2xl:col-span-9 xl:col-span-full col-span-full">
          {!loading && data ? (
            <div className="2xl:w-[1136px] xl:w-full">
              <Table
                showSorterTooltip={false}
                columns={columns}
                dataSource={data}
                rowClassName={rowClassName}
                // pagination={{ defaultPageSize: 15, showSizeChanger: false }}
                scroll={
                  data?.length * rowHeight > maxHeight
                    ? { x: 1119, y: maxHeight }
                    : { x: 1119 }
                }
                pagination={false}
              />
            </div>
          ) : (
            <div className="beta-smart">
              <Skeleton.Input active block size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackTest;
