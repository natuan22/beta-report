import { PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Checkbox, Form, Input, message, Select, Tooltip, TreeSelect, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../../helper/getApi";
import { postApi } from "../../../helper/postApi";
import { resourceURL } from "../../../services/configService";
import { formatTitle } from "../../../helper/formatTitleBlogs";

const AddPost = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [dataTags, setDataTags] = useState();
  const [dataCategories, setDataCategories] = useState();

  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState();

  const fetchDataTagsAndCategories = async () => {
    try {
      const dataTags = await getApi(`/api/v1/blogs/tag`);
      setDataTags(dataTags);

      const dataCategories = await getApi(`/api/v1/blogs/category`);
      const allChildren = dataCategories.filter((item) => item.children && item.children.length > 0).map((item) => item.children).flat();
      setDataCategories(allChildren);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTagsAndCategories();
  }, []);

  const warning = (text, type) => {
    messageApi.open({ type, content: text });
  };

  const saveDataAndFile = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail);
    formData.append("published", Number(data.published));
    formData.append("category_id", Number(data.category_id));
    data.tags.forEach((tag) => { formData.append("tags[]", tag) });

    // Gửi yêu cầu POST
    const res = await postApi(`/api/v1/blogs/post/create`, formData);
    return res;
  };

  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      thumbnail: null,
      published: 0,
      category_id: null,
      tags: [],
    },
    onSubmit: async (values) => {
      try {
        const payload = { ...values, published: values.published ? 1 : 0 };
        const newPost = await saveDataAndFile(payload);

        if (newPost.id) {
          warning(`Tạo bài viết ${newPost.title} thành công`, "success");

          setTimeout(() => {
            navigate("/admin-blogs/bai-viet");
          }, 1000); // Trì hoãn 2 giây
        } else {
          warning(newPost.message || "Không thể thêm bài viết", "warning");
        }
      } catch (err) {
        console.error("Error creating post:", err);
        warning(
          "Đã có lỗi xảy ra khi thêm bài viết. Vui lòng thử lại.",
          "error"
        );
      }
    },
  });

  const handleChangeFile = (e) => {
    const file = e.file
    if (file)
      if (file?.type === "image/png" || file?.type === "image/jpeg" || file?.type === "image/gif") {
        setFieldValue("thumbnail", file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setThumbnail(e.target.result)
        }
      } else {
        warning("File không đúng định dạng!", "error");
      }
  };

  const handleImageUpload = (blobInfo) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', blobInfo.blob());
      
      postApi(`/api/v1/blogs/post/content-image-upload`, formData).then((result) => {
        if (result && result.urls && Array.isArray(result.urls) && result.urls.length > 0) {
          resolve(`${resourceURL}${result.urls[0]}`);
        } else {
          reject("Image upload failed");
        }
      }).catch((error) => {
        reject("Image upload failed", error);
      });
    });
  }

  const handlePreview = () => {
    const title = form.getFieldValue('title');
    const description = form.getFieldValue('description');
    const tags = form.getFieldValue('tags');
    const category = dataCategories.find((item) => item.id === form.getFieldValue('category_id'));

    if (!title || title.trim() === '') {
      warning('Vui lòng nhập tiêu đề bài viết!', 'error')
      return;
    }

    localStorage.setItem('previewPost', JSON.stringify({ title, description, content, thumbnail, category, tags, from: 'add' }))

    const previewUrl = `/admin-blogs/bai-viet/preview/${formatTitle(title)}`;
    window.open(previewUrl, '_blank');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {contextHolder}
      {/* Add Post actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Thêm bài viết
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
      </div>

      {/* Content */}
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-5">
          <Form
            form={form}
            name="form-blogs"
            onSubmitCapture={handleSubmit}
            size="large"
            autoComplete="off"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Title, Description */}
              <div className="col-span-2">
                <Form.Item
                  labelCol={{ span: 2 }}
                  label="Tiêu đề"
                  name="title"
                  rules={[ { required: true, message: "Title of post is required!" } ]}
                >
                  <Input
                    placeholder="Nhập tiêu đề bài viết"
                    onChange={(e) => { handleChange({ target: { name: "title", value: e.target.value } }) }}
                    showCount
                    maxLength={255}
                  />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 2 }}
                  label="Mô tả"
                  name="description"
                  rules={[ { required: true, message: "Description of post is required!" } ]}
                >
                  <TextArea
                    style={{ resize: "none" }}
                    rows={3}
                    placeholder="Nhập mô tả bài viết"
                    showCount
                    maxLength={255}
                    onChange={(e) => { handleChange({ target: { name: "description", value: e.target.value } }) }}
                  />
                </Form.Item>
              </div>

              {/* Thumbnail */}
              <div>
                <Form.Item
                  labelCol={{ span: 5 }}
                  label="Ảnh đại diện"
                  valuePropName="thumbnail"
                >
                  <Upload listType="picture-card" beforeUpload={() => false} onChange={handleChangeFile} maxCount={1}>
                    <button style={{ border: 0, background: "none" }} type="button">
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải ảnh</div>
                    </button>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            {/* Content */}
            <div>
              <Form.Item
                className="h-[302px]"
                label="Nội dung"
                name="content"
                rules={[ { required: true, message: "Content of post is required!" } ]}
              >
                <Editor
                  value={content}
                  tinymceScriptSrc={`/tinymce/js/tinymce/tinymce.min.js`}
                  licenseKey='gpl'
                  init={{
                    height: 302,
                    resize: false,
                    menubar: false,
                    branding: false,
                    plugins: [
                      "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace",
                      "visualblocks", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount", "emoticons", 'image'
                    ],
                    toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image media table | align lineheight | bullist numlist outdent indent | emoticons charmap removeformat | fullscreen",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    images_upload_handler: handleImageUpload,
                  }}
                  onEditorChange={(content, editor) => {
                    handleChange({ target: { name: "content", value: content } });
                    setContent(content)
                    form.setFieldValue("content", content === "" ? undefined : content);
                    if (!content || content.trim() === "") { form.validateFields(["content"]) }
                  }}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Category_id, Tags */}
              <div className="col-span-2">
                <Form.Item
                  label="Danh mục"
                  name="category_id"
                  rules={[ { required: true, message: "Category of post is required!" } ]}
                >
                  <TreeSelect
                    allowClear
                    treeData={dataCategories?.map((item) => ({ title: item.name, value: item.id }))}
                    placeholder="Chọn danh mục cho bài viết"
                    onChange={(value) => { handleChange({ target: { name: "category_id", value: value } }) }}
                  />
                </Form.Item>

                <Form.Item labelCol={{ span: 2 }} label="Tags" name="tags">
                  <Select
                    allowClear
                    popupClassName="blogs-post-dropdown"
                    mode="tags"
                    style={{ width: "100%"  }}
                    placeholder="Tags"
                    onChange={(value) => { handleChange({ target: { name: "tags", value: value } }) }}
                    options={dataTags?.length > 0 ? dataTags.map((item) => ({ value: item.name, label: item.name })) : []}
                  />
                </Form.Item>
              </div>

              {/* Published, Preview, Save */}
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7">
                  <Form.Item name="published" valuePropName="checked" label={null}>
                    <Tooltip placement="right" title={<div>Lựa chọn ẩn hoặc hiển thị bài viết</div>}>
                      <Checkbox onChange={(e) => { handleChange({ target: { name: "published", value: e.target.checked } }) }}> Xuất bản </Checkbox>
                    </Tooltip>
                  </Form.Item>
                </div>
                <div className="col-span-3">
                  <Button type="primary" ghost onClick={handlePreview}>Xem trước</Button>
                </div>
                <div className="col-span-2">
                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;