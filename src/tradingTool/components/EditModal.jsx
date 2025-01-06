import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Modal } from "antd";
import React, { useState } from "react";
import "sweetalert2/dist/sweetalert2.css";
import { postApi } from "../../helper/postApi";

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

    const currPT = e.target[2]?.value || 0;
    const nextPT = e.target[4]?.value || 0;
    try {
      const res = await postApi("/api/v1/investment/update-beta-watch-list", {
        code: e.target[0].value,
        currPT,
        nextPT,
        ma: e.target[6]?.value || 0,
        is_beta_page: 1,
      });
      setData((prev) => {
        const thisItem = prev.find((item) => item.code == e.target[0].value);
        const priceIncCY = parseFloat(((currPT - thisItem.closePrice) / thisItem.closePrice) * 100).toFixed(2);
        const priceIncNY = parseFloat(((nextPT - thisItem.closePrice) / thisItem.closePrice) * 100).toFixed(2);

        const index = prev.findIndex((item) => item.code == e.target[0].value);
        const newData = [...prev];

        newData[index] = {
          ...thisItem,
          currPT: parseFloat(parseFloat(currPT).toFixed(2)),
          nextPT: parseFloat(parseFloat(nextPT).toFixed(2)),
          priceIncCY,
          priceIncNY,
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
          <TextField defaultValue={dataEdit?.currPT} label="Giá mục tiêu 2025" fullWidth className="!mb-[20px]" />
          <TextField defaultValue={dataEdit?.nextPT} label="Giá mục tiêu 2026" fullWidth className="!mb-[20px]" />
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
