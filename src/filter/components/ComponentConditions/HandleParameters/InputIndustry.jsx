import { Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { removeDiacritics } from "../../../../helper/removeDiacritics";
import { industriesArray } from "../../../utils/hashTb";
import "../../styles/styleInputIndustry.css";

const InputIndustry = ({ data, onFilteredDataChange }) => {
  const [industry, setIndustry] = useState("Toan bo");

  const filterOption = (input, option) =>
    (option?.value || "").toLowerCase().includes(input.toLowerCase()) ||
    (option?.label || "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    setIndustry(value);
  };

  const filteredData = useMemo(() => {
    if (industry === "Toan bo") {
      return data;
    } else {
      return data.filter((item) => removeDiacritics(item.LV4) === industry);
    }
  }, [industry, data]);

  useEffect(() => {
    onFilteredDataChange(filteredData);
  }, [filteredData, onFilteredDataChange]);

  return (
    <div className="input-industry">
      <Select
        style={{
          width: 256,
          height: 30,
        }}
        defaultValue={industry}
        showSearch
        onChange={onChange}
        filterOption={filterOption}
        options={industriesArray}
      />
    </div>
  );
};

export default InputIndustry;
