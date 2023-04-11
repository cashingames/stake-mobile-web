import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getCommonData = createAsyncThunk(
    'common/get',
    async () => {
        const response = await axios.get('v3/game/common');
        return response.data
    }
)

export const fetchRecentLiveTrivia = createAsyncThunk(
    'common/fetchRecentLiveTrivia',
    async (data, thunkAPI) => {
        const response = await axios.get(`v3/live-trivia/recent?page=${data}`)
        return response.data;
    }
)

export const getGlobalLeaders = createAsyncThunk(
    'common/globalLeaders/get',
    async () => {
        const response = await axios.post('v2/leaders/global');
        return response.data
    }
)
export const getGlobalLeadersByDate = createAsyncThunk(
    'common/globalLeadersByDate/get',
    async (data) => {
        const response = await axios.post('v2/leaders/global', data);
        return response.data
    }
)

export const getCategoryLeaders = createAsyncThunk(
    'common/categoryLeaders/get',
    async () => {
        const response = await axios.post('v2/leaders/categories');
        return response.data
    }
)

export const getCategoryLeadersByDate = createAsyncThunk(
    'common/categoryLeadersByDate/get',
    async (data) => {
        const response = await axios.post('v2/leaders/categories', data);
        return response.data
    }
)
export const getWeeklyLeadersByDate = createAsyncThunk(
    'common/getWeeklyLeadersByDate/get',
    async (data) => {
        const response = await axios.post('v3/leaders/global', data);
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
        return response.data;
    }
)

export const markNotificationRead = createAsyncThunk(
    'common/markNotificationRead',
    async (data, thunkAPI) => {
        const response = await axios.post(`v3/notifications/read/${data}`, data)
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
export const logActionToServer = createAsyncThunk(
    'common/logActionToServer',
    async (data, thunkAPI) => {
        const response = await axios.post('v3/log/frontend-info', data)
        return response.data
    }
)
export const fetchFeatureFlags = createAsyncThunk(
    'common/fetchFeatureFlags',
    async () => {
        const response = await axios.get(`v3/feature-flags`)
        console.log(response)
        return response.data;
    }
)
export const getBankData = createAsyncThunk(
    'common/bank/get',
    async () => {
        const response = await axios.get('v2/wallet/banks')
        return response.data
    }
)
export const fetchFaqAndAnswers = createAsyncThunk(
    'common/faq/get',
    async () => {
        const response = await axios.get('v2/faq/fetch');
        return response.data.data
    }
)
export const fetchUserFriends = createAsyncThunk(
    'common/fetchUserFriends',
    async (thunkAPI) => {
        const response = await axios.get('v3/user/search/friends')
        return response.data;
    }
)
export const searchUserFriends = createAsyncThunk(
    'common/searchUserFriends',
    async (data, thunkAPI) => {
        const response = await axios.get(`v3/user/search/friends?search=${data}`)
        return response.data;
    }
)
export const sendUserFeedback = createAsyncThunk(
    'common/sendUserFeedback',
    async (data, thunkAPI) => {
        // console.log(data)
        const response = await axios.post('v2/client/feedback', data)
        return response.data;
    }
)
export const getUserChallenges = createAsyncThunk(
    'common/getUserChallenges  ',
    async (data, thunkAPI) => {
        const response = await axios.get(`v3/user/challenges`)
        return response.data;
    }
)
export const getStakeWinners = createAsyncThunk(
    'common/getStakeWinners',
    async (data, thunkAPI) => {
        const response = await axios.get(`v3/stakers/sessions/recent`)
        // console.log(response)
        return response.data;
    }
)

export const isFeatureEnabled = async (feature, features = {}) => {

    return features.hasOwnProperty(feature) && features[feature].enabled === true
}

const initialState = {
    initialLoading: true,
    boosts: [],
    plans: [],
    trivias: [],
    gameModes: [],
    gameTypes: [],
    gameCategories: [],
    banks: [],
    globalLeaders: [],
    categoryLeaders: [],
    weeklyLeaderboard: {
        leaderboard: [],
        userRank: {}
    },
    userNotifications: [],
    userTransactions: [],
    loadMoreTransactions: true,
    maximumExhibitionStakeAmount: 0,
    minimumExhibitionStakeAmount: 0,
    maximumChallengeStakeAmount: 0,
    minimumChallengeStakeAmount: 0,
    minimumWalletFundableAmount: 0,
    totalWithdrawalAmountLimit: 0,
    faqAndAnswers: [],
    userFriends: [],
    userChallenges: [],
    loadMoreChallenges: true,
    periodBeforeChallengeStakingExpiry: '',
    stakeWinners:[],
    featureFlags: [],
    minimumBoostScore:0

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
                state.maximumExhibitionStakeAmount = data.maximumExhibitionStakeAmount;
                state.minimumExhibitionStakeAmount = data.minimumExhibitionStakeAmount;
                state.maximumChallengeStakeAmount = data.maximumChallengeStakeAmount;
                state.minimumChallengeStakeAmount = data.minimumChallengeStakeAmount;
                state.minimumWalletFundableAmount = data.minimumWalletFundableAmount;
                state.totalWithdrawalAmountLimit = data.totalWithdrawalAmountLimit;
                state.periodBeforeChallengeStakingExpiry = data.periodBeforeChallengeStakingExpiry
                state.minimumBoostScore = data.minimumBoostScore
            })
            .addCase(fetchRecentLiveTrivia.fulfilled, (state, action) => {
                state.trivias = action.payload;
            })
            .addCase(getBankData.fulfilled, (state, action) => {
                state.banks = action.payload.data;
            })
            .addCase(getGlobalLeaders.fulfilled, (state, action) => {
                state.globalLeaders = action.payload.data
            })
            .addCase(getGlobalLeadersByDate.fulfilled, (state, action) => {
                state.globalLeaders = action.payload.data;
            })
            .addCase(getCategoryLeaders.fulfilled, (state, action) => {
                state.categoryLeaders = action.payload.data
            })
            .addCase(getCategoryLeadersByDate.fulfilled, (state, action) => {
                state.categoryLeaders = action.payload.data
            })
            .addCase(getWeeklyLeadersByDate.fulfilled, (state, action) => {
                state.weeklyLeaderboard = {
                    leaderboard:  action.payload.data.leaderboard,
                    userRank: action.payload.data.userRank,
                }
            })
            .addCase(getUserNotifications.fulfilled, (state, action) => {
                state.userNotifications = action.payload.data.data;
            })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.loadMoreTransactions = !(action.payload.length < 10);
                state.userTransactions = state.userTransactions.concat(action.payload);
            })
            .addCase(fetchFaqAndAnswers.fulfilled, (state, action) => {
                state.faqAndAnswers = action.payload
            })
            .addCase(fetchUserFriends.fulfilled, (state, action) => {
                state.userFriends = action.payload
            })
            .addCase(searchUserFriends.fulfilled, (state, action) => {
                state.userFriends = action.payload
            })
            .addCase(getUserChallenges.fulfilled, (state, action) => {
                state.loadMoreChallenges = action.payload.length >= 10;
                state.userChallenges = state.userChallenges.concat(action.payload);
            })
            .addCase(getStakeWinners.fulfilled, (state, action) => {
                state.stakeWinners = action.payload
            })
            .addCase(fetchFeatureFlags.fulfilled, (state, action) => {
                state.featureFlags = action.payload.data
            })
    }
})
export const { initialLoadingComplete } = CommonSlice.actions
export default CommonSlice.reducer