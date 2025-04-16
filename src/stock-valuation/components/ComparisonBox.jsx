import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import PercentageInput from "./PercentageInput";

const ComparisonBox = ({ title, price, peValue, pbValue, handlePeChange, handlePbChange, isTotalValid, loading }) => {
  const renderPriceCell = (value, isBlue = false) => (
    <div className={`${isBlue ? "bg-[#0669FC] text-white" : "bg-white"} w-[91px] h-[31px] font-semibold py-1.5 shadow-custom`}>
      {!loading ? (
        formatNumberCurrency(value)
      ) : (
        <Spin indicator={<LoadingOutlined spin style={isBlue ? { color: "white" } : {}} />} />
      )}
    </div>
  );

  return (
    <div className="bg-[#C5D8F5] text-center flex flex-col items-center p-2 shadow-md">
      <span className="inline-flex items-center justify-center rounded-lg border-solid border-2 border-[#0669FC] text-lg font-semibold bg-white px-6">
        {title}
      </span>

      <div className="grid grid-cols-2 gap-4 w-full place-items-center py-1">
        <div className="font-semibold text-[#07439C]">P/E</div>
        <div className="font-semibold text-[#07439C]">P/B</div>

        {renderPriceCell(price?.[0])}
        {renderPriceCell(price?.[1])}
        {renderPriceCell(price?.[2])}
        {renderPriceCell(price?.[3])}
        {renderPriceCell(price?.[4], true)}
        {renderPriceCell(price?.[5], true)}

        <PercentageInput
          className="stock-valuation-2 shadow-custom rounded-none"
          value={peValue}
          onChange={handlePeChange}
          error={!isTotalValid}
        />
        <PercentageInput
          className="stock-valuation-2 shadow-custom rounded-none"
          value={pbValue}
          onChange={handlePbChange}
          error={!isTotalValid}
        />
      </div>
    </div>
  );
};

export default ComparisonBox;
