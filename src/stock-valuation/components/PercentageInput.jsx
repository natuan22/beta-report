import { InputNumber } from "antd";
import React from "react";

const PercentageInput = ({ className, value, onChange, error }) => {
  return (
    <InputNumber
      className={className}
      value={value}
      status={error ? "error" : ""}
      formatter={(value) => {
        if (value == null || value === "") return "";
      
        const strValue = String(value);
        const [intPart, decimalPart] = strValue.split(".");
        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
        return decimalPart !== undefined ? `${formattedInt},${decimalPart}%` : `${formattedInt}%`;
      }}
      parser={(value) => {
        if (!value) return "";
      
        // Xóa dấu %, khoảng trắng, giữ dấu âm nếu có
        let cleaned = value.replace(/\s/g, "").replace(/%/g, "");
        const isNegative = cleaned.startsWith("-");

        cleaned = cleaned.replace(/-/g, ""); // Xóa dấu trừ để xử lý số
        // Chuyển về dạng số chấm thập phân chuẩn
        if (cleaned.includes(",") && cleaned.includes(".")) {
          cleaned = cleaned.replace(/\./g, "").replace(",", ".");
        } else if (cleaned.includes(",") && !cleaned.includes(".")) {
          cleaned = cleaned.replace(",", ".");
        }
      
        return isNegative ? `-${cleaned}` : cleaned;
      }}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.ctrlKey && ["a", "x", "c", "v"].includes(e.key.toLowerCase())) {
          return;
        }

        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End", ",", ".", "-"];
        if (!((e.key >= "0" && e.key <= "9") || allowedKeys.includes(e.key))) {
          e.preventDefault();
        }
      }}
      style={{ background: "#E0DDDDB2" }}
    />
  );
};

export default PercentageInput;
