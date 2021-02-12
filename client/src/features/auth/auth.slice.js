import {createSlice} from "@reduxjs/toolkit";

import {AUTH_STATUS} from "./auth.constants";

const authSlice = createSlice({
    name: "auth",
    initialState: {status: AUTH_STATUS.DISCONNECTED},
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {setStatus} = authSlice.actions;

export default authSlice.reducer;
