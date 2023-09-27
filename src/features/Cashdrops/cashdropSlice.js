import {
    createSlice,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit'

import { stakersApi } from '../../services/stakers-api';


export const extendedApiSlice = stakersApi.injectEndpoints({
    endpoints: builder => ({
        getCashdrops: builder.query({
            query: () => `v3/cashdrops`,
        }),
    })
});
const cashdropsAdapter = createEntityAdapter()

const cashdropSlice = createSlice({
    name: 'cashdrop',
    initialState: cashdropsAdapter.getInitialState(),
    reducers: {
    },

});

export const { useGetCashdropsQuery } = extendedApiSlice
export default cashdropSlice.reducer

export const selectCashdropResult = extendedApiSlice.endpoints.getCashdrops.select()

export const selectActiveRounds = createSelector(
    selectCashdropResult,
    result => result.data?.cashdropRounds ?? []
)

export const selectTotalCashdrop = createSelector(
    selectActiveRounds,
    result => result.reduce((acc, curr) => acc + Number(curr.pooledAmount), 0) ?? 0
)

export const selectNextToDrop = createSelector(
    selectCashdropResult,
    result => result.data?.nextToDrop
)

export const selectWinners = createSelector(
    selectCashdropResult,
    result => result.data?.cashdropWinners ?? []
)
