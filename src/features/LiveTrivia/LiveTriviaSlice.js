
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: null
}

export const getLiveTriviaStatus = createAsyncThunk(
    'liveTrivia/status',
    async () => {
        const response = await axios.get(`v3/live-trivia/status`)
        // console.log(response)
        return response.data;
    }
)

export const getLiveTriviaDetails = createAsyncThunk(
    'liveTrivia/details',
    async (data, thunkAPI) => {
        const response = await axios.get(`v3/live-trivia/${data}/get`)
        return response.data;
    }
)

export const liveTriviaPayment = createAsyncThunk(
    'liveTrivia/payment',
    async (data, thunkAPI) => {
        const response = await axios.post(`v3/live-trivia/entrance/pay`,data )
        return response.data;
    }
)

export const LiveTriviaSlice = createSlice({
    name: 'liveTrivia',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLiveTriviaStatus.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(getLiveTriviaDetails.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    },
});
// eslint-disable-next-line
export const { } = LiveTriviaSlice.actions

export default LiveTriviaSlice.reducer