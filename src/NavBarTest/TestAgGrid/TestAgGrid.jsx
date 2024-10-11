// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import { AgGridReact } from "ag-grid-react";
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useDispatch } from "react-redux";
// import { userLogoutAction } from "../../Auth/thunk.js";
// import NavBar from "../../app/component/NavBar.jsx";
// import { getApi } from "../../helper/getApi.js";
// import socket from "../../helper/socket.js";
// import socket2 from "../../helper/socket2.js";
// import PerChangeRenderer from "./perChangeRenderer.jsx";
// import PriceRenderer from "./priceRenderer.jsx";
// import "./styles.css";
// import TotalValRenderer from "./totalValRenderer.jsx";
// import TotalVolRenderer from "./totalVolRenderer.jsx";

// const apiUrl = process.env.REACT_APP_BASE_URL;
// const flashClass = {
//   up: "custom-flash-up",
//   down: "custom-flash-down",
//   ref: "custom-flash-ref",
// };

// const TestAgGrid = () => {
//   const dispatch = useDispatch();
//   const [isLogin, setIsLogin] = useState(localStorage.getItem(process.env.REACT_APP_IS_LG));
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

//   const [watchlists, setWatchlists] = useState([]);
//   const [watchlistActive, setWatchlistActive] = useState(
//     JSON.parse(localStorage.getItem("watchlistActive")) ||
//       watchlists[watchlists.length - 1]
//   );
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [data, setData] = useState();

//   const handleUserLogout = () => {
//     if (isLogin) {
//       setIsLogin(null);
//       dispatch(userLogoutAction());
//       localStorage.setItem(process.env.REACT_APP_IS_LG, process.env.REACT_APP_LG_F);
//       localStorage.removeItem("user");
//     }
//   };

//   const onSubmitSuccess = () => {
//     setIsLogin(localStorage.getItem(process.env.REACT_APP_IS_LG));
//     setUser(JSON.parse(localStorage.getItem("user")));
//   };

//   useEffect(() => {
//     document.title = "Test Ag Grid";
//   }, []);

//   useEffect(() => {
//     if (isLogin === process.env.REACT_APP_LG_T) {
//       const fetchDataWatchList = async () => {
//         try {
//           const data = await getApi(apiUrl, "/api/v1/watchlist");
//           setWatchlists(data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchDataWatchList();
//     }
//   }, [isLogin]);

//   const getDataTable = async (id) => {
//     const data = await getApi(apiUrl, `/api/v1/watchlist/${id}`);
//     const dataWithKey =
//       Array.isArray(data) &&
//       data?.map((item, index) => ({
//         ...item,
//         key: index,
//         id: item.code,
//       }));
//     setData(dataWithKey);
//     setSocketConnected(true);
//   };

//   useEffect(() => {
//     getDataTable(watchlistActive.id);
//   }, []);

//   const gridRef = useRef();

//   const columnDefs = [
//     { headerName: "Mã CP", field: "code" },
//     { headerName: "Sàn", field: "floor" },
//     { headerName: "Ngành", field: "LV2" },
//     {
//       headerName: "Thị giá (đồng)",
//       field: "closePrice",
//       cellRenderer: PriceRenderer,
//       cellClass: `ag-right-aligned-cell`,
//     },
//     {
//       headerName: "%D",
//       field: "perChange",
//       cellRenderer: PerChangeRenderer,
//       cellClass: `ag-right-aligned-cell`,
//     },
//     {
//       headerName: "KLGD (CP)",
//       field: "totalVol",
//       cellRenderer: TotalVolRenderer,
//       cellClass: `ag-right-aligned-cell`,
//     },
//     {
//       headerName: "GTGD (tỷ đồng)",
//       field: "totalVal",
//       cellRenderer: TotalValRenderer,
//       cellClass: `ag-right-aligned-cell`,
//     },
//   ];

//   const defaultColDef = useMemo(() => {
//     return {
//       flex: 1,
//       resizable: false,
//       enableCellChangeFlash: true,
//       suppressMovable: true,
//     };
//   }, []);

//   const getRowId = useCallback((params) => {
//     return params.data.id;
//   }, []);

//   useEffect(() => {
//     if (socketConnected && watchlistActive?.code.length > 0) {
//       socket2.on("onFOSStream", (data) => {
//         const rowNode = gridRef?.current?.api.getRowNode(
//           data?.topic.replace("INTRADAY_1s|", "")
//         );
//         if (!rowNode) return;

//         const updateRowData = (field, value, flashClass) => {
//           const rowElement = document.querySelector(
//             `[row-index="${rowNode.rowIndex}"]`
//           );
//           if (!rowElement) return;

//           const cellElement = rowElement.querySelector(`[col-id="${field}"]`);
//           if (!cellElement) return;

//           const spanElement = cellElement.querySelector("span");
//           if (!spanElement) return;

//           const oldValue = rowNode.data[field];

//           if (oldValue < value) {
//             cellElement.classList.add(flashClass.up);
//             spanElement.style.setProperty("color", "white", "important");
//           } else if (oldValue > value) {
//             cellElement.classList.add(flashClass.down);
//             spanElement.style.setProperty("color", "white", "important");
//           } else {
//             cellElement.classList.add(flashClass.ref);
//           }

//           rowNode.setDataValue(field, value);

//           setTimeout(() => {
//             cellElement.classList.remove(
//               flashClass.up,
//               flashClass.down,
//               flashClass.ref
//             );
//             spanElement.style.removeProperty("color");
//           }, 500);
//         };

//         updateRowData("closePrice", data.data.C / 1000, flashClass);
//       });

//       const requestStream = {
//         ClientSeq: 1,
//         TransId: "123-abc",
//         topic: ["INTRADAY_1s"],
//         value: watchlistActive.code,
//       };

//       socket2.emit("SUB_REQ", requestStream);

//       watchlistActive.code.forEach((code) => {
//         socket.on(`listen-co-phieu-${code}`, (newData) => {
//           const rowNode = gridRef?.current?.api.getRowNode(code);
//           if (!rowNode) return;

//           const updateRowData = (field, value, flashClass) => {
//             const rowElement = document.querySelector(
//               `[row-index="${rowNode.rowIndex}"]`
//             );
//             if (!rowElement) return;

//             const cellElement = rowElement.querySelector(`[col-id="${field}"]`);
//             if (!cellElement) return;

//             const spanElement = cellElement.querySelector("span");
//             if (!spanElement) return;

//             const oldValue = rowNode.data[field];

//             if (oldValue < value) {
//               cellElement.classList.add(flashClass.up);
//               spanElement.style.setProperty("color", "white", "important");
//             } else if (oldValue > value) {
//               cellElement.classList.add(flashClass.down);
//               spanElement.style.setProperty("color", "white", "important");
//             } else {
//               cellElement.classList.add(flashClass.ref);
//             }

//             rowNode.setDataValue(field, value);

//             setTimeout(() => {
//               cellElement.classList.remove(
//                 flashClass.up,
//                 flashClass.down,
//                 flashClass.ref
//               );
//               spanElement.style.removeProperty("color");
//             }, 500);
//           };

//           // updateRowData("closePrice", newData.closePrice, flashClass);

//           updateRowData("perChange", newData.perChange, flashClass);

//           if (rowNode) {
//             // Cập nhật dữ liệu mới vào hàng
//             rowNode.setDataValue("totalVol", newData.totalVol);
//             rowNode.setDataValue("totalVal", newData.totalVal);
//           }
//         });
//       });
//     }

//     return () => {
//       watchlistActive.code.forEach((code) => {
//         socket.off(`listen-co-phieu-${code}`);
//       });
//       const requestStream = {
//         ClientSeq: 1,
//         TransId: "123-abc",
//         topic: ["*"],
//         value: ["*"],
//       };

//       socket2.emit("UNSUB_REQ", requestStream);
//     };
//   }, [socketConnected, watchlistActive]);

//   return (
//     <div className="relative">
//       <div className="absolute right-[10%] top-[1%]">
//         <NavBar
//           isLogin={isLogin}
//           user={user}
//           handleUserLogout={handleUserLogout}
//           onSubmitSuccess={onSubmitSuccess}
//         />
//       </div>
//       <div className="w-[1200px] p-[40px]">
//         <div className="w-full h-full">
//           <div className="example-wrapper">
//             <div className={"ag-theme-quartz w-full h-full"}>
//               <AgGridReact
//                 ref={gridRef}
//                 rowData={data}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 getRowId={getRowId}
//                 getRowClass={(params) => {
//                   if (params.node.rowIndex % 2 === 0) {
//                     return "bg-[#d9e9fd]";
//                   } else return "bg-white";
//                 }}
//                 suppressRowHoverHighlight={true}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestAgGrid;
