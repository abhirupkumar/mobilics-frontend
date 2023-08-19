import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
}

export const tokenSlice = createSlice({
    name: 'auth-details',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        removeToken: (state, action) => {
            state.token = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer