import React from "react";
import InputFloor from "./HandleParameters/InputFloor";
import InputIndustry from "./HandleParameters/InputIndustry";
import OptionalParameter from "./HandleParameters/OptionalParameter";
import OptionalPresetParameters from "./HandleParameters/OptionalPresetParameters";
import OptionalPresetParametersText from "./HandleParameters/OptionalPresetParametersText";
import PresetParameters from "./HandleParameters/PresetParameters";
import WatchlistParameters from "./HandleParameters/WatchlistParameters";
import NoParameters from "./HandleParameters/NoParameters";
import Type6Parameters from "./HandleParameters/Type6Parameters";
import FilterSignal from "./HandleParameters/FilterSignal";
import FilterSignalChange from "./HandleParameters/FilterSignalChange";

const HandleParameters = ({ isLogin, watchlists, data, filter, selectCondition, onFilteredDataChange, selectParameters }) => {
  const renderComponent = (parametersType) => {
    switch (parametersType) {
      case 0:
        return <InputFloor data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 1:
        return <WatchlistParameters isLogin={isLogin} watchlists={watchlists} data={data} onFilteredDataChange={onFilteredDataChange}/>;
      case 2:
        return <InputIndustry data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 3:
        return <OptionalPresetParameters filter={filter} selectCondition={selectCondition} data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 4:
        return <OptionalParameter filter={filter} selectCondition={selectCondition} data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 5:
        return <PresetParameters filter={filter} data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 6:
        return <Type6Parameters filter={filter} selectCondition={selectCondition} data={data} onFilteredDataChange={onFilteredDataChange} selectParameters={selectParameters} />;
      case 7:
        return <OptionalPresetParametersText filter={filter} data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 8:
        return <NoParameters filter={filter} data={data} onFilteredDataChange={onFilteredDataChange} />;
      case 9:
        return <FilterSignal filter={filter} data={data} onFilteredDataChange={onFilteredDataChange}/>;
      case 10:
        return <FilterSignalChange filter={filter} data={data} onFilteredDataChange={onFilteredDataChange}/>;
    }
  };

  return <div>{renderComponent(filter.parametersType)}</div>;
};

export default HandleParameters;
