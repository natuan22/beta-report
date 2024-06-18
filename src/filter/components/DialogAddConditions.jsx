import Button from "@mui/material/Button";
import { Checkbox, Modal, Row, message } from "antd";
import React, { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { MdFormatListNumbered } from "react-icons/md";
import "../components/styles/dialogAddStyle.css";
import { hashTbStockFilter } from "../utils/hashTb";

const DialogAddConditions = ({ selectedItems, handleCheckboxChange }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(
    Object.keys(hashTbStockFilter).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const hideAll = () => {
    const allCollapsedTrue = Object.keys(collapsed).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});

    setCollapsed(allCollapsedTrue);
  };

  const showAll = () => {
    const allCollapsedTrue = Object.keys(collapsed).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});

    setCollapsed(allCollapsedTrue);
  };

  const toggleCollapse = (key) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <Button variant="contained" onClick={showModalAdd}>
        <FaSearchPlus className="w-[25px] h-[25px]" />
        <span className="normal-case pl-1 text-[14px] font-semibold">
          Thêm điều kiện
        </span>
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
        <div className="h-[850px]">
          <div className="flex justify-around">
            <h2 className="m-0 sticky top-0 w-full z-10 text-black pb-2">
              Thêm điều kiện vào bộ lọc
            </h2>
            <div className="flex items-center justify-between w-[330px] mr-14">
              <div
                className="flex items-center text-[14px] font-semibold text-white bg-[#0D4381] px-4 py-1 w-fit rounded-2xl cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl hover:bg-[#0b3c74]"
                onClick={hideAll}
              >
                <FiPlusCircle className="w-[20px] h-[20px] mr-1 text-[#EAD308]" />
                Rút gọn
              </div>
              <div
                className="flex items-center text-[14px] font-semibold text-white bg-[#0D4381] px-4 py-1 w-fit rounded-2xl cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl hover:bg-[#0b3c74]"
                onClick={showAll}
              >
                <MdFormatListNumbered className="w-[20px] h-[20px] mr-1 text-[#EAD308]" />
                Hiện tất cả
              </div>
            </div>
          </div>
          <div className="h-[800px] overflow-y-auto">
            {Object.keys(hashTbStockFilter).map((key, index) => {
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
                    <div className="shadowInner bg-[#9DC4FF] grid grid-cols-3 px-6 py-2">
                      {hashTbStockFilter[key].map((item, index) => {
                        const isChecked = selectedItems.includes(item.key);

                        return (
                          <Row className="py-2" key={index}>
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) =>
                                handleCheckboxChange(item.key, e.target.checked)
                              }
                            >
                              <span className="font-bold">{item.name}</span>
                            </Checkbox>
                          </Row>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DialogAddConditions;
