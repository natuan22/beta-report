import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import icon_excel from "../../app/asset/img/icon_excel.png";
import { getApi } from "../../helper/getApi";
import {
  prepareData,
  prepareData2,
  prepareData3,
  prepareData4,
  prepareData5,
  prepareData6,
  sheet1Title,
  sheet2Title,
  sheet3Title,
  sheet4Title,
  sheet5Title,
  sheet6Title,
} from "../utils/hashTb";
import { Tooltip } from "antd";

const XLSX = require("xlsx");
const apiUrl = process.env.REACT_APP_BASE_URL;

const BtnToExcel = ({ watchlistActive }) => {
  const [loadingExcel, setLoadingExcel] = useState(false);

  const fetchDataAndDownloadCSV = async () => {
    try {
      setLoadingExcel(true);
      // Gọi API để lấy dữ liệu
      const data = await getApi(
        apiUrl,
        `/api/v1/watchlist/${watchlistActive.id}`
      );

      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = data.map(prepareData);
      const sheet2Data = data.map(prepareData2);
      const sheet3Data = data.map(prepareData3);
      const sheet4Data = data.map(prepareData4);
      const sheet5Data = data.map(prepareData5);
      let sheet6Data = [];
      data.forEach((item) => {
        sheet6Data = sheet6Data.concat(prepareData6(item));
      });

      // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // Tạo sheet 1
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet1Title, ...sheet1Data]),
        watchlistActive.name
      );

      // Tạo sheet 2
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet2Title, ...sheet2Data]),
        "Thống kê"
      );

      // Tạo sheet 3
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet3Title, ...sheet3Data]),
        "Cơ bản"
      );

      // Tạo sheet 4
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet4Title, ...sheet4Data]),
        "Kỹ thuật"
      );

      // Tạo sheet 5
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet5Title, ...sheet5Data]),
        "Tín hiệu cảnh báo"
      );

      // Tạo sheet 6
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet6Title, ...sheet6Data]),
        "Tin tức"
      );

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `dataWatchlist_${watchlistActive.name}.xlsx`);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <LoadingButton
      sx={{
        padding: "0px",
        "& .MuiLoadingButton-loadingIndicator": {
          color: "#FC9433", // Customize the color of the loading spinner
        },
      }}
      loading={loadingExcel}
      onClick={fetchDataAndDownloadCSV}
    >
      <Tooltip
        placement="right"
        title={<span className="">Xuất dữ liệu ra Excel</span>}
        color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
      >
        <div className="bg-[#ADE6F9] h-[51.56px] py-[11px] px-[18.5px] self-center ml-[1px] cursor-pointer flex w-fit border-[1.5px] border-[#2D4CEF] border-solid rounded-lg hover:bg-gradient-to-b from-[#FFFFFFCC] to-[#08AADD]">
          <img src={icon_excel} alt="icon_excel" />
        </div>
      </Tooltip>
    </LoadingButton>
  );
};

export default BtnToExcel;
