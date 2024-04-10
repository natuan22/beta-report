import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import DialogAddWatchList from "./components/DialogAddWatchList";
import DialogLogin from "../Auth/components/DialogLogin";

const WatchList = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(isLogin);
  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
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
      <div>
        {isLogin === "7MEvU" ? (
          <div>
            <div className="flex flex-col justify-center items-center w-full text-center">
              <h4>Chưa có watchlist</h4>
              <div>
                Bạn hãy tạo watchlist để theo dõi những mã cổ phiếu mình quan
                tâm.
              </div>
              <div className="mt-3">
                <DialogAddWatchList />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center w-full text-center">
              <h4>Đăng nhập</h4>
              <div>
                Hãy đăng nhập để quản lý danh sách các mã chứng khoán bạn quan
                tâm.
              </div>
              <div className="mt-3">
                <DialogLogin onSubmitSuccess={onSubmitSuccess} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
