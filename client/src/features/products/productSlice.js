import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../utils/api";

// THUNKS
const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await Api.getProducts();
    return response.data;
});

const addProduct = createAsyncThunk("products/add", async ({barcode}) => {
    const response = await Api.addProduct(barcode);
    return response.data;
});

const updateProduct = createAsyncThunk("products/update", async ({barcode, data}) => {
    const response = await Api.updateProduct(barcode, {data: data});
    return response.data;
});

const deleteProduct = createAsyncThunk("products/delete", async ({barcode}) => {
    const response = await Api.deleteProduct(barcode);
    return response.data;
});

const fetchActiveProduct = createAsyncThunk("products/fetchOne", async ({barcode}) => {
    const response = await Api.getProduct(barcode);
    return response.data;
});


// SLICE
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productsIsLoading: true,
        productsError: null,
        activeProduct: {},
        activeProductIsLoading: true,
        activeProductError: null,
    },
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.productsIsLoading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.productsIsLoading = false;
            state.products = action.payload.products;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.productsIsLoading = false;
            state.productsError = action.error;
        },

        [addProduct.fulfilled]: (state, action) => {
            if (action.payload.updated === false) {
                state.products.push(action.payload.product);
            } else {
                const productIndex = state.products.findIndex(
                    (product) => product.barcode === action.meta.arg.barcode
                );
                if (productIndex > -1) {
                    state.products[productIndex] = action.payload.product;
                }
            }
        },
        [addProduct.rejected]: (state, action) => {
            state.productsError = action.error;
        },

        [updateProduct.fulfilled]: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product.barcode === action.meta.arg.barcode
            );

            if (productIndex > -1) {
                state.products[productIndex] = action.payload.product;
            }
        },
        [updateProduct.rejected]: (state, action) => {
            state.productsError = action.error;
        },

        [deleteProduct.fulfilled]: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product.barcode === action.meta.arg.barcode
            );
            if (productIndex > -1) {
                state.products.splice(productIndex, 1);
            }
        },
        [deleteProduct.rejected]: (state, action) => {
            state.productsError = action.error;
        },

        [fetchActiveProduct.pending]: (state, action) => {
            state.activeProductIsLoading = true;
        },
        [fetchActiveProduct.fulfilled]: (state, action) => {
            state.activeProductIsLoading = false;
            state.activeProduct = action.payload.product;
        },
        [fetchActiveProduct.rejected]: (state, action) => {
            state.activeProductIsLoading = false;
            state.activeProductError = action.error;
        },
    }
});


// SELECTORS
function selectProductsFeatures(state) {
    const {products, productsIsLoading, productsError} = state.products;
    return {products, productsIsLoading, productsError};
}

function selectActiveProductFeatures(state) {
    const {activeProduct, activeProductIsLoading, activeProductError} = state.products;
    return {activeProduct, activeProductIsLoading, activeProductError};
}


export {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchActiveProduct,
    selectProductsFeatures,
    selectActiveProductFeatures
};

export default productSlice.reducer;
