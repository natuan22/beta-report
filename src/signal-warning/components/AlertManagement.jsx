import { Button, Checkbox, InputNumber, Modal, Row, Table, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import { postApi } from "../../helper/postApi";
import "../styles/btn-signal.css";
import { customLiquidity, customMarketCap, hashTbScope, hashTbScopeLiquidityMarketCap, hashTbSignalWarning, labelToValueMap, specificKeys, specificKeysV2 } from "../utils/hashTb";
import RenderSelectBox from "./RenderSelectBox";
import RenderSelectBoxCustom from "./RenderSelectBoxCustom";
import { getApi } from "../../helper/getApi";

const getSignalByKey = (key) => {
  for (const group in hashTbSignalWarning) {
    const signals = hashTbSignalWarning[group];
    for (const signal of signals) {
      if (signal.key === key) {
        return signal;
      }
    }
  }
  return null;
};

const rowClassName = (record, index) => {
  if (index % 2 === 0) {
    // Dòng lẻ màu trắng
    return "bg-[#d9e9fd]";
  } else {
    // Dòng chẵn màu #d9e9fd
    return "bg-white";
  }
};

const getSignalNameByKey = (key) => {
  for (const group in hashTbSignalWarning) {
    const signals = hashTbSignalWarning[group];
    for (const signal of signals) {
      if (signal.key === key) {
        return signal.name;
      }
    }
  }
  return null;
};

const getModifiedSignalName = (key, value) => {
  const name = getSignalNameByKey(key);
  if (!name) return null;

  const parts = name.split(" ");
  const smaLabel = parts[3] + " " + parts[4];
  const shortSmaValue = value.split("_")[0].replace(/(ma|ema)/, "");
  const longSmaValue = value.split("_")[1].replace(/(ma|ema)/, "");

  const modifiedName = `Đường trung bình SMA(${shortSmaValue}) ${smaLabel} SMA(${longSmaValue})`;

  return modifiedName;
};

const getModifiedSignalNameRsiOrMA = (key, value) => {
  const name = getSignalNameByKey(key);
  if (!name) return null;

  const isRsi = specificKeys.includes(key);
  const shortSmaValue = isRsi ? ` (${value === 70 || value === 80 ? "Trên" : "Dưới"} ${value})` : `(${value.split("_")[0].replace(/(ma|ema)/, "")})`;

  const modifiedName = `${name}${shortSmaValue}`;
  return modifiedName;
};

const getLabelFromValue = (value) => {
  const entry = Object.entries(labelToValueMap).find(([_, val]) => val === value);
  return entry ? entry[0] : null; // Trả về nhãn hoặc null nếu không tìm thấy
};

const AlertManagement = ({ dataForFilter, watchlists, yourSignalWarnings, fetchDataSignalWarnings, alertManagement, setAlertManagement }) => {
  const rowHeight = 39;
  const maxHeight = 683;

  const [messageApi, contextHolder] = message.useMessage();
  const [dataRender, setDataRender] = useState([]);
  
  const [signalDelete, setSignalDelete] = useState(null);
  const [signalEdit, setSignalEdit] = useState(null);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const toggleModalDelete = (state) => setIsModalDeleteOpen(state);
  const toggleModalEdit = (state) => setIsModalEditOpen(state);

  const warning = (type, text) => { messageApi.open({ type, content: text })};

  const handleDeleteSignal = async () => {
    await postApi(`/api/v1/signal-warning/delete-signal/${signalDelete}`);

    fetchDataSignalWarnings();
    
    warning("success", `Xoá điều kiện cảnh báo ${dataRender.find((item)=> item.signal_id === signalDelete)?.nameByKey} thành công`);
    
    setSignalDelete(null);
    toggleModalDelete(false);
  };

  const columns = [
    {
      title: "Điều kiện cảnh báo",
      dataindex: "nameByKey",
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-center text-base font-semibold">
            {record.nameByKey}
          </div>
        );
      },
    },
    {
      title: "Phạm vi áp dụng",
      dataindex: "scopeOfApplication",
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex justify-between items-center w-full">
            <div className="text-black text-center text-base font-semibold mx-auto">
              {record.scopeOfApplication}, {record.liquidityText}, {record.marketCapText}
            </div>
            <div className="flex items-center gap-0.5">
              <Button 
                className="btn_signal bg-transparent border-none p-0 h-fit leading-none"
                onClick={() => { 
                  setSignalEdit(yourSignalWarnings.find((item) => item.signal_id === record.signal_id)); 
                  toggleModalEdit(true);
                }}
              >
                <div className="hover:bg-[#0e48dd]/20 px-1.5 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.4142 2.75736L15.2426 1.58579C14.4616 0.804738 13.1953 0.804738 12.4142 1.58579L11 3L14.999 6.999L16.4142 5.58579C17.1953 4.80474 17.1953 3.53841 16.4142 2.75736ZM13.585 8.414L9.585 4.414L1 13V17H5L13.585 8.414Z" fill="#0E48DD"/>
                  </svg>
                </div>
              </Button>
              <Button 
                className="btn_signal bg-transparent border-none p-0 h-fit leading-none" 
                onClick={() => { 
                  setSignalDelete(record.signal_id); 
                  toggleModalDelete(true);
                }}
              >
                <div className="hover:bg-[#d32f2f]/20 px-1.5 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 0H7V2H2V4H16V2H11V0ZM14 18L15 6H3L4 18H14Z" fill="#F00E0E"/>
                  </svg>
                </div>
                </Button>
            </div>
          </div>
        );
      },
    }
  ];

  useEffect(() => {
    if (yourSignalWarnings.length > 0) {
      const scopeMapping = {
        ALL: 'Tất cả cổ phiếu',
        HOSE: 'Cổ phiếu sàn HSX',
        HNX: 'Cổ phiếu sàn HNX',
        UPCOM: 'Cổ phiếu sàn UPCOM',
        VN30: 'Cổ phiếu VN30',
        watchlists: 'Danh sách watchlist của bạn',
        VNDIAMOND: 'Rổ VNDIAMOND',
        VNFINLEAD: 'Rổ VNFINLEAD',
      };

      const getScopeOfApplication = (scope) => {
        const matchedScopes = scope.map(item => scopeMapping[item]).filter(Boolean);
        
        return matchedScopes.length > 0 ? matchedScopes.join(', ') : 'Tất cả cổ phiếu';
      };

      const yourSignalWarningsWithId = yourSignalWarnings.map((item) => ({ ...item, value: { ...item.value, signal_id: item.signal_id }}));

      setDataRender(yourSignalWarningsWithId.map((item) => item.value).flat().map((item, index) => { 
        const isLongShortSMA = ["sma_ngan_han_cat_len_sma_dai_han", "sma_ngan_han_cat_xuong_sma_dai_han"].includes(item.key);
        const isRsiOrMa = ["gia_hien_tai_cat_len_ma", "gia_hien_tai_cat_xuong_ma", "gia_hien_tai_cat_len_ema", "gia_hien_tai_cat_xuong_ema", "rsi_di_vao_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_ban_", "rsi_di_vao_vung_qua_ban_"].includes(item.key);
  
        const nameByKey = isLongShortSMA
          ? getModifiedSignalName(item.key, item.value)
          : isRsiOrMa
          ? getModifiedSignalNameRsiOrMA(item.key, item.value)
          : getSignalNameByKey(item.key); 
        
          const scopeOfApplication = getScopeOfApplication(item.scope);
          
        const [key, thresholdLiquidity] = item.liquidity.split(" ")
        const liquidityText = item.liquidity === "0"
          ? "Không giới hạn thanh khoản"
          : customLiquidity.find(option => option.value === key)?.label + ` ${formatNumberCurrency(parseFloat(thresholdLiquidity))} tỷ đồng` || item.liquidity;
        
        const [operator, thresholdMarketCap] = item.marketCap.split(" ");
        const marketCapText = item.marketCap === "0"
          ? "Không giới hạn vốn hoá"
          : 'Vốn hoá ' + customMarketCap.find(option => option.value === operator)?.label.toLocaleLowerCase() + ` ${formatNumberCurrency(parseFloat(thresholdMarketCap))} tỷ đồng` || item.marketCap;
        
        return { key: index, nameByKey, scopeOfApplication, liquidityText, marketCapText, signal_id: item.signal_id } 
      }));
    }
  }, [yourSignalWarnings]);

  const handleAddOkSS = async () => {
    // Kiểm tra nếu không có dữ liệu được chọn
    if (!selectedScope.length) {
      warning("Vui lòng chọn ít nhất một phạm vi áp dụng!");
      return;
    }
    const isLongShortSMA = ["sma_ngan_han_cat_len_sma_dai_han", "sma_ngan_han_cat_xuong_sma_dai_han"].includes(signalEdit.value.key);
    const transformedValues = isLongShortSMA ? { value: `${labelToValueMap[valueShort] || valueShort}_${labelToValueMap[valueLong] || valueLong}` } : { value: labelToValueMap[value] || value };
    
    // Xử lý dữ liệu cần gửi
    const scope = selectedScope.includes("ALL") ? ["ALL"] : selectedScope;
    const codes = selectedScope.includes("watchlists") ? watchlistScope.flatMap(({ code }) => code || []) : [];

    await postApi(`/api/v1/signal-warning/update-signal/${signalEdit.signal_id}`, {
      value: {
        key: signalEdit.value.key,
        liquidity: selectValues["liquidity"] === "0" ? "0" : `${selectValues["liquidity"]} ${inputValues["liquidity"]}`,
        marketCap: selectValues["marketCap"] === "0" ? "0" : `${selectValues["marketCap"]} ${inputValues["marketCap"]}`,
        scope,
        codes,
        popupNotification,
        ...(transformedValues.value ? { value: transformedValues.value } : {}),
      },
    });

    fetchDataSignalWarnings();
    setAlertManagement(!alertManagement);

    // Đóng modal
    toggleModalEdit(false);
  };
  
  const [selectedScope, setSelectedScope] = useState([]);
  const [watchlistScope, setWatchlistScope] = useState([]);
  const [filterCodes, setFilterCodes] = useState([]);
  const [selectValues, setSelectValues] = useState({ liquidity: '0', marketCap: '0' });
  const [inputValues, setInputValues] = useState({ liquidity: 100, marketCap: 100 });
  
  const handleSelectChange = (setter, compareValue, message) => (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== compareValue) {
      setter(selectedValue);
    } else {
      warning('warning', message);
    }
  };

  const [value, setValue] = useState(null);
  const [valueShort, setValueShort] = useState(null);
  const [valueLong, setValueLong] = useState(null);

  const [isModalWatchlistsOpen, setIsModalWatchlistsOpen] = useState(false);
  
  const handleSelectChangeValues = (key, value) => setSelectValues((prev) => ({ ...prev, [key]: value }));
  const handleInputChange = (key, value) => setInputValues((prev) => ({ ...prev, [key]: value }));
  
  const currentSignal = useMemo(() => (signalEdit ? getSignalByKey(signalEdit.value.key) : null), [signalEdit]);
  const isSpecificKeys = useMemo(() => (signalEdit ? specificKeysV2.includes(signalEdit.value.key) : null), [signalEdit, specificKeysV2]);
  const isLongShortSMA = useMemo(() => signalEdit ? ["sma_ngan_han_cat_len_sma_dai_han", "sma_ngan_han_cat_xuong_sma_dai_han"].includes(signalEdit.value.key) : null, [signalEdit]);

  useEffect(() => {
    if(signalEdit) {
      setSelectedScope(signalEdit.value.scope);
      setPopupNotification(signalEdit.value.popupNotification);

      const [operator, thresholdMarketCap] = signalEdit.value.marketCap.split(" ");
      const [key, thresholdLiquidity] = signalEdit.value.liquidity.split(" ");

      setSelectValues({ liquidity: key, marketCap: operator });
      setInputValues({ liquidity: parseFloat(thresholdLiquidity) || 100, marketCap: parseFloat(thresholdMarketCap) || 100 });
      
      setValue(!isLongShortSMA ? getLabelFromValue(signalEdit.value.value) : null);
      setValueShort(isLongShortSMA ? getLabelFromValue(signalEdit.value.value.split("_")[0]) : null);
      setValueLong(isLongShortSMA ? getLabelFromValue(signalEdit.value.value.split("_")[1]) : null);
    }
  }, [signalEdit, isLongShortSMA]);
  
  const handleAddCodeToFilter = (isChecked, watchlist) => {
    setWatchlistScope((prev) => {
      // prev luôn là mảng, không cần kiểm tra nữa
      let updatedCodes = [...prev]; 

      if (isChecked) {
        // Khi chọn, thêm nguyên đối tượng watchlist vào filterCodes
        updatedCodes = [...new Set([...updatedCodes, watchlist])];
      } else {
        // Khi bỏ chọn, xóa đối tượng watchlist khỏi filterCodes
        updatedCodes = updatedCodes.filter((item) => item.id !== watchlist.id);
      }

      return updatedCodes;
    });
  };

  const handleAddCodeOK = () => {
    const allCodes = watchlistScope.flatMap((watchlist) => watchlist.code);
  
    setFilterCodes((prev) => [...new Set([...prev, ...allCodes])]);
  
    // Đóng modal
    toggleModalWatchlists(false);
  };

  const toggleModalWatchlists = (state) => setIsModalWatchlistsOpen(state);

  const handleCheckboxChangeScope = (itemKey, isChecked) => {
    setSelectedScope((prev) => {
      let updatedScope = prev;
  
      if (itemKey === "ALL") {
        // Nếu chọn ALL, xóa hết các key khác và chỉ thêm ALL
        updatedScope = isChecked ? ["ALL"] : [];
      } else {
        // Loại bỏ "ALL" nếu có trong selectedScope
        updatedScope = prev.filter((k) => k !== "ALL");
  
        if (itemKey === "watchlists") {
          // Quản lý riêng cho watchlists
          if (isChecked) {
            toggleModalWatchlists(true); // Hiển thị modal
            updatedScope = [...updatedScope, itemKey];
          } else {
            setFilterCodes([]);
            setWatchlistScope([]);
            updatedScope = updatedScope.filter((k) => k !== itemKey);
          }
        } else {
          // Thêm hoặc loại bỏ itemKey vào/from updatedScope
          updatedScope = isChecked ? [...updatedScope, itemKey] : updatedScope.filter((k) => k !== itemKey);
        }
      }
  
      return updatedScope;
    });
  };

  const [validCodes, setValidCodes] = useState([]);
  const fetchStockGroup = async (group) => {
    try {
      const response = await getApi(`/api/v1/signal-warning/stock-group/${group}`);
      return response.data || [];
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return [];
    }
  };

  useEffect(() => {
    const groups = selectedScope.filter((scope) => ["VNDIAMOND", "VNFINLEAD"].includes(scope));
  
    if (groups.length > 0) {
      const fetchCodes = async () => {
        try {
          const codes = await Promise.all(groups.map(group => fetchStockGroup(group)));
          setValidCodes([...new Set(codes.flat())]);
        } catch (error) {
          console.error("Lỗi khi lấy mã code:", error);
        }
      };
      fetchCodes();
    } else {
      setValidCodes([]);
    }
  }, [selectedScope]);

  const filteredData = useMemo(() => {
    return dataForFilter.filter((dataItem) => {
      const transformedValue = isLongShortSMA ? `${labelToValueMap[valueShort] || valueShort}_${labelToValueMap[valueLong] || valueLong}` : labelToValueMap[value] || value;
      
      const isValidKey = (() => {      
        if (specificKeysV2.includes(signalEdit?.value.key)) {
          if (specificKeys.includes(signalEdit?.value.key)) {
            return dataItem[`${signalEdit?.value.key}${transformedValue}`] === 1;
          } else {
            return dataItem[signalEdit?.value.key]?.[transformedValue] === 1;
          }
        }
        return dataItem[signalEdit?.value.key] === 1;
      })();

      const isValidScope = (() => {
        if (!selectedScope.length || selectedScope.includes("ALL")) return true;
      
        if (selectedScope.some((scope) => ["HOSE", "HNX", "UPCOM"].includes(scope))) { return selectedScope.some((scope) => dataItem.floor === scope) }
        if (selectedScope.some((scope) => ["VNDIAMOND", "VNFINLEAD"].includes(scope))) { return validCodes.includes(dataItem.code) }
        if (selectedScope.includes("VN30") && selectedScope.includes(dataItem.indexCode)) { return true }
        if (selectedScope.includes("watchlists")) { return filterCodes.includes(dataItem.code) }
      
        return false;
      })();

      const isValidMarketCap = (() => {
        if (!selectValues["marketCap"] || selectValues["marketCap"] === "0") { return true }

        const inputMarketCapValue = inputValues["marketCap"];
        if (inputMarketCapValue) {
          const marketCapField = selectValues["marketCap"];
          if (marketCapField === ">") return dataItem.marketCap > parseFloat(inputMarketCapValue);
          if (marketCapField === "<") return dataItem.marketCap < parseFloat(inputMarketCapValue);
        }

        return true;
      })();

      const isValidLiquidity = (() => {
        if (!selectValues["liquidity"] || selectValues["liquidity"] === "0") { return true }

        const inputLiquidityValue = inputValues["liquidity"];
        if (inputLiquidityValue) {
          const liquidityField = selectValues["liquidity"];
          return dataItem[liquidityField] >= parseFloat(inputLiquidityValue);
        }

        return true;
      })();

      return isValidKey && isValidScope && isValidMarketCap && isValidLiquidity;
    });
  }, [dataForFilter, selectedScope, validCodes, filterCodes, selectValues, inputValues, signalEdit, isLongShortSMA, value, valueShort, valueLong]);
  
  const [popupNotification, setPopupNotification] = useState(false);
  const handlePopupNotification = (e) => setPopupNotification(e.target.checked);
  
  const renderContent = () => {
    if (!isSpecificKeys || !currentSignal) return <div></div>;

    const renderSMAOptions = () => currentSignal.optionLabelLongShort.map((label, index) => {
      const isShort = index === 0;
      const value = isShort ? valueShort : valueLong;
      const setValue = isShort ? setValueShort : setValueLong;
      const otherValue = isShort ? valueLong : valueShort;
      const errorMessage = `Giá trị SMA ${isShort ? "ngắn hạn" : "dài hạn"} không được trùng nhau.`;

      return (
        <div key={index} className="flex items-center py-1 gap-4">
          <span className="text-[#0D4381] text-base font-semibold">{label}</span>
          <RenderSelectBox
            itemKey={currentSignal.key}
            options={isShort ? currentSignal.selectShort : currentSignal.selectLong}
            value={value}
            onChange={handleSelectChange(setValue, otherValue, errorMessage)}
          />
        </div>
      );
    });

    const renderDefaultOptions = () => currentSignal.optionLabel.map((label, index) => (
      <div key={index} className="flex items-center py-1 gap-4">
        <span className="text-[#0D4381] text-base font-semibold">{label}</span>
        <RenderSelectBox
          itemKey={currentSignal.key}
          options={currentSignal.select}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    ));

    return isLongShortSMA ? renderSMAOptions() : renderDefaultOptions();
  };

  return (
    <div>
      {contextHolder}
      <span className="flex gap-1 items-center mt-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill="black" d="M4.99902 3.90634C3.34202 3.90634 1.99902 5.24944 1.99902 6.90634V16.9063C1.99902 18.9063 2.99902 19.9063 4.99902 19.9063H18.999C20.999 19.9063 21.999 18.9063 21.999 16.9063V8.90634C21.999 8.35404 21.551 7.90634 20.999 7.90634H19.999V4.90634C19.999 4.35404 19.551 3.90634 18.999 3.90634H4.99902ZM4.99902 5.90634H17.999V7.90634H4.99902C4.44702 7.90634 3.99902 7.45864 3.99902 6.90634C3.99902 6.35404 4.44702 5.90634 4.99902 5.90634ZM16.999 11.9063C17.551 11.9063 17.999 12.354 17.999 12.9063C17.999 13.4586 17.551 13.9063 16.999 13.9063C16.447 13.9063 15.999 13.4586 15.999 12.9063C15.999 12.354 16.447 11.9063 16.999 11.9063Z"/>
        </svg>
        <span className="font-semibold text-lg">Quản lý cảnh báo</span>
      </span>
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

      {/* Modal edit signal */}
      <Modal 
        centered
        width={950}
        open={isModalEditOpen}
        onCancel={() => toggleModalEdit(false)}
        footer={null}
        className="dialog_setting_signal"
      >
        <div className="h-[420px]">
          {/* Header */}
          <div>
            <div className="text-center font-bold text-xl pb-5">
              Phạm vi áp dụng
            </div>

            <div className="flex gap-4">{renderContent()}</div>
            {/* Scope Categories */}
            <div className="py-1">
              <div className="text-[#0D4381] text-base font-semibold pb-1">
                Danh mục
              </div>
              <div className="shadowInner bg-[#D9D9D980]/50 grid grid-cols-4 p-3">
                {hashTbScope.map(({ key, name }, idx) => {
                  const isCheck = selectedScope.includes(key);

                  return (
                    <Row className="py-2" key={idx}>
                      <Checkbox
                        onChange={(e) => handleCheckboxChangeScope(key, e.target.checked)}
                        disabled={selectedScope.includes("ALL") && key !== "ALL"}
                        checked={isCheck}
                      >
                        <span className="font-bold">{name}</span>
                      </Checkbox>
                    </Row>
                  )
                })}
              </div>
              {/* Liquidity and Market Cap */}
              <div className="grid grid-cols-9">
                <div className="flex flex-col gap-2 col-span-6">
                  <div className="text-[#0D4381] text-base font-semibold py-1">
                    {hashTbScopeLiquidityMarketCap.map((item, idx) => (
                      <div className="flex items-center py-1 gap-4" key={idx}>
                        <span className={`${item.key === "marketCap" ? "mr-[34px]" : ""}`}>
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <RenderSelectBox
                            itemKey={item.key + 'Custom'}
                            options={item.key === "marketCap" ? customMarketCap : customLiquidity}
                            value={selectValues[item.key] || "0"}
                            onChange={(e) => handleSelectChangeValues(item.key, e.target.value)}
                          />
                          {selectValues[item.key] !== '0' && (
                            <div>
                              <InputNumber
                                className="signal_input"
                                value={inputValues[item.key] || ''}
                                status={inputValues[item.key] !== null ? "" : "error"}
                                onChange={(value) => handleInputChange(item.key, value)}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                onKeyDown={(e) => {
                                  if ((e.ctrlKey && (e.key === "a" || e.key === "x" || e.key === "c" || e.key === "v")) || e.key === ".") { return }
                                  if (!((e.key >= "0" && e.key <= "9") || e.key === "Backspace" || e.key === "Tab")) { e.preventDefault() }
                                }}
                                style={{ width: 150 }}
                              />
                              <div className="relative">
                                <div className="absolute top-[-31px] left-[126px]">
                                  <RenderSelectBoxCustom
                                    value={''}
                                    options={item.select}
                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <Radio.Group value={valueLiquidityMarket} onChange={onChangeValueLiquidityMarket}>
                    <Radio value={0}>
                      <span className="text-[13px] font-bold">Áp dụng cho tất cả điều kiện</span>
                    </Radio>
                    <Radio value={1}>
                      <span className="text-[13px] font-bold">Chỉ áp dụng cho điều kiện này</span>
                    </Radio>
                  </Radio.Group> */}
                  <Checkbox className="mt-auto" onChange={handlePopupNotification} checked={popupNotification}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        Nhận popup thông báo trên màn hình
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                        <path d="M7 0C6.63775 0 6.27113 0.201691 6.15213 0.628954L5.85199 1.75H2.625C1.17513 1.75 0 2.92522 0 4.375V10.5C0 11.9499 1.17513 13.125 2.625 13.125H2.67926L1.77713 16.3791C1.64763 16.8446 1.91362 17.3434 2.37912 17.4729C2.84462 17.6024 3.34337 17.3364 3.47287 16.8709L4.5115 13.125H6.125V15.75C6.125 16.233 6.517 16.625 7 16.625C7.483 16.625 7.875 16.233 7.875 15.75V13.125H9.48849L10.5271 16.8709C10.6566 17.3364 11.1554 17.6024 11.6209 17.4729C12.0864 17.3434 12.3524 16.8446 12.2229 16.3791L11.3207 13.125H11.375C12.8249 13.125 14 11.9499 14 10.5V4.375C14 2.92522 12.8249 1.75 11.375 1.75H8.14801L7.84787 0.628954C7.72887 0.201691 7.36225 0 7 0ZM2.625 3.5H11.375C11.858 3.5 12.25 3.89174 12.25 4.375V10.5C12.25 10.983 11.858 11.375 11.375 11.375H7H2.625C2.142 11.375 1.75 10.983 1.75 10.5V4.375C1.75 3.89174 2.142 3.5 2.625 3.5Z" fill="#2A343D"/>
                      </svg>
                    </div>
                  </Checkbox>
                </div>

                <div className="flex flex-col items-center justify-center col-span-3">
                  <div className="font-bold text-[#0D4381] text-lg py-3">
                    Số mã thỏa các điều kiện
                  </div>
                  <div className="text-[#0D4381] font-bold text-[120px] leading-[105px]">
                    {filteredData?.length === 0 ? 0 : filteredData?.length.toLocaleString("vi-VN") || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end pt-[7px]">
            <Button
              className="bg-[#0669FCB2] font-bold shadow-md shadow-black/20"
              onClick={handleAddOkSS}
            >
              Thiết lập
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        centered
        width={750}
        open={isModalWatchlistsOpen}
        onCancel={() => toggleModalWatchlists(false)}
        footer={null}
        className="dialog_setting_signal"
      >
        <div className="h-[250px] overflow-y-auto no-scrollbar">
          <div className="text-center font-bold text-xl pb-5 sticky top-0 z-10 bg-white">
            Danh sách watchlist của bạn
          </div>
          {watchlists.length > 0 ? (
            watchlists.map((item, idx) => (
              <div key={idx} className="py-2 border-b border-gray-200 grid grid-cols-5 items-start">
                <Checkbox 
                  className="col-span-1" 
                  checked={watchlistScope.some((watchlist) => watchlist.id === item.id)}
                  onChange={(e) => handleAddCodeToFilter(e.target.checked, item)}
                >
                  <span className="font-bold">{item.name}</span>
                </Checkbox>
                <div className="col-span-4 text-gray-600">
                  {item.code.length > 0 ? (
                    item.code.map((code, codeIdx) => (
                      <span key={codeIdx}>
                        {code}
                        {codeIdx !== item.code.length - 1 && <span>,&nbsp;</span>}
                      </span>
                    ))
                  ) : (
                    <span>No codes available</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Bạn không có Danh mục theo dõi nào</div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-[#0669FCB2] font-bold shadow-md shadow-black/20"
            onClick={handleAddCodeOK}
          >
            Thiết lập
          </Button>
        </div>
      </Modal>
      {/* Modal delete signal */}
      <Modal 
        centered
        width={700}
        open={isModalDeleteOpen}
        onCancel={() => toggleModalDelete(false)}
        footer={null}
        className="dialog_delete_signal"
      >
        <div className="h-[88px] flex flex-col justify-between gap-5">
          <div className="text-center text-xl font-bold">Bạn có chắc muốn xóa điều kiện cảnh báo này?</div>
          <div className="flex justify-end gap-4">
            <Button 
              className="bg-[#0669FCB2] rounded-[5px] font-bold btn_cancel" 
              onClick={() => {
                toggleModalDelete(false); 
                setSignalDelete(null);
              }}
            >
              Hủy bỏ
            </Button>
            <Button 
              className="bg-[#F44136B2] rounded-[5px] font-bold btn_acpect" 
              onClick={handleDeleteSignal}
            >
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AlertManagement;
