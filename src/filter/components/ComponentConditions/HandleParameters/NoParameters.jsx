import React, { useEffect, useMemo } from "react";

const NoParameters = ({ filter, data, onFilteredDataChange }) => {
  const filteredData = useMemo(
    () => data.filter((item) => item[filter.key] === 1),
    [data]
  );

  useEffect(() => {
    onFilteredDataChange(filteredData);
  }, [filteredData, onFilteredDataChange]);
  
  return <div></div>;
};

export default NoParameters;
