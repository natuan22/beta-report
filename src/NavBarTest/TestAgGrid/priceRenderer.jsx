import React from "react";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

export default (params) => {
  return (
    <span
      className={`text-right ${getColorBaseOnValue(params.data.perChange)}`}
    >
      {formatNumberCurrency(params.data.closePrice * 1000)}
    </span>
  );
};
