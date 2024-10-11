import { UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { FloatButton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCalendar2Day, BsGraphUp } from "react-icons/bs";
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

const NavBar = ({ isLogin, handleUserLogout, onSubmitSuccess, user, role }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [positionBackToTopBtn, setPositionBackToTopBtn] = useState(20);
  const [hasScrollbar, setHasScrollbar] = useState(false);

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
    const navElement = document.getElementById("nav");
    // Kiểm tra nếu chiều cao của nội dung lớn hơn chiều cao của chính nó
    const hasVerticalScrollbar =
      navElement.scrollHeight > navElement.clientHeight;
    if (hasVerticalScrollbar) {
      setHasScrollbar(true);
    } else {
      setHasScrollbar(false);
    }
  }, [isLogin]);

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

  return (
    <div className="flex flex-col relative w-screen">
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
          <div id="nav" className="w-full px-3 overflow-y-auto 2xl:h-[825px] xl:h-[738px] lg:h-[738px] md:h-[738px]">
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
              {role === process.env.REACT_APP_ADMIN ? (
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
              {buttonNavLink(
                "/beta-smart",
                <HiOutlineLightBulb />,
                "BETA SMART"
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
          className={`fixed bottom-0 right-0 px-3 py-3 bg-slate-100 z-[2000] ${
            hasScrollbar ? "2xl:mr-[17px]" : ""
          }`}
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
