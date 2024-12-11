import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogLogin from "../Auth/components/DialogLogin";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import { getApi } from "../helper/getApi";
import DialogAddWatchList from "./components/DialogAddWatchList";
import HomeWatchList from "./components/HomeWatchList";
import "./components/styles/modalStyle.css";

const WatchList = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(process.env.REACT_APP_IS_LG)
  );
  const [role, setRole] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_ROLE)
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogin === process.env.REACT_APP_LG_T) {
      const fetchDataWatchList = async () => {
        try {
          const data = await getApi("/api/v1/watchlist");
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

  useEffect(() => {
    // Hàm thêm style trực tiếp vào các phần tử có class 'ant-dropdown'
    const applyCustomStyles = () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown");
      dropdowns.forEach((dropdown) => {
        dropdown.style.removeProperty('inset');
        dropdown.style.removeProperty('z-index');
        // Áp dụng các style trực tiếp nếu chưa có
        if (!dropdown.style.getPropertyValue('inset')) {
          dropdown.style.setProperty('inset', '209px auto auto 40px', 'important');
          dropdown.style.setProperty('z-index', '900', 'important');
        }
      });
    };

    // Gọi hàm applyCustomStyles lần đầu tiên khi component mount
    applyCustomStyles();

    // Nếu bạn muốn lắng nghe sự thay đổi DOM (khi phần tử mới xuất hiện)
    const observer = new MutationObserver(applyCustomStyles);
    observer.observe(document.body, { childList: true, subtree: true });

    // Dọn dẹp observer và xóa style khi component unmount
    return () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown");
      dropdowns.forEach((dropdown) => {
        // Xóa style khi component unmount
        dropdown.style.removeProperty('inset');
        dropdown.style.removeProperty('z-index');
      });
      // Dừng việc quan sát DOM khi component unmount
      observer.disconnect();
    };
  }, []);

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      localStorage.setItem(
        process.env.REACT_APP_IS_LG,
        process.env.REACT_APP_LG_F
      );
      localStorage.removeItem(process.env.REACT_APP_USER_ROLE);
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem(process.env.REACT_APP_IS_LG));
    setRole(localStorage.getItem(process.env.REACT_APP_USER_ROLE));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const catchWatchlists = (arrText) => {
    setWatchlists(arrText);
  };

  return (
    <div className="relative font-[Roboto]">
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
          {isLogin === process.env.REACT_APP_LG_T ? (
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
