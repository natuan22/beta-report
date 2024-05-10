import React from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

export default (params) => {
  return <span>{formatNumberCurrency(params.data.totalVal / 1000000000)}</span>;
};
