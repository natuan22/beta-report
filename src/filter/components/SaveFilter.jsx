import { Button } from "@mui/material";
import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { MdSaveAlt } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { getApi } from "../../helper/getApi";
import { postApi } from "../../helper/postApi";

const SaveFilter = ({ selectedItems, setFilters, filtersActive, isLogin }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAddOk = () => {
    setIsModalOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalOpen(false);
  };

  const fetchDataFilters = async () => {
    try {
      const data = await getApi("/api/v1/investment/your-filter");

      setFilters(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values) => {
    if (selectedItems.length > 0) {
      await postApi("/api/v1/investment/save-filter", {
        name: values.name,
        value: selectedItems,
      });

      fetchDataFilters();

      warning("success", `Đã thêm bộ lọc ${values.name} thành công`);

      setIsModalOpen(false);
    } else {
      warning("warning", `Hãy thêm các điều kiện vào bộ lọc`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const saveFilter = async () => {
    // Sử dụng SweetAlert để xác nhận việc xóa
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa bộ lọc này?",
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
          `/api/v1/investment/update-filter/${filtersActive.filter_id}`,
          { name: filtersActive.name, value: selectedItems }
        );

        fetchDataFilters();

        warning("success", `Chỉnh sửa bộ lọc ${filtersActive.name} thành công`);
      }
    });
  };

  return (
    <div>
      {contextHolder}
      {filtersActive === "" ? (
        <Button variant="contained" color="mau" onClick={showModal}>
          <MdSaveAlt className="w-[25px] h-[25px] text-white" />
          <span className="normal-case pl-1 text-[14px] font-semibold text-white">
            Lưu bộ lọc
          </span>
        </Button>
      ) : (
        <Button variant="contained" onClick={saveFilter}>
          <MdSaveAlt className="w-[25px] h-[25px]" />
          <span className="normal-case pl-1 text-[14px] font-semibold">
            Lưu chỉnh sửa bộ lọc
          </span>
        </Button>
      )}
      <Modal
        centered
        width={600}
        open={isModalOpen}
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
              Nhập tên bộ lọc
            </p>
            <div className="flex flex-col items-end">
              <Form.Item
                name="name"
                className="inputStyle"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên bộ lọc!",
                  },
                ]}
              >
                <Input placeholder="Tên bộ lọc" allowClear />
              </Form.Item>
              <Form.Item className="btnStyle">
                <Button
                  disabled={isLogin !== process.env.REACT_APP_LG_T}
                  type="submit"
                  variant="text"
                  sx={{
                    fontWeight: 600,
                    color: "#ffba07",
                    fontSize: "18px",
                    textTransform: "none",
                    "&.Mui-disabled": {
                      cursor: "not-allowed",
                      pointerEvents: "auto",
                      color: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  Tạo bộ lọc
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default SaveFilter;
