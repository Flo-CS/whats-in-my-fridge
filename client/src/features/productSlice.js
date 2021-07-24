import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import {toast} from "react-toastify";
import Api from "../helpers/api";
import {asyncThunkErrorWrapper, sortProducts} from "../helpers/miscellaneous";
import {selectSortOptions} from "./filtersSlice";


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
        activeProduct: {},
        activeProductIsLoading: true,
        productsStats: {},
        productsStatsIsLoading: true,
        error: null,
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
            state.error = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);
        },

        [addProduct.fulfilled]: (state, action) => {
            if (action.payload.updated === false) {
                state.products.push(action.payload.product);
                toast.success("Produit ajouté avec succès");
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
            state.error = action.payload.errorMessage;
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
            state.error = action.payload.errorMessage;
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
            state.error = action.payload.errorMessage;
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
            state.error = action.payload.errorMessage;
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
            state.error = action.payload.errorMessage;
            toast.error(action.payload.errorMessage);
        },
    }
});

const fuse = new Fuse([], {
    keys: ["data.product_name", "data.brands_tags.name", "data.categories_tags.name", "data.labels_tags.name",
        "data.additives_tags.name", "barcode"],
    threshold: 0.4,
    distance: 50
});


// SELECTORS
function selectFilteredProducts(state) {
    const {products} = state.products;
    const {text} = state.filters;

    // Filter by text
    fuse.setCollection(products);
    const filteredProducts = text ? fuse.search(text).map(result => result.item) : products;

    return filteredProducts;
}


const selectFilteredAndSortedProducts = createSelector(
    selectFilteredProducts, selectSortOptions,
    (filteredProducts, sortOptions) => {
        return sortProducts(filteredProducts, sortOptions.name, sortOptions.direction);
    });


function selectActiveProduct(state) {
    const {activeProduct} = state.products;
    return activeProduct;
}

function selectProductsStats(state) {
    const {productsStats} = state.products;
    return productsStats;
}

export {
    fetchProducts,
    addProduct,
    updateProductQuantity,
    deleteProduct,
    fetchActiveProduct,
    fetchProductsStats,
    selectFilteredAndSortedProducts,
    selectActiveProduct,
    selectProductsStats
};

export default productSlice.reducer;
