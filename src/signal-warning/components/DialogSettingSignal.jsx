import { Button } from "@mui/material";
import { Modal, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { hashTbSignalWarning } from "../utils/hashTb";
import HandleSettingScope from "./HandleSettingScope";
import { postApi } from "../../helper/postApi";

const DialogSettingSignal = ({ loading, type, dataForFilter, watchlists, fetchDataSignalWarnings }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [settingSignal, setSettingSignal] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [collapsed, setCollapsed] = useState(
    Object.keys(hashTbSignalWarning).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const styleBtn = (type) => {
    if (type === 1) {
      return {
        borderRadius: "15px",
        width: "335px",
        height: "52px",
        fontWeight: 600,
        backgroundImage: "linear-gradient(90deg, #0669fcff 0%, #011e49ff 100%)",
        color: "white",
        fontSize: "18px",
      };
    } else {
      return {
        borderRadius: "10px",
        width: "165px",
        height: "40px",
        fontWeight: 700,
        backgroundImage:
          "linear-gradient(90deg, rgba(157, 196, 255, 0.70) 0%, rgba(6, 105, 252, 0.70) 100%)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        color: "black",
        textTransform: "none",
        fontSize: "15px",
        '&:hover': {
          backgroundImage:'linear-gradient(180deg, rgba(157, 196, 255, 0.70) 0%, rgba(6, 105, 252, 0.70) 100%)'
        }
      };
    }
  };

  const warning = (type, text) => { messageApi.open({ type, content: text }) };
  const showModalAdd = () => { setIsModalAddOpen(true) };
  const handleAddOk = () => { setIsModalAddOpen(false) };
  const handleAddCancel = () => { setIsModalAddOpen(false) };

  const toggleCollapse = (key) => {
    setCollapsed((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const handleCheckboxChange = (itemKey, isChecked) => {
    setSelectedItems((prevItems) => {
      if (isChecked) {
        return [...prevItems, itemKey];
      } else {
        return prevItems.filter((item) => item !== itemKey);
      }
    });
  };

  const handleSettingSignal = useCallback((data) => {
    if (selectedItems.includes(data.key)) {
      setSettingSignal((prev) => {
        const previousSignals = Array.isArray(prev) ? prev : [];

        return [
          ...previousSignals,
          {
            key: data.key,
            liquidity: data.valueLiquidity,
            marketCap: data.valueMarketCap,
            scope: data.selectedScope,
            codes: data.codes,
            popupNotification: data.popupNotification,
            ...data.value,
          },
        ];
      });
    }
  }, [selectedItems]);

  // Theo dõi sự thay đổi của selectedItems
  useEffect(() => {
    setSettingSignal((prev) => {
      // Lọc các phần tử có key nằm trong selectedItems
      return prev.filter((signal) => selectedItems.includes(signal.key));
    });
  }, [selectedItems]);

  const saveSettingSignal = async () => {
    if (settingSignal.length > 0) {
      await postApi("/api/v1/signal-warning/save-signal", {
        value: settingSignal,
      });

      fetchDataSignalWarnings();

      warning("success", `Đã thêm các điều kiện cảnh báo thành công`);
      
      setSettingSignal([]);
      setSelectedItems([]);
      setIsModalAddOpen(false);
    } else {
      warning("warning", `Hãy thiết lập các điều kiện cảnh báo`);
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        variant="text"
        color="primary"
        sx={styleBtn(type)}
        onClick={showModalAdd}
        disabled={loading}
      >
        {type === 1 ? (
          <span>Thiết lập cảnh báo</span>
        ) : (
          <span className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.8205 3.65201L13.4445 1.05554H8.55564L8.18071 3.65163C7.59419 3.86277 7.04622 4.1378 6.54846 4.46665L3.7545 3.44949L1.31006 7.10604L3.7267 8.68635C3.68715 8.95274 3.66675 9.22431 3.66675 9.49999C3.66675 9.77567 3.68715 10.0472 3.7267 10.3136L1.31006 11.8939L3.7545 15.5505L6.54846 14.5333C7.04588 14.8619 7.59343 15.1368 8.1795 15.3479L8.55564 17.9444H13.4445L13.8217 15.3475C14.4074 15.1365 14.9546 14.8618 15.4517 14.5333L18.2457 15.5505L20.6901 11.8939L18.2735 10.3136C18.313 10.0472 18.3334 9.77567 18.3334 9.49999C18.3334 9.22431 18.313 8.95274 18.2735 8.68635L20.6901 7.10604L18.2457 3.44949L15.4517 4.46665C14.9542 4.13799 14.4066 3.8631 13.8205 3.65201ZM7.33342 9.49999C7.33342 7.75108 8.97504 6.33332 11.0001 6.33332C13.0251 6.33332 14.6667 7.75108 14.6667 9.49999C14.6667 11.2489 13.0251 12.6667 11.0001 12.6667C8.97504 12.6667 7.33342 11.2489 7.33342 9.49999Z" fill="black"/>
            </svg>
            <span>Thiết lập</span>
          </span>
        )}
      </Button>
      <Modal
        centered
        width={1281}
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={null}
        className="add-conditions"
      >
        <div>
          <div className="flex justify-around">
            <h2 className="m-0 sticky top-0 w-full z-10 pb-2 text-[#FFBA07]">
              Thiết lập điều kiện cảnh báo
            </h2>
          </div>
          <div className="h-[761px] overflow-y-auto">
            {Object.keys(hashTbSignalWarning).map((key, index) => {
              return (
                <div className="px-3 py-1" key={index}>
                  <div
                    className="flex items-center pb-1 cursor-pointer"
                    onClick={() => toggleCollapse(key)}
                  >
                    {collapsed[key] ? (
                      <FiPlusCircle className="w-[20px] h-[20px] mr-1 text-[#EAD308] cursor-pointer" />
                    ) : (
                      <FiMinusCircle className="w-[20px] h-[20px] mr-1 text-[#EAD308] cursor-pointer" />
                    )}
                    <span className="text-[18px] text-white font-semibold">
                      {key}
                    </span>
                  </div>
                  {!collapsed[key] && (
                    <div
                      className={`shadowInner bg-[#9DC4FF] grid grid-cols-9 px-6 py-2`}
                    >
                      {hashTbSignalWarning[key].map((item, index) => {
                        const isChecked = selectedItems.includes(item.key);

                        return (
                          <div className="col-span-3" key={index}>
                            <HandleSettingScope
                              item={item}
                              index={index}
                              isChecked={isChecked}
                              handleCheckboxChange={handleCheckboxChange}
                              selectedItems={selectedItems}
                              onSettingSignalChange={handleSettingSignal}
                              dataForFilter={dataForFilter}
                              watchlists={watchlists}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end pt-2 px-3">
            <Button
              sx={{
                borderRadius: "20px",
                width: "205px",
                height: "40px",
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(90deg, #F9F59C 0%, #FFBA07 100%)",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                color: "black",
                textTransform: "none",
                fontSize: "17px",
              }}
              onClick={saveSettingSignal}
            >
              Thiết lập cảnh báo
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DialogSettingSignal;
