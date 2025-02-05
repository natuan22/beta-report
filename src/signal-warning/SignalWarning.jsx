import { Button } from "@mui/material";
import { notification, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../app/component/NavBar";
import DialogLogin from "../Auth/components/DialogLogin";
import { userLogoutAction } from "../Auth/thunk";
import { getApi } from "../helper/getApi";
import socket from "../helper/socket";
import AlertManagement from "./components/AlertManagement";
import DialogSettingSignal from "./components/DialogSettingSignal";
import SignalBoard from "./components/SignalBoard";
import "./styles/style-loading.css";
import {
  getModifiedSignalName,
  getModifiedSignalNameRsiOrMA,
  getSignalNameByKey,
} from "../helper/modifiedSignalName";
import { specificKeys, specificKeysV2 } from "./utils/hashTb";
import { stockGr } from "../app/utils/stock-gr";

const styleBtn = {
  borderRadius: "10px",
  width: "170px",
  height: "40px",
  fontWeight: 700,
  backgroundImage:
    "linear-gradient(90deg, rgba(157, 196, 255, 0.70) 0%, rgba(6, 105, 252, 0.70) 100%)",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  color: "black",
  textTransform: "none",
  fontSize: "15px",
};

const SignalWarning = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(process.env.REACT_APP_IS_LG)
  );
  const [role, setRole] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_ROLE)
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [watchlists, setWatchlists] = useState();
  const [data, setData] = useState();
  const [dataForFilter, setDataForFilter] = useState([]);

  const [yourSignalWarnings, setYourSignalWarnings] = useState();
  const [yourSignalWarningsPopup, setYourSignalWarningsPopup] = useState();

  const [loading, setLoading] = useState(true);

  const [socketConnected, setSocketConnected] = useState(false);

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      localStorage.setItem(
        process.env.REACT_APP_IS_LG,
        process.env.REACT_APP_LG_F
      );
      localStorage.removeItem(process.env.REACT_APP_USER_ROLE);
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem(process.env.REACT_APP_IS_LG));
    setRole(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const fetchDataYourSignalWarnings = async () => {
    try {
      const data = await getApi("/api/v1/signal-warning/your-signal");
      const filteredSignals = data.filter(
        (item) => item.value.popupNotification === true
      );

      setYourSignalWarnings(data);
      setYourSignalWarningsPopup(filteredSignals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogin === process.env.REACT_APP_LG_T) {
      const fetchDataWatchList = async () => {
        try {
          const data = await getApi("/api/v1/watchlist");

          setWatchlists(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDataWatchList();
      fetchDataYourSignalWarnings();
    }
  }, [isLogin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApi("/api/v1/signal-warning");

        setData(data);
        setDataForFilter(data);
        setLoading(false);
        setSocketConnected(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [yourSignalWarnings]);

  const [alertManagement, setAlertManagement] = useState(false);
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 7 },
  });

  const openNotification = (description) => {
    api.open({
      message: `${description.code}`,
      description: `${description.nameByKey}`,
      placement: "topRight",
      showProgress: true,
    });
  };

  const fetchStockGroup = (group) => {
    const groupData = stockGr.find((item) => item.name === group);
    return groupData ? groupData.data : [];
  };

  const prepareValidCodes = (scopes) => {
    const relevantScopes = scopes.filter((scope) =>
      ["VNDIAMOND", "VNFINLEAD"].includes(scope)
    );
    if (relevantScopes.length > 0) {
      const codesArray = relevantScopes.map(fetchStockGroup);
      return codesArray.flat();
    }
    return [];
  };

  const filterDataBySignalWarnings = (dataItem, yourSignalWarnings) => {
    const validCodes = prepareValidCodes(
      yourSignalWarnings.flatMap((signal) => signal.value.scope || [])
    );

    return yourSignalWarnings
      .flatMap((signal) => {
        const { value } = signal;

        const isLongShortSMA = [
          "sma_ngan_han_cat_len_sma_dai_han",
          "sma_ngan_han_cat_xuong_sma_dai_han",
        ].includes(value.key);
        const isRsiOrMa = [
          "gia_hien_tai_cat_len_ma",
          "gia_hien_tai_cat_xuong_ma",
          "gia_hien_tai_cat_len_ema",
          "gia_hien_tai_cat_xuong_ema",
          "rsi_di_vao_vung_qua_mua_",
          "rsi_thoat_khoi_vung_qua_mua_",
          "rsi_thoat_khoi_vung_qua_ban_",
          "rsi_di_vao_vung_qua_ban_",
        ].includes(value.key);

        const nameByKey = isLongShortSMA
          ? getModifiedSignalName(value.key, value.value)
          : isRsiOrMa
          ? getModifiedSignalNameRsiOrMA(value.key, value.value)
          : getSignalNameByKey(value.key);

        const isValidKey = (() => {
          if (specificKeysV2.includes(value.key)) {
            if (specificKeys.includes(value.key)) {
              return dataItem[`${value.key}${value.value}`] === 1;
            } else {
              return dataItem[value.key]?.[value.value] === 1;
            }
          }
          return dataItem[value.key] === 1;
        })();

        const isValidScope = (() => {
          if (!value.scope.length || value.scope.includes("ALL")) return true;

          const floorScopes = value.scope.filter((scope) =>
            ["HOSE", "HNX", "UPCOM"].includes(scope)
          );
          const stockGroupScopes = value.scope.filter((scope) =>
            ["VNDIAMOND", "VNFINLEAD"].includes(scope)
          );

          if (floorScopes.length && floorScopes.includes(dataItem.floor))
            return true;
          if (stockGroupScopes.length && validCodes.includes(dataItem.code))
            return true;
          if (
            value.scope.includes("VN30") &&
            value.scope.includes(dataItem.indexCode)
          )
            return true;
          if (
            value.scope.includes("watchlists") &&
            value.codes.includes(dataItem.code)
          )
            return true;

          return false;
        })();

        const isValidMarketCap = (() => {
          if (!value.marketCap || value.marketCap === "0") return true;

          const [operator, threshold] = value.marketCap.split(" ");
          const numericThreshold = parseFloat(threshold);
          if (!numericThreshold) return true;

          if (operator === ">") return dataItem.marketCap > numericThreshold;
          if (operator === "<") return dataItem.marketCap < numericThreshold;
          return true;
        })();

        const isValidLiquidity = (() => {
          if (!value.liquidity || value.liquidity === "0") return true;

          const [key, threshold] = value.liquidity.split(" ");
          const numericThreshold = parseFloat(threshold);
          if (!numericThreshold) return true;

          return dataItem[key] >= numericThreshold;
        })();

        if (
          isValidKey &&
          isValidScope &&
          isValidMarketCap &&
          isValidLiquidity
        ) {
          return { ...dataItem, nameByKey, value };
        }

        return null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    if (!socketConnected || !data?.length) return;

    const initialHandler = (response) => {
      if (response?.message === "Client registered for signal-warning.") {
        socket.on("signal-warning-response", handleSignalWarning);
      }
    };

    // Xử lý dữ liệu khi có tín hiệu từ server
    const handleSignalWarning = (receivedData) => {
      const updatedData = receivedData?.data?.[0];
      if (!updatedData) return;

      const { code } = updatedData;

      // Cập nhật dataForFilter nếu có code phù hợp
      setDataForFilter((prevData) =>
        prevData.map((item) =>
          item.code === code ? { ...item, ...updatedData } : item
        )
      );

      const result = filterDataBySignalWarnings(
        updatedData,
        yourSignalWarningsPopup
      );
      if (result.length === 0) return;

      const updatedItem = result[0];
      const findData = data.find((item) => item.code === updatedItem.code);
      if (!findData) return;

      const { key, value } = updatedItem.value;

      // Xác định giá trị cũ và mới dựa trên key
      const getValue = (dataItem) =>
        specificKeysV2.includes(key)
          ? specificKeys.includes(key)
            ? dataItem?.[`${key}${value}`]
            : dataItem?.[key]?.[value]
          : dataItem?.[key];

      const oldValue = getValue(findData);
      const newValue = getValue(updatedItem);

      setData((prevData) =>
        prevData.map((item) =>
          item.code === updatedItem.code ? { ...item, ...updatedItem } : item
        )
      );
      
      if (oldValue === 0 && newValue === 1) {
        openNotification(updatedItem);
      }
    };

    socket.on("signal-warning-response", initialHandler);
    socket.emit("signal-warning", { message: "signal-emit" });

    return () => {
      socket.off("signal-warning-response", initialHandler);
      socket.off("signal-warning-response", handleSignalWarning);
    };
  }, [socketConnected, yourSignalWarningsPopup, yourSignalWarnings]);

  return (
    <div className="relative">
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
      {isLogin === process.env.REACT_APP_LG_T ? (
        <div className="w-full p-[40px] font-[Roboto]">
          <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
            Cảnh báo tín hiệu
          </div>
          {yourSignalWarnings?.length > 0 ? (
            <div className="xl:px-48 lg:px-0">
              <div className="flex md:flex-row sm:flex-col xs:flex-col xxs:flex-col justify-end gap-8 mt-6">
                <DialogSettingSignal
                  type={0}
                  dataForFilter={dataForFilter}
                  watchlists={watchlists}
                  fetchDataSignalWarnings={fetchDataYourSignalWarnings}
                  loading={loading}
                />
                <Button
                  sx={styleBtn}
                  onClick={() => setAlertManagement(!alertManagement)}
                >
                  {alertManagement ? (
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11.9909 1.9989C8.43863 1.9989 5.99093 4.44691 5.99093 7.99892C5.99093 8.48392 5.99093 9.96893 5.99093 9.99893C5.99093 10.3209 5.82833 10.5399 5.27213 10.9989C5.20903 11.0509 4.94453 11.2779 4.86593 11.3429C3.60053 12.3889 2.97773 13.3689 2.99093 14.9989C3.00423 16.6469 4.34763 17.98 5.99093 17.999H9.16693C9.16693 17.999 8.99093 18.61 8.99093 18.999C8.99093 20.656 10.3339 21.999 11.9909 21.999C13.6479 21.999 14.9909 20.656 14.9909 18.999C14.9909 18.61 14.8229 17.999 14.8229 17.999H17.9909C19.6309 18.005 20.9929 16.6539 20.9909 14.9989C20.9889 13.3809 20.3649 12.3839 19.1159 11.3429C19.0339 11.2739 18.7439 11.0529 18.6779 10.9989C18.1339 10.5449 17.9909 10.3169 17.9909 9.99893C17.9909 8.74892 17.9909 7.99892 17.9909 7.99892C17.9909 4.44691 15.5429 1.9989 11.9909 1.9989ZM11.9909 3.99891C14.4389 3.99891 15.9909 5.55091 15.9909 7.99892C15.9909 7.99892 15.9909 8.74892 15.9909 9.99893C15.9909 11.0609 16.4389 11.7309 17.3969 12.5299C17.4729 12.5929 17.7939 12.8449 17.8659 12.9049C18.7039 13.6039 18.9899 14.0769 18.9909 14.9989C18.9919 15.5429 18.5259 16.0009 17.9909 15.9989C17.8019 15.9979 14.8909 15.9979 11.9909 15.9989C9.09123 15.9999 6.20343 16.0009 5.99093 15.9989C5.43273 15.9919 4.99543 15.5539 4.99093 14.9989C4.98353 14.0789 5.26943 13.6049 6.11593 12.9049C6.18503 12.8479 6.48073 12.5899 6.55343 12.5299C7.52663 11.7259 7.99093 11.0709 7.99093 9.99893C7.99093 9.96893 7.99093 8.48392 7.99093 7.99892C7.99093 5.55091 9.54323 3.99891 11.9909 3.99891ZM11.9909 17.999C12.5429 17.999 12.9909 18.447 12.9909 18.999C12.9909 19.551 12.5429 19.999 11.9909 19.999C11.4389 19.999 10.9909 19.551 10.9909 18.999C10.9909 18.447 11.4389 17.999 11.9909 17.999Z"
                          fill="black"
                        />
                      </svg>
                      <span>Cảnh báo</span>
                    </span>
                  ) : (
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill="black"
                          d="M4.99902 3.90634C3.34202 3.90634 1.99902 5.24944 1.99902 6.90634V16.9063C1.99902 18.9063 2.99902 19.9063 4.99902 19.9063H18.999C20.999 19.9063 21.999 18.9063 21.999 16.9063V8.90634C21.999 8.35404 21.551 7.90634 20.999 7.90634H19.999V4.90634C19.999 4.35404 19.551 3.90634 18.999 3.90634H4.99902ZM4.99902 5.90634H17.999V7.90634H4.99902C4.44702 7.90634 3.99902 7.45864 3.99902 6.90634C3.99902 6.35404 4.44702 5.90634 4.99902 5.90634ZM16.999 11.9063C17.551 11.9063 17.999 12.354 17.999 12.9063C17.999 13.4586 17.551 13.9063 16.999 13.9063C16.447 13.9063 15.999 13.4586 15.999 12.9063C15.999 12.354 16.447 11.9063 16.999 11.9063Z"
                        />
                      </svg>
                      <span>Quản lý cảnh báo</span>
                    </span>
                  )}
                </Button>
              </div>
              <div>
                {!loading ? (
                  <>
                    {!alertManagement ? (
                      <SignalBoard
                        data={dataForFilter}
                        yourSignalWarnings={yourSignalWarnings}
                        watchlists={watchlists}
                      />
                    ) : (
                      <AlertManagement
                        alertManagement={alertManagement}
                        setAlertManagement={setAlertManagement}
                        dataForFilter={dataForFilter}
                        watchlists={watchlists}
                        yourSignalWarnings={yourSignalWarnings}
                        fetchDataSignalWarnings={fetchDataYourSignalWarnings}
                      />
                    )}
                  </>
                ) : (
                  <div className="style-loading">
                    <Skeleton.Input
                      active
                      block
                      size="large"
                      className="mt-6"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid place-content-center h-[805px] font-medium text-lg">
              <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                <div className="p-7">
                  Xin chào quý nhà đầu tư{" "}
                  <span className="font-bold">{user.name}</span>
                </div>
                <div>
                  Hãy thiết lập cảnh báo để nhận được thông báo tức thời về các
                  mã chứng khoán bạn quan tâm.
                </div>
                <div className="mt-14">
                  <DialogSettingSignal
                    type={1}
                    dataForFilter={dataForFilter}
                    watchlists={watchlists}
                    fetchDataSignalWarnings={fetchDataYourSignalWarnings}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid place-content-center h-screen font-medium text-lg">
          <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
            <div className="p-7">
              Xin chào quý nhà đầu tư <span className="font-bold"></span>
            </div>
            <div>
              Hãy đăng nhập để thiết lập cảnh báo về các mã chứng khoán bạn quan
              tâm.
            </div>
            <div className="mt-14">
              <DialogLogin onSubmitSuccess={onSubmitSuccess} type={1} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalWarning;
