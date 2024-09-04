import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import icon_excel from "../app/asset/img/icon_excel.png";
import NavBar from "../app/component/NavBar";
import { getApi } from "../helper/getApi";
import ChartLine from "./components/ChartLine";

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

const HistoricalPEPB = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));

  const [data, setData] = useState();
  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState("HCM");
  const [period, setPeriod] = useState("1");

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
    document.title = "Lịch sử P/E P/B";
  }, []);

  const fetchData = async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
    } else {
      try {
        const data = await getApi(
          apiUrl,
          `/api/v1/historical-pe-pb?stock=${stock}&period=${period}`
        );
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [stock, period]);

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

  const sheetTitle = [
    "Ngày",
    "PB Vnindex",
    "PE Vnindex",
    "PB Ngành",
    "PE Ngành",
    "PB",
    "PE",
  ];

  const prepareData = (item) => [
    item.from,
    item.indexPb,
    item.indexPe,
    item.industryPb,
    item.industryPe,
    item.pb,
    item.pe,
  ];

  const downloadExcel = async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
    } else {
      try {
        const data = await getApi(
          apiUrl,
          `/api/v1/historical-pe-pb?stock=${stock}&period=${period}`
        );

        //Xử lý dữ liệu đưa vào sheet
        const sheet1Data = data.data.map(prepareData);

        // Tạo workbook và thêm các sheet
        const workbook = XLSX.utils.book_new();

        // Tạo sheet 1
        XLSX.utils.book_append_sheet(
          workbook,
          XLSX.utils.aoa_to_sheet([sheetTitle, ...sheet1Data]),
          "Historical PE PB"
        );

        // Xuất workbook thành file Excel
        XLSX.writeFile(
          workbook,
          `historical-pe-pb-${stock}-${period}year.xlsx`
        );
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
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
            Lịch sử P/E, P/B
          </div>
          <div className="flex flex-row items-center">
            <div className="code-select mr-5">
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

            <div className="mr-5">
              <div className="mb-[3px] font-medium">Thời gian</div>
              <button
                className={`custom-btn ${
                  period === "1" ? "active-btn" : "btn-2"
                }`}
                onClick={() => {
                  setPeriod("1");
                }}
              >
                1Y
              </button>
              <button
                className={`custom-btn ml-2 ${
                  period === "3" ? "active-btn" : "btn-2"
                }`}
                onClick={() => {
                  setPeriod("3");
                }}
              >
                3Y
              </button>
              <button
                className={`custom-btn ml-2 ${
                  period === "5" ? "active-btn" : "btn-2"
                }`}
                onClick={() => {
                  setPeriod("5");
                }}
              >
                5Y
              </button>
            </div>

            <div className="mt-[24px]">
              <Button
                variant="contained"
                color="test"
                onClick={downloadExcel}
                className="!ml-2"
              >
                <img src={icon_excel} alt="icon_excel" />
                <span className="normal-case pl-1 text-[14px]  font-semibold text-white">
                  Tải Excel
                </span>
              </Button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2">
            <ChartLine stock={stock} data={data} chartKey="P/E" />
            <ChartLine stock={stock} data={data} chartKey="P/B" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HistoricalPEPB;
