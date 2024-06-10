import React, { useEffect, useState, useMemo } from "react";
import "../../styles/styleBtnFloor.css";

const InputFloor = ({ data, onFilteredDataChange }) => {
  const [activeBtnExchange, setActiveBtnExchange] = useState([
    "HOSE",
    "HNX",
    "UPCOM",
  ]);

  const handleButtonClick = (floor) => {
    setActiveBtnExchange(
      (prevActive) =>
        prevActive.includes(floor)
          ? prevActive.filter((item) => item !== floor) // Remove if already active
          : [...prevActive, floor] // Add if not active
    );
  };

  const filteredData = useMemo(
    () => data?.filter((item) => activeBtnExchange.includes(item.floor)),
    [data, activeBtnExchange]
  );

  useEffect(() => {
    onFilteredDataChange(filteredData);
  }, [filteredData, onFilteredDataChange]);

  return (
    <div className="flex w-[256px] justify-around">
      <button
        className={`custom-btn ${
          activeBtnExchange.includes("HOSE") ? "active-btn" : "btn-2"
        }`}
        onClick={() => handleButtonClick("HOSE")}
      >
        HSX
      </button>
      <button
        className={`custom-btn ${
          activeBtnExchange.includes("HNX") ? "active-btn" : "btn-2"
        }`}
        onClick={() => handleButtonClick("HNX")}
      >
        HNX
      </button>
      <button
        className={`custom-btn ${
          activeBtnExchange.includes("UPCOM") ? "active-btn" : "btn-2"
        }`}
        onClick={() => handleButtonClick("UPCOM")}
      >
        UPCOM
      </button>
    </div>
  );
};

export default InputFloor;
