import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productSlice";

const store = configureStore({
    reducer: {products: productsReducer, auth: authReducer},
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});

export default store;
