import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products/product.slice";
import authReducer from "./auth/auth.slice";

const store = configureStore({
    reducer: {products: productsReducer, auth: authReducer},
});

export default store;
