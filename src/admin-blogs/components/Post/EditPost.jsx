import { PlusOutlined } from "@ant-design/icons";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Checkbox, Form, Input, message, Modal, Select, Tooltip, TreeSelect, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatTitle } from "../../../helper/formatTitleBlogs";
import { getApi } from "../../../helper/getApi";
import { postApi } from "../../../helper/postApi";
import { resourceURL } from "../../../services/configService";
import moment from "moment";

const EditPost = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    content: "",
    thumbnail: null,
    published: 0,
    category_id: null,
    tags: [],
    scheduledAt: null,
  });

  const [dataPost, setDataPost] = useState();
  const [dataTags, setDataTags] = useState();
  const [dataCategories, setDataCategories] = useState();

  const [filelist, setFileList] = useState();
  const [checked, setChecked] = useState(false);
  const [scheduledAt, setScheduledAt] = useState(null);
  const [content, setContent] = useState();
  const [thumbnail, setThumbnail] = useState();

  const onCheckboxChange = (e) => { setChecked(e.target.checked) };

  const [submitted, setSubmitted] = useState(false);

  const warning = (text, type) => { messageApi.open({ type, content: text }) };

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

  const fetchDataPost = async () => {
    try {
      const dataPost = await getApi(`/api/v1/blogs/post/${id}`);
      setDataPost(dataPost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTagsAndCategories();
    fetchDataPost();
  }, []);

  useEffect(() => {
    if (dataPost) {
      const { title, description, content, published, scheduledAt: postScheduledAt } = dataPost;
      const category_id = dataPost.category.id;
      const tags = dataPost.tags.map((item) => item.name);

      setInitialValues({
        title: dataPost.title || "",
        description: dataPost.description || "",
        content: dataPost.content || "",
        thumbnail: dataPost.thumbnail || null,
        published: dataPost.published || 0,
        category_id: dataPost.category?.id || null,
        tags: dataPost.tags?.map((tag) => tag.name) || [],
        scheduledAt: dataPost.scheduledAt,
      });

      setContent(dataPost.content);
      setChecked(published === 1);
      setScheduledAt(postScheduledAt ? dayjs(postScheduledAt) : null);

      setFileList([{ uid: "-1", name: "thumbnail.png", status: "done", url: `${resourceURL}${dataPost.thumbnail}` }]);
      setFieldValue("thumbnail", dataPost.thumbnail);
      setThumbnail(`${resourceURL}${dataPost.thumbnail}`);

      form.setFieldsValue({ title, description, content, published, category_id, tags, scheduledAt: dayjs(postScheduledAt) });
    }
  }, [dataPost, form]);

  const saveDataAndFile = async (data) => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail);
    formData.append("published", Number(data.published));
    formData.append("category_id", Number(data.category_id));
    if (scheduledAt) { formData.append("scheduledAt", scheduledAt) }
    data.tags.forEach((tag) => { formData.append("tags[]", tag) });

    // Gửi yêu cầu POST
    const res = await postApi(`/api/v1/blogs/post/update`, formData);
    return res;
  };

  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload = { ...values, published: checked ? 1 : 0 };
        const editPost = await saveDataAndFile(payload);

        if (editPost.id) {
          warning(`Chỉnh sửa bài viết ${editPost.title} thành công`, "success");
          setSubmitted(true);
          openModal();
        } else {
          warning(editPost.message || "Không thể chỉnh sửa bài viết", "warning");
        }
      } catch (err) {
        console.error("Error creating post:", err);
        warning("Đã có lỗi xảy ra khi thêm bài viết. Vui lòng thử lại.", "error");
      }
    },
  });

  const openModal = () => {
    let countdown = 5;
    const navigateTimer = setTimeout(() => {
      navigate("/admin-blogs/bai-viet");
      modal.destroy();
    }, countdown * 1000);

    const modal = Modal.confirm({
      title: "Thông báo",
      content: `Bạn sẽ được điều hướng đến trang quản lý bài viết trong ${countdown} giây.`,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        clearTimeout(navigateTimer);
        navigate("/admin-blogs/bai-viet");
        modal.destroy();
      },
      onCancel() {
        clearTimeout(navigateTimer);
        modal.destroy();
      },
      afterClose() {
        clearTimeout(navigateTimer);
        clearInterval(interval);
      },
    });

    // Cập nhật nội dung modal mỗi giây
    const interval = setInterval(() => {
      countdown -= 1;
      // Kiểm tra sự tồn tại của modal trước khi thay đổi nội dung
      const modalContent = document.querySelector(".ant-modal-confirm-content");
      if (modalContent) {
        modalContent.textContent = `Bạn sẽ được điều hướng đến trang quản lý bài viết trong ${countdown} giây.`;
      }
      if (countdown <= 0) {
        clearInterval(interval); // Dừng cập nhật khi đếm ngược kết thúc
      }
    }, 1000);
  };

  const handleChangeFile = (e) => {
    const file = e.fileList[0]?.originFileObj;
    if (file) {
      if (file?.type === "image/png" || file?.type === "image/jpeg" || file?.type === "image/gif") {
        setFieldValue("thumbnail", file);
        setFileList(e.fileList);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setThumbnail(e.target.result);
        };
      } else {
        warning("File không đúng định dạng!", "error");
      }
    } else {
      setFieldValue("thumbnail", null);
      setFileList(e.fileList);
    }
  };

  const handleImageUpload = (blobInfo) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", blobInfo.blob());

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
  };

  const handleDateScheduledAt = (e) => { setScheduledAt(e ? dayjs(e).toISOString() : null) };

  const handlePreview = () => {
    const title = form.getFieldValue("title");
    const category = dataCategories.find((item) => item.id === form.getFieldValue("category_id"));
    localStorage.setItem("previewPost", JSON.stringify({ ...form.getFieldValue(), content, id, thumbnail, category, from: submitted ? "editOnSave" : "editNoSave" }));
    
    if (!title || title.trim() === "") {
      warning("Vui lòng nhập tiêu đề bài viết!", "error");
      return;
    }

    const previewUrl = `/admin-blogs/bai-viet/preview/${formatTitle(title)}/${id}`;
    window.open(previewUrl, "_blank");
  };

  const renderLabel = (label, required = false, gird) => (
    <div className={`text-gray-600 dark:text-gray-400 text-[14px] font-semibold h-[30px] content-center ${gird} ${required ? "item-required" : ""}`}>{label}</div>
  );

  const [isModalScheduleAt, setIsModalScheduleAt] = useState(false);

  const showModalScheduleAt = () => { setIsModalScheduleAt(true) };
  const handleScheduleAtOk = () => { setIsModalScheduleAt(false) };
  const handleScheduleAtCancel = () => { setIsModalScheduleAt(false) };

  return (
    <div className="p-4 w-full max-w-9xl mx-auto">
      {contextHolder}
      {/* Edit Post actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Chỉnh sửa bài viết
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
            <div className="grid xl:grid-cols-12 lg:grid-cols-none gap-5">
              <div className="xl:col-span-8 lg:col-span-full">
                {/* Title */}
                <div className="grid lg:grid-cols-12 md:grid-cols-none">
                  {renderLabel('Tiêu đề', true, 'col-span-1')}
                  <Form.Item className="col-span-11" name="title" rules={[{ required: true, message: "Title of post is required!" }]}>
                    <Input
                      placeholder="Nhập tiêu đề bài viết"
                      onChange={(e) => { handleChange({ target: { name: "title", value: e.target.value } })}}
                      showCount
                      maxLength={255}
                    />
                  </Form.Item>
                </div>

                {/* Description */}
                <div className="grid lg:grid-cols-12 md:grid-cols-none">
                  {renderLabel('Mô tả', true, 'col-span-1')}
                  <Form.Item className="col-span-11" name="description" rules={[{ required: true, message: "Description of post is required!" }]}>
                    <TextArea
                      style={{ resize: "none" }}
                      rows={3}
                      placeholder="Nhập mô tả bài viết"
                      showCount
                      maxLength={255}
                      onChange={(e) => { handleChange({ target: { name: "description", value: e.target.value } })}}
                    />
                  </Form.Item>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-12 md:grid-cols-none">
                  {renderLabel('Nội dung', true, 'col-span-1')}
                  <Form.Item className="h-[400px] col-span-11" name="content" rules={[{ required: true, message: "Content of post is required!" }]}>
                    <Editor
                      value={content}
                      tinymceScriptSrc={`/assets/tinymce/js/tinymce/tinymce.min.js`}
                      licenseKey="gpl"
                      init={{
                        height: 400,
                        resize: false,
                        menubar: false,
                        branding: false,
                        plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount", "emoticons", "image" ],
                        toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image media table | align lineheight | bullist numlist outdent indent | emoticons charmap removeformat | fullscreen",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        images_upload_handler: handleImageUpload,
                      }}
                      onEditorChange={(content, editor) => {
                        handleChange({ target: { name: "content", value: content }});
                        form.setFieldValue("content", content === "" ? undefined : content);
                        setContent(content);
                        if (!content || content.trim() === "") { form.validateFields(["content"]) }
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="xl:col-span-4 lg:col-span-full relative xl:block lg:grid grid-cols-2 gap-5">
                <div>
                  {/* Thumbnail */}
                  <div className="grid md:grid-cols-12 sm:grid-cols-none">
                    {renderLabel('Ảnh đại diện', true, 'col-span-3')}
                    <Form.Item className="col-span-9" valuePropName="thumbnail">
                      <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                        fileList={filelist}
                        onChange={handleChangeFile}
                      >
                        <button style={{ border: 0, background: "none" }} type="button">
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Tải ảnh</div>
                        </button>
                      </Upload>
                    </Form.Item>
                  </div>

                  {/* Category_id */}
                  <div className="grid md:grid-cols-12 sm:grid-cols-none">
                    {renderLabel('Danh mục', true, 'col-span-3')}
                    <Form.Item className="col-span-9" name="category_id" rules={[{ required: true, message: "Category of post is required!" }]}>
                      <TreeSelect
                        allowClear
                        treeData={dataCategories?.map((item) => ({ title: item.name, value: item.id }))}
                        placeholder="Chọn danh mục cho bài viết"
                        onChange={(value) => { handleChange({ target: { name: "category_id", value: value }}) }}
                      />
                    </Form.Item>
                  </div>  

                  {/* Tags */}
                  <div className="grid md:grid-cols-12 sm:grid-cols-none">
                    {renderLabel('Tags', false, 'col-span-3')}
                    <Form.Item className="col-span-9" name="tags">
                      <Select
                        allowClear
                        popupClassName="blogs-post-dropdown"
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Tags"
                        onChange={(value) => { handleChange({ target: { name: "tags", value: value } }) }}
                        options={dataTags?.length > 0 ? dataTags.map((item) => ({ value: item.name, label: item.name })) : []}
                        maxTagCount={6}
                      />
                    </Form.Item>
                  </div>
                </div>
                
                <div className="xl:static lg:relative">
                  <div className="xl:absolute bottom-[185px]">
                    {/* Published */} 
                    <Form.Item style={{ marginBottom: '0px' }} name="published" valuePropName="checked">
                      <Tooltip placement="right" title={<div>Lựa chọn ẩn hoặc hiển thị bài viết</div>}>
                        <Checkbox className="font-semibold" checked={checked} onChange={onCheckboxChange}>
                          Xuất bản {""}
                          <i className="underline">{checked && (<span>{`(${moment().format('DD/MM/YYYY HH:mm')})`}</span>)}{!checked && dataPost && dataPost.scheduledAt && (<span>{`(${moment(dataPost.scheduledAt).format('DD/MM/YYYY HH:mm')})`}</span>)}</i>
                        </Checkbox>
                      </Tooltip>
                    </Form.Item>

                    {/* Scheduled At */}
                    <div className={`text-[#1677ff] hover:text-[#59b4ff] text-[15px] h-[40px] content-center ${checked ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={!checked ? showModalScheduleAt : undefined}>
                      Thiết lập ngày cụ thể
                    </div>
                    <Modal 
                      centered
                      width={530}
                      open={isModalScheduleAt}
                      onOk={handleScheduleAtOk}
                      onCancel={handleScheduleAtCancel}
                      footer={null}
                    >
                      <div className="h-[420px]">
                        <Form.Item name="scheduledAt">
                          <StaticDateTimePicker
                            orientation="landscape"
                            format="DD/MM/YYYY hh:mm A"
                            margin="normal"
                            minDate={dayjs()}
                            formatDate={(date) => dayjs(date).format("DD/MM/YYYY hh:mm A")}
                            value={scheduledAt ? dayjs(scheduledAt) : null}
                            onChange={handleDateScheduledAt}
                            disabled={checked}
                            onAccept={(value) => {
                              handleDateScheduledAt(value);
                              setIsModalScheduleAt(false);
                            }}
                            onClose={(e) => setIsModalScheduleAt(!isModalScheduleAt)}
                            slotProps={{ actionBar: { actions: ['clear', 'cancel', 'accept'] }}}
                          />
                        </Form.Item>
                      </div>
                    </Modal>
                  </div>

                  {/*  Preview, Submit */}
                  <div className="lg:absolute lg:mt-0 md:mt-7 sm:mt-7 bottom-0 w-full flex justify-between">
                    <Button type="primary" ghost onClick={handlePreview}>Xem trước</Button>
                    <Form.Item label={null}><Button type="primary" htmlType="submit">Lưu</Button></Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
