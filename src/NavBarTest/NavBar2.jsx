import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";

function NavBar2() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("_il"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", JSON.stringify(false));
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(JSON.parse(localStorage.getItem("_il")));
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  return (
    <div className="relative">
      <div className="absolute right-[10%] top-[1%]">
        <NavBar
          isLogin={isLogin}
          user={user}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      Cảnh báo tín hiệu
    </div>
  );
}

export default NavBar2;
