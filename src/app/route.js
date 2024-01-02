import Home from "../Home";
import ReportAfternoon from "../report/ReportAfternoon";
import Page1 from "../utils/Page1";
import Page2 from "../utils/Page2";
import Page3 from "../utils/Page3";
import Page4 from "../utils/Page4";
import Page5 from "../utils/Page5";
import WeekNews from "../week/WeekNews";

export const routes = [
    { path: "/", component: Home },
    // navigation page
    { path: "/page1", component: Page1 },
    { path: "/page2", component: Page2 },
    { path: "/page3", component: Page3 },
    { path: "/page4", component: Page4 },
    { path: "/page5", component: Page5 },
    { path: "/ban-tin-chieu", component: ReportAfternoon },
    { path: "/ban-tin-tuan", component: WeekNews },
];