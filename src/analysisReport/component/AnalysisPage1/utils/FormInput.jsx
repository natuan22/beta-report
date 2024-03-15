import React, { useState } from "react";
import { Form, Input, InputNumber } from "antd";
import { useFormik } from "formik";
import { https } from "../../../../services/configService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { TextArea } = Input;

const FormInput = ({ code, onSubmitSuccess, handleOk, getImgFromInput }) => {
  const saveDataAndFile = async (data) => {
    try {
      const formData = new FormData();

      // Thêm dữ liệu văn bản
      const arrText = [data.text1, data.text2];
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
      formData.append("gia_thi_truong", data.gia_thi_truong);
      formData.append("loi_nhuan_ky_vong", data.loi_nhuan_ky_vong);
      formData.append("gia_ban_dung_lo", data.gia_ban_dung_lo);
      formData.append("img", data.img);

      // Gửi yêu cầu POST
      const response = await https.post(
        `/api/v1/report/luu-thong-tin-bao-cao-ky-thuat`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const [imgSrc, setImgSrc] = useState(null);
  const { handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      code: "",
      is_sell: "",
      gia_muc_tieu: 0,
      gia_thi_truong: 0,
      loi_nhuan_ky_vong: 0,
      gia_ban_dung_lo: 0,
      img: {},
      text1: "",
      text2: "",
      s1: 0,
      s2: 0,
      s3: 0,
      r1: 0,
      r2: 0,
      r3: 0,
    },
    onSubmit: async (values) => {
      try {
        const res = await saveDataAndFile(values, values.img);
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
      //   wrapperCol={{
      //     span: 14,
      //   }}
      layout="horizontal"
      //   style={{
      //     width: 1000,
      //   }}
      onSubmitCapture={handleSubmit}
    >
      <div className="flex justify-evenly mt-10">
        <div className="w-[40%]">
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
          <Form.Item label="Giá mục tiêu 04 tháng">
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
              style={{
                width: 300,
              }}
            />
            {" đồng/CP"}
          </Form.Item>
          <Form.Item label="Giá thị trường">
            <InputNumber
              name="gia_thi_truong"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "gia_thi_truong",
                    value: value,
                  },
                });
              }}
              style={{
                width: 300,
              }}
            />
            {" đồng/CP"}
          </Form.Item>
          <Form.Item label="Lợi nhuận kỳ vọng">
            <InputNumber
              name="loi_nhuan_ky_vong"
              min={0}
              max={100}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "loi_nhuan_ky_vong",
                    value: value,
                  },
                });
              }}
              step="0.1"
              stringMode
              style={{
                width: 300,
              }}
            />
            {" %"}
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
          <Form.Item label="Khả năng xu hướng">
            <CKEditor
              editor={ClassicEditor}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
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
                height: 200,
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
