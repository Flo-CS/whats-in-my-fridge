import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import filtersReducer from "./filtersSlice";
import productsReducer from "./productSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        filters: filtersReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});

export default store;
