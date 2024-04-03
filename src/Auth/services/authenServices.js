import Cookies from 'js-cookie';
import { https } from '../../services/configService';
import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL;

export const authenServices = {
    userLogin: (data) => {
        return https.post(`${apiUrl}/api/v1/auth/login`, data)
    },

    autoLogin: (token) => {
        return https.get(`${apiUrl}/api/v1/user/info`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    userLogout: () => {
        return axios.create({
            baseURL: apiUrl,
            headers: {
                mac: localStorage.getItem('deviceId'),
                Authorization: "Bearer " + Cookies.get('at')
              }
        }).post('/api/v1/auth/logout')
    },
} 