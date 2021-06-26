import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import Api from "../helpers/api";

//THUNKS
const loginUser = createAsyncThunk("auth/loginUser", async ({data}) => {
    const response = await Api.login(data);
    return response.data;
});

const registerUser = createAsyncThunk("auth/registerUser", async ({data}) => {
    const response = await Api.register(data);
    return response.data;
});

const checkUserToken = createAsyncThunk("auth/checkToken", async () => {
    const response = await Api.checkToken();
    return response.data;
});

const logoutUser = createAsyncThunk("auth/logout", async () => {
    const response = await Api.logout();
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
            toast.error("Impossible de se connecter, vérifiez vos identifiants");
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
            state.error = action.error;
            toast.error("Impossible de se connecter, veuillez vous reconnecter");
        },

        [logoutUser.fulfilled]: (state, action) => {
            state.isAuthenticated = false;
            state.user = {};
        },
        [logoutUser.rejected]: (state, action) => {
            state.error = action.error;
        }
    }
});

//SELECTORS
function selectAuthFeatures(state) {
    return state.auth;
}

export {loginUser, registerUser, checkUserToken, logoutUser, selectAuthFeatures};

export default authSlice.reducer;
