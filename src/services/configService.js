import axios from "axios";
const apiUrl = 'http://192.168.9.145:3002/'

export const https = axios.create({
    baseURL: apiUrl,

});
