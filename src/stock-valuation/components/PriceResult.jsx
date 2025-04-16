import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Tooltip } from "antd";
import React from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const makeDifference = (price, closePrice) => {
  const normalizedPrice = price / 1000; // Bỏ dòng này nếu không cần chia 1000
  const difference = normalizedPrice - closePrice;
  const percentage = (difference / closePrice) * 100;

  const isHigher = difference > 0;
  const color = isHigher ? "text-green-500" : "text-red-500";
  const label = isHigher ? "Cao" : "Thấp";
  const formattedPercentage = `${formatNumberCurrency(percentage)}%`;

  return (
    <span>
      <span className={color}>{label}</span>
      <span> hơn giá hiện tại </span>
      <span className={color}>{formattedPercentage}</span>
    </span>
  );
};

const PriceResult = ({ price, closePrice, isTotalValid, loading }) => {
  return (
    <>
      <Tooltip
        title="Tổng tỷ lệ phải bằng 100%"
        open={!isTotalValid}
        placement="bottom"
        color="#ff4d4f"
      >
        <div className={`${!isTotalValid ? "border-[#ff4d4f] text-white" : "border-[#0669FC] text-[#0669FC]"} mx-3 border-2 border-solid bg-white text-center font-bold text-3xl shadow-custom transition-all`}>
          {!loading ? (
            formatNumberCurrency(price)
          ) : (
            <Spin indicator={<LoadingOutlined spin />} />
          )}
        </div>
      </Tooltip>
      <div className={`${!isTotalValid ? "opacity-0" : ""} p-3 text-center font-bold text-xl transition-all`}>
        {!loading ? (
          makeDifference(price, closePrice)
        ) : (
          <Spin indicator={<LoadingOutlined spin />} />
        )}
      </div>
    </>
  );
};

export default PriceResult;
