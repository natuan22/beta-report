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
import DialogLogin from "./DialogLogin";

const NavBar = () => {
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

  return (
    <div>
      <div class="flex flex-col relative w-screen">
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
          class={`z-50 fixed top-0 right-0 bg-slate-100 h-full transition-transform drop-shadow-xl ${
            showSidebar ? "" : "translate-x-[100%] ease-in-out duration-500"
          }`}
        >
          <div id="nav" class="w-full px-3">
            <div>
              <h3 className="uppercase text-slate-500">Bản tin</h3>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                    : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                }
              >
                <span className="px-2">
                  <FiSunrise />
                </span>
                Bản tin sáng
              </NavLink>
              <NavLink
                to="/ban-tin-chieu"
                className={({ isActive }) =>
                  isActive
                    ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                    : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                }
              >
                <span className="px-2">
                  <FiSunset />
                </span>
                Bản tin chiều
              </NavLink>
              <NavLink
                to="/ban-tin-tuan"
                className={({ isActive }) =>
                  isActive
                    ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                    : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                }
              >
                <span className="px-2">
                  <BsCalendar2Day />
                </span>
                Bản tin tuần
              </NavLink>
            </div>
            <div>
              <h3 className="uppercase text-slate-500">Phân tích</h3>
              <NavLink
                to="/phan-tich-ky-thuat"
                className={({ isActive }) =>
                  isActive
                    ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                    : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                }
              >
                <span className="px-2">
                  <SlGraph />
                </span>
                Phân tích kỹ thuật
              </NavLink>
              <NavLink
                to="/phan-tich-ky-thuat-tu-dong"
                className={({ isActive }) =>
                  isActive
                    ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                    : "no-underline block text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 my-3 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
                }
              >
                <span className="px-2">
                  <MdOutlineAutoGraph />
                </span>
                Phân tích kỹ thuật tự động
              </NavLink>
            </div>
          </div>
          {/* <div className="fixed bottom-0 m-2 px-3 py-3">
            <div className="h-[1px] bg-slate-400 mb-2"></div>
            <DialogLogin />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
