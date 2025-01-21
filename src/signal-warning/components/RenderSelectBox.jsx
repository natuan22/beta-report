import { MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";

const RenderSelectBox = ({ itemKey, options, value, onChange }) => {
  const renderIcon = useCallback(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "12px",
          height: "8px",
          position: "absolute",
          right: "10px",
        }}
        viewBox="0 0 14 11"
        fill="#0E48DD"
      >
        <path d="M7 11L0.937822 0.5L13.0622 0.5L7 11Z" />
      </svg>
    ),
    []
  );
  const selectWidth = itemKey === 'liquidityCustom' || itemKey === 'marketCapCustom' ? '215px' : "85px";
  
  return (
    <Select
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiSelect-select": {
          width: selectWidth,
          padding: '4px 20px 4px 10px !important',
          background: "#fff",
          fontWeight: 600,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #FFBA07",
          borderRadius: 0,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #4096ff",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #FFBA07",
        },
      }}
      IconComponent={renderIcon}
      MenuProps={{
        PaperProps: {
          style: { background: "#fff", border: "2px solid #FFBA07" },
        },
      }}
    >
      {options.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RenderSelectBox;
