import Api from "../../utils/api";

import {PRODUCTS_STATUS} from "./productsConstants";
import {
    addProductToAllProducts,
    deleteProductFromAllProducts,
    setAllProducts,
    setAllProductsStatus,
    setOneProduct,
    setOneProductStatus,
    updateProductFromAllProducts,
} from "./productSlice";

// TODO : Rename all the redux "things" because names are not clear and it's not maintainable
export async function fetchUserProducts(dispatch) {
    try {
        dispatch(setAllProductsStatus(PRODUCTS_STATUS.LOADING));
        const response = await Api.getProducts();
        dispatch(setAllProducts(response.data.products));
        dispatch(setAllProductsStatus(PRODUCTS_STATUS.LOADED));
    } catch (error) {
        dispatch(setAllProductsStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function addUserProduct(dispatch, barcode) {
    try {
        const response = await Api.addProduct(barcode);

        // Check if the product has been created or just updated and create or update
        if (response.data.updated === false) {
            dispatch(addProductToAllProducts(response.data.product));
        } else {
            dispatch(updateProductFromAllProducts(response.data.product));
        }
    } catch (error) {
        dispatch(setAllProductsStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function updateUserProduct(dispatch, barcode, data) {
    try {
        const response = await Api.updateProduct(barcode, {data: data});

        dispatch(updateProductFromAllProducts(response.data.product));
    } catch (error) {
        dispatch(setAllProductsStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function deleteUserProduct(dispatch, barcode) {
    try {
        await Api.deleteProduct(barcode);
        dispatch(deleteProductFromAllProducts(barcode));
    } catch (error) {
        dispatch(setAllProductsStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function fetchUserProduct(dispatch, barcode) {
    try {
        dispatch(setOneProductStatus(PRODUCTS_STATUS.LOADING));
        const response = await Api.getProduct(barcode);
        dispatch(setOneProduct(response.data.product));
        dispatch(setOneProductStatus(PRODUCTS_STATUS.LOADED));
    } catch (error) {
        dispatch(setOneProductStatus(PRODUCTS_STATUS.ERROR));
    }
}
