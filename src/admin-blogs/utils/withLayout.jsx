import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../Auth/thunk";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import ThemeProvider from "./ThemeContext";

/**
 * Higher-Order Component for wrapping components with the AdminBlogs layout.
 *
 * @param {React.ComponentType} WrappedComponent - The component to wrap.
 * @returns {React.FC} A new component wrapped with layout.
 */
const withLayout = (WrappedComponent) => {
  const LayoutHOC = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(localStorage.getItem(process.env.REACT_APP_IS_LG));
    const [role, setRole] = useState(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const handleUserLogout = () => {
      if (isLogin) {
        setIsLogin(null);
        setRole(null);
        setUser(null);
        dispatch(userLogoutAction());
        window.location.reload();
        localStorage.setItem(process.env.REACT_APP_IS_LG, process.env.REACT_APP_LG_F);
        localStorage.removeItem(process.env.REACT_APP_USER_ROLE);
        localStorage.removeItem("user");
      }
    };

    return (
      <ThemeProvider>
        <div id="admin-blogs" className="font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* Header */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                role={role}
                user={user}
                handleUserLogout={handleUserLogout}
              />

              {/* Main content */}
              <main className="grow">
                <WrappedComponent {...props} />
              </main>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  };

  return LayoutHOC;
};

export default withLayout;
