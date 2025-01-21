import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import icon_excel from "../app/asset/img/icon_excel.png";
import NavBar from "../app/component/NavBar";
import { getApi } from "../helper/getApi";
import ChartLine from "./components/ChartLine";
import ContributePEPB from "./ContributePEPB";

const XLSX = require("xlsx");

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
  const [isLogin, setIsLogin] = useState(localStorage.getItem(process.env.REACT_APP_IS_LG));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem(process.env.REACT_APP_USER_ROLE));

  const [data, setData] = useState();
  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState("FPT");
  const [period, setPeriod] = useState("1");

  const [loadingExcel, setLoadingExcel] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      window.location.reload();
      localStorage.setItem(process.env.REACT_APP_IS_LG, process.env.REACT_APP_LG_F);
      localStorage.removeItem(process.env.REACT_APP_USER_ROLE);
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem(process.env.REACT_APP_IS_LG));
    setRole(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const fetchData = async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
    } else {
      try {
        const data = await getApi(`/api/v1/tcbs/historical-pe-pb?stock=${stock}&period=${period}`);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchDataStock = async () => {
      try {
        const data = await getApi("/api/v1/investment/all-stock");
        setDataStocks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataStock();
  }, []);

  useEffect(() => { fetchData() }, [stock, period]);
  const filterOption = (input, option) => (option?.value).toLowerCase().includes(input.toLowerCase()) || (option?.label).toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => { setStock(value) };
  const warning = (type, text) => { messageApi.open({ type, content: text }) };

  const sheetTitle = ["Ngày", "PB Vnindex", "PE Vnindex", "PB Ngành", "PE Ngành", "PB", "PE"];

  const prepareData = (item) => [
    new Date(item.from),
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
        setLoadingExcel(true);

        const data = await getApi(`/api/v1/tcbs/historical-pe-pb?stock=${stock}&period=${period}`);

        const sheet1Data = data.data.map(prepareData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([sheetTitle, ...sheet1Data]), "Historical PE PB");

        XLSX.writeFile(workbook, `historical-pe-pb-${stock}-${period}year.xlsx`);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      } finally {
        setLoadingExcel(false);
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

        <div className="w-full p-[40px] font-[Roboto]">
          <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
            Lịch sử P/E, P/B
          </div>
          <div>
            <div className="md:flex sm:block items-center">
              <div className="code-select mr-5">
                <div className="mb-[3px] font-medium">Mã</div>
                <Select
                  style={{ width: 222, height: 40 }}
                  defaultValue={stock}
                  showSearch
                  onChange={onChange}
                  filterOption={filterOption}
                  options={dataStocks.map((code) => ({ value: code, label: code }))}
                />
              </div>

              <div className="mr-5">
                <div className="mb-[3px] font-medium">Thời gian</div>
                <button className={`custom-btn ${period === "1" ? "active-btn" : "btn-2"} xs:inline xxs:block`} onClick={() => { setPeriod("1"); }}>1Y</button>
                <button className={`custom-btn ${period === "3" ? "active-btn" : "btn-2"} xs:inline xxs:block xs:ml-2 xxs:ml-0 xs:mt-0 xxs:mt-2`} onClick={() => { setPeriod("3"); }}>3Y</button>
                <button className={`custom-btn ${period === "5" ? "active-btn" : "btn-2"} xs:inline xxs:block xs:ml-2 xxs:ml-0 xs:mt-0 xxs:mt-2`} onClick={() => { setPeriod("5"); }}>5Y</button>
              </div>

              <div className="mt-[22px]">
                <LoadingButton
                  variant="contained"
                  color="test"
                  sx={{ padding: "0px", "& .MuiLoadingButton-loadingIndicator": { color: "#FC9433" }}}
                  loading={loadingExcel}
                  onClick={downloadExcel}
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
            <div className="grid xl:grid-cols-2 lg:grid-cols-none">
              <ChartLine stock={stock} data={data} chartKey="P/E" />
              <ChartLine stock={stock} data={data} chartKey="P/B" />
            </div>
          </div>
          <div>
            <ContributePEPB />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HistoricalPEPB;
