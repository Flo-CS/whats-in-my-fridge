import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import Api from "../helpers/api";

// THUNKS
const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await Api.getProducts();
    return response.data;
});

const addProduct = createAsyncThunk("products/add", async ({barcode}) => {
    const response = await Api.addProduct(barcode);
    return response.data;
});

const updateProductQuantity = createAsyncThunk("products/quantity/update", async ({barcode, quantity}) => {
    const response = await Api.updateProductQuantity(barcode, quantity);
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

const fetchProductsStats = createAsyncThunk("products/fetchStats", async ({startDate, endDate, timeUnit}) => {
    const response = await Api.getProductsStats(startDate, endDate, timeUnit);
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
        productsStats: {},
        productsStatsIsLoading: true,
        productsStatsError: null
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
            state.activeProductError = action.error
            toast.error("Le produit n'a pas pu être ajouté, vérifiez le code barre");
        },

        [updateProductQuantity.fulfilled]: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product.barcode === action.meta.arg.barcode
            );

            if (productIndex > -1) {
                state.products[productIndex].presences = action.payload.presences;
                state.products[productIndex].quantity = action.payload.quantity;
            }
            state.activeProduct.presences = action.payload.presences
            state.activeProduct.quantity = action.payload.quantity
        },
        [updateProductQuantity.rejected]: (state, action) => {
            state.productsError = action.error;
            toast.error("Le produit n'a pas pu être mis à jour");
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
            toast.error("Le produit n'a pas pu être supprimé");
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

        [fetchProductsStats.pending]: (state, action) => {
            state.productsStatsIsLoading = true;
        },
        [fetchProductsStats.fulfilled]: (state, action) => {
            state.productsStatsIsLoading = false;
            state.productsStats = action.payload.stats;
        },
        [fetchProductsStats.rejected]: (state, action) => {
            state.productsStatsIsLoading = false;
            state.productsStatsError = action.error;
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

function selectProductsStatsFeatures(state) {
    const {productsStats, productsStatsIsLoading, productsStatsError} = state.products;
    return {productsStats, productsStatsIsLoading, productsStatsError};
}

export {
    fetchProducts,
    addProduct,
    updateProductQuantity,
    deleteProduct,
    fetchActiveProduct,
    fetchProductsStats,
    selectProductsFeatures,
    selectActiveProductFeatures,
    selectProductsStatsFeatures
};

export default productSlice.reducer;
