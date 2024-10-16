import axios from "axios";
import Cookies from "js-cookie";
import { apiUrl, https } from "../../services/configService";

export const authenServices = {
  userLogin: (data) => {
    return https.post(`${apiUrl}/api/v1/auth/login`, data);
  },

  userRegister: (formData) => {
    return https.post(`${apiUrl}/api/v1/auth/register`, formData);
  },

  autoLogin: (token) => {
    return https.get(`${apiUrl}/api/v1/user/info`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  userLogout: () => {
    const headers = {
      mac: localStorage.getItem("deviceId"),
    };

    const token = Cookies.get("at");
    if (token) {
      headers.Authorization = "Bearer " + token;
    }
    return axios
      .create({
        baseURL: apiUrl,
        headers: headers,
      })
      .post("/api/v1/auth/logout");
  },
};
