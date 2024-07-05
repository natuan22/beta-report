import { Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import calSignalText from "../../../../helper/calSignalText";

const FilterSignal = ({ filter, data, onFilteredDataChange }) => {
  const initialSelectValue = filter.select[4] ? filter.select[4].value : filter.select[0].value;
  const [value, setValue] = useState(initialSelectValue);

  const handleChange = (value) => {
    setValue(value);
  };

  const filteredData = useMemo(
    () => data.filter((item) => calSignalText(item[filter.key]) === value),
    [data, value]
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

export default FilterSignal;
