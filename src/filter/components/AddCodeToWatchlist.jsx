import Button from "@mui/material/Button";
import { Form, Modal, Input, message } from "antd";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { postApi } from "../../helper/postApi";
import { getApi } from "../../helper/getApi";

const apiUrl = process.env.REACT_APP_BASE_URL;

const AddCodeToWatchlist = ({ watchlists, filteredResults, catchWatchlists, isLogin }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [watchlistActive, setWatchlistActive] = useState("");

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
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

  const showModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const handleCreateOk = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
  };

  const handleAddCodeToWatchlist = async () => {
    const filteredCodes = filteredResults.map((item) => item.code);

    const updatedWatchlistCodes = [
      ...new Set([...watchlistActive.code, ...filteredCodes]),
    ];

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
      `Đã thêm ${filteredCodes.length} mã chứng khoán vào ${watchlistActive.name}`
    );
  };

  return (
    <div>
      {contextHolder}
      <Button
        variant="outlined"
        onClick={showModalAdd}
        startIcon={
          <svg
            width="30"
            height="27"
            viewBox="0 0 30 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 3.13866L17.4198 10.3379L17.6489 11.0193H18.3677L26.1021 11.0193L19.8743 15.3932L19.2633 15.8223L19.5012 16.5301L21.8981 23.6612L15.5747 19.2202L15 18.8165L14.4253 19.2202L8.10187 23.6612L10.4988 16.5301L10.7367 15.8223L10.1257 15.3932L3.89792 11.0193L11.6323 11.0193H12.3511L12.5802 10.3379L15 3.13866Z"
              fill="#FFBA07"
              stroke="#0D4381"
              strokeWidth="2"
            />
          </svg>
        }
        disabled={isLogin !== process.env.REACT_APP_LG_T}
        sx={{
          "&.Mui-disabled": {
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
        }}
      >
        <div className="mt-[2px] font-[750] text-[15px] normal-case">
          Thêm vào watchlist
        </div>
      </Button>
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

export default AddCodeToWatchlist;
