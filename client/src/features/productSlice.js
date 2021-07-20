import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import Api from "../helpers/api";
import {asyncThunkErrorWrapper} from "../helpers/miscellaneous";


// THUNKS
const fetchProducts = createAsyncThunk("products/fetchAll", async (arg, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.getProducts(), rejectWithValue);
});

const addProduct = createAsyncThunk("products/add", async ({barcode}, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.addProduct(barcode), rejectWithValue);
});

const updateProductQuantity = createAsyncThunk("products/quantity/update", async ({
                                                                                      barcode,
                                                                                      quantity
                                                                                  }, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.updateProductQuantity(barcode, quantity), rejectWithValue);
});

const deleteProduct = createAsyncThunk("products/delete", async ({barcode}, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.deleteProduct(barcode), rejectWithValue);
});

const fetchActiveProduct = createAsyncThunk("products/fetchOne", async ({barcode}, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.getProduct(barcode), rejectWithValue);
});

const fetchProductsStats = createAsyncThunk("products/fetchStats", async ({
                                                                              startDate,
                                                                              endDate,
                                                                              timeUnit
                                                                          }, {rejectWithValue}) => {
    return await asyncThunkErrorWrapper(() => Api.getProductsStats(startDate, endDate, timeUnit), rejectWithValue);
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
            state.productsError = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);
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
            toast.success("Produit ajouté avec succès");
            }
        },
        [addProduct.rejected]: (state, action) => {
            state.productsError = action.payload.errorMessage;
            state.activeProductError = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);
        },

        [updateProductQuantity.fulfilled]: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product.barcode === action.meta.arg.barcode
            );

            if (productIndex > -1) {
                state.products[productIndex].presences = action.payload.presences;
                state.products[productIndex].quantity = action.payload.quantity;
            }
            state.activeProduct.presences = action.payload.presences;
            state.activeProduct.quantity = action.payload.quantity;
        },
        [updateProductQuantity.rejected]: (state, action) => {
            state.productsError = action.payload.errorMessage;
            state.activeProductError = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);

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
            state.productsError = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);

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
            state.activeProductError = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);
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
            state.productsStatsError = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);
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
