import { format } from 'date-fns';


const getCurrentDate = () => {
    const currentDate = new Date();

    const formattedDate = format(currentDate, "EEEE, 'ngày' d 'tháng' M 'năm' y");
    return formattedDate;
};


export const currentDate = getCurrentDate();

