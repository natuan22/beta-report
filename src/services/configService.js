import axios from "axios";
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_BASE_URL;
const accessToken = Cookies.get('at')

export const https = axios.create({
    baseURL: apiUrl,
    headers: {
        mac: localStorage.getItem('deviceId'),
        Authorization: "Bearer " + Cookies.get('at')
      }
});
