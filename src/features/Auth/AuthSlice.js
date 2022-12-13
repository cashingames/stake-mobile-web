import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveToken = (data) => {
    window.localStorage.setItem("token", data);
    // console.log(data, 'i have saved')
    window.localStorage.setItem("used", "token")
}

export const getToken = () => {
    return window.localStorage.getItem("token");
}

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (data, thunkAPI) => {
         window.localStorage.removeItem("token");
        return true;
    }
)

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
export const verifyAccount = createAsyncThunk(
    'auth/verifyAccount',
    async (data, thunkAPI) => {
        const response = await axios.post(`auth/password/email`, data)
        return response.data
    }
)
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, thunkAPI) => {
        const response = await axios.post(`auth/password/reset`, data);
        return response.data
    }
)
export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (data, thunkAPI) => {
        const response = await axios.post(`auth/token/verify`, data);
        return response.data
    }
)

export const changePassword = createAsyncThunk(
    'auth/user/changePassword',
    async (data, thunkAPI) => {
        const response = await axios.post('v2/profile/me/password/change', data)
        return response.data
    }
)

export const editPersonalDetails = createAsyncThunk(
    'auth/user/editPersonalDetails',
    async (data, thunkAPI) => {
        const response = await axios.post('v2/profile/me/edit-personal', data)
        return response.data
    }
)

export const editProfileAvatar = createAsyncThunk(
    'auth/user/avatarUpdate',
    async (data, thunkAPI) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const response = await axios.post('v2/profile/me/picture', data, config).catch(e => {
            // console.log(e);
        });
        return response.data
    }
)
export const editBankDetails = createAsyncThunk(
    'auth/user/editBankDetails',
    async (data, thunkAPI) => {
        const response = await axios.post('v2/profile/me/edit-bank', data)
        return response.data
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



export const deleteUserAccount = createAsyncThunk(
    'auth/deleteUserAccount',
    async (data, thunkAPI) => {
        const response = await axios.post('v3/account/delete', data)

        return response.data
    }
)

const initialState = {
    token: "",
    createAccount: null,
    user: {},
    passwordReset: {
        // email: 'oyekunmi@gmail.com'
    },
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
        setUserPasswordResetToken: (state, action) => {
            state.passwordReset.userCode = action.payload;
        },
        reduceBoostCount: (state, action) => {
            // eslint-disable-next-line
            state.user.boosts.map(boost => {
                if (boost.id === action.payload) {
                    boost.count -= 1;
                }
            })
        }
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading sAWAWAWAWtate as needed
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = "";
                state.showIntro = false;
                state.user = {};
                state.passwordReset = {};
                state.createAccount = {};
            })
            .addCase(getUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.user = action.payload.data;
            })
            .addCase(verifyAccount.fulfilled, (state, action) => {
                state.passwordReset.email = action.meta.arg.email;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.passwordReset = {};
            })
    }
});

export const { setToken, saveCreatedUserCredentials, setUser, setUserPasswordResetToken, reduceBoostCount } = AuthSlice.actions

export default AuthSlice.reducer