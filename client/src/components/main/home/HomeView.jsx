import React, {useEffect} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";

import {selectAllProducts, selectAllProductsStatus} from "../../../features/products/productsSelector";
import {fetchUserProducts} from "../../../features/products/productsThunk";

import "../Views.scss"
import {PRODUCTS_STATUS} from "../../../features/products/productsConstants";

function HomeView({products, productsStatus, fetchUserProducts}) {
    useEffect(() => {
        fetchUserProducts();
    }, [fetchUserProducts]);


    return <div className="home">
        {productsStatus === PRODUCTS_STATUS.LOADED ? <ProductsCardsGrid products={products}/> :
            <p>Loading...</p>}
        <BottomPanel/>
    </div>
}

HomeView.propTypes = {
    products: propTypes.array.isRequired,
    productsStatus: propTypes.string.isRequired,
    fetchUserProducts: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        products: selectAllProducts(state),
        productsStatus: selectAllProductsStatus(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {fetchUserProducts: () => fetchUserProducts(dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
