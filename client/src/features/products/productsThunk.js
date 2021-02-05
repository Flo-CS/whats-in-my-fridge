import {addProduct, deleteProduct, setProducts, setStatus, updateProduct,} from "./productsSlice";

import Api from "../../utils/api";

import {PRODUCTS_STATUS} from "./productsConstants";

// TODO : Make some renaming because there is conflict with redux slice action names
export async function fetchUserProducts(dispatch) {
    try {
        dispatch(setStatus(PRODUCTS_STATUS.LOADING));
        const response = await Api.getProducts();
        dispatch(setProducts(response.data.products));
        dispatch(setStatus(PRODUCTS_STATUS.LOADED));
    } catch (error) {
        dispatch(setStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function addUserProduct(dispatch, barcode) {
    try {
        const response = await Api.addProduct(barcode);

        // Check if the product has been created or just updated because it already exist and create or update
        if (response.data.updated === false) {
            dispatch(addProduct(response.data.product));
        } else {
            dispatch(updateProduct(response.data.product));
        }
    } catch (error) {
        dispatch(setStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function updateUserProduct(dispatch, barcode, data) {
    try {
        const response = await Api.updateProduct(barcode, {data: data});

        dispatch(updateProduct(response.data.product));
    } catch (error) {
        dispatch(setStatus(PRODUCTS_STATUS.ERROR));
    }
}

export async function deleteUserProduct(dispatch, barcode) {
    try {
        await Api.deleteProduct(barcode);
        dispatch(deleteProduct(barcode));
    } catch (error) {
        dispatch(setStatus(PRODUCTS_STATUS.ERROR));
    }
}
