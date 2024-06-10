import { Select } from "antd";
import React, { useState } from "react";
import "../styles/styleSelectCondition.css";

const { Option } = Select;

const items = [
  {
    value: "bigger",
    label: "Lớn hơn",
  },
  {
    value: "less",
    label: "Nhỏ hơn",
  },
  {
    value: "about",
    label: "Trong khoảng",
  },
];

const selectedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="9"
    viewBox="0 0 11 9"
    fill="none"
  >
    <path d="M1 4.5L4.52174 7L10 1" stroke="#0D4381" strokeWidth="2" />
  </svg>
);

const SelectCondition = ({ selectCondition, setSelectCondition }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleChange = (value) => {
    setSelectCondition(value);
    setDropdownVisible(false);
  };

  return (
    <div className="select-condition">
      <Select
        value={selectCondition}
        style={{
          width: 150,
          height: 30,
        }}
        onChange={handleChange}
        open={dropdownVisible}
        onDropdownVisibleChange={setDropdownVisible}
        dropdownRender={() => (
          <div>
            {items.map((item) => (
              <div
                key={item.value}
                className="custom-select-item"
                onClick={() => {
                  handleChange(item.value);
                }}
              >
                <div className="w-[85.5px]">{item.label}</div>
                {selectCondition === item.value ? (
                  <div className="selected-icon"> {selectedIcon}</div>
                ) : (
                  <div className="w-[11px] h-[17px] ml-[8px]"></div>
                )}
              </div>
            ))}
          </div>
        )}
      >
        {items.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectCondition;
