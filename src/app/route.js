import Home from "../Home";
import NavBar2 from "../NavBarTest/NavBar2";
import NavBar3 from "../NavBarTest/NavBar3";
import NavBar4 from "../NavBarTest/NavBar4";
import TestAgGrid from "../NavBarTest/TestAgGrid/TestAgGrid";
import AnalysisReport from "../analysisReport/AnalysisReport";
import AnalysisReportAutomation from "../analysisReport/AnalysisReportAutomation";
import AnalysisReportBasic from "../analysisReport/AnalysisReportBasic";
import Filter from "../filter/Filter";
import ReportAfternoon from "../report/ReportAfternoon";
import WatchList from "../watchlist/WatchList";
import WeekNews from "../week/WeekNews";

export const routes = [
  //Bản tin
  { path: "/", component: Home },
  { path: "/ban-tin-chieu", component: ReportAfternoon },
  { path: "/ban-tin-tuan", component: WeekNews },
  //Phân tích
  { path: "/phan-tich-ky-thuat/:code", component: AnalysisReport },
  { path: "/phan-tich-ky-thuat-tu-dong/:code", component: AnalysisReportAutomation },
  { path: "/phan-tich-co-ban", component: AnalysisReportBasic },
  //Công cụ đầu tư
  { path: "/danh-muc-theo-doi", component: WatchList },
  { path: "/bo-loc", component: NavBar2 },
  { path: "/canh-bao-tin-hieu", component: NavBar3 },
  { path: "/chien-luoc-giao-dich", component: NavBar4 },
];
