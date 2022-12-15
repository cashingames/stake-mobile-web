import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './features/Auth/AuthSlice'
import CommonSlice from './features/CommonSlice'
import GameSlice from './features/Games/GameSlice'
import LiveTriviaSlice from './features/LiveTrivia/LiveTriviaSlice'
import StoreSlice from './features/Store/StoreSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    common: CommonSlice,
    liveTrivia: LiveTriviaSlice,
    game: GameSlice,
    store: StoreSlice,
  },
})
