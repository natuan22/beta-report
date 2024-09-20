import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import icon_excel from "../app/asset/img/icon_excel.png";
import NavBar from "../app/component/NavBar";
import { userLogoutAction } from "../Auth/thunk";
import { getApi } from "../helper/getApi";
import LineChartPrice from "./components/LineChartPrice";
import PieChartVal from "./components/PieChartVal";
import StackColumnVal from "./components/StackColumnVal";
import TableBuySell from "./components/TableBuySell";

const XLSX = require("xlsx");
const apiUrl = process.env.REACT_APP_BASE_URL;

const theme = createTheme({
  palette: {
    test: {
      light: "#25558d",
      main: "#0050AD",
      dark: "#0b3c74",
    },
  },
});

const BuySellActive = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));

  const [data, setData] = useState();
  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState("FPT");

  const [processedData, setProcessedData] = useState({});

  const [loadingExcel, setLoadingExcel] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      window.location.reload();
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("2ZW79");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setRole(localStorage.getItem("2ZW79"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    document.title = "Mua bán chủ động";
  }, []);

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

  const processData = (data) => {
    const totals = {
      buy: { small: 0, medium: 0, large: 0 },
      sell: { small: 0, medium: 0, large: 0 },
    };
    let totalBuyVal = 0;
    let totalSellVal = 0;

    data.forEach((item) => {
      const value = +item.formattedVal; // Convert formattedVal to a number
      const category =
        value < 100_000_000
          ? "small"
          : value < 1_000_000_000
          ? "medium"
          : "large";

      if (item.lastColor === "S") {
        totals.buy[category] += value;
        totalBuyVal += value;
      } else if (item.lastColor === "B") {
        totals.sell[category] += value;
        totalSellVal += value;
      }
    });

    return {
      buyValData: totals.buy,
      sellValData: totals.sell,
      totalBuyVal,
      totalSellVal,
    };
  };

  const fetchData = async () => {
    if (!stock) {
      warning("warning", "Hãy nhập mã cổ phiếu");
      return null; // Return null if no stock is provided
    }

    try {
      const res = await getApi(
        apiUrl,
        `/api/v1/tcbs/trading-info?stock=${stock}`
      );
      return res; // Return the fetched data
    } catch (error) {
      console.error(error);
      return null; // Return null in case of an error
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(); // Call fetchData and wait for the result

      if (fetchedData && fetchedData.data.length !== data?.data?.length) {
        if (fetchedData.data.length > 0) {
          const processedData = processData(fetchedData.data);
          
          setProcessedData(processedData)
        } else {
          setProcessedData(null)
        }
        setData(fetchedData);
      }
    };

    loadData();

    // Uncomment this if you want to enable periodic fetching
    const intervalId = setInterval(loadData, 60000); // 60 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount or stock change
  }, [stock]);

  const prepareData = (item) => [
    item.formattedTime,
    item.lastColor === "S" ? "Mua" : "Bán",
    Number(item.formattedVol),
    Number(item.formattedMatchPrice),
    Number(item.formattedChangeValue),
  ];

  const sheet1Title = ["Giờ", "M/B", "Khối lượng", "Giá", "+/-"];

  const fetchDataAndDownloadCSV = async () => {
    try {
      setLoadingExcel(true);

      // Gọi API để lấy dữ liệu
      const data = await getApi(
        apiUrl,
        `/api/v1/tcbs/trading-info?stock=${stock}`
      );

      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = data?.data.map(prepareData);

      // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // Tạo sheet 1
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet1Title, ...sheet1Data]),
        "Mua bán chủ động"
      );

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `dataMB_${stock}.xlsx`);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  const buyColor = [{ name: "Lớn", color:"#00d060" }, { name: "Trung bình", color:"#0c7640" }, { name: "Nhỏ", color:"#144d31" }]
  const sellColor = [{ name: "Lớn", color:"#d34037" }, { name: "Trung bình" ,color:"#812a24" }, { name: "Nhỏ", color:"#572724" }]

  return (
    <ThemeProvider theme={theme}>
      {contextHolder}
      <div className="relative">
        <div className="absolute right-[10%] top-[1%]">
          <NavBar
            isLogin={isLogin}
            user={user}
            role={role}
            handleUserLogout={handleUserLogout}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>

        <div className="w-full h-[919px] p-[40px]">
          <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
            Mua bán chủ động
          </div>
          <div className="code-select mr-5">
            <div className="mb-[3px] font-medium">Mã</div>
            <div className="flex items-center">
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
              <LoadingButton
                className="!ml-2"
                variant="contained"
                color="test"
                sx={{
                  padding: "0px",
                  "& .MuiLoadingButton-loadingIndicator": {
                    color: "#FC9433", // Customize the color of the loading spinner
                  },
                }}
                loading={loadingExcel}
                onClick={fetchDataAndDownloadCSV}
              >
                <div className="flex items-center p-[7.5px]">
                  <img src={icon_excel} alt="icon_excel" />
                  <span className="normal-case pl-1 text-[14px]  font-semibold text-white">
                    Tải Excel
                  </span>
                </div>
              </LoadingButton>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2">
            <div className="">
              <LineChartPrice data={data} />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-around">
                <div>
                  <div className="flex justify-evenly">
                    <div>Lệnh <span className="text-green-500 uppercase font-bold">mua</span> chủ động</div>

                    {buyColor.map((item, index) => (
                      <div className="flex items-center gap-2" key={index}>
                        <div
                          style={{ backgroundColor: item.color }}
                          className="rounded-[50%] w-[10px] h-[10px]"
                        ></div>
                        <div>{item.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-evenly mt-1">
                    <div className="w-[148px]">Lệnh <span className="text-red-500 uppercase font-bold">bán</span> chủ động</div>

                    {sellColor.map((item, index) => (
                      <div className="flex items-center gap-2" key={index}>
                        <div
                          style={{ backgroundColor: item.color }}
                          className="rounded-[50%] w-[10px] h-[10px]"
                        ></div>
                        <div>{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <StackColumnVal data={processedData} />
                <PieChartVal data={processedData} />
              </div>
              <TableBuySell data={data} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default BuySellActive;
