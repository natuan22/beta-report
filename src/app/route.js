import Home from "../Home";
import ReportAfternoon from "../report/ReportAfternoon";
import WeekNews from "../week/WeekNews";

export const routes = [
    { path: "/", component: Home },
    // navigation page
    { path: "/ban-tin-chieu", component: ReportAfternoon },
    { path: "/ban-tin-tuan", component: WeekNews },
];