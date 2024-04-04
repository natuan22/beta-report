const formatNumberCurrency = (number) => {
    if(number === null) return null
    const strNumber = number.toFixed(2);

    // Tách phần âm, phần nguyên và phần thập phân
    const isNegative = strNumber.startsWith("-");
    const absoluteValue = isNegative ? strNumber.slice(1) : strNumber;
    const [integerPart, decimalPart] = absoluteValue.includes('.') ? absoluteValue.split('.') : [absoluteValue, null];

    // Định dạng phần nguyên bằng cách thêm dấu chấm sau mỗi ba chữ số từ cuối lên đầu
    const formattedIntegerPart = integerPart.length > 3 ?
        integerPart.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\.|\.($|\.)|,$/g, '') :
        integerPart;

    // Nếu có phần thập phân, thì kết hợp phần nguyên và phần thập phân
    let formattedNumber;
    if (decimalPart !== null && Math.abs(number) < 1000) {
        formattedNumber = `${isNegative ? '-' : ''}${formattedIntegerPart},${decimalPart.padEnd(2, '0')}`;
    } else {
        const numberRound = Math.round(number).toString()
        const numberRoundFormattedIntegerPart = numberRound.length > 3 ?
        numberRound.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\.|\.($|\.)|,$/g, '') :
        numberRound;
        formattedNumber = `${isNegative ? '-' : ''}${numberRoundFormattedIntegerPart}`;
    }

    return formattedNumber;
}


export default formatNumberCurrency