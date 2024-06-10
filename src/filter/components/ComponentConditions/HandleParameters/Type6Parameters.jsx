import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { arraysAreEqual } from "../../../../helper/arrAreEqual";

const Type6Parameters = ({ filter, selectCondition, data, onFilteredDataChange, selectParameters }) => {
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeFrom = (event) => {
    setValueFrom(event.target.value);
  };

  const handleChangeTo = (event) => {
    setValueTo(event.target.value);
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
        (item) =>
          item[filter.key] >= valueFrom &&
          item[filter.key + selectParameters] <= valueTo
      );
    } else if (selectCondition === "bigger" && value !== null) {
      filteredData = data.filter(
        (item) => item[filter.key + selectParameters] > value
      );
    } else if (selectCondition === "less" && value !== null) {
      filteredData = data.filter(
        (item) => item[filter.key + selectParameters] < value
      );
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
  }, [ data, filter.key, selectCondition, value, valueFrom, valueTo, onFilteredDataChange ]);

  return (
    <div>
      {selectCondition === "about" ? (
        <div className="flex justify-between w-[256px] items-center">
          <div>
            <InputNumber
              value={valueFrom}
              className="parameter"
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
            <div className="relative">
              <div className="absolute top-[-31px] left-[80px]">
                <Select
                  value={""}
                  onChange={handleChangeFrom}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "4px 35px 3px 0px !important",
                      marginBottom: "2px",
                      background: "#E6EFF9",
                    },
                    "&:hover .MuiSelect-select": {
                      padding: "4px 35px 3px 0px !important",
                      background: "#d9dfe7",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: 0,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: 0,
                    },
                    "& .MuiPaper-root": {
                      background:
                        "linear-gradient(180deg, #2F6099 0%, #408EE9 0.01%, #E6EFF9 0.02%, #8BC1FF 100%)",
                    },
                  }}
                  IconComponent={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        userSelect: "none",
                        width: "14px",
                        height: "11px",
                        display: "inline-block",
                        flexShrink: "0",
                        position: "absolute",
                        right: "10px",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 14 11"
                      fill="#77B3F8"
                    >
                      <path
                        d="M7 11L0.937822 0.5L13.0622 0.5L7 11Z"
                        fill="%2377B3F8"
                      />
                    </svg>
                  )}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    getcontentanchorel: null,
                    PaperProps: {
                      style: {
                        background:
                          "linear-gradient(180deg, #2F6099 0%, #408EE9 0.01%, #E6EFF9 0.02%, #8BC1FF 100%)",
                        border: "1px solid #0E48DD",
                      },
                    },
                  }}
                >
                  {filter.select.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
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
          <div>
            <InputNumber
              value={valueTo}
              className="parameter"
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
            <div className="relative">
              <div className="absolute top-[-31px] left-[80px]">
                <Select
                  value={""}
                  onChange={handleChangeTo}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "4px 35px 3px 0px !important",
                      marginBottom: "2px",
                      background: "#E6EFF9",
                    },
                    "&:hover .MuiSelect-select": {
                      padding: "4px 35px 3px 0px !important",
                      background: "#d9dfe7",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: 0,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: 0,
                    },
                    "& .MuiPaper-root": {
                      background:
                        "linear-gradient(180deg, #2F6099 0%, #408EE9 0.01%, #E6EFF9 0.02%, #8BC1FF 100%)",
                    },
                  }}
                  IconComponent={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        userSelect: "none",
                        width: "14px",
                        height: "11px",
                        display: "inline-block",
                        flexShrink: "0",
                        position: "absolute",
                        right: "10px",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 14 11"
                      fill="#77B3F8"
                    >
                      <path
                        d="M7 11L0.937822 0.5L13.0622 0.5L7 11Z"
                        fill="%2377B3F8"
                      />
                    </svg>
                  )}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    getcontentanchorel: null,
                    PaperProps: {
                      style: {
                        background:
                          "linear-gradient(180deg, #2F6099 0%, #408EE9 0.01%, #E6EFF9 0.02%, #8BC1FF 100%)",
                        border: "1px solid #0E48DD",
                      },
                    },
                  }}
                >
                  {filter.select.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <InputNumber
            value={value}
            className="parameter"
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
          <div className="relative">
            <div className="absolute top-[-31px] left-[222px]">
              <Select
                value={""}
                onChange={handleChange}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "4px 33px 3px 0px !important",
                    marginBottom: "2px",
                    background: "#E6EFF9",
                  },
                  "&:hover .MuiSelect-select": {
                    padding: "4px 33px 3px 0px !important",
                    background: "#d9dfe7",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: 0,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: 0,
                  },
                  "& .MuiPaper-root": {
                    background:
                      "linear-gradient(180deg, #2F6099 0%, #408EE9 0.01%, #E6EFF9 0.02%, #8BC1FF 100%)",
                  },
                }}
                IconComponent={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: "14px",
                      height: "11px",
                      position: "absolute",
                      right: "10px",
                      pointerEvents: "none",
                    }}
                    viewBox="0 0 14 11"
                    fill="#77B3F8"
                  >
                    <path
                      d="M7 11L0.937822 0.5L13.0622 0.5L7 11Z"
                      fill="%2377B3F8"
                    />
                  </svg>
                )}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  getcontentanchorel: null,
                  PaperProps: {
                    style: {
                      background:
                        "linear-gradient(180deg, #2F6099 0%, #408EE9 0.01%, #E6EFF9 0.02%, #8BC1FF 100%)",
                      border: "1px solid #0E48DD",
                    },
                  },
                }}
              >
                {filter.select.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Type6Parameters;
