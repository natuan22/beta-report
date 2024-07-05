import { Form, Input, Modal, Table, Tooltip, message } from "antd";
import React, { useState } from "react";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../../helper/getColorBaseOnValue";
import { FaCheck } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { FiPlusCircle } from "react-icons/fi";
import { postApi } from "../../../helper/postApi";
import { getApi } from "../../../helper/getApi";
import { hashTbStockFilter } from "../../utils/hashTb";
import GauChart from "../../../watchlist/components/GauChart";

const flatFilter = Object.values(hashTbStockFilter).flat();
const apiUrl = process.env.REACT_APP_BASE_URL;

const TableResults = ({ filteredResults, watchlists, catchWatchlists, selectedItems, selectParameters, isLogin }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [watchlistActive, setWatchlistActive] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-[#d9e9fd]";
    } else {
      // Dòng chẵn màu #d9e9fd
      return "bg-white";
    }
  };

  const renderIcon = (code) => {
    const combinedCodes = [
      ...new Set(watchlists?.map((watchlist) => watchlist.code).flat()),
    ];
    if (combinedCodes.includes(code)) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="27"
          viewBox="0 0 30 27"
          fill="none"
        >
          <path
            d="M15 3.13866L17.4198 10.3379L17.6489 11.0193H18.3677L26.1021 11.0193L19.8743 15.3932L19.2633 15.8223L19.5012 16.5301L21.8981 23.6612L15.5747 19.2202L15 18.8165L14.4253 19.2202L8.10187 23.6612L10.4988 16.5301L10.7367 15.8223L10.1257 15.3932L3.89792 11.0193L11.6323 11.0193H12.3511L12.5802 10.3379L15 3.13866Z"
            fill="#FFBA07"
            stroke="#0D4381"
            strokeWidth="2"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="27"
          viewBox="0 0 30 27"
          fill="none"
        >
          <path
            d="M15 3.13866L17.4198 10.3379L17.6489 11.0193H18.3677L26.1021 11.0193L19.8743 15.3932L19.2633 15.8223L19.5012 16.5301L21.8981 23.6612L15.5747 19.2202L15 18.8165L14.4253 19.2202L8.10187 23.6612L10.4988 16.5301L10.7367 15.8223L10.1257 15.3932L3.89792 11.0193L11.6323 11.0193H12.3511L12.5802 10.3379L15 3.13866Z"
            fill="#0D4381"
            stroke="#0D4381"
            strokeWidth="2"
          />
        </svg>
      );
    }
  };

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const showModalAdd = (code) => {
    setIsModalAddOpen(true);
    setSelectedCode(code);
  };

  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const showModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const handleCreateOk = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
  };

  const handleWatchlistClick = (id) => {
    const clickedWatchlist = watchlists.find(
      (watchlist) => watchlist.id === id
    );
    // Check if the watchlist object exists
    if (clickedWatchlist) {
      // Set the selectedWatchlist state to the name
      setWatchlistActive(clickedWatchlist);
    }
  };

  const onFinish = async (values) => {
    await postApi(apiUrl, "/api/v1/watchlist/create", values);

    const fetchDataWatchList = async () => {
      try {
        const data = await getApi(apiUrl, "/api/v1/watchlist");
        catchWatchlists(data);
        const newWatchlist = data.find(
          (watchlist) => watchlist.name === values.name
        );
        if (newWatchlist) {
          setWatchlistActive(newWatchlist);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataWatchList();
    setIsModalCreateOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddCodeToWatchlist = async () => {
    const currentCodes = Array.isArray(watchlistActive.code)
      ? watchlistActive.code
      : [];
    const updatedWatchlistCodes = [...new Set([...currentCodes, selectedCode])];

    const updatedWatchlist = {
      ...watchlistActive,
      code: updatedWatchlistCodes,
    };

    await postApi(apiUrl, "/api/v1/watchlist/update", updatedWatchlist);

    // Fetch updated watchlists from the server
    const data = await getApi(apiUrl, "/api/v1/watchlist");
    catchWatchlists(data);

    setIsModalAddOpen(false);
    setWatchlistActive(updatedWatchlist);

    warning(
      "success",
      `Đã thêm mã chứng khoán ${selectedCode} vào ${watchlistActive.name}`
    );
  };

  const columns = [
    {
      title: "Mã CP",
      dataindex: "code",
      fixed: true,
      width: 200,
      align: "center",
      render: (_, record, index) => {
        return (
          <div className={`font-bold text-lg flex flex-row items-center`}>
            <Tooltip
              placement="left"
              title={<span className="">Thêm vào watchlist</span>}
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              <div
                className="mr-3 cursor-pointer"
                onClick={() => showModalAdd(record.code)}
              >
                {renderIcon(record.code)}
              </div>
            </Tooltip>
            <Tooltip
              placement="left"
              title={
                <span className="">Click vào mã cổ phiếu để xem báo cáo</span>
              }
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              <a
                className="text-[#0D4381] cursor-pointer no-underline hover:text-[#0164F8]"
                href={`/phan-tich-ky-thuat-tu-dong/${record.code}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {record.code}
              </a>
            </Tooltip>
          </div>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Sàn",
      dataindex: "floor",
      align: "center",
      width: 100,
      render: (_, record) => {
        return <div className="text-black text-left">{record.floor}</div>;
      },
      sorter: (a, b) => a.floor.localeCompare(b.floor),
    },
    {
      title: "Ngành",
      dataindex: "LV4",
      align: "center",
      width: 350,
      render: (_, record) => {
        return <div className="text-black text-left">{record.LV4}</div>;
      },
      sorter: (a, b) => a.LV4.localeCompare(b.LV4),
    },
    {
      title: "Thị giá (đồng)",
      dataindex: "closePrice",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange1D)}`}
          >
            {formatNumberCurrency(record.closePrice * 1000)}
          </div>
        );
      },
      sorter: (a, b) => a.closePrice - b.closePrice,
    },
    {
      title: "%D",
      dataindex: "perChange1D",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange1D)}`}
          >
            {formatNumberCurrency(record.perChange1D)}
          </div>
        );
      },
      sorter: (a, b) => a.perChange1D - b.perChange1D,
    },
    {
      title: "KLGD (CP)",
      dataindex: "totalVol",
      width: 130,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.totalVol)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVol - b.totalVol,
    },
    {
      title: "GTGD (tỷ đồng)",
      dataindex: "totalVal",
      width: 160,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.totalVal)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVal - b.totalVal,
    },
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
    "changeStatusTrend",
    "changeStatusTech",
    "changeStatusGeneral",
    "",
  ];

  const dynamicColumns = selectedItems
    .filter((item) => !excludedKeys.includes(item))
    .map((item) => {
      const flatFilterItem = flatFilter.find((f) => f.key === item);
      if (!flatFilterItem) return null; // Early exit if item not found

      if (
        ["trendSignal", "technicalSignal", "generalSignal"].includes(
          flatFilterItem.key
        )
      ) {
        return {
          title: flatFilterItem.name,
          align: "center",
          width: 213,
          render: (_, record) => <GauChart data={record[flatFilterItem.key]} />,
        };
      }

      const dataIndex =
        flatFilterItem.key === "avg_totalVol_" || flatFilterItem.key === "perChangeOmVol_"
          ? `${flatFilterItem.key}${selectParameters}`
          : flatFilterItem.key;

      return {
        title: flatFilterItem.name,
        dataIndex,
        align: "center",
        width: 120,
        render: (_, record) => (
          <div className="text-black text-right">
            {formatNumberCurrency(record[dataIndex])}
          </div>
        ),
        sorter: (a, b) => a[dataIndex] - b[dataIndex],
      };
    })
    .filter(Boolean);

  const allColumns = [...columns, ...dynamicColumns];

  return (
    <div>
      {contextHolder}
      <div className="table-data-watchlist mt-0.5">
        <Table
          showSorterTooltip={false}
          columns={allColumns}
          scroll={{ x: 1823 }}
          dataSource={filteredResults}
          rowClassName={rowClassName}
          pagination={{ defaultPageSize: 15, showSizeChanger: false }}
        />
      </div>
      <Modal
        centered
        width={600}
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={null}
        className="add-conditions"
      >
        <div className="h-[450px]">
          <h2 className="m-0 sticky top-0 w-full z-10 text-white">
            Chọn watchlist để đưa cổ phiếu vào theo dõi
          </h2>
          <div className="h-[365px] overflow-y-auto">
            {watchlists?.map((watchlist, index) => (
              <div
                className="py-[7px] px-[10px] my-2 mx-4 shadowInner bg-[#9DC4FF] text-[15px] cursor-pointer flex"
                key={index}
                onClick={() => handleWatchlistClick(watchlist.id)}
              >
                <div className="w-[100%]">{watchlist.name}</div>
                {watchlistActive && watchlist.id === watchlistActive.id && (
                  <div>
                    <FaCheck />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between my-5 ml-2 mr-4">
            <div>
              <Button
                variant="contained"
                color="xanh"
                className="flex items-center justify-center rounded-md cursor-pointer font-semibold text-[16px]"
                onClick={showModalCreate}
                startIcon={<FiPlusCircle />}
                disabled={isLogin !== "7MEvU"}
                sx={{
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                    backgroundColor: "#9dc4ff",
                  },
                }}
              >
                <span className="normal-case">Tạo watchlist mới</span>
              </Button>
              <Modal
                centered
                width={600}
                open={isModalCreateOpen}
                onOk={handleCreateOk}
                onCancel={handleCreateCancel}
                footer={null}
                className="modalStyle"
              >
                <Form
                  initialValues={{
                    remember: false,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  size="large"
                  autoComplete="off"
                >
                  <div className="mt-6">
                    <p className="text-[20px] font-semibold text-white mb-2 mt-0">
                      Nhập tên watchlist
                    </p>
                    <div className="flex flex-col items-end">
                      <Form.Item
                        name="name"
                        className="inputStyle"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên watchlist!",
                          },
                        ]}
                      >
                        <Input placeholder="Tên watchlist" allowClear />
                      </Form.Item>
                      <Form.Item className="btnStyle">
                        <Button
                          type="submit"
                          variant="text"
                          sx={{
                            fontWeight: 600,
                            color: "#ffba07",
                            fontSize: "18px",
                            textTransform: "none",
                          }}
                        >
                          Tạo watchlist
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </Modal>
            </div>
            <div>
              <Button
                variant="contained"
                color="xanh"
                onClick={handleAddCodeToWatchlist}
                disabled={isLogin !== "7MEvU"}
                sx={{
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                    backgroundColor: "#9dc4ff",
                  },
                }}
              >
                <span className="normal-case">Thêm vào watchlist</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableResults;
