import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_BASE_URL;

const logoutUser = async () => {
  Cookies.remove("at");
  Cookies.remove("rt");
  localStorage.removeItem("user");
  localStorage.removeItem("watchlistActive");
  localStorage.removeItem("2ZW79");
  localStorage.setItem("_il", "4E8WL");

  window.location.reload();

  const res = await axios
    .create({
      baseURL: apiUrl,
      headers: {
        mac: localStorage.getItem("deviceId"),
        Authorization: "Bearer " + Cookies.get("at"),
      },
    })
    .post("/api/v1/auth/logout");
};

export const refreshTokenAction = async () => {
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
    if (err.response.status === 401) {
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
    } else {
      console.error(err);
    }
  }
};
