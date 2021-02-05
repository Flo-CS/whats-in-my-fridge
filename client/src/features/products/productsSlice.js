import {createSlice} from "@reduxjs/toolkit";

import {PRODUCTS_STATUS} from "./productsConstants";

const productsSlice = createSlice({
    name: "products",
    initialState: {status: PRODUCTS_STATUS.LOADING, products: []},
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        updateProduct(state, action) {
            const productIndex = state.products.findIndex(
                (product) => product.barcode === action.payload.barcode
            );
            if (productIndex > -1) {
                state.products[productIndex] = action.payload;
            }
        },
        deleteProduct(state, action) {
            const productIndex = state.products.findIndex(
                (product) => product.barcode === action.payload
            );
            if (productIndex > -1) {
                state.products.splice(productIndex, 1);
            }
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setStatus,
} = productsSlice.actions;

export default productsSlice.reducer;
