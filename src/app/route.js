import Home from "../Home";
import AdminBlogs from "../admin-blogs/AdminBlogs";
import AddPost from "../admin-blogs/components/Post/AddPost";
import EditPost from "../admin-blogs/components/Post/EditPost";
import PreviewPost from "../admin-blogs/components/Post/PreviewPost";
import Categories from "../admin-blogs/partials/blogs/Categories";
import Posts from "../admin-blogs/partials/blogs/Posts";
import AnalysisReport from "../analysisReport/AnalysisReport";
import AnalysisReportAutomation from "../analysisReport/AnalysisReportAutomation";
import AnalysisReportBasic from "../analysisReport/AnalysisReportBasic";
import BetaSmart from "../betaSmart/BetaSmart";
import BuySellActive from "../buySellActive/BuySellActive";
import Filter from "../filter/Filter";
import HistoricalPEPB from "../historicalPEPB/HistoricalPEPB";
import ReportAfternoon from "../report/ReportAfternoon";
import SignalWarning from "../signal-warning/SignalWarning";
import TradingStrategies from "../tradingStrategies/TradingStrategies";
import TradingTool from "../tradingTool/TradingTool";
import WatchList from "../watchlist/WatchList";
import WeekNews from "../week/WeekNews";

export const routes = [
  // Bản tin
  { path: "/", title: 'Bản tin sáng', component: Home, role: process.env.REACT_APP_BASE_USER },
  { path: "/ban-tin-chieu", title: 'Bản tin chiều', component: ReportAfternoon, role: process.env.REACT_APP_BASE_USER },
  { path: "/ban-tin-tuan", title: 'Bản tin tuần', component: WeekNews, role: process.env.REACT_APP_BASE_USER },

  // Phân tích
  { path: "/phan-tich-ky-thuat/:code", title: 'Phân tích kỹ thuật', component: AnalysisReport, role: process.env.REACT_APP_ADMIN },
  { path: "/phan-tich-ky-thuat-tu-dong/:code", title: 'Phân tích kỹ thuật tự động', component: AnalysisReportAutomation, role: process.env.REACT_APP_BASE_USER },
  { path: "/phan-tich-co-ban", title: 'Phân tích cơ bản', component: AnalysisReportBasic, role: process.env.REACT_APP_BASE_USER },

  // Công cụ đầu tư
  { path: "/danh-muc-theo-doi", title: 'Danh mục theo dõi', component: WatchList, role: process.env.REACT_APP_BASE_USER },
  { path: "/bo-loc", title: 'Bộ lọc', component: Filter, role: process.env.REACT_APP_BASE_USER },
  { path: "/canh-bao-tin-hieu", title: 'Cảnh báo tín hiệu', component: SignalWarning, role: process.env.REACT_APP_BASE_USER },
  { path: "/chien-luoc-giao-dich", title: 'Chiến lược giao dịch', component: TradingStrategies, role: process.env.REACT_APP_BASE_USER },
  { path: "/beta-smart", title: 'BETA SMART', component: BetaSmart, role: process.env.REACT_APP_PREMIUM_USER },
  { path: "/trading-tool", title: 'Trading Tool', component: TradingTool, role: process.env.REACT_APP_PREMIUM_USER },
  { path: "/historical-pe-pb", title: 'Lịch sử P/E P/B', component: HistoricalPEPB, role: process.env.REACT_APP_BASE_USER, requiresLogin: true },
  { path: "/mua-ban-chu-dong", title: 'Mua bán chủ động', component: BuySellActive, role: process.env.REACT_APP_BASE_USER, requiresLogin: true },
];

// Admin Blogs
export const adminBlogsRoutes = [
  {
    path: "/admin-blogs/*", title: 'Admin Blogs', component: AdminBlogs, role: process.env.REACT_APP_ADMIN_BLOGS,
    children: [
      { path: "danh-muc", title: 'Admin Blogs - Danh mục', component: Categories, role: process.env.REACT_APP_ADMIN_BLOGS },
      { path: "bai-viet", title: 'Admin Blogs - Bài viết', component: Posts, role: process.env.REACT_APP_ADMIN_BLOGS,
        children: [
          { path: "bai-viet/add", title: 'Admin Blogs - Thêm bài viết', component: AddPost, role: process.env.REACT_APP_ADMIN_BLOGS },
          { path: "bai-viet/edit/:id", title: 'Admin Blogs - Chỉnh sửa bài viết', component: EditPost, role: process.env.REACT_APP_ADMIN_BLOGS },
          { path: "bai-viet/preview/:titlePost/:idPost", title: 'Xem trước bài viết', component: PreviewPost, role: process.env.REACT_APP_ADMIN_BLOGS }
        ]
      },
    ],
  },
];
