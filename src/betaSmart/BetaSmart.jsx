import { Slider } from "@mui/material";
import { Skeleton, Table, Tooltip } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import formatNumberCurrency from "../helper/formatNumberCurrency";
import { getApi } from "../helper/getApi";
import { getColorBaseOnValue } from "../helper/getColorBaseOnValue";
import socket from "../helper/socket";
import "./utils/styles/styleLoading.css";
import "./utils/styles/table-antd-custom.css";

const BetaSmart = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(process.env.REACT_APP_IS_LG)
  );
  const [role, setRole] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_ROLE)
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      window.location.reload();
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

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Nếu giờ là 9:00 đúng, đặt lại data thành rỗng
      if (hours === 9 && minutes === 0) {
        setData([]);
      }
    };

    // Kiểm tra ngay khi component mount
    checkTime();

    // Đặt khoảng thời gian kiểm tra mỗi phút
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-[#d9e9fd]";
    } else {
      // Dòng chẵn màu #d9e9fd
      return "bg-white";
    }
  };

  const [data, setData] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getApi(`/api/v1/investment/beta-smart`);
      const dataWithKey =
        Array.isArray(data) &&
        data?.map((item, index) => {
          return {
            ...item,
            key: index,
            signal: item.signal === 0 ? "MUA" : "BÁN",
          };
        });
      setData(dataWithKey);
      setLoading(false);

      setSocketConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataStockBasic = async (code) => {
    try {
      const data = await getApi(`/api/v1/investment/stock-basic?stock=${code}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tín hiệu",
      dataindex: "signal",
      fixed: true,
      width: 110,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`${
              record.signal === "MUA" ? "text-green-500" : "text-red-500"
            } text-center font-bold text-base`}
          >
            {record.signal}
          </div>
        );
      },
      sorter: (a, b) => a.signal.localeCompare(b.signal),
    },
    {
      title: "Mã CP",
      dataindex: "code",
      fixed: true,
      width: 100,
      align: "center",
      render: (_, record) => {
        return (
          <Tooltip
            placement="left"
            title={<span className="">Click vào mã CP để xem báo cáo</span>}
            color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
          >
            <a
              className="text-black text-center font-bold text-base cursor-pointer no-underline hover:text-[#0164F8] hover:underline"
              href={`/phan-tich-ky-thuat-tu-dong/${record.code}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {record.code}
            </a>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: (
        <span>
          Thị giá <br />
          (đồng)
        </span>
      ),
      dataindex: "closePrice",
      width: 100,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.perChange
            )} text-right text-base`}
          >
            {formatNumberCurrency(record.closePrice * 1000)}
          </div>
        );
      },
      sorter: (a, b) => a.closePrice - b.closePrice,
    },
    {
      title: (
        <span>
          KLGD <br />
          (CP)
        </span>
      ),
      dataindex: "totalVol",
      width: 110,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.totalVol)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVol - b.totalVol,
    },
    {
      title: (
        <span>
          GTGD <br />
          (tỷ đồng)
        </span>
      ),
      dataindex: "totalVal",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.totalVal)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "%D",
      dataindex: "perChange",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.perChange
            )} text-right text-base`}
          >
            {formatNumberCurrency(record.perChange)}
          </div>
        );
      },
      sorter: (a, b) => a.perChange - b.perChange,
    },
    {
      title: "%M",
      dataindex: "perChangeM",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.perChangeM
            )} text-right text-base`}
          >
            {formatNumberCurrency(record.perChangeM)}
          </div>
        );
      },
      sorter: (a, b) => a.perChangeM - b.perChangeM,
    },
    {
      title: "%Ytd",
      dataindex: "perChangeYtD",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.perChangeYtD
            )} text-right text-base`}
          >
            {formatNumberCurrency(record.perChangeYtD)}
          </div>
        );
      },
      sorter: (a, b) => a.perChangeYtD - b.perChangeYtD,
    },
    {
      title: "%YoY",
      dataindex: "perChangeY",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`${getColorBaseOnValue(
              record.perChangeY
            )} text-right text-base`}
          >
            {formatNumberCurrency(record.perChangeY)}
          </div>
        );
      },
      sorter: (a, b) => a.perChangeY - b.perChangeY,
    },
    {
      title: (
        <span>
          EPS <br />
          (đồng/cp)
        </span>
      ),
      dataindex: "EPS",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.EPS)}
          </div>
        );
      },
      sorter: (a, b) => a.EPS - b.EPS,
    },
    {
      title: "PE (lần)",
      dataindex: "PE",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.PE)}
          </div>
        );
      },
      sorter: (a, b) => a.PE - b.PE,
    },
    {
      title: (
        <span>
          BVPS <br />
          (đồng/cp)
        </span>
      ),
      dataindex: "BVPS",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.BVPS)}
          </div>
        );
      },
      sorter: (a, b) => a.BVPS - b.BVPS,
    },
    {
      title: "PB (lần)",
      dataindex: "PB",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.PB)}
          </div>
        );
      },
      sorter: (a, b) => a.PB - b.PB,
    },
    {
      title: "ROA (%)",
      dataindex: "ROA",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.ROA)}
          </div>
        );
      },
      sorter: (a, b) => a.ROA - b.ROA,
    },
    {
      title: "ROE (%)",
      dataindex: "ROE",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right text-base">
            {formatNumberCurrency(record.ROE)}
          </div>
        );
      },
      sorter: (a, b) => a.ROE - b.ROE,
    },
    {
      title: "Biến động 52 tuần",
      align: "center",
      render: (_, record) => {
        const lowestPrice = +record.PRICE_LOWEST_CR_52W.toFixed(2);
        const highestPrice = +record.PRICE_HIGHEST_CR_52W.toFixed(2);

        const isHighestPrice = record.closePrice === highestPrice;
        const isLowestPrice = record.closePrice === lowestPrice;

        const thumbColor = isHighestPrice
          ? "#3dcc91"
          : isLowestPrice
          ? "#d1686a"
          : "#137ab9";
        const borderTopColor = isHighestPrice
          ? "#3dcc91"
          : isLowestPrice
          ? "#d1686a"
          : "#137ab9";

        return (
          <div className="w-[120px] h-[28px] -translate-y-[5px] translate-x-[7px]">
            <Slider
              disabled
              value={record.closePrice}
              min={lowestPrice}
              max={highestPrice}
              track={false}
              marks={[
                { value: lowestPrice, label: formatNumberCurrency(lowestPrice) },
                { value: highestPrice, label: formatNumberCurrency(highestPrice) },
              ]}
              sx={{
                "& .MuiSlider-rail": {
                  backgroundColor: "#838383",
                },
                "& .MuiSlider-markLabel": {
                  fontSize: "12px", // Kích thước chữ
                  top: "20px",
                  fontWeight: 600,
                },
                "& .MuiSlider-thumb": {
                  width: "2px",
                  height: "4px",
                  backgroundColor: thumbColor,
                  borderRadius: 0,
                },
                "& .MuiSlider-thumb::after": {
                  width: "0px",
                  height: "0px",
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: `4px solid ${borderTopColor}`,
                  borderRadius: 0,
                  top: "-2.5px",
                  left: "1px",
                },
                "& .MuiSlider-root": {
                  padding: "0px 0px",
                },
              }}
            />
          </div>
        );
      },
    },
  ];

  const calculatePriceChange = (priceTarget, closePrice) => {
    const closePriceAdjusted = closePrice / 1000;
    return ((priceTarget - closePriceAdjusted) / closePriceAdjusted) * 100;
  };

  useEffect(() => {
    const formatDataBasic = (dataBasic) => ({
      totalVol: dataBasic.totalVol,
      totalVal: dataBasic.totalVal,
      perChangeM: dataBasic.perChangeM,
      perChangeYtD: dataBasic.perChangeYtD,
      perChangeY: dataBasic.perChangeY,
      EPS: dataBasic.EPS,
      PE: dataBasic.PE,
      BVPS: dataBasic.BVPS,
      PB: dataBasic.PB,
      ROA: dataBasic.ROA,
      ROE: dataBasic.ROE,
      PRICE_HIGHEST_CR_52W: dataBasic.PRICE_HIGHEST_CR_52W,
      PRICE_LOWEST_CR_52W: dataBasic.PRICE_LOWEST_CR_52W,
    });

    const updateData = (res, dataBasic = {}) => {
      setData((prevData) => {
        const index = prevData.findIndex((item) => item.code === res.code);
        const newEntry = {
          code: res.code,
          closePrice: res.closePrice / 1000,
          perChange:
            ((res.closePrice - res.closePricePrev) / res.closePricePrev) * 100,
          signal: res.signal === 0 ? "MUA" : "BÁN",
          key: index !== -1 ? prevData[index].key : prevData.length,
          ...dataBasic,
        };

        let updatedData;
        if (index !== -1) {
          // Update the existing item
          updatedData = [...prevData];
          updatedData[index] = newEntry;
        } else {
          // Add the new item
          updatedData = [...prevData, newEntry];
        }

        // Sort by 'signal' and 'code' in ascending order
        return _.orderBy(updatedData, ["signal", "code"], ["asc", "asc"]);
      });
    };

    if (socketConnected && data?.length > 0) {
      socket.on("listen-ma-co-phieu", async (res) => {
        const isSignalZeroWithConditions =
          res[0].signal === 0 &&
          calculatePriceChange(res[0].price_2024, res[0].closePrice) >= 7 &&
          calculatePriceChange(res[0].price_2025, res[0].closePrice) >= 25;

        const index = data.findIndex((item) => item.code === res[0].code);

        if (index !== -1) {
          // If code exists in data, check if signal changed to something other than 0 or 1
          if (res[0].signal !== 0 && res[0].signal !== 1) {
            // Remove the item if the signal is not 0 or 1
            setData((prevData) =>
              prevData.filter((item) => item.code !== res[0].code)
            );
          } else {
            // Update existing item with new data if signal is valid
            const dataBasic = await fetchDataStockBasic(res[0].code);
            updateData(res[0], dataBasic ? formatDataBasic(dataBasic) : {});
          }
        } else if (isSignalZeroWithConditions || res[0].signal === 1) {
          // Add new entry if signal meets conditions
          const dataBasic = await fetchDataStockBasic(res[0].code);
          updateData(res[0], dataBasic ? formatDataBasic(dataBasic) : {});
        }
      });
    }

    return () => {
      socket.off("listen-ma-co-phieu");
    };
  }, [socketConnected, data]);

  return (
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
      <div className="w-full p-[40px] font-[Roboto]">
        <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
          BETA SMART
        </div>
        <div className="table-antd-betasmart mt-6">
          {!loading && data ? (
            <div className="2xl:w-[1581px] xl:w-full">
              <Table
                showSorterTooltip={false}
                columns={columns}
                dataSource={data}
                rowClassName={rowClassName}
                // pagination={{ defaultPageSize: 15, showSizeChanger: false }}
                scroll={{ x: 1581 }}
                pagination={false}
              />
            </div>
          ) : (
            <div className="beta-smart">
              <Skeleton.Input active block size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetaSmart;
