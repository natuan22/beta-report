const calculateChartValues = (data) => {
    const neutral = data.neutral;
    const positive = data.positive;
    const negative = data.negative;

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

  export default calculateChartValues