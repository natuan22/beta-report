import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "../../styles/styleInputParameter.css";
import { arraysAreEqual } from "../../../../helper/arrAreEqual";

const OptionalParameter = ({ filter, selectCondition, data, onFilteredDataChange }) => {
  const [value, setValue] = useState(null);
  const [valueFrom, setValueFrom] = useState(null);
  const [valueTo, setValueTo] = useState(null);
  const [previousFilteredData, setPreviousFilteredData] = useState([]);

  const onChange = (value) => {
    setValue(value);
  };

  const onChangeValueFrom = (value) => {
    setValueFrom(value);
  };

  const onChangeTo = (value) => {
    setValueTo(value);
  };

  useEffect(() => {
    // Reset values when selectCondition changes
    setValue(null);
    setValueFrom(null);
    setValueTo(null);
  }, [selectCondition]);

  useEffect(() => {
    let filteredData = [];
    if (selectCondition === "about" && valueFrom !== null && valueTo !== null) {
      filteredData = data.filter(
        (item) => item[filter.key] >= valueFrom && item[filter.key] <= valueTo
      );
    } else if (selectCondition === "bigger" && value !== null) {
      filteredData = data.filter((item) => item[filter.key] > value);
    } else if (selectCondition === "less" && value !== null) {
      filteredData = data.filter((item) => item[filter.key] < value);
    } else {
      if (previousFilteredData.length !== 0) {
        onFilteredDataChange([]);
        setPreviousFilteredData([]);
      }
      return;
    }
    // Check if the filteredData has changed before updating the state
    if (!arraysAreEqual(filteredData, previousFilteredData)) {
      onFilteredDataChange(filteredData);
      setPreviousFilteredData(filteredData);
    }
  }, [data, filter.key, selectCondition, value, valueFrom, valueTo, onFilteredDataChange]);

  return (
    <div>
      {selectCondition === "about" ? (
        <div className="flex justify-between w-[256px] items-center">
          <InputNumber
            className="parameter"
            value={valueFrom}
            status={valueFrom !== null ? "" : "error"}
            onChange={onChangeValueFrom}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onKeyDown={(e) => {
              if (
                (e.ctrlKey &&
                  (e.key === "a" ||
                    e.key === "x" ||
                    e.key === "c" ||
                    e.key === "v")) ||
                e.key === "."
              ) {
                return;
              }
              if (
                !(
                  (e.key >= "0" && e.key <= "9") ||
                  e.key === "Backspace" ||
                  e.key === "Tab"
                )
              ) {
                e.preventDefault();
              }
            }}
            style={{
              width: 116,
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
          >
            <path
              d="M13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289L7.34315 0.928932C6.95262 0.538408 6.31946 0.538408 5.92893 0.928932C5.53841 1.31946 5.53841 1.95262 5.92893 2.34315L11.5858 8L5.92893 13.6569C5.53841 14.0474 5.53841 14.6805 5.92893 15.0711C6.31946 15.4616 6.95262 15.4616 7.34315 15.0711L13.7071 8.70711ZM0 9H13V7H0V9Z"
              fill="#073882"
            />
          </svg>
          <InputNumber
            className="parameter"
            value={valueTo}
            status={valueTo !== null ? "" : "error"}
            onChange={onChangeTo}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onKeyDown={(e) => {
              if (
                (e.ctrlKey &&
                  (e.key === "a" ||
                    e.key === "x" ||
                    e.key === "c" ||
                    e.key === "v")) ||
                e.key === "."
              ) {
                return;
              }
              if (
                !(
                  (e.key >= "0" && e.key <= "9") ||
                  e.key === "Backspace" ||
                  e.key === "Tab"
                )
              ) {
                e.preventDefault();
              }
            }}
            style={{
              width: 116,
            }}
          />
        </div>
      ) : (
        <InputNumber
          className="parameter"
          value={value}
          status={value !== null ? "" : "error"}
          onChange={onChange}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onKeyDown={(e) => {
            if (
              (e.ctrlKey &&
                (e.key === "a" ||
                  e.key === "x" ||
                  e.key === "c" ||
                  e.key === "v")) ||
              e.key === "."
            ) {
              return;
            }
            if (
              !(
                (e.key >= "0" && e.key <= "9") ||
                e.key === "Backspace" ||
                e.key === "Tab"
              )
            ) {
              e.preventDefault();
            }
          }}
          style={{
            width: 256,
          }}
        />
      )}
    </div>
  );
};

export default OptionalParameter;
