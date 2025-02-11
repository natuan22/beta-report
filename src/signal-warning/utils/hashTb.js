export const hashTbSignalWarning = {
  "Tín hiệu đường trung bình (MA)": [
    { name: "Giá hiện tại cắt lên đường SMA",     key: "gia_hien_tai_cat_len_ma",            options: true, optionLabel: ['Đường trung bình:'], select: [{value: "SMA (5)", label: "SMA (5)"}, {value: "SMA (10)", label: "SMA (10)"}, {value: "SMA (15)", label: "SMA (15)"}, {value: "SMA (20)", label: "SMA (20)"}, {value: "SMA (50)", label: "SMA (50)"}, {value: "SMA (60)", label: "SMA (60)"}, {value: "SMA (100)", label: "SMA (100)"}],  defaultValue: "SMA (5)" },
    { name: "Giá hiện tại cắt xuống đường SMA",   key: "gia_hien_tai_cat_xuong_ma",          options: true, optionLabel: ['Đường trung bình:'], select: [{value: "SMA (5)", label: "SMA (5)"}, {value: "SMA (10)", label: "SMA (10)"}, {value: "SMA (15)", label: "SMA (15)"}, {value: "SMA (20)", label: "SMA (20)"}, {value: "SMA (50)", label: "SMA (50)"}, {value: "SMA (60)", label: "SMA (60)"}, {value: "SMA (100)", label: "SMA (100)"}],  defaultValue: "SMA (5)" },
    { name: "Giá hiện tại cắt lên đường EMA",     key: "gia_hien_tai_cat_len_ema",           options: true, optionLabel: ['Đường trung bình:'], select: [{value: "EMA (5)", label: "EMA (5)"}, {value: "EMA (10)", label: "EMA (10)"}, {value: "EMA (15)", label: "EMA (15)"}, {value: "EMA (20)", label: "EMA (20)"}, {value: "EMA (50)", label: "EMA (50)"}, {value: "EMA (60)", label: "EMA (60)"}, {value: "EMA (100)", label: "EMA (100)"}],  defaultValue: "EMA (5)" },
    { name: "Giá hiện tại cắt xuống đường EMA",   key: "gia_hien_tai_cat_xuong_ema",         options: true, optionLabel: ['Đường trung bình:'], select: [{value: "EMA (5)", label: "EMA (5)"}, {value: "EMA (10)", label: "EMA (10)"}, {value: "EMA (15)", label: "EMA (15)"}, {value: "EMA (20)", label: "EMA (20)"}, {value: "EMA (50)", label: "EMA (50)"}, {value: "EMA (60)", label: "EMA (60)"}, {value: "EMA (100)", label: "EMA (100)"}],  defaultValue: "EMA (5)" },
    { name: "SMA ngắn hạn cắt lên SMA dài hạn",   key: "sma_ngan_han_cat_len_sma_dai_han",   options: true, optionLabel: ['SMA ngắn hạn - dài hạn:'], optionLabelLongShort: ['SMA ngắn hạn:', 'SMA dài hạn:'], selectShort: [{value: "SMA (5)", label: "SMA (5)"}, {value: "SMA (10)", label: "SMA (10)"}], defaultValueShort: "SMA (5)",  selectLong: [{value: "SMA (10)", label: "SMA (10)"}, {value: "SMA (15)", label: "SMA (15)"}, {value: "SMA (20)", label: "SMA (20)"}], defaultValueLong: "SMA (10)" },
    { name: "SMA ngắn hạn cắt xuống SMA dài hạn", key: "sma_ngan_han_cat_xuong_sma_dai_han", options: true, optionLabel: ['SMA ngắn hạn - dài hạn:'], optionLabelLongShort: ['SMA ngắn hạn:', 'SMA dài hạn:'], selectShort: [{value: "SMA (5)", label: "SMA (5)"}, {value: "SMA (10)", label: "SMA (10)"}], defaultValueShort: "SMA (5)",  selectLong: [{value: "SMA (10)", label: "SMA (10)"}, {value: "SMA (15)", label: "SMA (15)"}, {value: "SMA (20)", label: "SMA (20)"}], defaultValueLong: "SMA (10)" },
  ],
  "Tín hiệu chỉ số sức mạnh tương đối (RSI)": [
    { name: "RSI(14) đi vào vùng quá mua",     key: "rsi_di_vao_vung_qua_mua_",     options: true, optionLabel: ['Ngưỡng quá mua:'], select: [{value: "Trên 70", label: 'Trên 70'}, {value: "Trên 80", label: 'Trên 80'}], defaultValue: 'Trên 70' },
    { name: "RSI(14) thoát khỏi vùng quá mua", key: "rsi_thoat_khoi_vung_qua_mua_", options: true, optionLabel: ['Ngưỡng quá mua:'], select: [{value: "Trên 70", label: 'Trên 70'}, {value: "Trên 80", label: 'Trên 80'}], defaultValue: 'Trên 70' },
    { name: "RSI(14) thoát khỏi vùng quá bán", key: "rsi_thoat_khoi_vung_qua_ban_", options: true, optionLabel: ['Ngưỡng quá bán:'], select: [{value: "Dưới 30", label: 'Dưới 30'}, {value: "Dưới 20", label: 'Dưới 20'}], defaultValue: 'Dưới 30' },
    { name: "RSI(14) đi vào vùng quá bán",     key: "rsi_di_vao_vung_qua_ban_",     options: true, optionLabel: ['Ngưỡng quá bán:'], select: [{value: "Dưới 30", label: 'Dưới 30'}, {value: "Dưới 20", label: 'Dưới 20'}], defaultValue: 'Dưới 30' },
    // { name: "RSI(14) đang ở vùng quá mua", key: "rsi_dang_o_vung_qua_mua_", options: true, optionLabel: ['Ngưỡng quá mua:'] },
    // { name: "RSI(14) đang ở vùng quá bán", key: "rsi_dang_o_vung_qua_ban_", options: true, optionLabel: ['Ngưỡng quá bán:'] },
  ],
  "Tín hiệu chỉ báo MACD": [
    { name: "MACD cắt lên đường tín hiệu",     key: "macd_cat_len_duong_tin_hieu",     options: false },
    { name: "MACD đang ở trên đường tín hiệu", key: "macd_dang_o_tren_duong_tin_hieu", options: false },
    { name: "MACD cắt xuống đường tín hiệu",   key: "macd_cat_xuong_duong_tin_hieu",   options: false },
    { name: "MACD đang ở dưới đường tín hiệu", key: "macd_dang_o_duoi_duong_tin_hieu", options: false },
    { name: "MACD cắt lên đường 0",            key: "macd_cat_len_duong_0",            options: false },
    { name: "MACD đang ở trên đường 0",        key: "macd_dang_o_tren_duong_0",        options: false },
    { name: "MACD cắt xuống đường 0",          key: "macd_cat_xuong_duong_0",          options: false },
    { name: "MACD đang ở dưới đường 0",        key: "macd_dang_o_duoi_duong_0",        options: false },
  ],
  "Tín hiệu dải băng Bollinger (Bollinger Bands)": [
    { name: "Giá thoát ra ngoài biên trên Bollinger Band (20)",    key: "gia_thoat_ra_bien_tren_bollinger_band",           options: false },
    { name: "Giá cắt xuống từ ngoài biên trên Bollinger Band (20)", key: "gia_cat_xuong_tu_ngoai_bien_tren_bollinger_band", options: false },
    { name: "Giá đang ở ngoài biên trên Bollinger Band (20)",       key: "gia_dang_o_ngoai_bien_tren_bollinger_band",       options: false },
    { name: "Giá thoát ra ngoài biên dưới Bollinger Band (20)",     key: "gia_thoat_ra_bien_duoi_bollinger_band",           options: false },
    { name: "Giá cắt lên từ ngoài biên dưới Bollinger Band (20)",   key: "gia_cat_len_tu_ngoai_bien_duoi_bollinger_band",   options: false },
    { name: "Giá đang ở ngoài biên dưới Bollinger Band (20)",       key: "gia_dang_o_ngoai_bien_duoi_bollinger_band",       options: false },
  ],
};

export const hashTbScope = [
  { name: "Tất cả cổ phiếu",             key: 'ALL' },
  { name: "Cổ phiếu sàn HSX",            key: 'HOSE' },
  { name: "Cổ phiếu sàn HNX",            key: 'HNX' },
  { name: "Cổ phiếu sàn UPCOM",          key: 'UPCOM' },
  { name: "Cổ phiếu VN30",               key: 'VN30' },
  { name: "Danh sách watchlist của bạn", key: 'watchlists' },
  { name: "Rổ VNDIAMOND",                key: 'VNDIAMOND' },
  { name: "Rổ VNFINLEAD",                key: 'VNFINLEAD' },
]

export const hashTbScopeLiquidityMarketCap = [
  { name: "Thanh khoản (tỷ đồng)", key: "liquidity", 
    select: [
      { value: 100,   label: "100" },
      { value: 200,   label: "200" },
      { value: 500,   label: "500" },
      { value: 1000,  label: "1.000" },
    ],
  },   
  { name: "Vốn hóa (tỷ đồng)", key: "marketCap",
    select: [
      { value: 100,   label: "100" },
      { value: 200,   label: "200" },
      { value: 500,   label: "500" },
      { value: 1000,  label: "1.000" },
      { value: 5000,  label: "5.000" },
      { value: 10000, label: "10.000" },
    ],
  },
];

export const customLiquidity = [
  {value: "0", label: "Không giới hạn thanh khoản" },
  {value: "avg_totalVal_5d", label: "GTTB 5 phiên tối thiểu" },
  {value: "avg_totalVal_20d", label: "GTTB 20 phiên tối thiểu" },
];

export const customMarketCap = [
  {value: "0", label: "Không giới hạn vốn hoá" },
  {value: ">", label: "Lớn hơn" },
  {value: "<", label: "Nhỏ hơn" },
];

export const labelToValueMap = { 
  "SMA (5)": "ma5",
  "SMA (10)": "ma10",
  "SMA (15)": "ma15",
  "SMA (20)": "ma20",
  "SMA (50)": "ma50",
  "SMA (60)": "ma60",
  "SMA (100)": "ma100",
  "EMA (5)": "ema5",
  "EMA (10)": "ema10",
  "EMA (15)": "ema15",
  "EMA (20)": "ema20",
  "EMA (50)": "ema50",
  "EMA (60)": "ema60",
  "EMA (100)": "ema100",
  "Trên 70": 70,
  "Trên 80": 80,
  "Dưới 30": 30,
  "Dưới 20": 20,
};

export const specificKeys = ["rsi_di_vao_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_ban_", "rsi_di_vao_vung_qua_ban_"];
export const specificKeysV2 = ["gia_hien_tai_cat_len_ma", "gia_hien_tai_cat_xuong_ma", "gia_hien_tai_cat_len_ema", "gia_hien_tai_cat_xuong_ema", "sma_ngan_han_cat_len_sma_dai_han", "sma_ngan_han_cat_xuong_sma_dai_han", "rsi_di_vao_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_ban_", "rsi_di_vao_vung_qua_ban_"];
