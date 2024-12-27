import calSignalText from "../../helper/calSignalText";

export const sheet1Title = [
  "Mã CP",
  "Sàn",
  "Ngành",
  "Thị giá (đồng)",
  "%D",
  "KLGD (CP)",
  "GTGD (tỷ đồng)",
];

export const sheet2Title = [
  "Mã CP",
  "Thị giá (đồng)",
  "%D",
  "KLGD (CP)",
  "GTGD (tỷ đồng)",
  "%W",
  "%M",
  "%YtD",
  "%YoY",
  "KL NN mua ròng (CP)",
  "Giá trị NN mua ròng (tỷ đồng)",
  "Vốn hóa (tỷ đồng)",
  "KL Mua chủ động (CP) (M)",
  "KL Bán chủ động (CP) (B)",
  "M/B",
  "Biến động 52 tuần",
  "beta",
];

export const sheet3Title = [
  "Mã CP",
  "Thị giá (đồng)",
  "%D",
  "KLGD (CP)",
  "GTGD (tỷ đồng)",
  "EPS (đồng/cp)",
  "PE (lần)",
  "BVPS (đồng/cp)",
  "PB (lần)",
  "ROA (%)",
  "ROE (%)",
  "Biên lợi nhuận gộp năm gần nhất (%)",
  "Biên lợi nhuận gộp quý gần nhất (%)",
  "Biên lợi nhuận ròng năm gần nhất (%)",
  "Biên lợi nhuận ròng quý gần nhất (%)",
];

export const sheet4Title = [
  "Mã CP",
  "Thị giá (đồng)",
  "%D",
  "KLGD (CP)",
  "GTGD (tỷ đồng)",
  "Tín hiệu đường xu hướng",
  "Tín hiệu chỉ báo kỹ thuật",
  "Tín hiệu kỹ thuật tổng hợp",
];

export const sheet5Title = ["Mã CP", "Tín hiệu"];

export const sheet6Title = ["Mã CP", "Ngày", "Tiêu dề", "Link"];

export const prepareData = (item) => [
  item.code,
  item.floor,
  item.LV2,
  item.closePrice * 1000,
  item.perChange,
  item.totalVol,
  item.totalVal,
];

export const prepareData2 = (item) => [
  item.code,
  item.closePrice * 1000,
  item.perChange,
  item.totalVol,
  item.totalVal,
  item.perChangeW,
  item.perChangeM,
  item.perChangeYtD,
  item.perChangeY,
  item.buyVol,
  item.buyVal,
  item.marketCap,
  item.Mua,
  item.Ban,
  item.MB,
  `${item.PRICE_LOWEST_CR_52W} > ${item.closePrice} > ${item.PRICE_HIGHEST_CR_52W}`,
  item.beta,
];

export const prepareData3 = (item) => [
  item.code,
  item.closePrice * 1000,
  item.perChange,
  item.totalVol,
  item.totalVal,
  item.EPS,
  item.PE,
  item.BVPS,
  item.PB,
  item.ROA,
  item.ROE,
  item.grossProfitMarginYear,
  item.grossProfitMarginQuarter,
  item.netProfitMarginYear,
  item.netProfitMarginQuarter,
];

export const prepareData4 = (item) => [
  item.code,
  item.closePrice * 1000,
  item.perChange,
  item.totalVol,
  item.totalVal,
  calSignalText(item.trendSignal),
  calSignalText(item.technicalSignal),
  calSignalText(item.generalSignal),
];

export const prepareData5 = (item) => [item.code];

export const prepareData6 = (item) => {
  return item.news.map((news, index) => [
    index === 0 ? item.code : "", // Chỉ đặt code vào hàng đầu tiên
    new Date(news.date),
    news.title,
    news.href,
  ]);
};
