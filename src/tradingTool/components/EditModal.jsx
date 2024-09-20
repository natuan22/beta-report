import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Modal } from "antd";
import React, { useState } from "react";
import "sweetalert2/dist/sweetalert2.css";
import { postApi } from "../../helper/postApi";

const apiUrl = process.env.REACT_APP_BASE_URL;

const EditModal = ({ dataEdit, setData, isModalEditOpen, setIsModalEditOpen }) => {
  const [loading, setLoading] = useState(false);

  const handleEditOk = async () => {
    setIsModalEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const price_2024 = e.target[2]?.value || 0;
    const price_2025 = e.target[4]?.value || 0;
    try {
      const res = await postApi(apiUrl, "/api/v1/investment/update-beta-watch-list", {
        code: e.target[0].value,
        price_2024,
        price_2025,
        ma: e.target[6]?.value || 0,
        is_beta_page: 1,
      });
      // console.log(res)
      setData((prev) => {
        const thisItem = prev.find((item) => item.code == e.target[0].value);
        const newP2024 = parseFloat(((price_2024 - thisItem.closePrice) / thisItem.closePrice) * 100).toFixed(2);
        const newP2025 = parseFloat(((price_2025 - thisItem.closePrice) / thisItem.closePrice) * 100).toFixed(2);

        const index = prev.findIndex((item) => item.code == e.target[0].value);
        const newData = [...prev];

        newData[index] = {
          ...thisItem,
          price_2024: parseFloat(parseFloat(price_2024).toFixed(2)),
          price_2025: parseFloat(parseFloat(price_2025).toFixed(2)),
          p_2024: newP2024,
          p_2025: newP2025,
          name: `MA_${e.target[6]?.value}`,
          ma: parseFloat((res[0].ma / 1000).toFixed(2)),
          total: parseFloat((res[0].total * 100).toFixed(2)),
          signal: res[0].signal == 0 ? "MUA" : res[0].signal == 1 ? "BÁN" : res[0].signal == 2 ? "Hold mua" : "Hold bán",
        };
        return newData;
      });
      setLoading(false);
      setIsModalEditOpen(false)
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <Modal
      centered
      width={500}
      open={isModalEditOpen}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
      footer={null}
      className="edit-conditions"
    >
      <div className="m-[15px]">
        <form onSubmit={handleSubmitEdit}>
          <TextField defaultValue={dataEdit?.code} disabled label="Mã" fullWidth className="!mb-[20px]" />
          <TextField defaultValue={dataEdit?.price_2024} label="Giá mục tiêu 2024" fullWidth className="!mb-[20px]" />
          <TextField defaultValue={dataEdit?.price_2025} label="Giá mục tiêu 2025" fullWidth className="!mb-[20px]" />
          <TextField defaultValue={dataEdit?.name.slice(3)} label="MA" fullWidth className="!mb-[20px]" />
          <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>
            Chỉnh sửa
          </LoadingButton>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
