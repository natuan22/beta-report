import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import TableBasic from "./TableResultsFilter/TableBasic";
import TableResults from "./TableResultsFilter/TableResults";
import TableStatistical from "./TableResultsFilter/TableStatistical";
import TableTechnique from "./TableResultsFilter/TableTechnique";
import "./styles/styleTabs.css";
import ExportExcel from "./TableResultsFilter/ExportExcel";
import "./styles/tableFilter.css"

const TableResultsFilter = ({ loadingTb, filteredResults, watchlists, catchWatchlists, selectedItems, selectParameters, isLogin }) => {
  const [activeKey, setActiveKey] = useState("0");

  const onChange = (key) => {
    setActiveKey(key);
  };

  const itemsTab = [
    {
      key: "0",
      label: "Kết quả",
      children: <TableResults loadingTb={loadingTb} isLogin={isLogin} selectParameters={selectParameters} filteredResults={filteredResults} watchlists={watchlists} catchWatchlists={catchWatchlists} selectedItems={selectedItems} />,
    },
    {
      key: "1",
      label: "Thống kê",
      children: <TableStatistical loadingTb={loadingTb} isLogin={isLogin} filteredResults={filteredResults} watchlists={watchlists} catchWatchlists={catchWatchlists} />,
    },
    {
      key: "2",
      label: "Cơ bản",
      children: <TableBasic loadingTb={loadingTb} isLogin={isLogin} filteredResults={filteredResults} watchlists={watchlists} catchWatchlists={catchWatchlists} />,
    },
    {
      key: "3",
      label: "Kỹ thuật",
      children: <TableTechnique loadingTb={loadingTb} isLogin={isLogin} filteredResults={filteredResults} watchlists={watchlists} catchWatchlists={catchWatchlists} />,
    },
  ];

  useEffect(() => {
    const addDivToTabsNavList = () => {
      const tabsNavList =
        document.getElementsByClassName("ant-tabs-nav-list")[0]; // Get the first element with class "ant-tabs-nav-list"

      if (tabsNavList) {
        // Kiểm tra và xóa phần tử div cũ nếu nó tồn tại
        const oldDivElement = tabsNavList.querySelector(
          "#export-excel-container"
        );
        if (oldDivElement) {
          tabsNavList.removeChild(oldDivElement);
        }

        // Tạo phần tử div mới
        const divElement = document.createElement("div");
        divElement.id = "export-excel-container"; // Đặt id để nhận diện
        const root = createRoot(divElement);

        root.render(<ExportExcel filteredResults={filteredResults} selectedItems={selectedItems} selectParameters={selectParameters} />);

        // Thêm phần tử div mới vào danh sách
        tabsNavList.appendChild(divElement);
      } else {
        console.error("ant-tabs-nav-list not found");
      }
    };

    addDivToTabsNavList(); // Call the function to add the div
  }, [filteredResults, selectedItems, selectParameters]);

  return (
    <div>
      <div className="tabs-filter">
        <Tabs
          defaultActiveKey="0"
          items={itemsTab}
          activeKey={activeKey}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TableResultsFilter;
