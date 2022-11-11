import { createReducer } from '@reduxjs/toolkit';
import { loginUser } from './actions';



export type AuthState = {
    token: string
};

const initialState: AuthState = {
    token : ''
};


export const authReducer = createReducer(initialState, builder => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload
        console.log(payload,'reducer')
      })
  });