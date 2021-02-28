import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../utils/api";

//THUNKS
const loginUser = createAsyncThunk("auth/loginUser", async ({data}) => {
    const response = await Api.login(data);
    return response.data;
});

const registerUser = createAsyncThunk("auth/registerUser", async ({data}) => {
    const response = await Api.register(data);
    return response.data;
});

//SLICE
const authSlice = createSlice({
    name: "auth",
    initialState: {user: {}, isAuthenticated: false, isLoading: true, error: ""},
    reducers: {},
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.error;
        },

        [registerUser.pending]: (state, action) => {
            // For the moment nothing
        },
        [registerUser.fulfilled]: (state, action) => {
            // For the moment nothing
        },
        [registerUser.rejected]: (state, action) => {
            // For the moment nothing
        },
    }
});

//SELECTORS
function selectAuthFeatures(state) {
    return state.auth;
}

export {loginUser, registerUser, selectAuthFeatures};

export default authSlice.reducer;
