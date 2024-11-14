import axios from "axios";
import Cookies from "js-cookie";

export const apiUrl = process.env.REACT_APP_BASE_URL;
export const resourceURL = process.env.REACT_APP_IMG_URL;

const headers = {
  mac: localStorage.getItem("deviceId"),
};

const token = Cookies.get("at");
if (token) {
  headers.Authorization = "Bearer " + token;
}
export const https = axios.create({
  baseURL: apiUrl,
  headers: headers,
});
