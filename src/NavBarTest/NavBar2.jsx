import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";

const NavBar2 = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    document.title = "BETA SMART";
  }, []);

  return (
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
      BETA SMART
    </div>
  );
};

export default NavBar2;
