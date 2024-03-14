import React, { useState } from "react";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import { https } from "../../../services/configService";
const { TextArea } = Input;

const FormInput = ({
  onSubmitSuccess,
  handleOk,
  getImgFromInput,
  query,
  queryImg,
}) => {
  const saveText = async (text) => {
    try {
      const res = await https.post(
        `/api/v1/report/luu-nhan-dinh-thi-truong-${query}`,
        text
      );
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const saveImg = async (file) => {
    try {
      const res = await https.post(
        `api/v1/report/upload-image-report${queryImg}`,
        file
      );
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const [imgSrc, setImgSrc] = useState(null);
  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      text1: "",
      text2: "",
      img: {},
    },
    onSubmit: async (values) => {
      let arrText = [];

      // Thêm giá trị text1 vào mảng arrText
      arrText.push(values.text1);

      // Thêm giá trị text2 vào mảng arrText
      arrText.push(values.text2);

      // create dataForm
      let formData = new FormData();
      for (let key in values) {
        if (key !== "img") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.img, values.img.name);
        }
      }
      //   console.log("values.img", values.img);
      try {
        const res = await saveText({ text: arrText });
        const res2 = await saveImg(formData);
        const res3 = await onSubmitSuccess();
      } catch (err) {
        console.error(err);
      }

      handleOk();
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
      //   console.log("file", file);
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
