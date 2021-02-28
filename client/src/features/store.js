import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productSlice";

const store = configureStore({
    reducer: {products: productsReducer, auth: authReducer},
});

export default store;
