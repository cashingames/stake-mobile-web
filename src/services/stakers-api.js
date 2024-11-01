import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const stakersApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = getState().auth.token || window.localStorage.getItem("token");

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            headers.set('x-brand-id', process.env.REACT_APP_BRAND_ID);

            return headers
        },
    }),

    endpoints: (builder) => ({
        getRecentWinners: builder.query({
            query: () => `v3/stakers/sessions/recent`,
        }),
        getProfile: builder.query({
            query: () => `v3/user/profile`,
        }),
        getCommon: builder.query({
            query: () => `v3/user/profile`,
        }),
        getWinningOdds: builder.query({
            query: () => `v3/odds/standard`,
        }),
    }),
})

// Export hooks for usage in functional components
export const {
    useGetRecentWinnersQuery,
    useGetProfileQuery,
    useGetCommonQuery,
    useGetWinningOddsQuery,
} = stakersApi
