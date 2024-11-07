import Cookies from "js-cookie";
import { authenServices } from "./services/authenServices";
import * as authenTypes from "./utils/constant";

export const userLoginAction = (data) => async (dispatch) => {
  try {
    const res = await authenServices.userLogin(data);
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data,
    });

    const userDataWithoutTokens = { ...res.data.data };
    delete userDataWithoutTokens.access_token;
    delete userDataWithoutTokens.refresh_token;
    delete userDataWithoutTokens.expired_at;
    delete userDataWithoutTokens.is_verified;
    delete userDataWithoutTokens.role;
    delete userDataWithoutTokens.user_id;

    localStorage.setItem("user", JSON.stringify(userDataWithoutTokens));
    if (res.data.data.role === 0) {
      localStorage.setItem(
        process.env.REACT_APP_USER_ROLE,
        process.env.REACT_APP_BASE_USER
      );
    } else if (res.data.data.role === 1) {
      localStorage.setItem(
        process.env.REACT_APP_USER_ROLE,
        process.env.REACT_APP_ADMIN
      );
    } else
      localStorage.setItem(
        process.env.REACT_APP_USER_ROLE,
        process.env.REACT_APP_PREMIUM_USER
      );
    localStorage.setItem(
      process.env.REACT_APP_IS_LG,
      process.env.REACT_APP_LG_T
    );
    Cookies.set("at", res.data.data.access_token);
    Cookies.set("rt", res.data.data.refresh_token);
  } catch (err) {
    dispatch({
      type: authenTypes.LOGIN_FAIL,
      payload: "Sai tài khoản hoặc mật khẩu",
    });
  }
};

export const autoLoginWithToken = (token) => async (dispatch) => {
  if (!token) return;
  try {
    const res = await authenServices.autoLogin(token);
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data,
    });
  } catch (err) {
    localStorage.setItem("access_token", "");
    dispatch({
      type: authenTypes.LOGIN_FAIL,
      payload: "Sai thông tin đăng nhập",
    });
  }
};

export const userRegisterAction = (formData) => async (dispatch) => {
  try {
    const res = await authenServices.userRegister(formData);
    dispatch({
      type: authenTypes.USER_REGISTER,
      payload: formData,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const userLogoutAction = () => async (dispatch) => {
  try {
    const res = await authenServices.userLogout();
    Cookies.remove("at");
    Cookies.remove("rt");
    localStorage.removeItem("watchlistActive");
    localStorage.removeItem(process.env.REACT_APP_USER_ROLE);
    localStorage.setItem(
      process.env.REACT_APP_IS_LG,
      process.env.REACT_APP_LG_F
    );

    dispatch({ type: authenTypes.USER_LOGOUT_ACTION });
  } catch (err) {
    console.error(err);
  }
};
