import { createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../app/agent';

export const loginUser = createAsyncThunk('auth/loginUser', async () => {
  
    const response:any = (email:any, password:any) => agent.post("/auth/login", { email, password });
    console.log(response,'auth')

    return response.data;
});