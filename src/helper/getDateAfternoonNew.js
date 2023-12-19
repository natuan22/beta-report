import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const getCurrentDate = () => {
    const currentDate = new Date();

    const formattedDate = format(currentDate, "EEEE, 'ngày' d 'tháng' M 'năm' y", { locale: vi });
    return formattedDate;
};

export const currentDate = getCurrentDate();
