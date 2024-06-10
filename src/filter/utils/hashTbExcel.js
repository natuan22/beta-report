import calSignalText from "../../helper/calSignalText";
import { hashTbStockFilter } from "./hashTb";

const flatFilter = Object.values(hashTbStockFilter).flat();

export const sheet1Title = (selectedItems) => {
  const defaultTitle = [
    "Mã CP",
    "Sàn",
    "Ngành",
    "Thị giá (đồng)",
    "%D",
    "KLGD (CP)",
    "GTGD (tỷ đồng)",
  ];

  // Mảng chứa các key cần loại bỏ
  const excludedKeys = [
    "code",
    "floor",
    "LV4",
    "closePrice",
    "perChange1D",
    "totalVal",
    "totalVol",
    "watchlist",
    "gia_hien_tai_cat_len_ema",
    "gia_hien_tai_cat_len_ma",
    "gia_hien_tai_cat_xuong_ema",
    "gia_hien_tai_cat_xuong_ma",
    "sma_ngan_han_cat_len_sma_dai_han",
    "sma_ngan_han_cat_xuong_sma_dai_han",
    "rsi_dang_o_vung_qua_ban_",
    "rsi_dang_o_vung_qua_mua_",
    "rsi_di_vao_vung_qua_ban_",
    "rsi_di_vao_vung_qua_mua_",
    "rsi_thoat_khoi_vung_qua_ban_",
    "rsi_thoat_khoi_vung_qua_mua_",
    "max_",
    "min_",
    "gia_cat_len_tu_ngoai_bien_duoi_bollinger_band",
    "gia_cat_xuong_tu_ngoai_bien_tren_bollinger_band",
    "gia_dang_o_ngoai_bien_duoi_bollinger_band",
    "gia_dang_o_ngoai_bien_tren_bollinger_band",
    "gia_thoat_ra_bien_duoi_bollinger_band",
    "gia_thoat_ra_bien_tren_bollinger_band",
    "macd_cat_len_duong_0",
    "macd_cat_len_duong_tin_hieu",
    "macd_cat_xuong_duong_0",
    "macd_cat_xuong_duong_tin_hieu",
    "macd_dang_o_duoi_duong_0",
    "macd_dang_o_duoi_duong_0",
    "macd_dang_o_tren_duong_0",
    "macd_dang_o_tren_duong_tin_hieu",
  ];

  const dynamicTitle = selectedItems
    .filter((item) => !excludedKeys.includes(item))
    .map((item) => flatFilter.find((f) => f.key === item))
    .filter(Boolean)
    .map((item) => item.name);

  return [...defaultTitle, ...dynamicTitle];
};

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

export const prepareData = (item, selectedItems, selectParameters) => {
  const defaultData = [
    item.code,
    item.floor,
    item.LV4,
    item.closePrice * 1000,
    item.perChange1D,
    item.totalVol,
    item.totalVal,
  ];

  // Mảng chứa các key cần loại bỏ
  const excludedKeys = [
    "code",
    "floor",
    "LV4",
    "closePrice",
    "perChange1D",
    "totalVal",
    "totalVol",
    "watchlist",
    "gia_hien_tai_cat_len_ema",
    "gia_hien_tai_cat_len_ma",
    "gia_hien_tai_cat_xuong_ema",
    "gia_hien_tai_cat_xuong_ma",
    "sma_ngan_han_cat_len_sma_dai_han",
    "sma_ngan_han_cat_xuong_sma_dai_han",
    "rsi_dang_o_vung_qua_ban_",
    "rsi_dang_o_vung_qua_mua_",
    "rsi_di_vao_vung_qua_ban_",
    "rsi_di_vao_vung_qua_mua_",
    "rsi_thoat_khoi_vung_qua_ban_",
    "rsi_thoat_khoi_vung_qua_mua_",
    "max_",
    "min_",
    "gia_cat_len_tu_ngoai_bien_duoi_bollinger_band",
    "gia_cat_xuong_tu_ngoai_bien_tren_bollinger_band",
    "gia_dang_o_ngoai_bien_duoi_bollinger_band",
    "gia_dang_o_ngoai_bien_tren_bollinger_band",
    "gia_thoat_ra_bien_duoi_bollinger_band",
    "gia_thoat_ra_bien_tren_bollinger_band",
    "macd_cat_len_duong_0",
    "macd_cat_len_duong_tin_hieu",
    "macd_cat_xuong_duong_0",
    "macd_cat_xuong_duong_tin_hieu",
    "macd_dang_o_duoi_duong_0",
    "macd_dang_o_duoi_duong_0",
    "macd_dang_o_tren_duong_0",
    "macd_dang_o_tren_duong_tin_hieu",
  ];

  // Filter the selectedItems to exclude the keys in excludedKeys
  const filteredItems = selectedItems.filter(
    (key) => !excludedKeys.includes(key)
  );

  // Additional data based on the filtered selectedItems
  const additionalData = filteredItems.map((key) => {
    if (key === "avg_totalVol_") {
      return item[key + selectParameters];
    }

    if (key === "trendSignal" || key === "technicalSignal" || key === "generalSignal") {
      return calSignalText(item[key]);
    }

    return item[key];
  });
  
  // Combine default data with additional data
  return [...defaultData, ...additionalData];
};

export const prepareData2 = (item) => [
  item.code,
  item.closePrice * 1000,
  item.perChange1D,
  item.totalVol,
  item.totalVal,
  item.perChange1W,
  item.perChange1M,
  item.perChangeYTD,
  item.perChange1Y,
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
  item.perChange1D,
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
  item.closePrice,
  item.perChange1D,
  item.totalVol,
  item.totalVal,
  calSignalText(item.trendSignal),
  calSignalText(item.technicalSignal),
  calSignalText(item.generalSignal),
];
