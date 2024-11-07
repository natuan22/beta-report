import { Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { postApi } from "../../../helper/postApi";

const { TextArea } = Input;

const FormInput = ({
  onSubmitSuccess,
  handleOk,
  getImgFromInput,
  query,
  queryImg,
  warning,
}) => {
  const saveDataAndFile = async (data) => {
    const formData = new FormData();
    // Thêm dữ liệu văn bản
    const arrText = [data.text1, data.text2];
    arrText.forEach((text, index) => {
      formData.append(`text[${index}]`, text);
    });
    // Thêm các trường khác
    formData.append("img", data.img);

    // Gửi yêu cầu POST
    await postApi(
      `/api/v1/report/luu-nhan-dinh-thi-truong-${query}`,
      formData
    );
  };

  const [imgSrc, setImgSrc] = useState(null);
  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      text1: "",
      text2: "",
      img: {},
    },
    onSubmit: async (values) => {
      try {
        const res = await saveDataAndFile(values);
        const res3 = await onSubmitSuccess();
      } catch (err) {
        console.error(err);
      }

      handleOk();
      warning("success", "Thêm hình và nhận định thành công");
    },
  });
  const handleChangeFile = (e) => {
    // lấy ra file từ event
    let file = e.target.files[0];
    // tạo đối tượng để đọc file
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result)
        setImgSrc(e.target.result); // set hình base64
        getImgFromInput(e.target.result);
      };
      // console.log("file", file);
      // truyền dữ liệu lên form
      setFieldValue("img", file);
    }
  };
  return (
    <div className="flex flex-col items-center  w-full">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          width: 1000,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Đoạn 1">
          <TextArea
            name="text1"
            onChange={handleChange}
            placeholder="Nhận định 1"
            rows={4}
            style={{
              height: 200,
            }}
          />
        </Form.Item>
        <Form.Item label="Đoạn 2">
          <TextArea
            name="text2"
            onChange={handleChange}
            placeholder="Nhận định 2"
            style={{
              height: 200,
            }}
            rows={4}
          />
        </Form.Item>
        <Form.Item label="Ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/gif"
          />
          <br />
          <img src={imgSrc} alt="imgFilm" width="200px" height="150px" />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button
            type="submit"
            class="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl border-0     font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Thêm
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormInput;
