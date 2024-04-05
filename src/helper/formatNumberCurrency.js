const formatNumberCurrency = (number) => {
    if(number === null) return null
    const strNumber = number.toFixed(2);

    // Tách phần âm, phần nguyên và phần thập phân
    const isNegative = strNumber.startsWith("-");
    const absoluteValue = isNegative ? strNumber.slice(1) : strNumber;
    const [integerPart, decimalPart] = absoluteValue.includes('.') ? absoluteValue.split('.') : [absoluteValue, null];

    // Làm tròn phần nguyên nếu số lớn hơn 1000
    const roundedIntegerPart = Math.abs(number) > 1000 ? Math.round(Math.abs(number)).toString() : integerPart;

    // Định dạng phần nguyên bằng cách thêm dấu chấm sau mỗi ba chữ số từ cuối lên đầu
    const formattedIntegerPart = roundedIntegerPart.length > 3 ?
        roundedIntegerPart.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\.|\.($|\.)|,$/g, '') :
        roundedIntegerPart;

    // Nếu có phần thập phân, thì kết hợp phần nguyên và phần thập phân
    let formattedNumber;
    if (decimalPart !== null && Math.abs(number) < 1000) {
        formattedNumber = `${isNegative ? '-' : ''}${formattedIntegerPart},${decimalPart.padEnd(2, '0')}`;
    } else {
        formattedNumber = `${isNegative ? '-' : ''}${formattedIntegerPart}`;
    }

    return formattedNumber;
}

export default formatNumberCurrency;
