import {createSlice} from "@reduxjs/toolkit";

import {AUTH_STATUS} from "./authConstants";

const authSlice = createSlice({
    name: "auth",
    initialState: {status: AUTH_STATUS.DISCONNECTED, token: null},
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {setToken, setStatus} = authSlice.actions;

export default authSlice.reducer;
