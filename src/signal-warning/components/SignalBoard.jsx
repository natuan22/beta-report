import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { stockGr } from "../../app/utils/stock-gr";
import { getModifiedSignalName, getModifiedSignalNameRsiOrMA, getSignalNameByKey } from "../../helper/modifiedSignalName";
import { specificKeys, specificKeysV2 } from "../utils/hashTb";

const rowClassName = (record, index) => {
  if (index % 2 === 0) {
    // Dòng lẻ màu trắng
    return "bg-[#d9e9fd]";
  } else {
    // Dòng chẵn màu #d9e9fd
    return "bg-white";
  }
};

const SignalBoard = ({ data, yourSignalWarnings }) => {
  const rowHeight = 39;
  const maxHeight = 683;
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

  const filterDataBySignalWarnings = async (data, yourSignalWarnings) => {
    const validCodes = await prepareValidCodes(yourSignalWarnings.flatMap((signal) => signal.value.scope || []));

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
      const result = await filterDataBySignalWarnings(data, yourSignalWarnings);
      setFilteredData(result);
    };

    fetchFilteredData();
  }, [data, yourSignalWarnings]);
  
  useEffect(() => {
    if (filteredData.length > 0) {
      setDataRender(filteredData.map((item) => item.result).flat().map((item, index) => ({ ...item, key: index })));
    }
  }, [filteredData]);

  const columns = [
    {
      title: "Mã cổ phiếu",
      dataindex: "code",
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-center text-lg font-semibold">
            {record.code}
          </div>
        );
      },
    },
    {
      title: "Tín hiệu",
      dataindex: "nameByKey",
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-center text-base font-semibold">
            {record.nameByKey}
          </div>
        );
      },
    }
  ];

  return (
    <div className="table-antd-betasmart mt-6">
      <Table
        showSorterTooltip={false}
        columns={columns}
        dataSource={dataRender}
        rowClassName={rowClassName}
        scroll={dataRender.length * rowHeight > maxHeight ? { y: maxHeight } : { }}
        pagination={false}
      />
    </div>
  );
};

export default SignalBoard;
