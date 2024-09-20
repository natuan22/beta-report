import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk.js";
import icon_excel from "../app/asset/img/icon_excel.png";
import NavBar from "../app/component/NavBar.jsx";
import { getApi } from "../helper/getApi.js";
import { postApi } from "../helper/postApi.js";
import socket from "../helper/socket.js";
import ActionComponents from "./components/ActionComponents.jsx";
import DetailComponents from "./components/DetailComponents.jsx";
import EditModal from "./components/EditModal.jsx";
import "./utils/styles/styles.css";

const XLSX = require("xlsx");
const apiUrl = process.env.REACT_APP_BASE_URL;
const flashClass = {
  up: "custom-flash-up",
  down: "custom-flash-down",
  ref: "custom-flash-ref",
};

const getColor = (item) => {
  if (item < 0) return "text-red-500";
  if (item > 0) return "text-green-500";
  return "text-yellow-500";
};

const getColorTiemNangTangGia = (item, type) => {
  if (item < 0) return "text-red-500";
  const threshold = type === 2024 ? 12 : 25;
  return item >= threshold ? "text-green-500" : "";
};

const theme = createTheme({
  palette: {
    test: {
      light: "#25558d",
      main: "#0050AD",
      dark: "#0b3c74",
    },
  },
});

const TradingTool = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));

  const [socketConnected, setSocketConnected] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState();

  const showModal = (data) => {
    setIsModalEditOpen(true);
    setDataEdit(data);
  };

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      window.location.reload();
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("2ZW79");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setRole(localStorage.getItem("2ZW79"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    document.title = "TradingTool";
  }, []);

  const getDataTable = async () => {
    const data = await getApi(apiUrl, `/api/v1/investment/beta-watch-list`);
    const dataWithKey =
      Array.isArray(data) &&
      data?.map((item, index) => {
        const closePrice = parseFloat((item.closePrice / 1000).toFixed(2));
        const p_2024 = item.price_2024
          ? parseFloat(
              (((item.price_2024 - closePrice) / closePrice) * 100).toFixed(2)
            )
          : 0;
        const p_2025 = item.price_2025
          ? parseFloat(
              (((item.price_2025 - closePrice) / closePrice) * 100).toFixed(2)
            )
          : 0;

        return {
          ...item,
          key: index,
          id: item.code,
          closePrice,
          signal:
            item.signal === 0
              ? "MUA"
              : item.signal === 1
              ? "BÁN"
              : item.signal === 2
              ? "Hold mua"
              : "Hold bán",
          total: parseFloat((item.total * 100).toFixed(2)),
          price_2024: parseFloat(item.price_2024.toFixed(2)),
          price_2025: parseFloat(item.price_2025.toFixed(2)),
          p_2024,
          p_2025,
          ma: parseFloat((item.ma / 1000).toFixed(2)),
          change: parseFloat(
            (
              ((item.closePrice - item.closePricePrev) / item.closePricePrev) *
              100
            ).toFixed(2)
          ),
          perChange:
            parseFloat(
              (
                ((item.closePrice - item.closePricePrev) /
                  item.closePricePrev) *
                100
              ).toFixed(2)
            ) + "%",
        };
      });
    setData(dataWithKey);
    setSocketConnected(true);
  };

  useEffect(() => {
    getDataTable();
  }, []);

  const gridRef = useRef();

  const columnDefs = [
    {
      headerName: "Mã",
      field: "code",
      width: role === "XJ20C" ? 130 : 90,
      cellRenderer: DetailComponents,
      cellClass: (params) => getColor(params.data.change),
      cellStyle: { fontWeight: "bold", textAlign: "center" },
    },
    {
      headerName: "Giá",
      field: "closePrice",
      width: role === "XJ20C" ? 130 : 90,
      cellClass: (params) => getColor(params.data.change),
      cellStyle: { fontWeight: "bold", textAlign: "center" },
    },
    {
      headerName: "+/-",
      field: "perChange",
      width: role === "XJ20C" ? 130 : 90,
      cellClass: (params) => getColor(params.data.change),
      cellStyle: { fontWeight: "bold", textAlign: "center" },
    },
    {
      headerName: "Giá mục tiêu 2024",
      field: "price_2024",
      width: 190,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Tiềm năng tăng giá 2024 (%)",
      field: "p_2024",
      width: 200,
      cellClass: (params) => getColorTiemNangTangGia(params.data.p_2024, 2024),
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Giá mục tiêu 2025",
      field: "price_2025",
      width: 190,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Tiềm năng tăng giá 2025 (%)",
      field: "p_2025",
      width: 200,
      cellClass: (params) => getColorTiemNangTangGia(params.data.p_2025, 2025),
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "MA",
      field: "name",
      width: 110,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Giá trị MA",
      field: "ma",
      width: 130,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Hiệu suất sinh lời theo MA (%)",
      field: "total",
      width: 280,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Tín hiệu",
      field: "signal",
      width: 130,
      cellClass: (params) =>
        params.value === "MUA"
          ? "text-green-500"
          : params.value === "BÁN"
          ? "text-red-500"
          : params.value === "Hold mua"
          ? "text-green-500"
          : "text-red-500",
      cellStyle: { fontWeight: "bold", textAlign: "center" },
    },
  ];

  if (role === "8Z5M8") {
    columnDefs.push({
      headerName: "",
      field: "actions",
      width: 120,
      cellRenderer: (params) => (
        <ActionComponents
          params={params}
          setData={setData}
          showModal={showModal}
        />
      ),
    });
  }

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
      enableCellChangeFlash: true,
      suppressMovable: true,
      wrapHeaderText: true,
    };
  }, []);

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  useEffect(() => {
    if (socketConnected && data?.length > 0) {
      socket.on(`listen-ma-co-phieu`, (res) => {
        setData((prevData) => {
          const index = prevData.findIndex((item) => item.code === res[0].code);

          if (index === -1) {
            console.error("Không tìm thấy mục với code:", res[0].code);
            return prevData;
          }

          const item = prevData[index];
          const closePrice = parseFloat(item.closePrice.toFixed(2));
          const newClosePrice = parseFloat(
            (res[0].closePrice / 1000).toFixed(2)
          );
          const closePricePrev = parseFloat(
            (item.closePricePrev / 1000).toFixed(2)
          );
          const change = parseFloat(
            (((newClosePrice - closePricePrev) / closePricePrev) * 100).toFixed(
              2
            )
          );

          if (closePrice !== newClosePrice) {
            const newItem = {
              ...item,
              closePrice: newClosePrice,
              ma: parseFloat((res[0].ma / 1000).toFixed(2)),
              signal:
                res[0].signal === 0
                  ? "MUA"
                  : res[0].signal === 1
                  ? "BÁN"
                  : res[0].signal === 2
                  ? "Hold mua"
                  : "Hold bán",
              p_2024: item.price_2024
                ? parseFloat(
                    (
                      ((item.price_2024 - newClosePrice) / newClosePrice) *
                      100
                    ).toFixed(2)
                  )
                : 0,
              p_2025: item.price_2025
                ? parseFloat(
                    (
                      ((item.price_2025 - newClosePrice) / newClosePrice) *
                      100
                    ).toFixed(2)
                  )
                : 0,
              total: parseFloat((res[0].total * 100).toFixed(2)),
              change,
              perChange: change + "%",
            };

            const rowNode = gridRef?.current?.api?.getRowNode(newItem.code);
            if (rowNode) {
              const rowElement = document.querySelector(
                `[row-id="${newItem.code}"]`
              );
              const columnIds = [
                "closePrice",
                "perChange",
                "ma",
                "p_2024",
                "p_2025",
                "total",
              ];
              const className =
                newClosePrice > closePricePrev
                  ? flashClass.up
                  : newClosePrice < closePricePrev
                  ? flashClass.down
                  : flashClass.ref;

              // Add the class name for visual feedback
              columnIds.forEach((colId) => {
                const cellElement = rowElement?.querySelector(
                  `[col-id="${colId}"]`
                );
                if (cellElement) {
                  cellElement.classList.add(className);
                }
              });

              // Remove the class names after 500 milliseconds
              setTimeout(() => {
                columnIds.forEach((colId) => {
                  const cellElement = rowElement?.querySelector(
                    `[col-id="${colId}"]`
                  );
                  if (cellElement) {
                    cellElement.classList.remove(
                      flashClass.up,
                      flashClass.down,
                      flashClass.ref
                    );
                  }
                });
              }, 500);
            }

            const signal =
              res[0].signal === 0
                ? "MUA"
                : res[0].signal === 1
                ? "BÁN"
                : res[0].signal === 2
                ? "Hold mua"
                : "Hold bán";

            if (rowNode && item.signal !== signal) {
              const rowElement = document.querySelector(
                `[row-id="${newItem.code}"]`
              );
              const childElementSignal =
                rowElement?.querySelector('[col-id="signal"]');
              const classNameSignal =
                res[0].signal === 0 || res[0].signal === 2
                  ? flashClass.up
                  : flashClass.down;

              childElementSignal?.classList.add(classNameSignal);

              setTimeout(() => {
                childElementSignal?.classList.remove(classNameSignal);
              }, 500);
            }

            const newData = [...prevData];
            newData[index] = newItem;

            return newData;
          }
          return prevData;
        });
      });
    }

    return () => {
      socket.off(`listen-ma-co-phieu`);
    };
  }, [socketConnected, data]);

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleAddOk = async () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = e.target[0].value.toUpperCase();
    const price_2024 = e.target[2].value;
    const price_2025 = e.target[4].value;
    try {
      const res = await postApi(
        apiUrl,
        "/api/v1/investment/create-beta-watch-list",
        {
          code,
          price_2024,
          price_2025,
          ma: e.target[6]?.value || 0,
          is_beta_page: 1,
        }
      );

      const closePrice = parseFloat((res[0].closePrice / 1000).toFixed(2));
      const newP2024 = parseFloat(
        (((price_2024 - closePrice) / closePrice) * 100).toFixed(2)
      );
      const newP2025 = parseFloat(
        (((price_2025 - closePrice) / closePrice) * 100).toFixed(2)
      );

      setData((prev) => {
        const newData = [
          ...prev,
          {
            ...res[0],
            change: parseFloat(
              (
                ((res[0].closePrice - res[0].closePricePrev) /
                  res[0].closePricePrev) *
                100
              ).toFixed(2)
            ),
            perChange:
              parseFloat(
                (
                  ((res[0].closePrice - res[0].closePricePrev) /
                    res[0].closePricePrev) *
                  100
                ).toFixed(2)
              ) + "%",
            closePrice,
            price_2024: Number(price_2024),
            price_2025: Number(price_2025),
            p_2024: newP2024,
            p_2025: newP2025,
            ma: parseFloat((res[0].ma / 1000).toFixed(2)),
            total: parseFloat((res[0].total * 100).toFixed(2)),
            id: code,
            name: res[0].name,
            signal_text:
              res[0].signal === 0
                ? "MUA"
                : res[0].signal === 1
                ? "BÁN"
                : res[0].signal === 2
                ? "Hold mua"
                : "Hold bán",
          },
        ];
        // console.log(newData);
        return newData;
      });
      setLoading(false);
      setIsModalAddOpen(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const sheetTitle = [
    "Mã",
    "Giá",
    "+/-",
    "Giá mục tiêu 2024",
    "Tiềm năng tăng giá 2024 (%)",
    "Giá mục tiêu 2025",
    "Tiềm năng tăng giá 2025 (%)",
    "MA",
    "Giá trị MA",
    "Hiệu suất sinh lời theo MA (%)",
    "Tín hiệu",
  ];

  const prepareData = (item) => [
    item.code,
    item.closePrice,
    item.perChange,
    item.price_2024,
    item.p_2024,
    item.price_2025,
    item.p_2025,
    item.name,
    item.ma,
    item.total,
    item.signal,
  ];

  const downloadExcel = () => {
    try {
      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = data.map(prepareData);

      // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // Tạo sheet 1
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheetTitle, ...sheet1Data]),
        "Trading tool"
      );

      const ngayHienTai = new Date();
      const ngay = ngayHienTai.getDate();
      const thang = ngayHienTai.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
      const nam = ngayHienTai.getFullYear();

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `tradingTool-${ngay}${thang}${nam}.xlsx`);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="relative">
        <div className="absolute right-[10%] top-[1%]">
          <NavBar
            isLogin={isLogin}
            user={user}
            role={role}
            handleUserLogout={handleUserLogout}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>

        <div className="w-full h-[919px] p-[40px]">
          <div
            className={`bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center ${
              role === "8Z5M8" ? "" : "mb-[15px]"
            }`}
          >
            Trading Tool
          </div>

          <div className="flex justify-start content-center my-[15px]">
            {role === "8Z5M8" && (
              <div className="mr-[20px]">
                <Button variant="contained" color="test" onClick={showModalAdd}>
                  <FaPlusCircle className="w-[20px] h-[20px] text-white" />
                  <span className="normal-case pl-1 text-[14px] font-semibold text-white">
                    Thêm mã
                  </span>
                </Button>
              </div>
            )}
            <Button variant="contained" color="test" onClick={downloadExcel}>
              <img src={icon_excel} alt="icon_excel" />
              <span className="normal-case pl-1 text-[14px] font-semibold text-white">
                Tải Excel
              </span>
            </Button>
          </div>

          <div className={`w-full h-[732px]`}>
            <div className="example-wrapper">
              <div className={"ag-theme-quartz w-full h-full"}>
                <AgGridReact
                  ref={gridRef}
                  rowData={data}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  getRowId={getRowId}
                  suppressRowHoverHighlight={true}
                  animateRows={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal ADD */}
        <Modal
          centered
          width={500}
          open={isModalAddOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
          footer={null}
          className="detail-conditions"
        >
          <div className="h-fit m-[15px]">
            <form onSubmit={handleSubmitCreate}>
              <TextField label="Mã" fullWidth className="!mb-[20px]" />
              <TextField
                label="Giá mục tiêu 2024"
                fullWidth
                className="!mb-[20px]"
              />
              <TextField
                label="Giá mục tiêu 2025"
                fullWidth
                className="!mb-[20px]"
              />
              <TextField label="MA" fullWidth className="!mb-[20px]" />
              <LoadingButton
                variant="contained"
                type="submit"
                fullWidth
                loading={loading}
              >
                Thêm mã
              </LoadingButton>
            </form>
          </div>
        </Modal>

        {/* Modal EDIT */}
        <EditModal
          dataEdit={dataEdit}
          setData={setData}
          isModalEditOpen={isModalEditOpen}
          setIsModalEditOpen={setIsModalEditOpen}
        />
      </div>
    </ThemeProvider>
  );
};

export default TradingTool;
