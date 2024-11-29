import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation, useParams } from "react-router-dom";
import "./App.css";
import { adminBlogsRoutes, routes } from "./app/route";
import { generateMAC } from "./helper/generateMAC";
import { checkAccess } from "./app/utils/authUtils";

function App() {
  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem("deviceId"));
    if (!deviceId) {
      localStorage.setItem("deviceId", JSON.stringify(generateMAC()));
    }

    const _il = localStorage.getItem(process.env.REACT_APP_IS_LG);
    if (!_il) {
      localStorage.setItem(process.env.REACT_APP_IS_LG, process.env.REACT_APP_LG_F);
    }
  }, []);

  // Thành phần PrivateRoute
  const PrivateRoute = ({ component: Component, role, requiresLogin = false, path }) => {
    const isLogin = localStorage.getItem(process.env.REACT_APP_IS_LG) === process.env.REACT_APP_LG_T;
    const isAuthorized = requiresLogin ? isLogin && checkAccess(role, path) : checkAccess(role, path);
  
    return isAuthorized ? <Component /> : <Navigate to="/" />;
  };

  // Component to handle setting the document title based on route
  const RouteWithTitle = ({ path, component: Component, title, role, requiresLogin }) => {
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
      <PrivateRoute component={Component} role={role} requiresLogin={requiresLogin} path={path}/>
    );
  };

  // Mapping routes and applying RouteWithTitle for each route
  const mappedRoute = routes.map(
    ({ path, component: Component, role, requiresLogin, title }) => (
      <Route
        key={path}
        path={path}
        element={
          <RouteWithTitle path={path} component={Component} role={role} requiresLogin={requiresLogin} title={title} />
        }
      />
    )
  );

  // Mapping routes and applying RouteWithTitle for each route AdminBlogs
  const mapAdminBlogsRoutes = adminBlogsRoutes.map(({ path, component: Component, role, requiresLogin, title, children }) => {
    // Recursive function to handle nested children
    const mapChildren = (routes) => routes.map(({ path: childPath, component: ChildComponent, role: childRole, requiresLogin: childRequiresLogin, title: childTitle, children: grandChildren }) => (
      <Route
        key={childPath}
        path={childPath}
        element={<RouteWithTitle path={childPath} component={ChildComponent} role={childRole} requiresLogin={childRequiresLogin} title={childTitle} />}
      >
        {/* Recursively handle deeper children */}
        {grandChildren && mapChildren(grandChildren)}
      </Route>
    ));
  
    return (
      <Route
        key={path}
        path={path}
        element={<RouteWithTitle path={path} component={Component} role={role} requiresLogin={requiresLogin} title={title} />}
      >
        {children && mapChildren(children)}
      </Route>
    );
  });
  
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            {mappedRoute}
            {mapAdminBlogsRoutes}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </Fragment>
  );
}

export default App;
