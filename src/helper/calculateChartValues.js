const calculateChartValues = (data) => {
  const { neutral, positive, negative } = data;

  const max = positive + negative + neutral;
  const min = -max;
  const step = max / 5;
  const resultArray = [];

  for (let i = 0; i <= 5; i++) {
    const currentValue = parseFloat((min + step * 2 * i).toFixed(2));
    resultArray.push(currentValue);
  }

  return resultArray;
};

export default calculateChartValues;
