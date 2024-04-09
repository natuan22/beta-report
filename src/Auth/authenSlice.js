import produce from "immer";
import * as authenTypes from "./utils/constant";
const initialState = {
  userData: null,
  loginMessage: "",
  userRegister: {},
  registerStatus: [],
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === authenTypes.USER_LOGIN) {
      draft.userData = payload;
    }
    if (type === authenTypes.LOGIN_FAIL) {
      draft.loginMessage = payload;
    }
    if (type === authenTypes.USER_REGISTER) {
      draft.userRegister = payload;
    }
    if (type === authenTypes.ID_REGISTED) {
      draft.registerStatus = payload;
    }
    if (type === authenTypes.USER_LOGOUT_ACTION) {
      draft.userData = null;
    }
  });
};

export default reducer;
