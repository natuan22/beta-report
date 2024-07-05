import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Modal, Select, Table, Tooltip, message } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import "../utils/styles/cssDatePicker.css";
import ListResults from "./StrategyMA/ListResults";
import ScatterChart from "./StrategyMA/ScatterChart";
import { getApi } from "../../helper/getApi";

const apiUrl = process.env.REACT_APP_BASE_URL;

const StrategyMAVVIP = () => {
  const [data, setData] = useState();
  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState("");

  const [fromDate, setFromDate] = useState(dayjs().subtract(1, "year"));
  const [toDate, setToDate] = useState(dayjs());

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [details, setDetails] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchDataStock = async () => {
      try {
        const data = await getApi(apiUrl, "/api/v1/investment/all-stock");
        setDataStocks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataStock();
  }, []);

  const filterOption = (input, option) =>
    (option?.value).toLowerCase().includes(input.toLowerCase()) ||
    (option?.label).toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    setStock(value);
  };

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const fetchData = async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
    } else {
      try {
        const data = await getApi(
          apiUrl,
          `/api/v1/investment/test?stock=${stock}&from=${dayjs(fromDate).format(
            "YYYY-MM-DD"
          )}&to=${dayjs(toDate).format("YYYY-MM-DD")}`,
        );
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showModalDetail = (record) => {
    setIsModalDetailOpen(true);
    setDetails(record);
  };

  const handleDetailOk = () => {
    setIsModalDetailOpen(false);
  };

  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-white";
    } else {
      // Dòng chẵn màu #F6F0EA
      return "bg-[#F6F0EA]";
    }
  };

  const columnDetails = [
    {
      title: "Ngày mua",
      dataindex: "date_buy",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">{record.date_buy}</div>
      ),
      sorter: (a, b) => new Date(a.date_buy) - new Date(b.date_buy),
    },
    {
      title: "Giá mua",
      dataindex: "price_buy",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.price_buy)}
        </div>
      ),
      sorter: (a, b) => a.price_buy - b.price_buy,
    },
    {
      title: "Ngày bán",
      dataindex: "date_sell",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">{record.date_sell}</div>
      ),
      sorter: (a, b) => new Date(a.date_sell) - new Date(b.date_sell),
    },
    {
      title: "Giá bán",
      dataindex: "price_sell",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.price_sell)}
        </div>
      ),
      sorter: (a, b) => a.price_sell - b.price_sell,
    },
    {
      title: "Hiệu suất sinh l (%)ời",
      align: "profit",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.profit)}
          </div>
        );
      },
      sorter: (a, b) => a.profit - b.profit,
    },
  ];
  return (
    <div>
      {contextHolder}
      <div className="uppercase text-[#0050AD] font-bold text-[18px] flex items-center">
        KIỂM ĐỊNH CHIẾN LƯỢC GIAO DỊCH
        <Tooltip
          placement="bottom"
          title={
            <div className="w-[680px] text-justify p-1">
              Quá trình kiểm tra lại chiến lược giao dịch (backtesting) là việc
              áp dụng các chiến lược giao dịch trên dữ liệu lịch sử nhằm đánh
              giá hiệu quả, rủi ro và lợi nhuận của chiến lược trước khi áp dụng
              vào thị trường thực tế. Do chiến lược giao dịch không phải lúc nào
              cũng hoạt động như dự tính ban đầu, việc kiểm thử này trở thành
              một công cụ hữu ích giúp nhà đầu tư có cái nhìn rõ ràng hơn về
              hiệu suất của chiến lược trong các giai đoạn khác nhau của (%) thị
              trường. Nếu kết quả backtesting tích cực, nhà đầu tư sẽ có thêm tự
              tin rằng chiến lược này có khả năng mang lại lợi nhuận trong thực
              tế. Ngược lại, nếu kết quả không khả quan, nhà đầu tư có thể cân
              nhắc thay đổi hoặc từ bỏ chiến lược đó. Backtesting không chỉ giúp
              đánh giá hiệu quả mà còn cung cấp thông tin quan trọng về mức độ
              rủi ro mà chiến lược có thể mang lại. Điều này giúp nhà đầu tư
              điều chỉnh kỳ vọng và quản lý rủi ro một cách hiệu quả hơn trước
              khi đưa chiến lược vào áp dụng thực tế.
            </div>
          }
          color="#F6F0EA"
        >
          <BsInfoCircle className="ml-2.5 cursor-pointer" />
        </Tooltip>
      </div>

      <div className="mt-2">
        <div className="xl:flex lg:block items-center">
          <div className="code-select mr-10">
            <div className="mb-[3px] font-medium">Mã</div>
            <Select
              style={{
                width: 222,
                height: 40,
              }}
              defaultValue={stock}
              showSearch
              onChange={onChange}
              filterOption={filterOption}
              options={dataStocks.map((code) => ({
                value: code,
                label: code,
              }))}
            />
          </div>
          <div className="md:flex sm:block">
            <div className="mr-5">
              <div className="mb-[3px] font-medium">Thời gian</div>
              <DatePicker
                format="DD/MM/YYYY"
                margin="normal"
                disableFuture
                formatDate={(date) => moment(date).format("DD/MM/YYYY")}
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
                    {
                      color: "#000",
                    },
                }}
              />
            </div>
            <div className="mr-5">
              <div className="mb-[3px] h-[19px]"></div>
              <DatePicker
                format="DD/MM/YYYY"
                margin="normal"
                disableFuture
                formatDate={(date) => moment(date).format("DD/MM/YYYY")}
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
                    {
                      color: "#000",
                    },
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-[3px] h-[19px]"></div>
            <Button
              variant="contained"
              onClick={fetchData}
              endIcon={
                <span className="rounded-full bg-[#005596] w-[30px] h-[30px]">
                  <MdOutlineKeyboardDoubleArrowRight />
                </span>
              }
              sx={{
                borderRadius: "100000px",
                padding: "3px 10px 3px 15px",
              }}
            >
              <span className="normal-case text-[15px] font-semibold">
                Tìm kiếm
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-2 xl:flex lg:block">
          <div className="xl:w-[30%] lg:w-full m-1 border-dashed border-[2px] border-[#EFB508]">
            <div className="uppercase text-[#0050AD] font-semibold text-[19px] text-center mt-1">
              HIỆU SUẤT CAO NHẤT
            </div>
            {data ? (
              <div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">MA</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
                    <Tooltip
                      placement="right"
                      title={<span className="">Xem chi tiết</span>}
                      color={"linear-gradient(to bottom, #ffffff, #f4e6dd)"}
                    >
                      <div
                        className="cursor-pointer"
                        onClick={() => showModalDetail(data?.max)}
                      >
                        {data.max?.name}
                      </div>
                    </Tooltip>
                  </p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Tổng hiệu suất sinh lời (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
                    {formatNumberCurrency(data.max?.total * 100)}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Tổng số lượng lệnh</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
                    {data.max?.count}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Hiệu suất sinh lời max (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
                    {formatNumberCurrency(data.max?.max * 100)}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Hiệu suất sinh lời min (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
                    {formatNumberCurrency(data.max?.min * 100)}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Hiệu suất sinh lời trung bình (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]">
                    {formatNumberCurrency(
                      (data.max?.total / data.max?.count) * 100
                    )}
                  </p>
                </div>
                <Modal
                  centered
                  width={1000}
                  open={isModalDetailOpen}
                  onOk={handleDetailOk}
                  onCancel={handleDetailCancel}
                  footer={null}
                  className="detail-conditions"
                >
                  <div className="h-[600px] table-data-trading-strategies">
                    <span className="font-semibold text-[20px]">
                      {details.name}
                    </span>
                    <Table
                      showSorterTooltip={false}
                      columns={columnDetails}
                      dataSource={details.detail}
                      rowClassName={rowClassName}
                      pagination={false}
                      scroll={{ y: 500 }}
                    />
                  </div>
                </Modal>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">MA</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]"></p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Tổng hiệu suất sinh lời (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]"></p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Tổng số lượng lệnh</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]"></p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Hiệu suất sinh lời max (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]"></p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Hiệu suất sinh lời min (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]"></p>
                </div>
                <div className="flex justify-between items-center text-[16px] py-1 px-3">
                  <p className="m-1 w-[75%]">Hiệu suất sinh lời trung bình (%)</p>
                  <p className="m-1">:</p>
                  <p className="m-1 w-[25%] text-end font-semibold text-[#0050AD]"></p>
                </div>
              </div>
            )}
          </div>
          <div className="xl:w-[70%] lg:w-full m-1 border-dashed border-[2px] border-[#0050AD]">
            <ScatterChart data={data?.data} />
          </div>
        </div>
        <div className="mt-2">
          <ListResults data={data?.data} />
        </div>
      </div>
    </div>
  );
};

export default StrategyMAVVIP;
