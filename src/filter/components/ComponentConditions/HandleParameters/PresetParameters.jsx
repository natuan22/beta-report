import { Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";

const PresetParameters = ({ filter, data, onFilteredDataChange }) => {
  const [value, setValue] = useState(filter.select[0].value);

  const handleChange = (value) => {
    setValue(value);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      switch (filter.key) {
        case "max_":
          return item.closePrice >= item[filter.key + value];
        case "min_":
          return item.closePrice <= item[filter.key + value];
        case "sma_ngan_han_cat_len_sma_dai_han":
        case "sma_ngan_han_cat_xuong_sma_dai_han":
          return item[filter.key][value] === 1;
        default:
          return item[filter.key + value] === 1;
      }
    });
  }, [data, value]);

  useEffect(() => {
    onFilteredDataChange(filteredData);
  }, [filteredData, onFilteredDataChange]);

  return (
    <div className="input-industry">
      <Select
        value={value}
        style={{
          width: 256,
        }}
        onChange={handleChange}
        options={filter.select}
      />
    </div>
  );
};

export default PresetParameters;
