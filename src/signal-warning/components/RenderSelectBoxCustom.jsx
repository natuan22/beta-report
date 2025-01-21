import { MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";

const RenderSelectBoxCustom = ({ options, value, onChange }) => {
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

  return (
    <Select
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiSelect-select": {
          padding: "2px 20px 6px 10px !important",
          background: "#fff",
          fontWeight: 600,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #FFBA07",
          borderLeft: 0,
          borderRadius: 0,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #FFBA07",
          borderLeft: 0,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #FFBA07",
          borderLeft: 0,
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

export default RenderSelectBoxCustom;
