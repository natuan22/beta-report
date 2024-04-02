import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "../Auth/authenSlice";

const store = configureStore({
  reducer: {
    authen: authenReducer,
  },
});

export default store;