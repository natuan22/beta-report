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

  const [processedBuyData, setProcessedBuyData] = useState([]);
  const [processedSellData, setProcessedSellData] = useState([]);
  const [totalBuyVal, setTotalBuyVal] = useState([]);
  const [totalSellVal, setTotalSellVal] = useState([]);

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

  const fetchData = async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
    } else {
      try {
        const res = await getApi(
          apiUrl,
          `/api/v1/tcbs/trading-info?stock=${stock}`
        );

        if (res?.data.length !== data?.data?.length) {
          setData(res); // Chỉ cập nhật nếu có sự thay đổi
        }
      } catch (error) {
        console.error(error);
      }
      // finally {
      //   // Gọi lại sau 30 giây
      //   setTimeout(fetchData, 30000);
      // }
    }
  };

  useEffect(() => {
    fetchData();
  }, [stock]);

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

  useEffect(() => {
    if (data?.data.length > 0) {
      const { buyValData, sellValData, totalBuyVal, totalSellVal } = processData(data.data);

      setProcessedBuyData(buyValData);
      setProcessedSellData(sellValData);
      
      setTotalBuyVal(totalBuyVal)
      setTotalSellVal(totalSellVal)
    } else {
      setProcessedBuyData(null);
      setProcessedSellData(null);
      
      setTotalBuyVal(null)
      setTotalSellVal(null)
    }
  }, [data]);

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
                <StackColumnVal
                  processedBuyData={processedBuyData}
                  processedSellData={processedSellData}
                />
                <PieChartVal
                  processedBuyData={processedBuyData}
                  processedSellData={processedSellData}
                  totalBuyVal={totalBuyVal}
                  totalSellVal={totalSellVal}
                />
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
