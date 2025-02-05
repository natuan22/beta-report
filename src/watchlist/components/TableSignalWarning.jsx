import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Loading from "../../loading/Loading";
import { stockGr } from "../../app/utils/stock-gr";
import { getModifiedSignalName, getModifiedSignalNameRsiOrMA, getSignalNameByKey } from "../../helper/modifiedSignalName";
import { specificKeys, specificKeysV2 } from "../../signal-warning/utils/hashTb";

const TableSignalWarning = ({ yourSignalWarnings, dataSignal, data, handleDelCodeInWatchlist, loading, loadingTb, loadingSignal }) => {
  const rowHeight = 39;
  const maxHeight = 620;

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-white";
    } else {
      // Dòng chẵn màu #d9e9fd
      return "bg-[#d9e9fd] ";
    }
  };
  
  const [filteredData, setFilteredData] = useState([]);
  const [dataRender, setDataRender] = useState([]);

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

  const filterDataBySignalWarnings = (data, yourSignalWarnings) => {
    const validCodes = prepareValidCodes(yourSignalWarnings.flatMap((signal) => signal.value.scope || []));

    return yourSignalWarnings.flatMap((signal) => {
      const { value } = signal;

      const isLongShortSMA = ["sma_ngan_han_cat_len_sma_dai_han", "sma_ngan_han_cat_xuong_sma_dai_han"].includes(value.key);
      const isRsiOrMa = ["gia_hien_tai_cat_len_ma", "gia_hien_tai_cat_xuong_ma", "gia_hien_tai_cat_len_ema", "gia_hien_tai_cat_xuong_ema", "rsi_di_vao_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_ban_", "rsi_di_vao_vung_qua_ban_"].includes(value.key);

      const nameByKey = isLongShortSMA
        ? getModifiedSignalName(value.key, value.value)
        : isRsiOrMa
        ? getModifiedSignalNameRsiOrMA(value.key, value.value)
        : getSignalNameByKey(value.key);

      const filteredResults = data.filter((dataItem) => {
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

          const floorScopes = value.scope.filter((scope) => ["HOSE", "HNX", "UPCOM"].includes(scope));
          const stockGroupScopes = value.scope.filter((scope) => ["VNDIAMOND", "VNFINLEAD"].includes(scope));

          if (floorScopes.length && floorScopes.includes(dataItem.floor)) return true;
          if (stockGroupScopes.length && validCodes.includes(dataItem.code)) return true;
          if (value.scope.includes("VN30") && value.scope.includes(dataItem.indexCode)) return true;
          if (value.scope.includes("watchlists")) return value.codes.includes(dataItem.code);
  
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

        return isValidKey && isValidScope && isValidMarketCap && isValidLiquidity;
      }).map((item) => ({ ...item, nameByKey }));

      return { key: nameByKey, result: filteredResults };
    });
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (!data || !yourSignalWarnings || !dataSignal) return; // Kiểm tra nếu bất kỳ giá trị nào bị undefined
  
      const existingCodes = data.map((item) => item.code);
      const dataSignalFilter = !loadingSignal ? dataSignal.filter((item) => existingCodes.includes(item.code)) : [];
  
      const result = !loadingSignal ? filterDataBySignalWarnings(dataSignalFilter, yourSignalWarnings) : [];
  
      setFilteredData(result || []);
    };
  
    fetchFilteredData();
  }, [data, yourSignalWarnings, dataSignal]);
  
  useEffect(() => {
    if (filteredData.length > 0) {
      setDataRender(filteredData.map((item) => item.result).flat().map((item, index) => ({ ...item, key: index })));
    }
  }, [filteredData]);
  
  const columns = [
    {
      title: "Mã CP",
      dataindex: "code",
      fixed: true,
      width: 180,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`font-bold text-lg flex flex-row items-center`}>
            <IoIosCloseCircle
              className="text-[#dcdcdd] w-[20px] h-[20px] mr-2 cursor-pointer hover:text-red-500"
              onClick={() => handleDelCodeInWatchlist(record.code)}
            />
            <Tooltip
              placement="left"
              title={<span className="">Click vào mã CP để xem báo cáo</span>}
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              <a
                className="text-[#0D4381] cursor-pointer no-underline hover:text-[#0164F8] hover:underline"
                href={`/phan-tich-ky-thuat-tu-dong/${record.code}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {record.code}
              </a>
            </Tooltip>
          </div>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tín hiệu",
      dataindex: "nameByKey",
      align: "center",
      render: (_, record) => {
        return <div className="text-black text-center">{record.nameByKey}</div>;
      },
    },
  ];

  return (
    <div>
      {!loading && !loadingSignal && data ? (
        <div>
          {Array.isArray(data) && data?.length > 0 ? (
            <div className="table-data-antd w-[1060px] mt-0.5">
              <Table
                loading={loadingTb}
                showSorterTooltip={false}
                columns={columns}
                dataSource={dataRender}
                rowClassName={rowClassName}
                // pagination={{ defaultPageSize: 14, showSizeChanger: false }}
                scroll={
                  data.length * rowHeight > maxHeight
                    ? { y: maxHeight }
                    : undefined
                }
                pagination={false}
              />
            </div>
          ) : (
            <div className="grid place-content-center h-[710px] font-medium text-lg">
              <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                <div className="p-7">Chưa có mã chứng khoán nào</div>
                <div>
                  Bạn hãy thêm mã chứng khoán vào watchlist để theo dõi.
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid place-content-center h-[710px]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default TableSignalWarning;
