import { UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { FloatButton } from "antd";
import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCalendar2Day, BsGraphUp } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { FiChevronsLeft, FiChevronsRight, FiSunset } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAutoGraph, MdQueryStats } from "react-icons/md";
import { PiPresentationChartLight } from "react-icons/pi";
import { SlGraph } from "react-icons/sl";
import { VscCoffee } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";
import DialogLogin from "../../Auth/components/DialogLogin";
import DialogSignUp from "../../Auth/components/DialogSignUp";

const NavBar = ({ isLogin, handleUserLogout, onSubmitSuccess, user, role }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [positionBackToTopBtn, setPositionBackToTopBtn] = useState(20);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (showSidebar) setPositionBackToTopBtn(20);
    else setPositionBackToTopBtn(300);
  };

  useEffect(() => {
    const handleResize = () => {
      const navElement = document.getElementById("nav");
      if (navElement.scrollHeight > navElement.clientHeight) {
        setHasScrollbar(true);
      } else {
        setHasScrollbar(false);
      }
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

  const [activeNav, setActiveNav] = useState(""); // State để lưu nav đang active
  const location = useLocation(); // Hook để lấy thông tin về địa chỉ hiện tại của trang

  useEffect(() => {
    // Khi location thay đổi, cập nhật activeNav tương ứng
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
          className={`fixed top-1 -right-4 bg-slate-100 text-black z-[999] font-semibold drop-shadow-xl transition-transform rounded-lg text-base px-4 pt-2 pb-1 mr-2  
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
        <div id="nav" className="overflow-x-auto h-full">
          <div className="w-full px-3 overflow-y-auto h-[830px]">
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
              {role === "8Z5M8" ? (
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
                  activeNav === "/chien-luoc-giao-dich"
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
              {role === "V0U1S" || !role ? (
                <></>
              ) : (
                <div>
                  {buttonNavLink(
                    "/trading-tool",
                    <PiPresentationChartLight />,
                    "Trading Tool"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-0 right-0 px-3 py-3 bg-slate-100 z-[2000] ${
            hasScrollbar ? "mr-[17px]" : ""
          }`}
        >
          <div className="h-[1px] bg-slate-400 mb-2"></div>
          {isLogin === "7MEvU" ? (
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
