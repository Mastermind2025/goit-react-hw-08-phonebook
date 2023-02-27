import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi, publicApi, token } from "http/http";


export const authSignUpThunk = createAsyncThunk('signup', async (values, thunkAPI) => {
    
    try {
        const { data } = await privateApi.post('/users/signup', values);
        token.set(data.token);
       
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Sorry, something went wrong');
    }
    
})

export const authLoginThunk = createAsyncThunk('login', async (values, thunkAPI) => {
    try {
        const { data } = await publicApi.post('/users/login', values);
        token.set(data.token);
        return data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue('Sorry, something went wrong');
    }
});

export const authLogOutThunk = createAsyncThunk('logout', async (values, thunkAPI) => {
    try {
        const { data } = await privateApi.post('/users/logout');
        token.remove();//*
        return data;//*
    } catch (error) {
        
    }
    
});