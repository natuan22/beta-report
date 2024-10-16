import { Button } from "@mui/material";
import { Modal, message } from "antd";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { FaCheck, FaX } from "react-icons/fa6";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { getApi } from "../../helper/getApi";
import { postApi } from "../../helper/postApi";

const ListFilters = ({ filters, filtersActive, catchFiler, setFiltersActive, setFilters, selectedItems }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFilterClick = (id) => {
    const clickedFilter = filters.find((filter) => filter.filter_id === id);
    // Check if the watchlist object exists
    if (clickedFilter) {
      // Set the selectedWatchlist state to the name
      setFiltersActive(clickedFilter);
    }
  };

  const handleAddOk = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    if (editingIndex !== -1) {
      return warning("warning", "Vui lòng hoàn tất chỉnh sửa");
    } else {
      setIsModalOpen(false);
    }
  };

  const handleSeclectFilter = () => {
    if (editingIndex !== -1) {
      return warning("warning", "Vui lòng hoàn tất chỉnh sửa");
    } else {
      catchFiler(filtersActive.value);
      setIsModalOpen(false);
    }
  };

  const fetchDataFilters = async () => {
    try {
      const data = await getApi("/api/v1/investment/your-filter");

      setFilters(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFilter = (filter) => {
    // Sử dụng SweetAlert để xác nhận việc lưu chỉnh sửa
    Swal.fire({
      title: "Bạn chắc chắn muốn lưu chỉnh sửa bộ lọc này?",
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
        await postApi(
          `/api/v1/investment/delete-filter/${filter.filter_id}`
        );
        fetchDataFilters();
        warning("success", `Đã xóa bộ lọc ${filter.name} thành công!`);
      }
    });
  };

  const handleToggleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(filters[index].name);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
  };

  const handleEditConfirm = async (item) => {
    // Xử lý khi người dùng xác nhận chỉnh sửa
    const editedItem = { ...item };
    // Gán giá trị mới cho trường name của editedItem
    editedItem.name = editValue;

    await postApi(`/api/v1/investment/update-filter/${editedItem.filter_id}`, { name: editedItem.name, value: selectedItems });

    warning("success", `Chỉnh sửa thành công bộ lọc`);

    fetchDataFilters();

    setEditingIndex(-1);
    setEditValue("");
  };

  return (
    <div>
      {contextHolder}
      <Button variant="contained" color="mau" onClick={showModal}>
        <HiOutlineDocumentDuplicate className="w-[25px] h-[25px] text-white" />
        <span className="normal-case pl-1 text-[14px] font-semibold text-white">
          Danh sách bộ lọc
        </span>
      </Button>
      <Modal
        centered
        width={600}
        open={isModalOpen}
        onOk={handleAddOk}
        onCancel={handleEditCancel}
        footer={null}
        className="add-conditions"
      >
        <div className="h-[450px]">
          <h2 className="m-0 sticky top-0 w-full z-10 text-white">
            Chọn bộ lọc để xem
          </h2>
          <div className="h-[365px] overflow-y-auto">
            {filters?.map((filter, index) => (
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
                            handleEditConfirm(filter);
                          }
                        }}
                        className="w-full h-[25px] focus:outline-0"
                      />
                    </div>
                    <div className="w-[30%] flex items-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          onClick={() => handleEditConfirm(filter)}
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
                    <div
                      className="py-[5px] px-[10px] m-2 shadowInner bg-[#9DC4FF] text-[15px] cursor-pointer flex w-[70%]"
                      onClick={() => handleFilterClick(filter.filter_id)}
                    >
                      <div className="w-[100%]">{filter.name}</div>
                      {filtersActive &&
                        filter.filter_id === filtersActive.filter_id && (
                          <div>
                            <FaCheck />
                          </div>
                        )}
                    </div>
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
                          onClick={() => handleDeleteFilter(filter)}
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
          <div className="flex justify-end my-5 ml-2 mr-4">
            <div>
              <Button
                disabled={filtersActive === "" ? true : false}
                variant="contained"
                color="xanh"
                onClick={handleSeclectFilter}
                sx={{
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                    backgroundColor: "#9dc4ff",
                  },
                }}
              >
                <span className="normal-case">Xem bộ lọc</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListFilters;
