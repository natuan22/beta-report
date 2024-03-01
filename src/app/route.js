import Home from "../Home";
import AnalysisReport from "../analysisReport/AnalysisReport";
import ReportAfternoon from "../report/ReportAfternoon";
import WeekNews from "../week/WeekNews";

export const routes = [
    { path: "/", component: Home },
    // navigation page
    { path: "/ban-tin-chieu", component: ReportAfternoon },
    { path: "/ban-tin-tuan", component: WeekNews },
    { path: "/phan-tich-ky-thuat", component: AnalysisReport },
]; 