import React, { useEffect, useState } from "react";
import { getApi } from "../helper/getApi";
import { Select } from "antd";
import ChartColumnRange from "./components/ChartColumnRange";
import socket from "../helper/socket";

const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

const ContributePEPB = () => {
  const [dataIndustry, setDataIndustry] = useState([]);
  const [industry, setIndustry] = useState();

  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState([]);
  const [period, setPeriod] = useState("1");

  const [data, setData] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const fetchDataIndustry = async () => {
      try {
        const data = await getApi("/api/v1/investment/all-industry");
        setDataIndustry(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataIndustry();
  }, []);

  const fetchDataStockByIndustry = async () => {
    try {
      const data = await getApi(
        `api/v1/investment/stock-by-industry?industry=${industry}`
      );

      setDataStocks(data);
      setStock([]);
      setData([]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataContributePEPB = async () => {
    try {
      const stocksString = stock.join(",");
      const data = await getApi(
        `api/v1/tcbs/contribute-pe-pb?stock=${stocksString}&period=${period}`
      );

      setData(data);
      setSocketConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (industry) {
      fetchDataStockByIndustry();
    }
  }, [industry]);
  
  useEffect(() => {
    if (stock?.length > 0) {
      fetchDataContributePEPB();
    }
  }, [stock, period]);

  const onChange = (value) => {
    setIndustry(value);
  };
  
  const onChangeStock = (value) => {
    setStock(value);
  };

  const filterOption = (input, option) => {
    const inputNormalized = removeVietnameseTones(input);
    const valueNormalized = removeVietnameseTones(option?.value || "");
    const labelNormalized = removeVietnameseTones(option?.label || "");

    return (
      valueNormalized.includes(inputNormalized) ||
      labelNormalized.includes(inputNormalized)
    );
  };

  useEffect(() => {
    if (!socketConnected || !Array.isArray(stock) || stock.length === 0) return;

    const updateStockData = (code) => (newData) => {
      setData((prevData) =>
        prevData?.map((item) =>
          item.code === code
            ? { ...item, latest_PB: newData.pb, latest_PE: newData.pe }
            : item
        )
      );
    };

    stock.forEach((code) => {
      socket.on(`listen-pe-pb-stock-${code}`, updateStockData(code));
    });

    return () => {
      stock.forEach((code) => {
        socket.off(`listen-pe-pb-stock-${code}`, updateStockData(code));
      });
    };
  }, [socketConnected, stock]);

  return (
    <div>
      <div className="flex items-center">
        <div className="flex flex-col gap-3 mr-5">
          <div className="code-select">
            <Select
              style={{ width: 222, height: 40 }}
              value={industry}
              allowClear
              showSearch
              onChange={onChange}
              filterOption={filterOption}
              options={dataIndustry.map((code) => ({
                value: code,
                label: code,
              }))}
              placeholder="Ngành"
            />
          </div>
          <div className="code-select multiple-select">
            <Select
              mode="multiple"
              style={{ width: 222 }}
              value={stock}
              allowClear
              showSearch
              onChange={onChangeStock}
              filterOption={filterOption}
              options={dataStocks.map((code) => ({ value: code, label: code }))}
              placeholder="Cổ phiếu"
              maxCount={10}
            />
          </div>
        </div>
        <div>
          <div className="mb-[3px] font-medium">Thời gian</div>
          <button
            className={`custom-btn ${
              period === "1" ? "active-btn" : "btn-2"
            } xs:inline xxs:block`}
            onClick={() => {
              setPeriod("1");
            }}
          >
            1Y
          </button>
          <button
            className={`custom-btn ${
              period === "3" ? "active-btn" : "btn-2"
            } xs:inline xxs:block xs:ml-2 xxs:ml-0 xs:mt-0 xxs:mt-2`}
            onClick={() => {
              setPeriod("3");
            }}
          >
            3Y
          </button>
          <button
            className={`custom-btn ${
              period === "5" ? "active-btn" : "btn-2"
            } xs:inline xxs:block xs:ml-2 xxs:ml-0 xs:mt-0 xxs:mt-2`}
            onClick={() => {
              setPeriod("5");
            }}
          >
            5Y
          </button>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-none">
        <ChartColumnRange data={data} chartKey="P/E" />
        <ChartColumnRange data={data} chartKey="P/B" />
      </div>
    </div>
  );
};

export default ContributePEPB;
