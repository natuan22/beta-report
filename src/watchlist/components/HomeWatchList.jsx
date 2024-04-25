import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Tooltip, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoCaretDownSharp } from "react-icons/io5";
import { Dropdown } from "antd";
import { FiPlusCircle } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import { postApi } from "../../helper/postApi";
import { getApi } from "../../helper/getApi";
import { FaCheck, FaX } from "react-icons/fa6";
import { https } from "../../services/configService";
import { useDebounce } from "react-use";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Tabs } from "antd";
import TableBase from "./TableBase";
import TableStatistical from "./TableStatistical";
import TableBasic from "./TableBasic";
import TableTechnique from "./TableTechnique";
import TableSignalWarning from "./TableSignalWarning";
import TableNews from "./TableNews";
import icon_excel from "../../app/asset/img/icon_excel.png";
import {
  prepareData,
  prepareData2,
  prepareData3,
  prepareData4,
  sheet1Title,
  sheet2Title,
  sheet3Title,
  sheet4Title,
} from "../utils/hashTb";

const XLSX = require("xlsx");
const apiUrl = process.env.REACT_APP_BASE_URL;

const HomeWatchList = ({ watchlists, catchWatchlists }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [watchlistActive, setWatchlistActive] = useState(
    JSON.parse(localStorage.getItem("watchlistActive")) ||
      watchlists[watchlists.length - 1]
  );
  const [loading, setLoading] = useState(true);
  const [loadingTb, setLoadingTb] = useState(true);

  //data table
  const [data, setData] = useState();

  const getDataTable = async (id) => {
    const data = await getApi(apiUrl, `/api/v1/watchlist/${id}`);
    const dataWithKey =
      Array.isArray(data) &&
      data?.map((item, index) => ({
        ...item,
        key: index,
      }));
    setData(dataWithKey);
    setLoading(false);
    setLoadingTb(false);
  };

  useEffect(() => {
    getDataTable(watchlistActive.id);
  }, []);

  useEffect(() => {
    setActiveKey(activeKey);
  }, [data]);

  //del
  const handleDeleteWatchlist = (id) => {
    // Sử dụng SweetAlert để xác nhận việc xóa
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa watchlist này?",
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Xác nhận xóa tin và cập nhật state
        await postApi(apiUrl, "/api/v1/watchlist/delete", { id });
        warning("success", "Đã xóa watchlist thành công!");
        const newData = await fetchDataWatchList();
        setWatchlistActive(newData[newData.length - 1]);
        if (newData.length > 0) {
          if (id == watchlistActive.id) {
            await getDataTable(newData[newData.length - 1].id);
          }
        } else {
          setData([]);
        }
        localStorage.setItem(
          "watchlistActive",
          JSON.stringify(newData[newData.length - 1])
        );
      }
    });
  };

  //edit
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  const handleToggleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(watchlists[index].name);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
  };

  const handleEditConfirm = async (item) => {
    // Xử lý khi người dùng xác nhận chỉnh sửa
    const editedItem = { ...item };
    // Gán giá trị mới cho trường name của editedItem
    editedItem.name = editValue;

    await postApi(apiUrl, "/api/v1/watchlist/update", editedItem);
    warning("success", `Chỉnh sửa thành công watchlist`);

    const newData = await fetchDataWatchList();
    if (editedItem.id === watchlistActive.id) {
      const foundItem = newData.find((item) => item.id === editedItem.id);

      setWatchlistActive(foundItem);
      localStorage.setItem("watchlistActive", JSON.stringify(foundItem));
    } else {
      const foundItem = newData.find((item) => item.id === watchlistActive.id);

      setWatchlistActive(foundItem);
      localStorage.setItem("watchlistActive", JSON.stringify(foundItem));
    }

    setEditingIndex(-1);
    setEditValue("");
  };

  // search
  const [valStock, setValStock] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const wrapperRef = useRef(null); // Ref cho phần div chứa dữ liệu

  useEffect(() => {
    function handleClickOutside(event) {
      // Kiểm tra xem người dùng có click ra ngoài giao diện không
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocus(false); // Nếu click ra ngoài, ẩn div chứa dữ liệu
      }
    }

    // Thêm sự kiện click vào document
    document.addEventListener("mousedown", handleClickOutside);

    // Xóa sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedValue === "") {
      setDataSearch([]);
      return;
    }

    const searchData = async (stock) => {
      try {
        const res = await https.get("/api/v1/investment/search", {
          params: {
            stock,
          },
        });
        setDataSearch(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    searchData(debouncedValue);
  }, [debouncedValue]);

  // debounce
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(valStock);
    },
    500,
    [valStock]
  );

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const showDropdown = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  // ModalEdit
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };

  const handleEditCancel = () => {
    if (editingIndex !== -1) {
      return warning("warning", "Vui lòng hoàn tất chỉnh sửa");
    } else {
      setIsModalEditOpen(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  // ModalAdd
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const fetchDataWatchList = async () => {
    try {
      const data = await getApi(apiUrl, "/api/v1/watchlist");
      catchWatchlists(data);
      return data;
    } catch (error) {
      console.error(error);
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
          localStorage.setItem("watchlistActive", JSON.stringify(newWatchlist));
          setWatchlistActive(newWatchlist);
          await getDataTable(data[data.length - 1].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataWatchList();
    setIsModalAddOpen(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  const items = [
    {
      key: "0",
      type: "group",
      label: "Danh sách watchlist",
      children: watchlists.map((watchlist, index) => ({
        key: `0-${index}`,
        label: (
          <span
            onClick={() => handleWatchlistClick(watchlist.id)}
            className="flex"
          >
            <div className="w-[142px] whitespace-nowrap overflow-hidden text-ellipsis mr-3">
              {watchlist.name}
            </div>
            {watchlistActive && watchlist.id === watchlistActive.id && (
              <div>
                <FaCheck />
              </div>
            )}
          </span>
        ),
      })),
    },
    { type: "divider" },
    {
      key: "1",
      type: "group",
      children: [
        {
          key: "1-0",
          label: (
            <div>
              <div
                className="flex items-center justify-center rounded-md"
                onClick={showModalAdd}
              >
                <FiPlusCircle className="w-[30px]" />
                Thêm watchlist mới
              </div>
              <Modal
                centered
                width={600}
                open={isModalAddOpen}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
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
          ),
        },
        {
          key: "1-1",
          label: (
            <div>
              <div
                className="flex items-center justify-center rounded-md"
                onClick={showModalEdit}
              >
                <HiOutlineViewList className="w-[30px] ml-[9px]" />
                Quản lý các watchlist
              </div>
              <Modal
                centered
                width={600}
                open={isModalEditOpen}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                footer={null}
                className="modalEditStyle"
              >
                <div className="h-[400px]">
                  <h2 className="m-0 sticky top-0 w-full z-10 text-white">
                    Danh sách watchlist của bạn
                  </h2>
                  <div className="h-[365px] overflow-y-auto">
                    {watchlists.map((item, index) => (
                      <div key={index}>
                        {index === editingIndex ? (
                          <div className="flex w-full">
                            <div className="w-[70%] flex items-center py-3 px-2">
                              <input
                                type="text"
                                value={editValue}
                                autoFocus
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleEditConfirm(item);
                                  }
                                }}
                                className="w-full h-[25px] focus:outline-0"
                              />
                            </div>
                            <div className="w-[30%] flex items-center">
                              <div className="mr-2">
                                <Button
                                  variant="contained"
                                  onClick={() => handleEditConfirm(item)}
                                >
                                  <FaCheck />
                                </Button>
                              </div>
                              <div>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleCancelEdit()}
                                >
                                  <FaX />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <p
                              className="w-[70%] py-[5px] px-[10px] m-2 bg-[#9DC4FF] text-[15px] cursor-pointer"
                              onDoubleClick={() => handleToggleEdit(index)}
                            >
                              {item.name}
                            </p>
                            <div className="flex items-center w-[30%]">
                              <div className="mr-2">
                                <Button
                                  variant="contained"
                                  onClick={() => handleToggleEdit(index)}
                                >
                                  <AiFillEdit />
                                </Button>
                              </div>
                              <div>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDeleteWatchlist(item.id)}
                                >
                                  <AiOutlineDelete />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Modal>
            </div>
          ),
        },
      ],
    },
  ];

  //selected watchlist
  const handleWatchlistClick = async (id) => {
    setLoadingTb(true);
    const clickedWatchlist = watchlists.find(
      (watchlist) => watchlist.id === id
    );
    // Check if the watchlist object exists
    if (clickedWatchlist) {
      // Set the selectedWatchlist state to the name
      setWatchlistActive(clickedWatchlist);
      localStorage.setItem("watchlistActive", JSON.stringify(clickedWatchlist));
      setIsOpen(false);
      setActiveKey("0");

      await getDataTable(clickedWatchlist.id);
      setLoadingTb(false);
    }
  };

  //search add code
  const handleAddCode = async (code) => {
    if (watchlistActive) {
      setLoadingTb(true);
      let updatedCodes;
      let newData;

      if (watchlistActive.code.includes(code)) {
        // If the code already exists, remove it
        updatedCodes = watchlistActive.code.filter((c) => c !== code);

        // Remove the code from data
        setData(data.filter((record) => record.code !== code));
      } else {
        // If the code doesn't exist, add it
        updatedCodes = [...watchlistActive.code, code];

        // Fetch new data for the added code
        newData = await getApi(apiUrl, `/api/v1/watchlist/data?stock=${code}`);
        const newKey = data.length + 1;
        newData = { ...newData, key: newKey };
      }

      const updatedWatchlist = {
        ...watchlistActive,
        code: updatedCodes,
      };

      // Update state and localStorage
      setWatchlistActive(updatedWatchlist);
      localStorage.setItem("watchlistActive", JSON.stringify(updatedWatchlist));

      // Update data state
      if (newData) {
        // If new data is fetched, merge it with current data
        setData((prevData) => [...prevData, newData]);
      }

      setLoadingTb(false);
      await postApi(apiUrl, "/api/v1/watchlist/update", updatedWatchlist);
    }
  };

  const handleEnterPress = async () => {
    if (dataSearch.length > 0) {
      if (watchlistActive) {
        setLoadingTb(true);
        let updatedCodes;
        let newData;

        if (watchlistActive.code.includes(dataSearch[0].code)) {
          // If the code already exists, remove it
          updatedCodes = watchlistActive.code.filter(
            (c) => c !== dataSearch[0].code
          );

          // Remove the code from data
          setData(data.filter((record) => record.code !== dataSearch[0].code));
        } else {
          // If the code doesn't exist, add it
          updatedCodes = [...watchlistActive.code, dataSearch[0].code];

          // Fetch new data for the added code
          newData = await getApi(
            apiUrl,
            `/api/v1/watchlist/data?stock=${dataSearch[0].code}`
          );
          const newKey = data.length + 1;
          newData = { ...newData, key: newKey };
        }

        const updatedWatchlist = {
          ...watchlistActive,
          code: updatedCodes,
        };

        // Update state and localStorage
        setWatchlistActive(updatedWatchlist);
        localStorage.setItem(
          "watchlistActive",
          JSON.stringify(updatedWatchlist)
        );

        // Update data state
        if (newData) {
          // If new data is fetched, merge it with current data
          setData((prevData) => [...prevData, newData]);
        }

        setLoadingTb(false);
        await postApi(apiUrl, "/api/v1/watchlist/update", updatedWatchlist);
      }
    }
  };

  //del code
  const handleDelCodeInWatchlist = async (item) => {
    if (watchlistActive) {
      // Xoá item khỏi mảng code
      const updatedCodes = watchlistActive.code.filter(
        (codeItem) => codeItem !== item
      );
      const updatedWatchlist = {
        ...watchlistActive,
        code: updatedCodes,
      };
      // Cập nhật lại watchlistActive
      setWatchlistActive(updatedWatchlist);
      localStorage.setItem("watchlistActive", JSON.stringify(updatedWatchlist));
      await postApi(apiUrl, "/api/v1/watchlist/update", updatedWatchlist);
      setData(data.filter((record) => record.code !== item));
    }
  };

  //tab
  const [activeKey, setActiveKey] = useState("0");

  const itemsTab = [
    {
      key: "0",
      label: "home",
      children: (
        <TableBase
          loading={loading}
          loadingTb={loadingTb}
          data={data}
          handleDelCodeInWatchlist={handleDelCodeInWatchlist}
        />
      ),
    },
    {
      key: "1",
      label: "Thống kê",
      children: (
        <TableStatistical
          loadingTb={loadingTb}
          data={data}
          handleDelCodeInWatchlist={handleDelCodeInWatchlist}
        />
      ),
    },
    {
      key: "2",
      label: "Cơ bản",
      children: (
        <TableBasic
          loadingTb={loadingTb}
          data={data}
          handleDelCodeInWatchlist={handleDelCodeInWatchlist}
        />
      ),
    },
    {
      key: "3",
      label: "Kỹ thuật",
      children: (
        <TableTechnique
          loadingTb={loadingTb}
          data={data}
          handleDelCodeInWatchlist={handleDelCodeInWatchlist}
        />
      ),
    },
    {
      key: "4",
      label: "Tín hiệu cảnh báo",
      children: (
        <TableSignalWarning
          loadingTb={loadingTb}
          data={data}
          handleDelCodeInWatchlist={handleDelCodeInWatchlist}
        />
      ),
    },
    {
      key: "5",
      label: "Tin tức",
      children: (
        <TableNews
          loadingTb={loadingTb}
          data={data}
          handleDelCodeInWatchlist={handleDelCodeInWatchlist}
        />
      ),
    },
  ];

  const setActiveTab = (key) => {
    setActiveKey(key);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  const fetchDataAndDownloadCSV = async () => {
    try {
      // Gọi API để lấy dữ liệu
      const data = await getApi(
        apiUrl,
        `/api/v1/watchlist/${watchlistActive.id}`
      );

      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = data.map(prepareData);
      const sheet2Data = data.map(prepareData2);
      const sheet3Data = data.map(prepareData3);
      const sheet4Data = data.map(prepareData4);

      // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // Tạo sheet 1
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet1Title, ...sheet1Data]),
        watchlistActive.name
      );

      // Tạo sheet 2
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet2Title, ...sheet2Data]),
        "Thống kê"
      );

      // Tạo sheet 3
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet3Title, ...sheet3Data]),
        "Cơ bản"
      );

      // Tạo sheet 4
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet4Title, ...sheet4Data]),
        "Kỹ thuật"
      );

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `dataWatchlist_${watchlistActive.name}.xlsx`);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  useEffect(() => {
    const addDivToTabsNavList = () => {
      const tabsNavList =
        document.getElementsByClassName("ant-tabs-nav-list")[0]; // Get the first element with class "ant-tabs-nav-list"

      if (tabsNavList) {
        // Check if tabsNavList exists
        const divElement = document.createElement("div"); // Create a new div element
        divElement.innerHTML = `
          <div class="bg-[#96C6FF] py-[11px] px-[18.5px] self-center cursor-pointer flex w-fit">
            <Tooltip placement="top" title="<span class=''>Xuất dữ liệu ra Excel</span>" color="linear-gradient(to bottom, #E6EFF9, #61A6F6)">
              <img src="${icon_excel}" alt="icon_excel" />
            </Tooltip>
          </div>
          <div class="absolute w-[64px] h-[1px] bg-[#94C7F6]"></div>
        `; // Set the innerHTML of the div
        divElement.querySelector("div").addEventListener("click", fetchDataAndDownloadCSV); // Add event listener to the created div

        tabsNavList.appendChild(divElement); // Append the div to the tabsNavList
      } else {
        console.error("ant-tabs-nav-list not found");
      }
    };
    
    addDivToTabsNavList(); // Call the function to add the div
  }, []);

  return (
    <div>
      {contextHolder}
      <div className="p-[40px]">
        <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] w-[410px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
          Danh mục theo dõi
        </div>
        <div className="pt-1">
          <div className="text-[#073882] text-[15px] font-bold w-fit pb-1">
            Thêm mã CP vào watchlist
          </div>
          <div className="inputSearch w-[410px]">
            <Input
              maxLength={5}
              placeholder="Search"
              addonBefore={<SearchOutlined />}
              allowClear
              onChange={({ currentTarget }) => {
                setValStock(currentTarget.value);
              }}
              onPressEnter={handleEnterPress}
              onFocus={() => {
                setIsFocus(true);
              }}
            />
            {dataSearch?.length > 0 && isFocus && (
              <div
                ref={wrapperRef}
                className="z-40 absolute w-[410px] h-[300px] top-[145px] left-[40px] bg-[#94c7f6] shadow-lg p-3 rounded-bl-xl rounded-br-xl overflow-y-auto"
              >
                {dataSearch?.map((item, index) => {
                  const isFirstItem = index === 0;

                  return (
                    <div
                      onClick={() => {
                        handleAddCode(item.code);
                      }}
                      key={index}
                      className={`${
                        isFirstItem ? "bg-[#0000000a]" : "bg-transparent"
                      } text-black justify-between items-center border-solid border border-b-2 border-t-0 border-x-0 border-white/50  p-2 hover:bg-[#0000000a] duration-500 cursor-pointer`}
                    >
                      <div className="font-semibold flex">
                        <div className="w-[50px]">{item.code}</div>
                        {watchlistActive &&
                          watchlistActive.code.includes(item.code) && (
                            <FaCheck />
                          )}
                      </div>
                      <div className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.company_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="w-[216px] h-[48px] mt-[15px] z-30 absolute">
            <Dropdown
              open={isOpen}
              menu={{
                items,
              }}
            >
              <div
                className={`${
                  activeKey === "0"
                    ? "bg-[#073882] text-[#ffba07]"
                    : "bg-[#96C6FF] text-[#073882]"
                } h-full flex text-center items-center justify-center cursor-pointer`}
              >
                <span
                  className="font-semibold text-lg w-[140px] whitespace-nowrap overflow-hidden text-ellipsis mr-3 hover:text-[#4096ff]"
                  onClick={() => setActiveTab("0")}
                >
                  {watchlistActive?.name}
                </span>
                <IoCaretDownSharp
                  className={`${
                    activeKey === "0"
                      ? "text-[#94C7F6] hover:text-[#4096ff]"
                      : "text-[#073882] hover:text-[#4096ff]"
                  } text-lg`}
                  onClick={showDropdown}
                />
              </div>
            </Dropdown>
          </div>
          <div className="absolute top-[161px] tab-watchlist">
            <Tabs
              defaultActiveKey="0"
              items={itemsTab}
              activeKey={activeKey}
              onChange={onChange}
            />
          </div>
          {/* <div className="absolute top-[161px] 2xl:right-[520px] xl:right-[40px] lg:-right-[375px] md:-right-[631px] sm:-right-[974px] xs:-right-[1024px] xxs:-right-[1079px]">
            <div
              className="bg-[#96C6FF] py-[11px] px-[18.5px] self-center cursor-pointer flex w-fit"
              onClick={fetchDataAndDownloadCSV}
            >
              <Tooltip
                placement="top"
                title={<span className="">Xuất dữ liệu ra Excel</span>}
                color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
              >
                <img src={icon_excel} alt="icon_excel" />
              </Tooltip>
            </div>
            <div className="absolute w-[64px] h-[1px] bg-[#94C7F6]"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeWatchList;
