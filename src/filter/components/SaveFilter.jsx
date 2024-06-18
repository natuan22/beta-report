import { Button } from "@mui/material";
import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { MdSaveAlt } from "react-icons/md";
import { getApi } from "../../helper/getApi";
import { postApi } from "../../helper/postApi";

const apiUrl = process.env.REACT_APP_BASE_URL;

const SaveFilter = ({ selectedItems, setFilters, filtersActive }) => {
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
      const data = await getApi(apiUrl, "/api/v1/investment/your-filter");

      setFilters(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values) => {
    if (selectedItems.length > 0) {
      await postApi(apiUrl, "/api/v1/investment/save-filter", {
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
    await postApi(apiUrl, `/api/v1/investment/update-filter/${filtersActive.filter_id}`, { name: filtersActive.name, value: selectedItems });

    fetchDataFilters();

    warning("success", `Chỉnh sửa bộ lọc ${filtersActive.name} thành công`);
  };

  return (
    <div>
      {contextHolder}
      {filtersActive === "" ? (
        <Button variant="contained" onClick={showModal}>
          <MdSaveAlt className="w-[25px] h-[25px]" />
          <span className="normal-case pl-1 text-[14px] font-semibold">
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
                  type="submit"
                  variant="text"
                  sx={{
                    fontWeight: 600,
                    color: "#ffba07",
                    fontSize: "18px",
                    textTransform: "none",
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
