import axios from "axios";
const apiUrl = 'https://binfo.bsi.com.vn/'

export const https = axios.create({
    baseURL: apiUrl,
});
