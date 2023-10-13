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

export const formattedDateHandler = (winningDate) => {
    const date = new Date(winningDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const month = months[date.getMonth()];
    const day = date.getDate();

    let daySuffix;
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        switch (day % 10) {
            case 1:
                daySuffix = 'st';
                break;
            case 2:
                daySuffix = 'nd';
                break;
            case 3:
                daySuffix = 'rd';
                break;
            default:
                daySuffix = 'th';
        }
    }

    const formattedDate = `${month} ${day}${daySuffix}`;
    return formattedDate
}