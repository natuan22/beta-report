import Home from "../Home";
import NavBar1 from "../NavBarTest/NavBar1";
import NavBar2 from "../NavBarTest/NavBar2";
import NavBar3 from "../NavBarTest/NavBar3";
import NavBar4 from "../NavBarTest/NavBar4";
import AnalysisReport from "../analysisReport/AnalysisReport";
import AnalysisReportAutomation from "../analysisReport/AnalysisReportAutomation";
import AnalysisReportBasic from "../analysisReport/AnalysisReportBasic";
import ReportAfternoon from "../report/ReportAfternoon";
import WeekNews from "../week/WeekNews";

export const routes = [
    //Bản tin
    { path: "/", component: Home },
    { path: "/ban-tin-chieu", component: ReportAfternoon },
    { path: "/ban-tin-tuan", component: WeekNews },
    //Phân tích
    { path: "/phan-tich-ky-thuat", component: AnalysisReport },
    { path: "/phan-tich-ky-thuat-tu-dong", component: AnalysisReportAutomation },
    { path: "/phan-tich-ky-thuat-co-ban", component: AnalysisReportBasic },
    //Name
    { path: "/bo-loc", component: NavBar1 },
    { path: "/canh-bao-tin-hieu", component: NavBar2 },
    { path: "/danh-muc-theo-doi", component: NavBar3 },
    { path: "/chien-luoc-giao-dich", component: NavBar4 },
]; 