import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../../utils/history';

export const saveToken = (data) => {
    window.localStorage.setItem("token", data);
    // console.log(data, 'i have saved')
    window.localStorage.setItem("used", "token")
}

export const getToken = () => {
    return window.localStorage.getItem("token");
}

export const registerUser = async (data) => {
    // console.log('registering', data)
    return axios.post(`auth/register`, data);
}
export const loginUser = async (data) => {
    // console.log('lets log this')
    return axios.post(`auth/login`, data);
}
export const ResendPhoneOtp = createAsyncThunk(
    'auth/ResendPhoneOtp',
    async (data, thunkAPI) => {
        //make a network request to the server
        const response = await axios.post(`auth/register/token/resend`, data);
        // console.log('gotten phone token', response)
        return response.data;
    }
)

export const verifyPhoneOtp = createAsyncThunk(
    'auth/verifyDeviceToken',
    async (data, thunkAPI) => {
        //make a network request to the server
        const response = await axios.post(`auth/register/verify-token`, data);
        // console.log('gotten phone token',response)
        return response.data;
    }
)

export const getUser = createAsyncThunk(
    'auth/user/get',
    async (thunkAPI) => {
        const response = await axios.get(`v3/user/profile`);
        // console.log(response, 'this is user')
        return response.data
    }
)


const initialState = {
    token: "",
    createAccount: null,
    user: {},
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            // console.log(action.payload)
        },
        saveCreatedUserCredentials: (state, action) => {
            state.createAccount = action.payload
            // console.log('details saved')
            // console.log(action.payload)
         
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading sAWAWAWAWtate as needed
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.user = action.payload.data;
            })
    }
});

export const { setToken, saveCreatedUserCredentials, setUser } = AuthSlice.actions

export default AuthSlice.reducer