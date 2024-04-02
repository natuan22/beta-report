import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCalendar2Day } from "react-icons/bs";
import {
  FiSunrise,
  FiSunset,
  FiChevronsRight,
  FiChevronsLeft,
} from "react-icons/fi";
import { MdOutlineAutoGraph } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import DialogLogin from "../../Auth/components/DialogLogin";
import Button from "@mui/material/Button";
import { UserOutlined } from "@ant-design/icons";
import { VscCoffee } from "react-icons/vsc";
import { BsGraphUp } from "react-icons/bs";
import { CiFilter,   } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { MdQueryStats } from "react-icons/md";

const NavBar = ({ isLogin, handleUserLogout, onSubmitSuccess, user }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setShowSidebar(true);
      }
    };

    handleResize(); // Kiểm tra ngay khi component được render

    window.addEventListener("resize", handleResize); // Kiểm tra mỗi khi kích thước màn hình thay đổi

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div>
        <button
          onClick={toggleSidebar}
          className={`fixed top-1 -right-4 bg-slate-100 text-black z-40 font-semibold drop-shadow-xl transition-transform rounded-lg text-base px-4 pt-2 pb-1 mr-2  
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
        className={`z-50 fixed top-0 right-0 bg-slate-100 h-full transition-transform drop-shadow-xl ${
          showSidebar ? "" : "translate-x-[100%] ease-in-out duration-500"
        }`}
      >
        <div id="nav" className="w-full px-3">
          <div>
            <h3 className="uppercase text-slate-500">Bản tin</h3>
            {buttonNavLink("/", <VscCoffee />, "Bản tin sáng")}
            {buttonNavLink("/ban-tin-chieu", <FiSunset />, "Bản tin chiều")}
            {buttonNavLink("/ban-tin-tuan", <BsCalendar2Day />, "Bản tin tuần")}
          </div>
          <div>
            <h3 className="uppercase text-slate-500">Phân tích</h3>
            {buttonNavLink("/phan-tich-ky-thuat", <SlGraph />, "Phân tích kỹ thuật")}
            {buttonNavLink("/phan-tich-ky-thuat-tu-dong", <MdOutlineAutoGraph />, "Phân tích kỹ thuật tự động")}
            {buttonNavLink("/phan-tich-ky-thuat-co-ban", <BsGraphUp />, "Phân tích kỹ thuật cơ bản")}
          </div>
          <div>
            <h3 className="uppercase text-slate-500">name</h3>
            {buttonNavLink("/bo-loc", <CiFilter />, "Bộ lọc")}
            {buttonNavLink("/canh-bao-tin-hieu", <IoMdNotificationsOutline />, "Cảnh báo tín hiệu")}
            {buttonNavLink("/danh-muc-theo-doi", <BiCategoryAlt />, "Danh mục theo dõi")}
            {buttonNavLink("/chien-luoc-giao-dich", <MdQueryStats />, "Chiến lược giao dịch")}
          </div>
        </div>
        <div className="fixed bottom-0 m-2 px-3 py-3">
          <div className="h-[1px] bg-slate-400 mb-2"></div>
          {isLogin ? (
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
            <DialogLogin onSubmitSuccess={onSubmitSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
