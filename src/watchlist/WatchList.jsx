import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogLogin from "../Auth/components/DialogLogin";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import { getApi } from "../helper/getApi";
import socket from "../helper/socket";
import DialogAddWatchList from "./components/DialogAddWatchList";
import HomeWatchList from "./components/HomeWatchList";
import "./components/styles/modalStyle.css";
import { notification } from "antd";
import { stockGr } from "../app/utils/stock-gr";
import { getModifiedSignalName, getModifiedSignalNameRsiOrMA, getSignalNameByKey } from "../helper/modifiedSignalName";
import { specificKeys, specificKeysV2 } from "../signal-warning/utils/hashTb";

const WatchList = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(localStorage.getItem(process.env.REACT_APP_IS_LG));
  const [role, setRole] = useState(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [yourSignalWarnings, setYourSignalWarnings] = useState();
  const [yourSignalWarningsPopup, setYourSignalWarningsPopup] = useState();

  const [socketConnectedSignal, setSocketConnectedSignal] = useState(false);
  const [dataSignal, setDataSignal] = useState();
  const [loadingSignal, setLoadingSignal] = useState(true);

  useEffect(() => {
    if (isLogin === process.env.REACT_APP_LG_T) {
      const fetchDataWatchList = async () => {
        try {
          const data = await getApi("/api/v1/watchlist");
          setWatchlists(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchDataYourSignalWarnings = async () => {
        try {
          const res = await getApi("/api/v1/signal-warning/your-signal");
          const filteredSignals = res.filter(
            (item) => item.value.popupNotification === true
          );

          setYourSignalWarnings(res);
          setYourSignalWarningsPopup(filteredSignals);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchData = async () => {
        try {
          const res = await getApi("/api/v1/signal-warning");
          
          setDataSignal(res);
          setLoadingSignal(false);
          setSocketConnectedSignal(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDataWatchList();
      fetchData();
      fetchDataYourSignalWarnings();
    } else {
      setLoading(false);
    }
  }, [isLogin]);
  
  useEffect(() => {
    // Hàm thêm style trực tiếp vào các phần tử có class 'ant-dropdown'
    const applyCustomStyles = () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown");
      dropdowns.forEach((dropdown) => {
        dropdown.style.removeProperty('inset');
        dropdown.style.removeProperty('z-index');
        // Áp dụng các style trực tiếp nếu chưa có
        if (!dropdown.style.getPropertyValue('inset')) {
          dropdown.style.setProperty('inset', '209px auto auto 40px', 'important');
          dropdown.style.setProperty('z-index', '900', 'important');
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
      const dropdowns = document.querySelectorAll(".ant-dropdown");
      dropdowns.forEach((dropdown) => {
        // Xóa style khi component unmount
        dropdown.style.removeProperty('inset');
        dropdown.style.removeProperty('z-index');
      });
      // Dừng việc quan sát DOM khi component unmount
      observer.disconnect();
    };
  }, []);

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

  const catchWatchlists = (arrText) => {
    setWatchlists(arrText);
  };

  const [api, contextHolder] = notification.useNotification({ stack: { threshold: 7 } });

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
    if (!socketConnectedSignal || !dataSignal?.length) return;
    
    const initialHandler = (response) => {
      if (response?.message === "Client registered for signal-warning.") {
        socket.on("signal-warning-response", handleSignalWarning);
      }
    };

    // Xử lý dữ liệu khi có tín hiệu từ server
    const handleSignalWarning = (receivedData) => {
      const result = filterDataBySignalWarnings(receivedData?.data?.[0], yourSignalWarningsPopup);
      if (result.length === 0) return;
  
      setDataSignal((prevData) => {
        const newData = prevData.map((item) => {
          if (item.code !== result[0].code) return item;
  
          const { key, value } = result[0].value;
          const getValue = (dataItem) =>
            specificKeysV2.includes(key)
              ? specificKeys.includes(key)
                ? dataItem?.[`${key}${value}`]
                : dataItem?.[key]?.[value]
              : dataItem?.[key];
  
          const oldValue = getValue(item);
          const newValue = getValue(result[0]);
  
          if (oldValue === 0 && newValue === 1) {
            openNotification(result[0]);
          }
  
          return { ...item, ...result[0] };
        });
  
        return newData;
      });
    };
  
    socket.on("signal-warning-response", initialHandler);
    socket.emit("signal-warning", { message: "signal-emit" });
  
    return () => {
      socket.off("signal-warning-response", initialHandler);
      socket.off("signal-warning-response", handleSignalWarning);
    };
  }, [socketConnectedSignal, yourSignalWarningsPopup]);
  
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
      {!loading ? (
        <div>
          {isLogin === process.env.REACT_APP_LG_T ? (
            <div>
              {watchlists?.length > 0 ? (
                <HomeWatchList
                  yourSignalWarnings={yourSignalWarnings}
                  dataSignal={dataSignal}
                  loadingSignal={loadingSignal}
                  watchlists={watchlists}
                  catchWatchlists={catchWatchlists}
                />
              ) : (
                <div className="grid place-content-center h-screen font-medium text-lg">
                  <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                    <div className="p-7">
                      Xin chào quý nhà đầu tư{" "}
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <div>
                      Bạn chưa có watchlist, bạn hãy tạo watchlist để theo dõi
                      những mã chứng khoán mình quan tâm.
                    </div>
                    <div className="mt-14">
                      <DialogAddWatchList
                        catchWatchlists={catchWatchlists}
                        type={1}
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
                  Hãy đăng nhập để quản lý danh sách các mã chứng khoán bạn quan
                  tâm.
                </div>
                <div className="mt-14">
                  <DialogLogin onSubmitSuccess={onSubmitSuccess} type={1} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WatchList;
