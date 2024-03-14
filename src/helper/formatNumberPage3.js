const formatNumberPage3 = (number) => {

    // Kiểm tra nếu giá trị không phải là số
    if (typeof number !== 'number') {
        console.error('Error: Invalid input. Please provide a number.');
        return null; // hoặc một giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
    }

    // Chuyển số thành chuỗi với hai chữ số thập phân
    const strNumber = number.toString();

    // Tách phần âm, phần nguyên và phần thập phân
    const isNegative = strNumber.startsWith("-");
    const absoluteValue = isNegative ? strNumber.slice(1) : strNumber;
    const [integerPart, decimalPart] = absoluteValue.includes('.') ? absoluteValue.split('.') : [absoluteValue, null];

    // Định dạng phần nguyên bằng cách thêm dấu chấm sau mỗi ba chữ số từ cuối lên đầu
    const formattedIntegerPart = integerPart.length > 3 ?
        integerPart.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\.|\.($|\.)|,$/g, '') :
        integerPart;

    // Nếu có phần thập phân, thì kết hợp phần nguyên và phần thập phân
    const formattedNumber = decimalPart !== null ? `${isNegative ? '-' : ''}${formattedIntegerPart},${decimalPart}` : `${isNegative ? '-' : ''}${formattedIntegerPart}`;

    return formattedNumber;
}


export default formatNumberPage3