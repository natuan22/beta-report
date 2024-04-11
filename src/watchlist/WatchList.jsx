import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import DialogAddWatchList from "./components/DialogAddWatchList";
import DialogLogin from "../Auth/components/DialogLogin";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoCaretDownSharp } from "react-icons/io5";
import { Dropdown, Space, Divider, Button, theme } from "antd";
const { useToken } = theme;

const WatchList = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const items = [
    {
      key: "0",
      type: "group",
      label: "Danh sách watchlist",
      children: [
        {
          key: "0-1",
          label: "1st menu item",
        },
        {
          key: "0-2",
          label: "2nd menu item",
        },
      ],
    },
  ];

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: "#96C6FF",
    borderRadius: 0,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  return (
    <div className="relative">
      <div className="absolute right-[10%] top-[1%]">
        <NavBar
          isLogin={isLogin}
          user={user}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      <div>
        {isLogin === "7MEvU" ? (
          <div>
            {/* Có watchlist  */}
            <div className="h-screen p-[40px]">
              <div className="bgImage w-[410px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
                Danh mục theo dõi
              </div>
              <div className="grid place-content-end">
                <div className="text-[#073882] text-[15px] font-bold w-fit pb-1">
                  Thêm mã CP vào watchlist
                </div>
                <div className="inputSearch w-[400px]">
                  <Input
                    placeholder="Search"
                    addonBefore={<SearchOutlined />}
                    allowClear
                  />
                </div>
              </div>
              {/* 203px auto auto 40px */}
              <div className="w-[265px] h-[46px] mt-[15px] dropdowndiv">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  dropdownRender={(menu) => (
                    <div style={contentStyle} className="dropdown">
                      {React.cloneElement(menu, {
                        style: menuStyle,
                      })}
                      <Space
                        style={{
                          padding: "5px 12px",
                          width: "100%",
                        }}
                      >
                        <div>Thêm watchlist mới</div>
                      </Space>
                    </div>
                  )}
                >
                  <div
                    className="bg-[#073882] text-[#ffba07] h-full flex text-center items-center justify-center hover:bg-[#0d50b5] cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="font-semibold text-lg w-[190px]">
                      Stock 2024
                    </span>
                    <IoCaretDownSharp className="text-[#94C7F6] text-lg" />
                  </div>
                </Dropdown>
              </div>
            </div>

            {/* Chưa có watchlist */}
            <div className="grid place-content-center h-screen font-medium text-lg">
              <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                <div className="p-7">
                  Xin chào quý nhà đầu tư{" "}
                  <span className="font-bold">{user.name}</span>
                </div>
                <div>
                  Bạn chưa có watchlist, bạn hãy tạo watchlist để theo dõi những
                  mã chứng khoán mình quan tâm.
                </div>
                <div className="mt-14">
                  <DialogAddWatchList />
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default WatchList;
