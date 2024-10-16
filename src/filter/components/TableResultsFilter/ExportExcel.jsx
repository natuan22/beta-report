import { LoadingButton } from "@mui/lab";
import { Tooltip } from "antd";
import React, { useState } from "react";
import icon_excel from "../../../app/asset/img/icon_excel.png";
import { getApi } from "../../../helper/getApi";
import { prepareData, prepareData2, prepareData3, prepareData4, sheet1Title, sheet2Title, sheet3Title, sheet4Title } from "../../utils/hashTbExcel";

const XLSX = require("xlsx");

const ExportExcel = ({ filteredResults, selectedItems, selectParameters }) => {
  const [loadingExcel, setLoadingExcel] = useState(false);

  const fetchDataAndDownloadCSV = async () => {
    try {
      setLoadingExcel(true);
      const data = await getApi("/api/v1/filter");

      const filteredData = data.filter((item) =>
        filteredResults.map((item) => item.code).includes(item.code)
      );
      
      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = filteredData.map(item => prepareData(item, selectedItems, selectParameters));
      const sheet2Data = filteredData.map(prepareData2);
      const sheet3Data = filteredData.map(prepareData3);
      const sheet4Data = filteredData.map(prepareData4);

      // // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // // Tạo sheet 1
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([sheet1Title(selectedItems), ...sheet1Data]), "Kết quả");
      // Tạo sheet 2
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([sheet2Title, ...sheet2Data]), "Thống kê");

      // Tạo sheet 3
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([sheet3Title, ...sheet3Data]), "Cơ bản");

      // Tạo sheet 4
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([sheet4Title, ...sheet4Data]), "Kỹ thuật");

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `dataFilter.xlsx`);
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

export default ExportExcel;
