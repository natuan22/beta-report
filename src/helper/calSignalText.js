import calculateChartValues from "./calculateChartValues";

const calSignalText = (data) => {
  const arrValues = calculateChartValues(data);
  const { positive, negative } = data;
  const value = positive + -negative;
  let text = "";

  switch (true) {
    case value >= arrValues[0] && value <= arrValues[1]:
      text = "Rất tiêu cực";
      break;
    case value >= arrValues[1] && value <= arrValues[2]:
      text = "Tiêu cực";
      break;
    case value >= arrValues[2] && value <= arrValues[3]:
      text = "Trung lập";
      break;
    case value >= arrValues[3] && value <= arrValues[4]:
      text = "Tích cực";
      break;
    case value >= arrValues[4] && value <= arrValues[5]:
      text = "Rất tích cực";
      break;
    default:
      text = "Không xác định";
  }
  return text;
};

export default calSignalText;
