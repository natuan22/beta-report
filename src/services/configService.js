import axios from "axios";
const apiUrl = process.env.local.REACT_APP_BASE_URL;

export const https = axios.create({
    baseURL: apiUrl,
});
