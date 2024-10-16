import Home from "../Home";
import NavBar3 from "../NavBarTest/NavBar3";
import AnalysisReport from "../analysisReport/AnalysisReport";
import AnalysisReportAutomation from "../analysisReport/AnalysisReportAutomation";
import AnalysisReportBasic from "../analysisReport/AnalysisReportBasic";
import BetaSmart from "../betaSmart/BetaSmart";
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
  { path: "/", component: Home, role: process.env.REACT_APP_BASE_USER },
  { path: "/ban-tin-chieu", component: ReportAfternoon, role: process.env.REACT_APP_BASE_USER },
  { path: "/ban-tin-tuan", component: WeekNews, role: process.env.REACT_APP_BASE_USER },

  // Phân tích
  { path: "/phan-tich-ky-thuat/:code", component: AnalysisReport, role: process.env.REACT_APP_ADMIN },
  { path: "/phan-tich-ky-thuat-tu-dong/:code", component: AnalysisReportAutomation, role: process.env.REACT_APP_BASE_USER },
  { path: "/phan-tich-co-ban", component: AnalysisReportBasic, role: process.env.REACT_APP_BASE_USER },

  // Công cụ đầu tư
  { path: "/danh-muc-theo-doi", component: WatchList, role: process.env.REACT_APP_BASE_USER },
  { path: "/bo-loc", component: Filter, role: process.env.REACT_APP_BASE_USER },
  { path: "/canh-bao-tin-hieu", component: NavBar3, role: process.env.REACT_APP_BASE_USER },
  { path: "/chien-luoc-giao-dich", component: TradingStrategies, role: process.env.REACT_APP_BASE_USER },
  { path: "/beta-smart", component: BetaSmart, role: process.env.REACT_APP_ADMIN },
  { path: "/trading-tool", component: TradingTool, role: process.env.REACT_APP_ADMIN },
  { path: "/historical-pe-pb", component: HistoricalPEPB, role: process.env.REACT_APP_BASE_USER, requiresLogin: true },
  { path: "/mua-ban-chu-dong", component: BuySellActive, role: process.env.REACT_APP_BASE_USER, requiresLogin: true },
];
