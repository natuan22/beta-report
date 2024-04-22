export const sheet1Title = ["Mã CP", "Sàn", "Ngành", "Thị giá (đồng)", "%D", "KLGD (CP)", "GTGD (tỷ đồng)"];

export const sheet2Title = ["Mã CP", "Thị giá (đồng)", "%D", "KLGD (CP)", "GTGD (tỷ đồng)", "%W", "%M", "%YtD", 
                    "%YoY", "KLNN mua ròng (CP)", "Giá trị NN mua ròng (tỷ đồng)", "Vốn hóa (tỷ đồng)", 
                    "KL Mua chủ động (CP) (M)", "KL Bán chủ động (CP) (B)", "M/B", "Biến động 52 tuần", "beta"];

export const sheet3Title = ["Mã CP", "Thị giá (đồng)", "%D", "KLGD (CP)", "GTGD (tỷ đồng)", "EPS (đồng/cp)", 
                    "PE (lần)", "BVPS (đồng/cp)", "PB (lần)", "ROA (%)", "ROE (%)",
                    "Biên lợi nhuận gộp năm gần nhất (%)",
                    "Biên lợi nhuận gộp quý gần nhất (%)",
                    "Biên lợi nhuận ròng năm gần nhất (%)",
                    "Biên lợi nhuận ròng quý gần nhất (%)"];

export const sheet4Title = ["Mã CP", "Thị giá (đồng)", "%D", "KLGD (CP)", "GTGD (tỷ đồng)"];


export const prepareData = (item) => [
    item.code,
    item.floor,
    item.LV2,
    item.closePrice * 1000,
    item.perChange,
    item.totalVol,
    item.totalVal / 1000000000,
];

export const prepareData2 = (item) => [
    item.code,
    item.closePrice * 1000,
    item.perChange,
    item.totalVol,
    item.totalVal / 1000000000,
    item.floor,
    item.floor,
    item.floor,
    item.floor,
    item.buyVol,
    item.buyVal / 1000000000,
    item.marketCap / 1000000000,
    item.Mua,
    item.Ban,
    item.MB,
    `${item.PRICE_LOWEST_CR_52W} > ${item.closePrice} > ${item.PRICE_HIGHEST_CR_52W}`,
    item.floor,
];

export const prepareData3 = (item) => [
    item.code,
    item.closePrice * 1000,
    item.perChange,
    item.totalVol,
    item.totalVal / 1000000000,
    item.EPS,
    item.PE,
    item.BVPS,
    item.PB,
    item.ROA * 100,
    item.ROE * 100,
    item.grossProfitMarginYear * 100,
    item.grossProfitMarginQuarter * 100,
    item.netProfitMarginYear * 100,
    item.netProfitMarginQuarter * 100,
];

export const prepareData4 = (item) => [
    item.code,
    item.closePrice * 1000,
    item.perChange,
    item.totalVol,
    item.totalVal / 1000000000,
];