import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import Api from "../helpers/api";
import {asyncThunkErrorWrapper} from "../helpers/miscellaneous";


//THUNKS
const loginUser = createAsyncThunk("auth/loginUser", async ({data}, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.login(data), rejectWithValue);
});

const registerUser = createAsyncThunk("auth/registerUser", async ({data}, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.register(data), rejectWithValue);
});

const checkUserToken = createAsyncThunk("auth/checkToken", async (arg, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.checkToken(), rejectWithValue);
});

const logoutUser = createAsyncThunk("auth/logout", async (arg, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.logout(), rejectWithValue);
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
            state.error = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);

        },

        [registerUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            toast.success("L'inscription a réussi, vous pouvez maintenant vous connecter");
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);

        },

        [checkUserToken.pending]: (state, action) => {
            state.isLoading = true;

        },
        [checkUserToken.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [checkUserToken.rejected]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload.errorMessage;
        },
        [logoutUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = {};
        },
        [logoutUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);

        }
    }
});

//SELECTORS
function selectAuthFeatures(state) {
    return state.auth;
}

export {loginUser, registerUser, checkUserToken, logoutUser, selectAuthFeatures};

export default authSlice.reducer;
