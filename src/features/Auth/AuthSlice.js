import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;


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


const initialState = {
    token: "",
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.showIntro = false;
        }
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading sAWAWAWAWtate as needed
        builder
        .addCase(isLoggedIn.fulfilled, (state, action) => {
            state.token = action.payload;
        })
    }
});

export const { setToken } = AuthSlice.actions

export default AuthSlice.reducer