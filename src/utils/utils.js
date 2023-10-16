import { logoutUser } from "../features/Auth/AuthSlice";
import axios from 'axios';

export const calculateTimeRemaining = (futureTime, onComplete) => {
    var diff = futureTime - new Date().getTime();

    if (diff < 3000) {
        onComplete();
        return "1s";
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var result = "";
    if (days !== 0) {
        result += days + "d ";
    }

    if (hours !== 0) {
        result += hours + "h ";
    }

    if (minutes !== 0) {
        result += minutes + "m ";
    }

    if (seconds !== 0) {
        result += seconds + "s ";
    }

    return result;

}


export const setupAxios = (token, dispatch) => {
    axios.defaults.headers.common['x-brand-id'] = process.env.REACT_APP_BRAND_ID;
    axios.defaults.headers.common['x-request-env'] = process.env.REACT_APP_REQUEST_ENV;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        delete axios.defaults.headers.common['Authorization'];
    }

    axios.interceptors.response.use(
        response => response,
        error => {
            console.log(error.config.url, error.message);

            if (error.response && error.response.status === 401) {
                dispatch(logoutUser())
            }
            return Promise.reject(error);
        });

}

