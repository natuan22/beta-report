import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_BASE_URL;

const logoutUser = async () => {
  try {
    const res = await axios
      .create({
        baseURL: apiUrl,
        headers: {
          mac: localStorage.getItem("deviceId"),
          Authorization: "Bearer " + Cookies.get("at"),
        },
      })
      .post("/api/v1/auth/logout");
    Cookies.remove("at");
    Cookies.remove("rt");
  } catch (err) {
    console.error(err); //logout
  }
};

const refreshTokenAction = async () => {
  try {
    const res = await axios
      .create({
        baseURL: apiUrl,
        headers: {
          mac: localStorage.getItem("deviceId"),
          Authorization: "Bearer " + Cookies.get("rt"),
        },
      })
      .post("/api/v1/auth/refresh-token");
    Cookies.set("at", res.data.data.access_token);
    Cookies.set("rt", res.data.data.refresh_token);
  } catch (err) {
    await logoutUser();
  }
};

export const postApi = async (apiUrl, url, data) => {
  try {
    const response = await axios
      .create({
        baseURL: apiUrl,
        headers: {
          mac: localStorage.getItem("deviceId"),
          Authorization: "Bearer " + Cookies.get("at"),
        },
      })
      .post(url, data);
  } catch (err) {
    await refreshTokenAction();
    const response = await axios
      .create({
        baseURL: apiUrl,
        headers: {
          mac: localStorage.getItem("deviceId"),
          Authorization: "Bearer " + Cookies.get("at"),
        },
      })
      .post(url, data);
  }
};
