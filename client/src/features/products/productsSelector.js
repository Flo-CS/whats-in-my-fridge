export function selectAllProducts(state) {
    return state.products.allProducts;
}

export function selectOneProduct(state) {
    return state.products.oneProduct
}

export function selectOneProductStatus(state) {
    return state.products.oneProductStatus
}

export function selectAllProductsStatus(state) {
    return state.products.allProductsStatus

}