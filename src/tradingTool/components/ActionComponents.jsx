import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import { Modal } from "antd";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { postApi } from "../../helper/postApi";

const apiUrl = process.env.REACT_APP_BASE_URL;

export default ({ params, setData, showModal }) => {
  const handleDelete = (code) => {
    // Sử dụng SweetAlert để xác nhận việc xóa
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa mã ${code}?`,
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Xác nhận xóa tin và cập nhật state
        await postApi(apiUrl, "/api/v1/investment/delete-beta-watch-list", {
          code,
        });
        setData((prev) => {
          const newData = [...prev].filter(item => item.code != code)
          return newData
        })
      }
    });
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="Edit"
        onClick={() => showModal(params.data)}
      >
        <MdEdit />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="Delete"
        onClick={() => handleDelete(params.data.code)}
      >
        <MdDelete />
      </IconButton>
    </div>
  );
};
