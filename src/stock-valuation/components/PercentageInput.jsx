import { InputNumber } from "antd";
import React from "react";

const PercentageInput = ({ className, value, onChange, error }) => {
  return (
    <InputNumber
      className={className}
      value={value}
      status={error ? "error" : ""}
      formatter={(value) => {
        // Convert to string and split by decimal point
        const parts = `${value}`.split(".");
        // Add thousand separators (dots) to the integer part
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // Join back with comma for decimal point and add percentage
        return parts.join(",") + "%";
      }}
      parser={(value) => value.replace(/\./g, "").replace(/,/g, ".").replace(/%/g, "")}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.ctrlKey && (e.key === "a" || e.key === "x" || e.key === "c" || e.key === "v")) {
          return;
        }
        if (!((e.key >= "0" && e.key <= "9") || e.key === "Backspace" || e.key === "Tab" || e.key === ",")) {
          e.preventDefault();
        }
      }}
      style={{ background: "#E0DDDDB2" }}
    />
  );
};

export default PercentageInput;
