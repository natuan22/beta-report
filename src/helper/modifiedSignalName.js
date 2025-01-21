import { hashTbSignalWarning, specificKeys } from "../signal-warning/utils/hashTb";

export const getSignalNameByKey = (key) => {
  for (const group in hashTbSignalWarning) {
    const signals = hashTbSignalWarning[group];
    for (const signal of signals) {
      if (signal.key === key) {
        return signal.name;
      }
    }
  }
  return null;
};

export const getModifiedSignalName = (key, value) => {
  const name = getSignalNameByKey(key);
  if (!name) return null;

  const parts = name.split(" ");
  const smaLabel = parts[3] + " " + parts[4];
  const shortSmaValue = value.split("_")[0].replace(/(ma|ema)/, "");
  const longSmaValue = value.split("_")[1].replace(/(ma|ema)/, "");

  const modifiedName = `Đường trung bình SMA(${shortSmaValue}) ${smaLabel} SMA(${longSmaValue})`;

  return modifiedName;
};

export const getModifiedSignalNameRsiOrMA = (key, value) => {
  const name = getSignalNameByKey(key);
  if (!name) return null;

  const isRsi = specificKeys.includes(key);
  const shortSmaValue = isRsi ? ` (${value === 70 || value === 80 ? "Trên" : "Dưới"} ${value})` : `(${value.split("_")[0].replace(/(ma|ema)/, "")})`;

  const modifiedName = `${name}${shortSmaValue}`;
  return modifiedName;
};