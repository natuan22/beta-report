import { Button, Checkbox, InputNumber, Modal, Row, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { getApi } from "../../helper/getApi";
import { customLiquidity, customMarketCap, hashTbScope, hashTbScopeLiquidityMarketCap } from "../utils/hashTb";
import HandleSelectBox from "./HandleSelectBox";
import RenderSelectBox from "./RenderSelectBox";
import RenderSelectBoxCustom from "./RenderSelectBoxCustom";

const HandleSettingScope = ({ item, index, isChecked, handleCheckboxChange, selectedItems, onSettingSignalChange, dataForFilter, watchlists }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalSSOpen, setIsModalSSOpen] = useState(false);
  const [isModalWatchlistsOpen, setIsModalWatchlistsOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState([]);

  // const [valueLiquidityMarket, setValueLiquidityMarket] = useState(1);
  // const onChangeValueLiquidityMarket = (e) => { setValueLiquidityMarket(e.target.value) };

  const toggleModalSS = (state) => setIsModalSSOpen(state);
  const toggleModalWatchlists = (state) => setIsModalWatchlistsOpen(state);
  const warning = (text) => messageApi.open({ type: "warning", content: text });

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

  const handleAddOkSS = () => {
    // Kiểm tra nếu không có dữ liệu được chọn
    if (!selectedScope.length) {
      warning("Vui lòng chọn ít nhất một phạm vi áp dụng!");
      return;
    }
    
    // Xử lý dữ liệu cần gửi
    const scope = selectedScope.includes("ALL") ? ["ALL"] : selectedScope;
    const codes = selectedScope.includes("watchlists") ? watchlistScope.flatMap(({ code }) => code || []) : [];
  
    // Gửi dữ liệu qua callback
    onSettingSignalChange({
      key: item.key,
      valueLiquidity: selectValues["liquidity"] === "0" ? "0" : `${selectValues["liquidity"]} ${inputValues["liquidity"]}`,
      valueMarketCap: selectValues["marketCap"] === "0" ? "0" : `${selectValues["marketCap"]} ${inputValues["marketCap"]}`,
      selectedScope: scope,
      codes,
      popupNotification,
    });
  
    // Đóng modal
    toggleModalSS(false);
  };

  const [watchlistScope, setWatchlistScope] = useState([]);
  const [filterCodes, setFilterCodes] = useState([]);
  
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
  
  const [activeKey, setActiveKey] = useState(null);
  const [selectValues, setSelectValues] = useState({ liquidity: '0', marketCap: '0' });
  const [inputValues, setInputValues] = useState({ liquidity: 100, marketCap: 100 });
  
  const handleSelectChange = (key, value) => setSelectValues((prev) => ({ ...prev, [key]: value }));
  const handleInputChange = (key, value) => setInputValues((prev) => ({ ...prev, [key]: value }));
  
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
    const validKeys = isChecked ? selectedItems.filter((key) => key === activeKey) : [];
  
    return dataForFilter.filter((dataItem) => {
      const isValidKey = validKeys.some((key) => dataItem[key] === 1);

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
  }, [dataForFilter, isChecked, selectedItems, activeKey, selectedScope, validCodes, filterCodes, inputValues, selectValues]);
  
  const [popupNotification, setPopupNotification] = useState(false);
  const handlePopupNotification = (e) => setPopupNotification(e.target.checked);

  return (
    <div>
      {contextHolder}
      <Row className="py-2" key={index}>
        <Checkbox
          checked={isChecked}
          onChange={(e) => {
            handleCheckboxChange(item.key, e.target.checked);
            setActiveKey(item.key);
            if (!item.options) toggleModalSS(e.target.checked);
          }}
        >
          <span className="font-bold">{item.name}</span>
        </Checkbox>
      </Row>

      {/* Option Labels with SelectBox */}
      {item.options && item.optionLabel && (
        <div className="flex font-bold">
          {item.optionLabel.map((label, labelIndex) => (
            <div key={labelIndex} className="flex items-center py-1">
              <div className="w-[16px] h-[16px] mr-2"></div>
              <span className="mr-2">{label}</span>
              <HandleSelectBox
                item={item}
                selectedItems={selectedItems}
                onSettingSignalChange={onSettingSignalChange}
                activeKey={activeKey}
                isChecked={isChecked}
                dataForFilter={dataForFilter}
                watchlists={watchlists}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for Scope Selection */}
      <Modal
        centered
        width={950}
        open={isModalSSOpen}
        onCancel={() => toggleModalSS(false)}
        footer={null}
        className="dialog_setting_signal"
      >
        <div className="h-[380px]">
          {/* Header */}
          <div>
            <div className="text-center font-bold text-xl pb-5">
              Phạm vi áp dụng
            </div>
            {/* Scope Categories */}
            <div className="py-1">
              <div className="text-[#0D4381] text-base font-semibold pb-1">
                Danh mục
              </div>
              <div className="shadowInner bg-[#D9D9D980]/50 grid grid-cols-4 p-3">
                {hashTbScope.map(({ key, name }, idx) => (
                  <Row className="py-2" key={idx}>
                    <Checkbox
                      onChange={(e) => handleCheckboxChangeScope(key, e.target.checked)}
                      disabled={selectedScope.includes("ALL") && key !== "ALL"}
                    >
                      <span className="font-bold">{name}</span>
                    </Checkbox>
                  </Row>
                ))}
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
                            onChange={(e) => handleSelectChange(item.key, e.target.value)}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                      >
                        <path
                          d="M7 0C6.63775 0 6.27113 0.201691 6.15213 0.628954L5.85199 1.75H2.625C1.17513 1.75 0 2.92522 0 4.375V10.5C0 11.9499 1.17513 13.125 2.625 13.125H2.67926L1.77713 16.3791C1.64763 16.8446 1.91362 17.3434 2.37912 17.4729C2.84462 17.6024 3.34337 17.3364 3.47287 16.8709L4.5115 13.125H6.125V15.75C6.125 16.233 6.517 16.625 7 16.625C7.483 16.625 7.875 16.233 7.875 15.75V13.125H9.48849L10.5271 16.8709C10.6566 17.3364 11.1554 17.6024 11.6209 17.4729C12.0864 17.3434 12.3524 16.8446 12.2229 16.3791L11.3207 13.125H11.375C12.8249 13.125 14 11.9499 14 10.5V4.375C14 2.92522 12.8249 1.75 11.375 1.75H8.14801L7.84787 0.628954C7.72887 0.201691 7.36225 0 7 0ZM2.625 3.5H11.375C11.858 3.5 12.25 3.89174 12.25 4.375V10.5C12.25 10.983 11.858 11.375 11.375 11.375H7H2.625C2.142 11.375 1.75 10.983 1.75 10.5V4.375C1.75 3.89174 2.142 3.5 2.625 3.5Z"
                          fill="#2A343D"
                        />
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
          {watchlists?.length > 0 ? (
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
    </div>
  );
};

export default HandleSettingScope;
