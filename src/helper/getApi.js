import axios from "axios";
import Cookies from "js-cookie";
import { refreshTokenAction } from "./postApi";
import { apiUrl } from "../services/configService";

export const getApi = async (url, type) => {
  if (type === 1) {
    const headers = {
      mac: localStorage.getItem("deviceId"),
    };

    const token = Cookies.get("at");
    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    delete headers.Authorization;

    try {
      const response = await axios
        .create({
          baseURL: apiUrl,
          headers: headers,
        })
        .get(url);
      return response.data.data;
    } catch (err) {
      if (err.response.status === 401) {
        await refreshTokenAction();
        const response = await axios
          .create({
            baseURL: apiUrl,
            headers: headers,
          })
          .get(url);
        return response.data.data;
      } else {
        console.error(err);
      }
    }
  } else {
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
        .get(url);
      return response.data.data;
    } catch (err) {
      if (err.response.status === 401) {
        await refreshTokenAction();
        const response = await axios
          .create({
            baseURL: apiUrl,
            headers: headers,
          })
          .get(url);
        return response.data.data;
      } else {
        console.error(err);
      }
    }
  }
};
