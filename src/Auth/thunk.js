import * as authenTypes from "./utils/constant";
import { authenServices } from "./services/authenServices";
import Cookies from "js-cookie";

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
    //role : 2ZW79
    //true : V0U1S
    //false: 8Z5M8
    if (res.data.data.role === 1) localStorage.setItem("2ZW79", "V0U1S");
    //true : 7MEvU
    //false: 4E8WL
    localStorage.setItem("_il", "7MEvU");
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
    dispatch({
      type: authenTypes.USER_LOGOUT_ACTION,
    });
  } catch (err) {
    console.error(err);
  }
};
