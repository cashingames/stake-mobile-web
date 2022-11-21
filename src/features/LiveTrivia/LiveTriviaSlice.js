
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: null
}

export const getLiveTriviaStatus = createAsyncThunk(
    'liveTrivia/status',
    async () => {
        // console.log('arrived')
        const response = await axios.get(`v3/live-trivia/status`)
        // console.log(response, 'trivia')
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
    },
});
// eslint-disable-next-line
export const { } = LiveTriviaSlice.actions

export default LiveTriviaSlice.reducer