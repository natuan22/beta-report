import React, { useEffect, useState } from "react";
import { Select } from "antd";

const SelectParameters = ({ filter, handleSelectParameters }) => {
  const [value, setValue] = useState(filter.select1[0].value);

  const handleChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    handleSelectParameters(value);
  }, [value]);

  return (
    <div className="input-industry">
      <Select
        value={value}
        style={{
          width: 150,
          height: 30,
        }}
        onChange={handleChange}
        options={filter.select1}
      />
    </div>
  );
};

export default SelectParameters;
