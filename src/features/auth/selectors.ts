import { RootState } from "../../app/store";
import { createSelector } from '@reduxjs/toolkit';

export const authSlice = (state: RootState) => state.auth

export const authSelector = createSelector(
    authSlice,
  state => state
)