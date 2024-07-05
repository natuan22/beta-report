import { Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";

const compareValue = {
  "Rất tiêu cực sang tiêu cực": 0,
  "Tiêu cực sang trung lập": 1,
  "Trung lập sang Tích cực": 2,
  "Tích cực sang rất tích cực": 3,
  "Rất tích cực sang tích cực": 4,
  "Tích cực sang trung lập": 5,
  "Trung lập sang tiêu cực": 6,
  "Tiêu cực về rất tiêu cực": 7,
  "Không chuyển trạng thái": 8,
};

const FilterSignalChange = ({ filter, data, onFilteredDataChange }) => {
  const initialSelectValue = filter.select[4] ? filter.select[4].value : filter.select[0].value;
  const [value, setValue] = useState(initialSelectValue);

  const handleChange = (value) => {
    setValue(value);
  };

  const filteredData = useMemo(
    () => data.filter((item) => item[filter.key] === compareValue[value]),
    [data, value, filter.key]
  );

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

export default FilterSignalChange;
