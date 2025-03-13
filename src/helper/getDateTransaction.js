import { format, subDays  } from 'date-fns';
import { vi } from 'date-fns/locale';

const getDateTransaction = () => {
    const currentDate = new Date();
    let dayOfWeek  = currentDate.getDay();

    let transactionDate;
    if (dayOfWeek === 0) {
        // Chủ Nhật → Lấy Thứ Sáu (trừ 2 ngày)
        transactionDate = subDays(currentDate, 2);
    } else if (dayOfWeek === 1) {
        // Thứ Hai → Lấy Thứ Sáu tuần trước (trừ 3 ngày)
        transactionDate = subDays(currentDate, 3);
    } else {
        // Các ngày còn lại → Lấy ngày trước đó (trừ 1 ngày)
        transactionDate = subDays(currentDate, 1);
    }

    const formattedDate = format(transactionDate, "dd.MM.yyyy", { locale: vi });
    return formattedDate;
};

export const currentDateTransaction = getDateTransaction();
