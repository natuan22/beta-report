import { Select, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "../../styles/styleInputIndustry.css";

const WatchlistParameters = ({ isLogin, watchlists, data, onFilteredDataChange }) => {
  const [value, setValue] = useState();
  const [selectedWatchList, setSelectedWatchList] = useState();

  const options = useMemo(() => {
    return watchlists?.map((watchlist) => ({
      value: watchlist.id,
      label: watchlist.name,
    }));
  }, [watchlists]);

  const filterOption = (input, option) =>
    (option?.value || "").toLowerCase().includes(input.toLowerCase()) ||
    (option?.label || "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (value) {
      const selected = watchlists.find((item) => item.id === value);
      setSelectedWatchList(selected);
    }
  }, [value, watchlists]);

  const filteredData = useMemo(
    () => data?.filter((item) => selectedWatchList?.code.includes(item.code)),
    [data, selectedWatchList]
  );

  useEffect(() => {
    onFilteredDataChange(filteredData);
  }, [filteredData, onFilteredDataChange]);

  return (
    <div className="input-watchlist">
      <Tooltip
        placement="bottom"
        title={<span className="">Đăng nhập để chọn watchlist</span>}
        color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
      >
        <Select
          disabled={isLogin !== "7MEvU"}
          style={{
            width: 256,
            height: 30,
          }}
          status={value ? "" : "error"}
          showSearch
          onChange={onChange}
          filterOption={filterOption}
          options={options}
        />
      </Tooltip>
    </div>
  );
};

export default WatchlistParameters;
