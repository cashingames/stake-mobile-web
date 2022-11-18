import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const saveToken = (data) => {
    window.localStorage.setItem("token", data);
    window.localStorage.setItem("used", "token")
}
export const registerUser = async (data) => {
    console.log('registering', data)
    return axios.post(`${baseURL}/auth/register`, data);
}
export const loginUser = async (data) => {
    console.log('lets log this')
    return axios.post(`${baseURL}/auth/login`, data);
}

export const isLoggedIn = createAsyncThunk(
    'auth/isLoggedIn',
    async (thunkAPI) => {
        window.localStorage.getItem("token");
    }
)
export const ResendPhoneOtp = createAsyncThunk(
    'auth/ResendPhoneOtp',
    async (data, thunkAPI) => {
        //make a network request to the server
        const response = await axios.post(`${baseURL}/auth/register/token/resend`, data);
        console.log('gotten phone token',response)
        return response.data;
    }
)

export const verifyPhoneOtp = createAsyncThunk(
    'auth/verifyDeviceToken',
    async (data, thunkAPI) => {
        //make a network request to the server
        const response = await axios.post(`${baseURL}/auth/register/verify-token`, data);
        // console.log('gotten phone token',response)
        return response.data;
    }
)


const initialState = {
    token: "",
    createAccount: {},

}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.showIntro = false;
        },
        saveCreatedUserCredentials: (state, action) => {
            state.createAccount = action.payload
            console.log('details saved')
            console.log(action.payload)
        },
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading sAWAWAWAWtate as needed
        builder
        .addCase(isLoggedIn.fulfilled, (state, action) => {
            state.token = action.payload;
        })
    }
});

export const { setToken, saveCreatedUserCredentials } = AuthSlice.actions

export default AuthSlice.reducer