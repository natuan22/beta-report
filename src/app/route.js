import Home from "../Home";
import NavBar2 from "../NavBarTest/NavBar2";
import NavBar3 from "../NavBarTest/NavBar3";
import AnalysisReport from "../analysisReport/AnalysisReport";
import AnalysisReportAutomation from "../analysisReport/AnalysisReportAutomation";
import AnalysisReportBasic from "../analysisReport/AnalysisReportBasic";
import BuySellActive from "../buySellActive/BuySellActive";
import Filter from "../filter/Filter";
import HistoricalPEPB from "../historicalPEPB/HistoricalPEPB";
import ReportAfternoon from "../report/ReportAfternoon";
import TradingStrategies from "../tradingStrategies/TradingStrategies";
import TradingTool from "../tradingTool/TradingTool";
import WatchList from "../watchlist/WatchList";
import WeekNews from "../week/WeekNews";

export const routes = [
  // Bản tin
  { path: "/", component: Home, role: "V0U1S" },
  { path: "/ban-tin-chieu", component: ReportAfternoon, role: "V0U1S" },
  { path: "/ban-tin-tuan", component: WeekNews, role: "V0U1S" },

  // Phân tích
  { path: "/phan-tich-ky-thuat/:code", component: AnalysisReport, role: "8Z5M8" },
  { path: "/phan-tich-ky-thuat-tu-dong/:code", component: AnalysisReportAutomation, role: "V0U1S" },
  { path: "/phan-tich-co-ban", component: AnalysisReportBasic, role: "V0U1S" },

  // Công cụ đầu tư
  { path: "/danh-muc-theo-doi", component: WatchList, role: "V0U1S" },
  { path: "/bo-loc", component: Filter, role: "V0U1S" },
  { path: "/canh-bao-tin-hieu", component: NavBar3, role: "V0U1S" },
  { path: "/chien-luoc-giao-dich", component: TradingStrategies, role: "V0U1S" },
  { path: "/beta-smart", component: NavBar2, role: "V0U1S" },
  { path: "/trading-tool", component: TradingTool, role: "8Z5M8" },
  { path: "/historical-pe-pb", component: HistoricalPEPB, role: "V0U1S", requiresLogin: true },
  { path: "/mua-ban-chu-dong", component: BuySellActive, role: "V0U1S", requiresLogin: true },
];
