import React from "react";
import PriceResult from "./PriceResult";

const ValuationSection = ({ title, children, price, closePrice, isTotalValid, loading }) => {
  return (
    <div className="w-[calc(75%/2)] flex flex-col">
      <div className="text-[#07439C] text-lg font-bold text-center border-2 border-solid rounded-md border-[#FD9A10]">
        {title}
      </div>
      <div className="bg-[#D5F5DB99] mt-3 rounded-md shadow-custom flex-1 flex flex-col">
        {children}
        <PriceResult
          price={price}
          closePrice={closePrice}
          isTotalValid={isTotalValid}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ValuationSection;
