import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getCommonData = createAsyncThunk(
    'common/get',
    async () => {
        // console.log("fetching common data");
        const response = await axios.get('v3/game/common');
        // console.log(response);
        return response.data
    }
)

export const fetchRecentLiveTrivia = createAsyncThunk(
    'common/fetchRecentLiveTrivia',
    async (data, thunkAPI) => {
        const response = await axios.get(`v3/live-trivia/recent?page=${data}`)
        // console.log(response)
        return response.data;
    }
)

export const getGlobalLeaders = createAsyncThunk(
    'common/globalLeaders/get',
    async () => {
        // console.log("getting global leaders")
        const response = await axios.post('v2/leaders/global');
        console.log(response)
        return response.data
    }
)
export const withdrawWinnings = async (data) => {
    return axios.post('v3/winnings/withdraw', data);

}
export const getUserNotifications = createAsyncThunk(
    'common/getUserNotifications',
    async (data, thunkAPI) => {
        //make a network request to the server
        const response = await axios.get('v3/notifications')
        // console.log(response.data)
        return response.data;
    }
)

export const markNotificationRead = createAsyncThunk(
    'common/markNotificationRead',
    async (data, thunkAPI) => {
        //make a network request to the server
        const response = await axios.put(`v3/notifications/read/${data}`, data)
        return response.data;
    }
)
export const fetchUserTransactions = createAsyncThunk(
    'common/fetchUserTransactions',
    async (data, thunkAPI) => {
        const response = await axios.get(`v2/wallet/me/transactions?page=${data}`)
        return response.data;
    }
)
export const fetchFeatureFlags = createAsyncThunk(
    'common/fetchFeatureFlags',
    async () => {
        const response = await axios.get(`v3/feature-flags`)
        return response.data;
    }
)
export const isFeatureEnabled = async (feature, features = {}) => {

    return features.hasOwnProperty(feature) && features[feature].enabled === true
}

const initialState = {
    initialLoading: true,
    trivias: [],
    loadMoreLiveTrivias: true,
    gameModes: [],
    globalLeaders: [],
    userNotifications: [],
    userTransactions: [],
    loadMoreTransactions: true,
    featureFlags: [],
}

export const CommonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        initialLoadingComplete: (state) => {
            state.initialLoading = false;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading sAWAWAWAWtate as needed
        builder
            .addCase(getCommonData.fulfilled, (state, action) => {
                var data = action.payload.data;
                state.boosts = data.boosts;
                state.achievements = data.achievements;
                state.plans = data.plans;
                state.gameTypes = data.gameTypes;
                state.gameModes = data.gameModes;
                state.gameCategories = data.gameCategories;
                state.minVersionCode = data.minVersionCode;
                state.minVersionForce = data.minVersionForce;
                state.maximumStakeAmount = data.maximumStakeAmount;
                state.minimumStakeAmount = data.minimumStakeAmount
                state.periodBeforeChallengeStakingExpiry = data.periodBeforeChallengeStakingExpiry
            })
            .addCase(fetchRecentLiveTrivia.fulfilled, (state, action) => {
                state.loadMoreLiveTrivias = !(action.payload.length < 10);
                state.trivias = state.trivias.concat(action.payload);
            })
            .addCase(getGlobalLeaders.fulfilled, (state, action) => {
                state.globalLeaders = action.payload.data
                console.log(state.globalLeaders)
            })
            .addCase(getUserNotifications.fulfilled, (state, action) => {
                state.userNotifications = action.payload.data.data;
            })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.loadMoreTransactions = !(action.payload.length < 10);
                state.userTransactions = state.userTransactions.concat(action.payload);
            })
            .addCase(fetchFeatureFlags.fulfilled, (state, action) => {
                state.featureFlags = action.payload.data
            })
    }
})
export const { initialLoadingComplete } = CommonSlice.actions
export default CommonSlice.reducer