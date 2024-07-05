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

  const headers = {
    mac: localStorage.getItem("deviceId"),
  };

  const token = Cookies.get("at");
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const res = await axios
    .create({
      baseURL: apiUrl,
      headers: headers,
    })
    .post("/api/v1/auth/logout");
};

export const refreshTokenAction = async () => {
  const headers = {
    mac: localStorage.getItem("deviceId"),
  };

  const token = Cookies.get("rt");
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  try {
    const res = await axios
      .create({
        baseURL: apiUrl,
        headers: headers,
      })
      .post("/api/v1/auth/refresh-token");
    Cookies.set("at", res.data.data.access_token);
    Cookies.set("rt", res.data.data.refresh_token);
  } catch (err) {
    await logoutUser();
  }
};

export const postApi = async (apiUrl, url, data) => {
  const headers = {
    mac: localStorage.getItem("deviceId"),
  };

  const token = Cookies.get("at");
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  try {
    const response = await axios
      .create({
        baseURL: apiUrl,
        headers: headers,
      })
      .post(url, data);
    return response.data.data;
  } catch (err) {
    if (err.response.status === 401) {
      await refreshTokenAction();
      const response = await axios
        .create({
          baseURL: apiUrl,
          headers: headers,
        })
        .post(url, data);
    } else {
      console.error(err);
    }
  }
};
