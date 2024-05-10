import React from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

export default (params) => {
  return <span>{formatNumberCurrency(params.data.totalVol)}</span>;
};
