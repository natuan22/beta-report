import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogLogin from "../Auth/components/DialogLogin";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import { getApi } from "../helper/getApi";
import DialogAddWatchList from "./components/DialogAddWatchList";
import HomeWatchList from "./components/HomeWatchList";
import "./components/styles/modalStyle.css";
const apiUrl = process.env.REACT_APP_BASE_URL;

const WatchList = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogin === "7MEvU") {
      const fetchDataWatchList = async () => {
        try {
          const data = await getApi(apiUrl, "/api/v1/watchlist");
          setWatchlists(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDataWatchList();
    } else {
      setLoading(false);
    }
  }, [isLogin]);

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
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

  const catchWatchlists = (arrText) => {
    setWatchlists(arrText);
  };
  useEffect(() => {
    document.title = "Danh mục theo dõi";
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
      {!loading ? (
        <div>
          {isLogin === "7MEvU" ? (
            <div>
              {watchlists?.length > 0 ? (
                <HomeWatchList
                  watchlists={watchlists}
                  catchWatchlists={catchWatchlists}
                />
              ) : (
                <div className="grid place-content-center h-screen font-medium text-lg">
                  <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                    <div className="p-7">
                      Xin chào quý nhà đầu tư{" "}
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <div>
                      Bạn chưa có watchlist, bạn hãy tạo watchlist để theo dõi
                      những mã chứng khoán mình quan tâm.
                    </div>
                    <div className="mt-14">
                      <DialogAddWatchList
                        catchWatchlists={catchWatchlists}
                        type={1}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid place-content-center h-screen font-medium text-lg">
              <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
                <div className="p-7">
                  Xin chào quý nhà đầu tư <span className="font-bold"></span>
                </div>
                <div>
                  Hãy đăng nhập để quản lý danh sách các mã chứng khoán bạn quan
                  tâm.
                </div>
                <div className="mt-14">
                  <DialogLogin onSubmitSuccess={onSubmitSuccess} type={1} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WatchList;
