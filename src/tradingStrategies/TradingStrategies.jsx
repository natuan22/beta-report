import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Checkbox } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { PiChartLineUpBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import StrategyMA from "./components/StrategyMA";
import { selectTradingStrategy } from "./utils/hashTb";
import "./utils/styles/cssDatePicker.css";
import StrategyMAVVIP from "./components/StrategyMAVVIP";

const theme = createTheme({
  palette: {
    primary: {
      light: "#25558d",
      main: "#096CB7",
      dark: "#0761a6",
    },
  },
});

const TradingStrategies = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");

  const handleMainCategoryChange = (key) => {
    setSelectedMainCategory((prev) => (prev === key ? "" : key));
    setSelectedStrategy("");
  };

  const handleStrategyChange = (key) => {
    setSelectedStrategy((prev) => (prev === key ? "" : key));
  };

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      window.location.reload();
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("2ZW79");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setRole(localStorage.getItem("2ZW79"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    document.title = "Chiến lược giao dịch";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="relative">
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
          <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
            Chiến lược giao dịch
          </div>
          <div className="lg:flex md:block">
            <div className="xl:w-[20%] lg:w-[30%] md:w-full m-2 border-[#0050AD] border-solid border-[2px] h-fit">
              <div className="uppercase text-[#0050AD] font-semibold text-[18px] text-center mt-1">
                Chọn chiến lược giao dịch
              </div>
              <div className="px-4">
                {Object.keys(selectTradingStrategy).map((key, mainIndex) => (
                  <div key={mainIndex}>
                    <Checkbox
                      className="font-bold text-[16px]"
                      checked={selectedMainCategory === key}
                      onChange={() => handleMainCategoryChange(key)}
                    >
                      {key}
                    </Checkbox>
                    {selectedMainCategory === key &&
                      selectTradingStrategy[key]
                        .filter((strategy) => {
                          if (role === "8Z5M8" || role === "XJ20C") {
                            // Show both "MA VVIP" and "MA đại pháp"
                            return true;
                          } else {
                            // Show only "MA đại pháp"
                            return strategy.name !== "MA VVIP";
                          }
                        })
                        .map((strategy, strategyIndex) => (
                          <div key={strategyIndex} className="pl-4">
                            <Checkbox
                              checked={selectedStrategy === strategy.key}
                              value={strategy.key}
                              onChange={() =>
                                handleStrategyChange(strategy.key)
                              }
                            >
                              {strategy.name === "MA VVIP"
                                ? "MA VVIP"
                                : strategy.name}
                            </Checkbox>
                          </div>
                        ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:w-[80%] lg:w-[70%] md:w-full m-2">
              <AnimatePresence>
                {selectedStrategy === "" && (
                  <motion.div
                    className="grid place-content-center h-[577px] font-medium text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[500px] h-[250px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px] mr-[300px]">
                      <PiChartLineUpBold className="w-[60px] h-[60px]" />
                      <div className="p-7">
                        Xin chào quý nhà đầu tư
                        <span className="font-bold"></span>
                      </div>
                      <div>Vui lòng chọn chiến lược giao dịch</div>
                    </div>
                  </motion.div>
                )}
                {selectedStrategy === "StrategyMAVip" && (
                  <motion.div
                    key="StrategyMAVip"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <StrategyMAVVIP />
                  </motion.div>
                )}
                {selectedStrategy === "StrategyMA" && (
                  <motion.div
                    key="StrategyMA"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <StrategyMA />
                  </motion.div>
                )}
                {selectedStrategy === "2" && (
                  <motion.div
                    key="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    2
                  </motion.div>
                )}
                {selectedStrategy === "3" && (
                  <motion.div
                    key="3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    3
                  </motion.div>
                )}
                {selectedStrategy === "4" && (
                  <motion.div
                    key="4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    4
                  </motion.div>
                )}
                {selectedStrategy === "5" && (
                  <motion.div
                    key="5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    5
                  </motion.div>
                )}
                {selectedStrategy === "6" && (
                  <motion.div
                    key="6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    6
                  </motion.div>
                )}
                {selectedStrategy === "7" && (
                  <motion.div
                    key="7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    7
                  </motion.div>
                )}
                {selectedStrategy === "8" && (
                  <motion.div
                    key="8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    8
                  </motion.div>
                )}
                {selectedStrategy === "9" && (
                  <motion.div
                    key="9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    9
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TradingStrategies;
