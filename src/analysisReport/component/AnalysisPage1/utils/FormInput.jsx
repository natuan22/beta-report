import React, { useState } from "react";
import { Form, Input, InputNumber } from "antd";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { postApi } from "../../../../helper/postApi";

const apiUrl = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;

const FormInput = ({
  code,
  onSubmitSuccess,
  handleOk,
  getImgFromInput,
  warning,
}) => {
  const saveDataAndFile = async (data, img) => {
    const formData = new FormData();

    // Thêm dữ liệu văn bản
    const arrText = [data.title, data.text1, data.text2];
    arrText.forEach((text, index) => {
      formData.append(`text[${index}]`, text);
    });

    // Thêm dữ liệu bảng
    const arrTable = [data.s1, data.s2, data.s3, data.r1, data.r2, data.r3];
    arrTable.forEach((text, index) => {
      formData.append(`table[${index}]`, text);
    });

    // Thêm các trường khác
    formData.append("code", code.toUpperCase());
    formData.append("is_sell", data.is_sell);
    formData.append("gia_muc_tieu", data.gia_muc_tieu);
    formData.append("thoi_gian_nam_giu", data.thoi_gian_nam_giu);
    formData.append("gia_ban_dung_lo", data.gia_ban_dung_lo);
    formData.append("gia_khuyen_nghi", data.gia_khuyen_nghi);
    formData.append("analyst_name", data.analyst_name);
    formData.append("img", img);

    // Gửi yêu cầu POST
    await postApi(
      apiUrl,
      `/api/v1/report/luu-thong-tin-bao-cao-ky-thuat`,
      formData
    );
  };

  const [imgSrc, setImgSrc] = useState(null);
  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      code: "",
      is_sell: "",
      thoi_gian_nam_giu: "",
      gia_muc_tieu: 0,
      gia_khuyen_nghi: 0,
      gia_ban_dung_lo: 0,
      img: {},
      text1: "",
      text2: "",
      title: "",
      s1: 0,
      s2: 0,
      s3: 0,
      r1: 0,
      r2: 0,
      r3: 0,
      analyst_name: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await saveDataAndFile(values, values.img);
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
    <Form
      labelCol={{
        span: 6,
      }}
      layout="horizontal"
      onSubmitCapture={handleSubmit}
    >
      <div className="flex justify-evenly mt-10">
        <div className="w-[40%]">
          <Form.Item label="Chuyên viên phân tích">
            <Input
              name="analyst_name"
              onChange={handleChange}
              placeholder="Họ và tên"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item label="Khuyến nghị">
            <Input
              name="is_sell"
              onChange={handleChange}
              placeholder="Khuyến nghị (mua hoặc bán)"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item label="Giá mục tiêu">
            <InputNumber
              name="gia_muc_tieu"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "gia_muc_tieu",
                    value: value,
                  },
                });
              }}
              onKeyDown={(e) => {
                // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                if (
                  !(
                    (e.key >= "0" && e.key <= "9") ||
                    e.key === "Backspace" ||
                    e.key === "Tab"
                  )
                ) {
                  e.preventDefault();
                }
              }}
              style={{
                width: 300,
              }}
            />
            {" đồng/CP"}
          </Form.Item>
          <Form.Item label="Thời gian">
            <Input
              name="thoi_gian_nam_giu"
              onChange={handleChange}
              placeholder="01 tháng"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item label="Giá khuyến nghị">
            <InputNumber
              name="gia_khuyen_nghi"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "gia_khuyen_nghi",
                    value: value,
                  },
                });
              }}
              onKeyDown={(e) => {
                // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                if (
                  !(
                    (e.key >= "0" && e.key <= "9") ||
                    e.key === "Backspace" ||
                    e.key === "Tab"
                  )
                ) {
                  e.preventDefault();
                }
              }}
              style={{
                width: 300,
              }}
            />
            {" đồng/CP"}
          </Form.Item>
          <Form.Item label="Giá bán dừng lỗ">
            <InputNumber
              name="gia_ban_dung_lo"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "gia_ban_dung_lo",
                    value: value,
                  },
                });
              }}
              onKeyDown={(e) => {
                // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                if (
                  !(
                    (e.key >= "0" && e.key <= "9") ||
                    e.key === "Backspace" ||
                    e.key === "Tab"
                  )
                ) {
                  e.preventDefault();
                }
              }}
              style={{
                width: 300,
              }}
            />
            {" đồng/CP"}
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
              class="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl border-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Thêm
            </button>
          </Form.Item>
        </div>
        <div className="w-[50%]">
          <Form.Item label="Title">
            <Input
              name="title"
              onChange={handleChange}
              style={{
                width: 580,
              }}
            />
          </Form.Item>
          <Form.Item label="Content">
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log("data", data);
                handleChange({
                  target: {
                    name: "text1",
                    value: data,
                  },
                });
              }}
            />
          </Form.Item>

          <Form.Item label="Rủi ro xu hướng">
            <TextArea
              name="text2"
              onChange={handleChange}
              placeholder="Rủi ro xu hướng"
              rows={4}
              style={{
                height: 180,
              }}
            />
          </Form.Item>
          <div className="grid grid-cols-2">
            {/* hỗ trợ */}
            <div className="ml-32">
              <Form.Item label="Hỗ trợ S1">
                <InputNumber
                  name="s1"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "s1",
                        value: value,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: 150,
                  }}
                />
                {" VNĐ"}
              </Form.Item>
              <Form.Item label="Hỗ trợ S2">
                <InputNumber
                  name="s2"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "s2",
                        value: value,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: 150,
                  }}
                />
                {" VNĐ"}
              </Form.Item>
              <Form.Item label="Hỗ trợ S3">
                <InputNumber
                  name="s3"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "s3",
                        value: value,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: 150,
                  }}
                />
                {" VNĐ"}
              </Form.Item>
            </div>

            {/* kháng cự */}
            <div className="ml-12">
              <Form.Item label="Kháng cự R1">
                <InputNumber
                  name="r1"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "r1",
                        value: value,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: 150,
                  }}
                />
                {" VNĐ"}
              </Form.Item>
              <Form.Item label="Kháng cự R2">
                <InputNumber
                  name="r2"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "r2",
                        value: value,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: 150,
                  }}
                />
                {" VNĐ"}
              </Form.Item>
              <Form.Item label="Kháng cự R3">
                <InputNumber
                  name="r3"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "r3",
                        value: value,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    // Chỉ cho phép nhập các ký tự số, dấu chấm thập phân và các phím điều hướng
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: 150,
                  }}
                />
                {" VNĐ"}
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
export default FormInput;
