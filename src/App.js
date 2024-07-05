import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { routes } from "./app/route";
import { generateMAC } from "./helper/generateMAC";

function App() {
  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem("deviceId"));
    if (!deviceId) {
      localStorage.setItem("deviceId", JSON.stringify(generateMAC()));
    }

    const _il = localStorage.getItem("_il");
    if (!_il) {
      localStorage.setItem("_il", "4E8WL");
    }
  }, []);

  // Hàm kiểm tra quyền truy cập
  const checkAccess = (routeRole) => {
    const userRole = localStorage.getItem("2ZW79") || "V0U1S";

    // Người dùng có quyền cao nhất truy cập mọi route
    if (userRole === "8Z5M8" || userRole === "XJ20C") {
      return true;
    }

    // Người dùng có quyền truy cập route nếu role khớp hoặc là quyền cơ bản
    return routeRole === "V0U1S" || userRole === routeRole;
  };

  const PrivateRoute = ({ component: Component, role }) => {
    const isAuthorized = checkAccess(role);

    return isAuthorized ? <Component /> : <Navigate to="/" />;
  };

  const mappedRoute = routes.map(({ path, component: Component, role }) => (
    <Route
      key={path}
      path={path}
      element={<PrivateRoute component={Component} role={role} />}
    />
  ));

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>{mappedRoute}</Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </Fragment>
  );
}

export default App;
