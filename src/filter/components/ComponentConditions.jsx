import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import HandleParameters from "./ComponentConditions/HandleParameters";
import SelectCondition from "./ComponentConditions/SelectCondition";
import SelectParameters from "./ComponentConditions/HandleParameters/SelectParameters";

const ComponentConditions = ({ watchlists, data, isLogin, itemKey, filter, handleDelKey, handleFilterData, onHandleSelectParameters, filteredData: initialFilteredData }) => {
  const [selectCondition, setSelectCondition] = useState(filter.defaultConditions || "bigger");
  const [selectParameters, setSelectParameters] = useState("5d");
  const [filteredData, setFilteredData] = useState(initialFilteredData);

  const handleFilteredDataChange = (newFilteredData) => {
    setFilteredData(newFilteredData);
    handleFilterData(itemKey, newFilteredData);
  };

  const handleSelectParameters = (value) => {
    setSelectParameters(value);
  };

  useEffect(() => {
    setFilteredData(initialFilteredData);
  }, [initialFilteredData]);

  useEffect(() => {
    onHandleSelectParameters(selectParameters);
  }, [selectParameters, onHandleSelectParameters]);

  return (
    <div className="grid grid-cols-12 h-[40px] px-[10px] content-center">
      <div
        className={`text-[#0D4381] flex flex-col justify-center font-bold text-[16px] ${
          filter.parametersType === 6 && filter.selectCondition
            ? "col-span-2"
            : "col-span-4"
        }`}
      >
        {filter.name}
      </div>

      {filter.parametersType === 6 && filter.selectCondition && (
        <div className="col-span-2 flex flex-col justify-center items-center">
          <SelectParameters
            filter={filter}
            handleSelectParameters={handleSelectParameters}
          />
        </div>
      )}

      <div className="col-span-2 flex flex-col justify-center items-center">
        {filter.selectCondition ? (
          <SelectCondition
            selectCondition={selectCondition}
            setSelectCondition={setSelectCondition}
          />
        ) : filter.parametersType === 6 && filter.selectCondition === false ? (
          <SelectParameters
            filter={filter}
            handleSelectParameters={handleSelectParameters}
          />
        ) : (
          <div></div>
        )}
      </div>

      <div className="col-span-3 flex flex-col justify-center items-center">
        <HandleParameters
          selectParameters={selectParameters}
          watchlists={watchlists}
          onFilteredDataChange={handleFilteredDataChange}
          data={data}
          isLogin={isLogin}
          filter={filter}
          selectCondition={selectCondition}
        />
      </div>

      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="rounded-[6px] border border-solid border-[#0D4381] bg-[#E6EFF9] w-[151px] h-[30px] flex flex-col justify-center">
          <div className="text-[#0D4381] text-right px-[18px]">
            {filteredData?.length === 0
              ? 0
              : filteredData?.length.toLocaleString("vi-VN") || 0}{" "}
            mã
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center col-span-1">
        <IoIosCloseCircle
          className="text-[#bdcbdb] w-[30px] h-[30px] cursor-pointer hover:text-red-500"
          onClick={() => handleDelKey(itemKey)}
        />
      </div>
    </div>
  );
};

export default ComponentConditions;
