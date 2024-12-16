import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Tooltip,
  TreeSelect,
} from "antd";
import React, { useState } from "react";
import { postApi } from "../../../helper/postApi";
const { TextArea } = Input;

const ModalAdd = ({ dataCategories, fetchDataCategories }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [form] = Form.useForm();

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };
  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };
  const warning = (text, type) => {
    messageApi.open({ type, content: text });
  };

  const [checked, setChecked] = useState(false);
  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const onFinish = async (values) => {
    const transformedValues = {
      name: values.name,
      description: values.description,
      parent_id: values.parent_id || null,
      published: checked ? 1 : 0,
    };

    try {
      const newCategory = await postApi(
        "/api/v1/blogs-admin/category/create",
        transformedValues
      );

      if (newCategory?.id) {
        fetchDataCategories();
        warning(`Tạo danh mục ${newCategory.name} thành công`, "success");
        form.resetFields();
        setIsModalAddOpen(false);
      } else {
        warning(newCategory.message || "Không thể tạo danh mục", "warning");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      warning("Đã có lỗi xảy ra khi tạo danh mục. Vui lòng thử lại.", "error");
    }
  };

  return (
    <div>
      {contextHolder}
      <button
        className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
        onClick={showModalAdd}
      >
        <svg
          className="fill-current shrink-0 xs:hidden"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="max-xs:sr-only">Tạo Danh mục</span>
      </button>
      <Modal
        centered
        width={950}
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={null}
        className="blogs-modal"
      >
        <div className="h-[530px] bg-white dark:bg-gray-800 rounded-md">
          <div className="p-14">
            <Form
              form={form}
              name="form-blogs"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              onFinish={onFinish}
              size="large"
              autoComplete="off"
            >
              <Form.Item
                label="Tên danh mục"
                name="name"
                rules={[
                  { required: true, message: "Name of category is required!" },
                ]}
              >
                <Input
                  placeholder="Nhập tên danh mục"
                  showCount
                  maxLength={255}
                />
              </Form.Item>
              <Form.Item label="Mô tả" name="description">
                <TextArea
                  style={{ resize: "none" }}
                  rows={8}
                  placeholder="Mô tả ngắn cho danh mục"
                  showCount
                  maxLength={255}
                />
              </Form.Item>
              <Form.Item label="Danh mục cha" name="parent_id">
                <TreeSelect
                  treeData={dataCategories?.map((item) => ({
                    title: item.name,
                    value: item.id,
                  }))}
                  allowClear
                  placeholder="Chọn danh mục cha"
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={3}></Col>
                <Col span={10}>
                  <Form.Item
                    name="published"
                    valuePropName="checked"
                    label={null}
                  >
                    <Tooltip
                      placement="right"
                      title={<div>Lựa chọn ẩn hoặc hiển thị danh mục</div>}
                    >
                      <Checkbox checked={checked} onChange={onCheckboxChange}>
                        Xuất bản
                      </Checkbox>
                    </Tooltip>
                  </Form.Item>
                </Col>
                <Col
                  span={11}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAdd;
