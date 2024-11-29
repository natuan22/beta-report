import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Tooltip, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { postApi } from "../../../helper/postApi";
const { TextArea } = Input;

const ModalEdit = ({ dataEdit, isModalEditOpen, setIsModalEditOpen, dataCategories, fetchDataCategories }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [checked, setChecked] = useState(false);
  const [disableTreeSelect, setDisableTreeSelect] = useState(false);

  const warning = (text, type) => { messageApi.open({ type, content: text }) };

  const handleEditOk = () => { setIsModalEditOpen(false) };
  const handleEditCancel = () => { setIsModalEditOpen(false) };
  const onCheckboxChange = (e) => { setChecked(e.target.checked) };

  const onFinish = async (values) => {
    const transformedValues = {
      id: dataEdit.id,
      name: values.name,
      description: values.description,
      parent_id: values.parent_id || null,
      published: checked ? 1 : 0,
    };

    try {
      const newCategory = await postApi("/api/v1/blogs/category/update", transformedValues);

      if (newCategory?.id) {
        fetchDataCategories();
        warning(`Chỉnh sửa danh mục ${newCategory.name} thành công`, "success");
        form.resetFields();
        setIsModalEditOpen(false);
      } else {
        warning(newCategory.message || "Không thể tạo danh mục", "warning");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      warning("Đã có lỗi xảy ra khi tạo danh mục. Vui lòng thử lại.", "error");
    }
  };

  useEffect(() => {
    if (dataEdit) {
      const { published, parent_id, name, description } = dataEdit;
      setChecked(published === 1);
      setDisableTreeSelect(parent_id === null);

      form.setFieldsValue({ name, description, parent_id });
    }
  }, [dataEdit, form]);

  return (
    <div>
      {contextHolder}
      <Modal
        centered
        width={950}
        open={isModalEditOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
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
                rules={[{ required: true, message: "Name of category is required!" }]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
              <Form.Item label="Mô tả" name="description">
                <TextArea
                  style={{ resize: "none" }}
                  rows={8}
                  placeholder="Mô tả ngắn cho danh mục"
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
                  disabled={disableTreeSelect}
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="published"
                    valuePropName="checked"
                    label={null}
                  >
                    <Tooltip
                      placement="right"
                      title="Lựa chọn ẩn hoặc hiển thị danh mục"
                    >
                      <Checkbox checked={checked} onChange={onCheckboxChange}>
                        Xuất bản
                      </Checkbox>
                    </Tooltip>
                  </Form.Item>
                </Col>
                <Col
                  span={12}
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

export default ModalEdit;
