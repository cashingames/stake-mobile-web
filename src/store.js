import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'
import AuthSlice from './features/Auth/AuthSlice'
import CommonSlice from './features/CommonSlice'
import GameSlice from './features/Games/GameSlice'
import LiveTriviaSlice from './features/LiveTrivia/LiveTriviaSlice'
import StoreSlice from './features/Store/StoreSlice'
import { stakersApi } from './services/stakers-api'


export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    common: CommonSlice,
    liveTrivia: LiveTriviaSlice,
    game: GameSlice,
    store: StoreSlice,
    [stakersApi.reducerPath]: stakersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stakersApi.middleware),
})
export const useAppDispatch = () => useDispatch
export const useTypedSelector = () => useSelector
setupListeners(store.dispatch);