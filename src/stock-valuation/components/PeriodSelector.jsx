import React from "react";

const PeriodSelector = ({ period, setPeriod }) => {
  return (
    <div className="flex gap-3 items-center justify-end py-[.5px]">
      <span>Trung bình</span>
      {["1", "3", "5"].map((p) => (
        <button
          key={p}
          className={`custom-btn ${period === p ? "active-btn" : "btn-2"}`}
          onClick={() => setPeriod(p)}
        >
          {p}Y
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
