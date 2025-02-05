import { UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { FloatButton, notification, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCalendar2Day, BsGraphUp, BsPostcardHeart } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { FiChevronsLeft, FiChevronsRight, FiSunset } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAutoGraph, MdQueryStats } from "react-icons/md";
import {
  PiPresentationChartLight,
  PiProjectorScreenChartLight,
} from "react-icons/pi";
import { SlGraph } from "react-icons/sl";
import { TbChartLine } from "react-icons/tb";
import { VscCoffee } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";
import DialogLogin from "../../Auth/components/DialogLogin";
import DialogSignUp from "../../Auth/components/DialogSignUp";
import { getApi } from "../../helper/getApi";
import {
  getModifiedSignalName,
  getModifiedSignalNameRsiOrMA,
  getSignalNameByKey,
} from "../../helper/modifiedSignalName";
import socket from "../../helper/socket";
import {
  specificKeys,
  specificKeysV2,
} from "../../signal-warning/utils/hashTb";
import { stockGr } from "../utils/stock-gr";

const NavBar = ({ isLogin, handleUserLogout, onSubmitSuccess, user, role }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [positionBackToTopBtn, setPositionBackToTopBtn] = useState(20);

  const [activeNav, setActiveNav] = useState(""); // State để lưu nav đang active
  const location = useLocation(); // Hook để lấy thông tin về địa chỉ hiện tại của trang

  const isDisabled = isLogin !== process.env.REACT_APP_LG_T;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (showSidebar) setPositionBackToTopBtn(20);
    else setPositionBackToTopBtn(300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setShowSidebar(true);
        setPositionBackToTopBtn(300);
      }
    };

    handleResize(); // Kiểm tra ngay khi component được render

    window.addEventListener("resize", handleResize); // Kiểm tra mỗi khi kích thước màn hình thay đổi

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location]);

  const buttonNavLink = (path, icon, name) => {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
            : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
        }
      >
        <span className="px-2">{icon}</span>
        {name}
      </NavLink>
    );
  };

  const [yourSignalWarningsPopup, setYourSignalWarningsPopup] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (location.pathname !== "/canh-bao-tin-hieu" && isLogin === process.env.REACT_APP_LG_T) {
      const fetchDataYourSignalWarnings = async () => {
        try {
          const data = await getApi("/api/v1/signal-warning/your-signal");
          const filteredSignals = data.filter(
            (item) => item.value.popupNotification === true
          );

          setYourSignalWarningsPopup(filteredSignals);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchData = async () => {
        try {
          const data = await getApi("/api/v1/signal-warning");

          setData(data);
          setSocketConnected(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      fetchDataYourSignalWarnings();
    }
  }, [isLogin]);

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
    if (location.pathname === "/danh-muc-theo-doi" || location.pathname === "/canh-bao-tin-hieu" || !socketConnected || yourSignalWarningsPopup?.length === 0) {
      return;
    }

    const initialHandler = (response) => {
      if (response?.message === "Client registered for signal-warning.") {
        socket.on("signal-warning-response", handleSignalWarning);
      }
    };

    // Xử lý dữ liệu khi có tín hiệu từ server
    const handleSignalWarning = (receivedData) => {
      const result = filterDataBySignalWarnings(
        receivedData?.data?.[0],
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
  }, [socketConnected, yourSignalWarningsPopup, location.pathname]);

  return (
    <div className="flex flex-col relative w-screen">
      {contextHolder}

      <FloatButton.BackTop
        tooltip={<div>Back to top</div>}
        style={{
          right: positionBackToTopBtn,
        }}
      />
      <div>
        <button
          onClick={toggleSidebar}
          className={`fixed top-1 -right-[10px] bg-slate-100 text-black z-[999] font-semibold drop-shadow-xl transition-transform rounded-lg text-base px-4 pt-2 pb-1 mr-2  
            ${
              showSidebar ? "translate-x-[-520%] ease-in-out duration-500" : ""
            } `}
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          {showSidebar ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
      </div>

      <div
        id="menu"
        className={`z-[1000] fixed top-0 right-0 bg-slate-100 h-full transition-transform drop-shadow-xl ${
          showSidebar ? "" : "translate-x-[100%] ease-in-out duration-500"
        }`}
      >
        <div className="overflow-x-auto h-full">
          <div
            id="nav"
            className="w-full px-3 overflow-y-auto 2xl:h-[825px] xl:h-[750px] lg:h-[780px] md:h-[1070px] no-scrollbar"
          >
            {role === process.env.REACT_APP_ADMIN_BLOGS && (
              <div>
                <h3 className="uppercase text-slate-500">Blogs</h3>
                {buttonNavLink(
                  "/admin-blogs",
                  <BsPostcardHeart />,
                  "Admin Blogs"
                )}
              </div>
            )}
            <div>
              <h3
                className={`uppercase ${
                  activeNav === "/" ||
                  activeNav === "/ban-tin-chieu" ||
                  activeNav === "/ban-tin-tuan"
                    ? "text-orange-400 border border-solid border-b-2 border-t-0 border-x-0 "
                    : "text-slate-500"
                }`}
              >
                Bản tin
              </h3>
              {buttonNavLink("/", <VscCoffee />, "Bản tin sáng")}
              {buttonNavLink("/ban-tin-chieu", <FiSunset />, "Bản tin chiều")}
              {buttonNavLink(
                "/ban-tin-tuan",
                <BsCalendar2Day />,
                "Bản tin tuần"
              )}
            </div>
            <div>
              <h3
                className={`uppercase ${
                  activeNav.split("/").slice(0, -1).join("/") ===
                    "/phan-tich-ky-thuat" ||
                  activeNav.split("/").slice(0, -1).join("/") ===
                    "/phan-tich-ky-thuat-tu-dong" ||
                  activeNav === "/phan-tich-co-ban"
                    ? "text-orange-400 border border-solid border-b-2 border-t-0 border-x-0 "
                    : "text-slate-500"
                }`}
              >
                Phân tích
              </h3>
              {role === process.env.REACT_APP_ADMIN ||
              role === process.env.REACT_APP_ADMIN_BLOGS ? (
                <NavLink
                  to={"/phan-tich-ky-thuat/FPT"}
                  className={
                    activeNav.split("/").slice(0, -1).join("/") ===
                    "/phan-tich-ky-thuat"
                      ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                      : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                  }
                >
                  <span className="px-2">
                    <SlGraph />
                  </span>
                  Phân tích kỹ thuật
                </NavLink>
              ) : (
                <></>
              )}
              <NavLink
                to={"/phan-tich-ky-thuat-tu-dong/FPT"}
                className={
                  activeNav.split("/").slice(0, -1).join("/") ===
                  "/phan-tich-ky-thuat-tu-dong"
                    ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                    : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                }
              >
                <span className="px-2">
                  <MdOutlineAutoGraph />
                </span>
                Phân tích kỹ thuật tự động
              </NavLink>
              {buttonNavLink(
                "/phan-tich-co-ban",
                <BsGraphUp />,
                "Phân tích cơ bản"
              )}
            </div>
            <div>
              <h3
                className={`uppercase ${
                  activeNav === "/danh-muc-theo-doi" ||
                  activeNav === "/bo-loc" ||
                  activeNav === "/canh-bao-tin-hieu" ||
                  activeNav === "/chien-luoc-giao-dich" ||
                  activeNav === "/beta-smart" ||
                  activeNav === "/trading-tool" ||
                  activeNav === "/historical-pe-pb" ||
                  activeNav === "/mua-ban-chu-dong"
                    ? "text-orange-400 border border-solid border-b-2 border-t-0 border-x-0 "
                    : "text-slate-500"
                }`}
              >
                Công cụ đầu tư
              </h3>
              {buttonNavLink(
                "/danh-muc-theo-doi",
                <BiCategoryAlt />,
                "Danh mục theo dõi"
              )}
              {buttonNavLink("/bo-loc", <CiFilter />, "Bộ lọc")}
              {buttonNavLink(
                "/canh-bao-tin-hieu",
                <IoMdNotificationsOutline />,
                "Cảnh báo tín hiệu"
              )}
              {buttonNavLink(
                "/chien-luoc-giao-dich",
                <MdQueryStats />,
                "Chiến lược giao dịch"
              )}
              {role === process.env.REACT_APP_BASE_USER || !role ? (
                <></>
              ) : (
                <div>
                  {buttonNavLink(
                    "/beta-smart",
                    <HiOutlineLightBulb />,
                    "BETA SMART"
                  )}
                </div>
              )}
              {role === process.env.REACT_APP_BASE_USER || !role ? (
                <></>
              ) : (
                <div>
                  {buttonNavLink(
                    "/trading-tool",
                    <PiProjectorScreenChartLight />,
                    "Trading Tool"
                  )}
                </div>
              )}
              {isLogin !== process.env.REACT_APP_LG_T ? (
                <>
                  <Tooltip
                    placement="left"
                    title={
                      <span>
                        Vui lòng đăng nhập/đăng ký để sử dụng tính năng này
                      </span>
                    }
                    color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
                  >
                    <NavLink
                      to={isDisabled ? "/" : "/historical-pe-pb"}
                      className={({ isActive }) =>
                        isDisabled
                          ? "cursor-not-allowed no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                          : isActive
                          ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                          : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                      }
                      onClick={(e) => isDisabled && e.preventDefault()}
                    >
                      <span className="px-2">
                        <PiPresentationChartLight />
                      </span>
                      Lịch sử P/E, P/B
                    </NavLink>
                  </Tooltip>
                </>
              ) : (
                <div>
                  {buttonNavLink(
                    "/historical-pe-pb",
                    <PiPresentationChartLight />,
                    "Lịch sử P/E, P/B"
                  )}
                </div>
              )}
              {isLogin !== process.env.REACT_APP_LG_T ? (
                <>
                  <Tooltip
                    placement="left"
                    title={
                      <span>
                        Vui lòng đăng nhập/đăng ký để sử dụng tính năng này
                      </span>
                    }
                    color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
                  >
                    <NavLink
                      to={isDisabled ? "/" : "/mua-ban-chu-dong"}
                      className={({ isActive }) =>
                        isDisabled
                          ? "cursor-not-allowed no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                          : isActive
                          ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                          : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                      }
                      onClick={(e) => isDisabled && e.preventDefault()}
                    >
                      <span className="px-2">
                        <TbChartLine />
                      </span>
                      Mua bán chủ động
                    </NavLink>
                  </Tooltip>
                </>
              ) : (
                <div>
                  {buttonNavLink(
                    "/mua-ban-chu-dong",
                    <TbChartLine />,
                    "Mua bán chủ động"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-0 right-0 px-3 py-3 bg-slate-100 z-[2000]`}
        >
          <div className="h-[1px] bg-slate-400 mb-2"></div>
          {isLogin === process.env.REACT_APP_LG_T ? (
            <div>
              <div className="flex my-1 justify-center items-center">
                <UserOutlined className="mx-2" />
                <div>{user && user.name}</div>
              </div>
              <Button
                variant="text"
                color="error"
                onClick={handleUserLogout}
                sx={{
                  p: "0.5rem",
                  borderRadius: "0.375rem",
                  width: "244px",
                  fontWeight: 600,
                }}
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <div className="flex">
              <DialogLogin onSubmitSuccess={onSubmitSuccess} type={0} />
              <DialogSignUp onSubmitSuccess={onSubmitSuccess} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
