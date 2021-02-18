import {createSlice} from "@reduxjs/toolkit";

import {PRODUCTS_STATUS} from "./productsConstants";

const productSlice = createSlice({
    name: "products",
    initialState: {
        allProductsStatus: PRODUCTS_STATUS.LOADING,
        allProducts: [],
        oneProductStatus: PRODUCTS_STATUS.LOADING,
        oneProduct: {}
    },
    reducers: {
        setAllProducts(state, action) {
            state.allProducts = action.payload;
        },
        setOneProduct(state, action) {
            state.oneProduct = action.payload
        },
        addProductToAllProducts(state, action) {
            state.allProducts.push(action.payload);
        },
        updateProductFromAllProducts(state, action) {
            const productIndex = state.allProducts.findIndex(
                (product) => product.barcode === action.payload.barcode
            );
            if (productIndex > -1) {
                state.allProducts[productIndex] = action.payload;
            }
        },
        deleteProductFromAllProducts(state, action) {
            const productIndex = state.allProducts.findIndex(
                (product) => product.barcode === action.payload
            );
            if (productIndex > -1) {
                state.allProducts.splice(productIndex, 1);
            }
        },
        setAllProductsStatus(state, action) {
            state.allProductsStatus = action.payload;
        },
        setOneProductStatus(state, action) {
            state.oneProductStatus = action.payload;
        },
    },
});

export const {
    setAllProducts,
    addProductToAllProducts,
    updateProductFromAllProducts,
    deleteProductFromAllProducts,
    setAllProductsStatus,
    setOneProductStatus,
    setOneProduct
} = productSlice.actions;

export default productSlice.reducer;
