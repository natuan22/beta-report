import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import "./App.css";
import { routes } from "./app/route";
import { generateMAC } from "./helper/generateMAC";

function App() {
  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem("deviceId"));
    if (!deviceId) {
      localStorage.setItem("deviceId", JSON.stringify(generateMAC()));
    }

    const _il = localStorage.getItem(process.env.REACT_APP_IS_LG);
    if (!_il) {
      localStorage.setItem(
        process.env.REACT_APP_IS_LG,
        process.env.REACT_APP_LG_F
      );
    }
  }, []);

  // Hàm kiểm tra quyền truy cập
  const checkAccess = (routeRole) => {
    const userRole =
      localStorage.getItem(process.env.REACT_APP_USER_ROLE) ||
      process.env.REACT_APP_BASE_USER;

    // Người dùng có quyền cao nhất truy cập mọi route
    if (
      userRole === process.env.REACT_APP_ADMIN ||
      userRole === process.env.REACT_APP_PREMIUM_USER
    ) {
      return true;
    }

    // Người dùng có quyền truy cập route nếu role khớp hoặc là quyền cơ bản
    return (
      routeRole === process.env.REACT_APP_BASE_USER || userRole === routeRole
    );
  };

  // Thành phần PrivateRoute
  const PrivateRoute = ({
    component: Component,
    role,
    requiresLogin = false,
  }) => {
    const isLogin =
      localStorage.getItem(process.env.REACT_APP_IS_LG) ===
      process.env.REACT_APP_LG_T; // Kiểm tra trạng thái đăng nhập
    const isAuthorized = requiresLogin
      ? isLogin && checkAccess(role)
      : checkAccess(role);

    return isAuthorized ? <Component /> : <Navigate to="/" />;
  };

  // Component to handle setting the document title based on route
  const RouteWithTitle = ({
    path,
    component: Component,
    title,
    role,
    requiresLogin,
  }) => {
    const location = useLocation();
    const { code } = useParams();

    useEffect(() => {
      if (path.includes(":code") && code) {
        document.title = `${code} - ${title}`;
      } else if (title) {
        document.title = title;
      }
    }, [location, title, code]);

    return (
      <PrivateRoute
        component={Component}
        role={role}
        requiresLogin={requiresLogin}
      />
    );
  };

  // Mapping routes and applying RouteWithTitle for each route
  const mappedRoute = routes.map(
    ({ path, component: Component, role, requiresLogin, title }) => (
      <Route
        key={path}
        path={path}
        element={
          <RouteWithTitle
            path={path}
            component={Component}
            role={role}
            requiresLogin={requiresLogin}
            title={title}
          />
        }
      />
    )
  );

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
