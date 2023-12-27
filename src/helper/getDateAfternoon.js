import { format, toDate } from "date-fns";

// ...

const today = new Date();
export const formattedDate = format(today, "yyyyMMdd");

