import { DotChartOutlined } from "@ant-design/icons";
import { Select, Skeleton, message } from "antd";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Candlestick from "../analysisReport/component/utils/Candlestick";
import NavBar from "../app/component/NavBar";
import { userLogoutAction } from "../Auth/thunk";
import formatNumberCurrency from "../helper/formatNumberCurrency";
import { getApi } from "../helper/getApi";
import ComparisonBox from "./components/ComparisonBox";
import PercentageInput from "./components/PercentageInput";
import PeriodSelector from "./components/PeriodSelector";
import ValuationSection from "./components/ValuationSection";
import "./styles/input-antd.css";

// Reusable price calculation function
const calculateWeightedPrice = (stockPrice, indusPrice, stockPE, stockPB, indusPE, indusPB) => {
  if (!stockPrice || !indusPrice) return 0;

  return (
    (stockPrice?.[4] * stockPE) / 100 +
    (stockPrice?.[5] * stockPB) / 100 +
    (indusPrice?.[4] * indusPE) / 100 +
    (indusPrice?.[5] * indusPB) / 100
  );
};

const StockValuation = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [isLogin, setIsLogin] = useState(localStorage.getItem(process.env.REACT_APP_IS_LG));
  const [role, setRole] = useState(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState("FPT");
  const [period, setPeriod] = useState("1");

  const handleUserLogout = useCallback(() => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      localStorage.setItem(process.env.REACT_APP_IS_LG, process.env.REACT_APP_LG_F);
      localStorage.removeItem(process.env.REACT_APP_USER_ROLE);
      localStorage.removeItem("user");
    }
  }, [isLogin, dispatch]);

  const onSubmitSuccess = useCallback(() => {
    setIsLogin(localStorage.getItem(process.env.REACT_APP_IS_LG));
    setRole(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

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

  const filterOption = useCallback((input, option) => (option?.value).toLowerCase().includes(input.toLowerCase()) || (option?.label).toLowerCase().includes(input.toLowerCase()), []);
  const warning = useCallback((type, text) => { messageApi.open({ type, content: text }) }, [messageApi]);
  const stockOptions = useMemo(() => dataStocks.map((code) => ({ value: code, label: code })), [dataStocks]);

  const [loading, setLoading] = useState(true);
  const [dataAnalysis, setDataAnalysis] = useState();
  const [dataPriceRecommendations, setDataPriceRecommendations] = useState();
  const [closePrice, setClosePrice] = useState();
  const [averageGrowthLNST, setAverageGrowthLNST] = useState();
  const [isGrowthChanged, setIsGrowthChanged] = useState(false);
  const [welfareFund, setWelfareFund] = useState(5);
  const [reasonablePriceStock, setReasonablePriceStock] = useState();
  const [reasonablePriceIndus, setReasonablePriceIndus] = useState();
  const [estimatedPriceStock, setEstimatedPriceStock] = useState();
  const [estimatedPriceIndus, setEstimatedPriceIndus] = useState();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Temporary state for debounced inputs
  const [tempGrowthValue, setTempGrowthValue] = useState(null);
  const [tempWelfareFund, setTempWelfareFund] = useState(null);

  // Refs for debounce timeouts
  const growthTimeoutRef = useRef(null);
  const welfareFundTimeoutRef = useRef(null);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (growthTimeoutRef.current) clearTimeout(growthTimeoutRef.current);
      if (welfareFundTimeoutRef.current) clearTimeout(welfareFundTimeoutRef.current);
    };
  }, []);

  const handleGrowthChange = (value) => {
    // Update temporary value immediately for UI feedback
    setTempGrowthValue(value);

    // Clear any existing timeout
    if (growthTimeoutRef.current) {
      clearTimeout(growthTimeoutRef.current);
    }

    // Set a new timeout to update the actual value after the user stops typing
    growthTimeoutRef.current = setTimeout(() => {
      setAverageGrowthLNST(value);
      setIsGrowthChanged(true);
    }, 1500); // 500ms delay
  };

  const handleWelfareFundChange = (value) => {
    // Update temporary value immediately for UI feedback
    setTempWelfareFund(value);

    // Clear any existing timeout
    if (welfareFundTimeoutRef.current) {
      clearTimeout(welfareFundTimeoutRef.current);
    }

    // Set a new timeout to update the actual value after the user stops typing
    welfareFundTimeoutRef.current = setTimeout(() => {
      setWelfareFund(value);
    }, 1500); // 500ms delay
  };

  const [stockPEReasonable, setStockPEReasonable] = useState(25);
  const [stockPBReasonable, setStockPBReasonable] = useState(25);
  const [indusPEReasonable, setIndusPEReasonable] = useState(25);
  const [indusPBReasonable, setIndusPBReasonable] = useState(25);

  const handleStockPEReasonableChange = (value) => { setStockPEReasonable(value) };
  const handleStockPBReasonableChange = (value) => { setStockPBReasonable(value) };
  const handleIndusPEReasonableChange = (value) => { setIndusPEReasonable(value) };
  const handleIndusPBReasonableChange = (value) => { setIndusPBReasonable(value) };

  // Check if total is 100
  const isTotalValidReasonable = useMemo(() => {
    const total = stockPEReasonable + stockPBReasonable + indusPEReasonable + indusPBReasonable;
    return total === 100;
  }, [stockPEReasonable, stockPBReasonable, indusPEReasonable, indusPBReasonable]);

  const [stockPEEstimated, setStockPEEstimated] = useState(25);
  const [stockPBEstimated, setStockPBEstimated] = useState(25);
  const [indusPEEstimated, setIndusPEEstimated] = useState(25);
  const [indusPBEstimated, setIndusPBEstimated] = useState(25);

  const handleStockPEEstimatedChange = (value) => { setStockPEEstimated(value) };
  const handleStockPBEstimatedChange = (value) => { setStockPBEstimated(value) };
  const handleIndusPEEstimatedChange = (value) => { setIndusPEEstimated(value) };
  const handleIndusPBEstimatedChange = (value) => { setIndusPBEstimated(value) };

  // Check if total is 100
  const isTotalValidEstimated = useMemo(() => {
    const total = stockPEEstimated + stockPBEstimated + indusPEEstimated + indusPBEstimated;
    return total === 100;
  }, [stockPEEstimated, stockPBEstimated, indusPEEstimated, indusPBEstimated]);

  // Calculate prices using the reusable function
  const reasonablePrice = useMemo(() =>
    calculateWeightedPrice(reasonablePriceStock, reasonablePriceIndus, stockPEReasonable, stockPBReasonable, indusPEReasonable, indusPBReasonable),
    [reasonablePriceStock, reasonablePriceIndus, stockPEReasonable, stockPBReasonable, indusPEReasonable, indusPBReasonable]
  );

  const estimatedPrice = useMemo(() =>
    calculateWeightedPrice(estimatedPriceStock, estimatedPriceIndus, stockPEEstimated, stockPBEstimated, indusPEEstimated, indusPBEstimated),
    [estimatedPriceStock, estimatedPriceIndus, stockPEEstimated, stockPBEstimated, indusPEEstimated, indusPBEstimated]
  );

  const fetchStockData = async () => {
    try {
      const [analysisRes, recommendationRes] = await Promise.all([
        getApi(`api/v1/report/chi-so-ky-thuat?stock=${stock}`),
        getApi(`api/v1/investment/stock-valuation-recommendations?stock=${stock}`),
      ]);

      setDataAnalysis(analysisRes);
      setDataPriceRecommendations(recommendationRes);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDataStockValuation = useCallback(async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
      return;
    }
    setLoading(true);
    try {
      let url = `/api/v1/investment/stock-valuation?stock=${stock}&average=${period}&perWelfareFund=${welfareFund/100}`;

      if (isGrowthChanged && averageGrowthLNST !== undefined) {
        url += `&averageGrowthLNST=${averageGrowthLNST}`;
      }

      const data = await getApi(url);
      if (data) {
        setClosePrice(data.closePrice);
        // Only set averageGrowthLNST if it's the initial load or if the user has changed it
        if (isInitialLoad) {
          setAverageGrowthLNST(data.averageGrowthLNST.toFixed(2));
          setIsInitialLoad(false);
        }
        setReasonablePriceStock(data.reasonablePriceStock);
        setReasonablePriceIndus(data.reasonablePriceIndus);
        setEstimatedPriceStock(data.estimatedPriceStock);
        setEstimatedPriceIndus(data.estimatedPriceIndus);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      warning("error", "Không thể tải dữ liệu định giá cổ phiếu");
    }
  }, [stock, period, welfareFund, averageGrowthLNST, isGrowthChanged, warning, isInitialLoad]);

  useEffect(() => {
    fetchDataStockValuation();
  }, [fetchDataStockValuation]);

  // Reset isInitialLoad when stock changes
  useEffect(() => {
    setIsInitialLoad(true);
    fetchStockData();
  }, [stock]);

  const formattedData = useMemo(() => {
    if (!dataPriceRecommendations || !closePrice) return [];

    const mappedData = dataPriceRecommendations.map((item) => ({
      label: item.company,
      price: item.targetPrice * 1000,
      percentChange: item.percentChange,
      color: item.percentChange > 0 ? "#099E24" : item.percentChange < 0 ? "#F51111" : "#FD9A10",
    }));

    const averageTarget =
      dataPriceRecommendations.length > 0
        ? dataPriceRecommendations.reduce((acc, item) => acc + item.targetPrice, 0) / dataPriceRecommendations.length
        : 0;

    const result = [
      ...mappedData,
      ...(isTotalValidEstimated ? [{
        label: "",
        price: estimatedPrice,
        percentChange: ((estimatedPrice / 1000 - closePrice) / closePrice) * 100,
        color: "#D510FD",
      }] : []),
    ];

    // Chỉ thêm trung bình nếu có dữ liệu
    if (dataPriceRecommendations.length > 0) {
      result.push({
        label: "Trung bình",
        price: averageTarget * 1000,
        percentChange: ((averageTarget - closePrice) / closePrice) * 100,
        color: "#FD9A10",
      });
    }

    return result.sort((a, b) => b.price - a.price);
  }, [dataPriceRecommendations, closePrice, estimatedPrice, isTotalValidEstimated]);

  return (
    <div className="relative font-[Roboto]">
      {contextHolder}
      <div className="absolute right-[10%] top-[1%]">
        <NavBar
          isLogin={isLogin}
          user={user}
          role={role}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      <div className="px-[40px] py-[40px] font-[Roboto]">
        <section>
          <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
            Định giá cổ phiếu
          </div>
          <div className="text-lg font-bold py-2">
            Công cụ giúp NĐT tính toán Giá trị hợp lý và Giá trị tương lai của 1
            cổ phiếu dựa trên các phương pháp định giá so sánh khác nhau.
          </div>
          <div className="code-select flex gap-3 items-center">
            <span className="text-[#07439C] font-semibold">Mã:</span>
            <Select
              style={{ width: 222, height: 40 }}
              defaultValue={stock}
              showSearch
              onChange={setStock}
              filterOption={filterOption}
              options={stockOptions}
            />
          </div>
        </section>

        <section className="w-[1590px]">
          <div className="flex py-2 gap-7 items-stretch">
            <div className="w-[25%]">
              <div className="h-[205px]"></div>
              <div className="text-lg font-semibold flex flex-col gap-4 text-right">
                <PeriodSelector period={period} setPeriod={setPeriod} />
                <div className="py-[1.5px]">EPS-BVPS của doanh nghiệp:</div>
                <div className="py-[1.5px]">Giá trị CP theo từng hệ số:</div>
                <div className="py-[1.5px]">Tỷ lệ:</div>
              </div>
              <div className="h-[30px]"></div>
              <div className="text-lg font-semibold text-right">
                Kết quả định giá (VNĐ):
              </div>
            </div>

            <ValuationSection
              title="Giá hợp lý"
              price={reasonablePrice}
              closePrice={closePrice}
              isTotalValid={isTotalValidReasonable}
              loading={loading}
            >
              <div className="h-[70px]"></div>
              <div className="grid grid-cols-2 gap-2 p-3 flex-1">
                <ComparisonBox
                  title={stock}
                  stock={stock}
                  price={reasonablePriceStock}
                  peValue={stockPEReasonable}
                  pbValue={stockPBReasonable}
                  handlePeChange={handleStockPEReasonableChange}
                  handlePbChange={handleStockPBReasonableChange}
                  isTotalValid={isTotalValidReasonable}
                  loading={loading}
                />
                <ComparisonBox
                  title="Ngành"
                  stock={stock}
                  price={reasonablePriceIndus}
                  peValue={indusPEReasonable}
                  pbValue={indusPBReasonable}
                  handlePeChange={handleIndusPEReasonableChange}
                  handlePbChange={handleIndusPBReasonableChange}
                  isTotalValid={isTotalValidReasonable}
                  loading={loading}
                />
              </div>
            </ValuationSection>

            <ValuationSection
              title="Giá dự phóng 1 năm"
              price={estimatedPrice}
              closePrice={closePrice}
              isTotalValid={isTotalValidEstimated}
              loading={loading}
            >
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-evenly">
                  <span className="font-semibold w-[50%]">
                    Tăng trưởng lợi nhuận sau thuế:
                  </span>
                  <PercentageInput
                    className="stock-valuation shadow-custom"
                    value={tempGrowthValue !== null ? tempGrowthValue : averageGrowthLNST}
                    onChange={handleGrowthChange}
                  />
                </div>
                <div className="flex items-center justify-evenly">
                  <span className="font-semibold w-[50%]">
                    Tỷ lệ trích lập quỹ khen thưởng phúc lợi:
                  </span>
                  <PercentageInput
                    className="stock-valuation shadow-custom"
                    value={tempWelfareFund !== null ? tempWelfareFund : welfareFund}
                    onChange={handleWelfareFundChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3 flex-1">
                <ComparisonBox
                  title={stock}
                  stock={stock}
                  price={estimatedPriceStock}
                  peValue={stockPEEstimated}
                  pbValue={stockPBEstimated}
                  handlePeChange={handleStockPEEstimatedChange}
                  handlePbChange={handleStockPBEstimatedChange}
                  isTotalValid={isTotalValidEstimated}
                  loading={loading}
                />
                <ComparisonBox
                  title="Ngành"
                  stock={stock}
                  price={estimatedPriceIndus}
                  peValue={indusPEEstimated}
                  pbValue={indusPBEstimated}
                  handlePeChange={handleIndusPEEstimatedChange}
                  handlePbChange={handleIndusPBEstimatedChange}
                  isTotalValid={isTotalValidEstimated}
                  loading={loading}
                />
              </div>
            </ValuationSection>
          </div>
          <div className="justify-end text-[#0669FC] italic text-lg items-center flex">
            *Nhà đầu tư có thể thay đổi thông số trong các ô (
            <span className="inline-block h-[27px] w-[53px] bg-[#E0DDDDB2]"></span>
            ) tùy vào kỳ vọng dự báo, dự phóng của nhà đầu tư hoặc kế hoạch của
            doanh nghiệp.
          </div>
        </section>

        <section>
          <div className="text-lg font-bold py-2">Biểu đồ định giá</div>
          <div className="w-[1590px]">
            {dataAnalysis ? (
              <div className="w-[70%] relative">
                <Candlestick
                  data={dataAnalysis.chart}
                  heightChart="500"
                  position={{ left: "397", marginLeft: "43" }}
                />

                <svg className="absolute top-0 left-full" width="200" height="500">
                  {formattedData.map((item, index) => {
                    const ySpacing = 500 / (formattedData.length + 1); // spacing đều nhau, có khoảng padding trên dưới
                    const y2 = ySpacing * (index + 1); // bắt đầu từ vị trí thứ nhất
                    const y1 = 250; // điểm gốc cố định ở giữa Candlestick

                    return <line key={index} x1="0" y1={y1} x2="150" y2={y2} stroke={item.color} strokeWidth="2" strokeDasharray="6,4"/>
                  })}
                </svg>
                <div className="absolute top-0 left-[114.4%] flex flex-col w-[30%] h-[500px] font-semibold justify-around">
                  {formattedData.map((item, index) => {
                    const text = item.label === "Trung bình" ? ", " : item.label === "" ? "" : "_";

                    return (
                      <div key={index} style={{ color: item.color }}>
                        {formatNumberCurrency(item.price)}đ (
                        {formatNumberCurrency(item.percentChange)}%{text}
                        {item.label})
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <Skeleton.Node active style={{ width: 1200, height: 138 }}>
                  <DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
                </Skeleton.Node>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StockValuation;
