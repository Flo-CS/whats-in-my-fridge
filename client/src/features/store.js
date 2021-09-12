import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import filtersReducer from "./filtersSlice";
import productsReducer from "./productSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        filters: filtersReducer
    }
});

export default store;
