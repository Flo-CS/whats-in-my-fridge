import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
    reducer: {products: productsReducer, auth: authReducer},
});

export default store;
