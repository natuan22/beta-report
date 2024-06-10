import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "../../styles/styleInputText.css";

const OptionalPresetParametersText = ({ filter, data, onFilteredDataChange }) => {
  const [value, setValue] = useState(filter.defaultValue || null);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const filteredData = useMemo(
    () =>
      data.filter((item) => item[filter.key][value?.toLocaleLowerCase()] === 1),
    [data, value]
  );

  useEffect(() => {
    onFilteredDataChange(filteredData);
  }, [filteredData, onFilteredDataChange]);

  return (
    <div>
      <Input
        value={value}
        className="parameter"
        status={value !== null ? "" : "error"}
        onChange={onChange}
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
  );
};

export default OptionalPresetParametersText;
