
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    boosts: [],
    achievements: [],
    plans: [],
}



export const buyBoostFromWallet = createAsyncThunk(
    'store/wallet/purchaseBoost',
    async (data) => {
        const response =  await axios.post(`v3/boosts/${data.id}/buy`, data);
        return response.data;
    }
)

export const buyPlanFromWallet = createAsyncThunk(
    'store/wallet/purchaseGamePlan',
    async (planId, thunkAPI) => {
        const response = await axios.post(`v3/plan/subscribe/${planId}`)
        return response.data;
    }
)

export const StoreSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        fetchAchievements: (state, action) => {
            state.achievements = action.payload.achievements;
        },
        fetchPlans: (state, action) => {
            state.plans = action.payload.plans;
        },
    }
});

export const { fetchAchievements, fetchPlans } = StoreSlice.actions

export default StoreSlice.reducer