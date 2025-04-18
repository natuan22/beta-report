import { Slider } from "@mui/material";
import Button from "@mui/material/Button";
import { Form, Input, Modal, Table, Tooltip, message } from "antd";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";
import { getApi } from "../../../helper/getApi";
import { getColorBaseOnValue } from "../../../helper/getColorBaseOnValue";
import { postApi } from "../../../helper/postApi";

const TableStatistical = ({
  loadingTb,
  filteredResults,
  watchlists,
  catchWatchlists,
  isLogin,
}) => {
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
    await postApi("/api/v1/watchlist/create", values);

    const fetchDataWatchList = async () => {
      try {
        const data = await getApi("/api/v1/watchlist");
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
    console.error("Failed:", errorInfo);
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

    await postApi("/api/v1/watchlist/update", updatedWatchlist);

    // Fetch updated watchlists from the server
    const data = await getApi("/api/v1/watchlist");
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
              title={<span className="">Click vào mã CP để xem báo cáo</span>}
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              <a
                className="text-[#0D4381] cursor-pointer no-underline hover:text-[#0164F8] hover:underline"
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
      title: (
        <span>
          Thị giá <br />
          (đồng)
        </span>
      ),
      dataindex: "closePrice",
      width: 100,
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
      title: (
        <span>
          KLGD <br />
          (CP)
        </span>
      ),
      dataindex: "totalVol",
      width: 110,
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
      title: (
        <span>
          GTGD <br />
          (tỷ đồng)
        </span>
      ),
      dataindex: "totalVal",
      width: 150,
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
    {
      title: "%W",
      dataindex: "perChange5D",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange5D)}`}
          >
            {record.perChange5D}
          </div>
        );
      },
      sorter: (a, b) => a.perChange5D - b.perChange5D,
    },
    {
      title: "%M",
      dataindex: "perChange1M",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange1M)}`}
          >
            {record.perChange1M}
          </div>
        );
      },
      sorter: (a, b) => a.perChange1M - b.perChange1M,
    },
    {
      title: "%YtD",
      dataindex: "perChangeYTD",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChangeYTD)}`}
          >
            {record.perChangeYTD}
          </div>
        );
      },
      sorter: (a, b) => a.perChangeYTD - b.perChangeYTD,
    },
    {
      title: "%YoY",
      dataindex: "perChange1Y",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange1Y)}`}
          >
            {record.perChange1Y}
          </div>
        );
      },
      sorter: (a, b) => a.perChange1Y - b.perChange1Y,
    },
    {
      title: "Khối lượng NN mua/bán ròng (CP)",
      dataindex: "buyVol",
      width: 190,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`text-right ${getColorBaseOnValue(record.buyVol)}`}>
            {formatNumberCurrency(record.buyVol)}
          </div>
        );
      },
      sorter: (a, b) => a.buyVol - b.buyVol,
    },
    {
      title: (
        <span>
          Giá trị NN <br /> mua/bán ròng (tỷ đồng)
        </span>
      ),
      dataindex: "buyVal",
      width: 220,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`text-right ${getColorBaseOnValue(record.buyVal)}`}>
            {formatNumberCurrency(record.buyVal)}
          </div>
        );
      },
      sorter: (a, b) => a.buyVal - b.buyVal,
    },
    {
      title: "Vốn hóa (tỷ đồng)",
      dataindex: "marketCap",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.marketCap)}
          </div>
        );
      },
      sorter: (a, b) => a.marketCap - b.marketCap,
    },
    {
      title: "KL Mua chủ động (CP) (M)",
      dataindex: "Mua",
      width: 180,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.Mua)}
          </div>
        );
      },
      sorter: (a, b) => a.Mua - b.Mua,
    },
    {
      title: "KL Bán chủ động (CP) (B)",
      dataindex: "Ban",
      width: 170,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.Ban)}
          </div>
        );
      },
      sorter: (a, b) => a.Ban - b.Ban,
    },
    {
      title: "M/B",
      dataindex: "MB",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.MB)}
          </div>
        );
      },
      sorter: (a, b) => a.MB - b.MB,
    },
    {
      title: "Biến động 52 tuần",
      width: 165,
      align: "center",
      render: (_, record) => {
        const lowestPrice = +record.PRICE_LOWEST_CR_52W.toFixed(2);
        const highestPrice = +record.PRICE_HIGHEST_CR_52W.toFixed(2);

        const isHighestPrice = record.closePrice === highestPrice;
        const isLowestPrice = record.closePrice === lowestPrice;

        const thumbColor = isHighestPrice
          ? "#3dcc91"
          : isLowestPrice
          ? "#d1686a"
          : "#137ab9";
        const borderTopColor = isHighestPrice
          ? "#3dcc91"
          : isLowestPrice
          ? "#d1686a"
          : "#137ab9";

        return (
          <div className="w-[120px] h-[28px] -translate-y-[5px] translate-x-[7px]">
            <Slider
              disabled
              value={record.closePrice}
              min={lowestPrice}
              max={highestPrice}
              track={false}
              marks={[
                { value: lowestPrice, label: lowestPrice },
                { value: highestPrice, label: highestPrice },
              ]}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "11px", // Kích thước chữ
                  top: "20px",
                },
                "& .MuiSlider-thumb": {
                  width: "2px",
                  height: "4px",
                  backgroundColor: thumbColor,
                  borderRadius: 0,
                },
                "& .MuiSlider-thumb::after": {
                  width: "0px",
                  height: "0px",
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: `4px solid ${borderTopColor}`,
                  borderRadius: 0,
                  top: "-2.5px",
                  left: "1px",
                },
                "& .MuiSlider-root": {
                  padding: "0px 0px",
                },
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Beta",
      dataindex: "beta",
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.beta)}
          </div>
        );
      },
      sorter: (a, b) => a.beta - b.beta,
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="table-data-antd mt-0.5">
        <Table
          loading={loadingTb}
          showSorterTooltip={false}
          columns={columns}
          dataSource={filteredResults}
          rowClassName={rowClassName}
          scroll={{ x: 2150 }}
          pagination={{ defaultPageSize: 10, showSizeChanger: false }}
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
                disabled={isLogin !== process.env.REACT_APP_LG_T}
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
                disabled={isLogin !== process.env.REACT_APP_LG_T}
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

export default TableStatistical;
