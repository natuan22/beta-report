import axios from "axios";
import Cookies from "js-cookie";
import { refreshTokenAction } from "./postApi";

export const getApi = async (apiUrl, url) => {
  try {
    const response = await axios
      .create({
        baseURL: apiUrl,
        headers: {
          mac: localStorage.getItem("deviceId"),
          Authorization: "Bearer " + Cookies.get("at"),
        },
      })
      .get(url);
    return response.data.data;
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
        .get(url);
      return response.data.data;
    } else {
      console.error(err);
    }
  }
};
