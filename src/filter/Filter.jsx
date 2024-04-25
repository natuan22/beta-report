import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import Button from "@mui/material/Button";
import NavBar from "../app/component/NavBar";
import { MdSaveAlt } from "react-icons/md";
import { FiFilePlus } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import DialogAddConditions from "./components/DialogAddConditions";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#25558d",
      main: "#0D4381",
      dark: "#0b3c74",
    },
  },
});

const Filter = () => {
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

  useEffect(() => {
    document.title = "Bộ lọc";
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
          <div className="p-[40px]">
            <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] w-[410px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
              Bộ lọc cổ phiếu
            </div>
            <div className="text-[#0D4381] pt-[12px] font-bold text-[15px]">
              Điều kiện lọc:
            </div>
            <div className="flex">
              <div className="w-[70%] my-2 mr-1">
                <div className="h-[40px] bg-[#80B7F8] opacity-30"></div>
                <div className="h-[40px]"></div>
                <div className="h-[40px] bg-[#80B7F8] opacity-30"></div>
                <div className="h-[40px]"></div>
                <div className="h-[40px] bg-[#80B7F8] opacity-30"></div>
              </div>
              <div className="w-[30%] bg-[#E6EFF9] border-[#0D4381] border-solid rounded-md my-2 ml-1"></div>
            </div>
            <div className="w-[70%] flex justify-end -ml-1 pt-1">
              <DialogAddConditions />
            </div>
            <div className="w-[35%] flex justify-between -ml-1 pl-10 pt-1">
              <Button variant="contained">
                <MdSaveAlt className="w-[25px] h-[25px]" />
                <span className="normal-case pl-1 text-[14px] font-semibold">
                  Lưu bộ lọc
                </span>
              </Button>
              <Button variant="contained">
                <FiFilePlus className="w-[25px] h-[25px]" />
                <span className="normal-case pl-1 text-[14px] font-semibold">
                  Tạo bộ lọc mới
                </span>
              </Button>
              <Button variant="contained">
                <HiOutlineDocumentDuplicate className="w-[25px] h-[25px]" />
                <span className="normal-case pl-1 text-[14px] font-semibold">
                  Danh sách bộ lọc
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Filter;
