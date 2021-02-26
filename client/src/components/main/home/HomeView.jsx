import propTypes from "prop-types";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {PRODUCTS_STATUS} from "../../../features/products/productsConstants";

import {selectAllProducts, selectAllProductsStatus} from "../../../features/products/productsSelector";
import {fetchUserProducts} from "../../../features/products/productsThunk";

import "../Views.scss";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";

function HomeView({products, productsStatus, fetchUserProducts}) {
    useEffect(() => {
        fetchUserProducts();
    }, [fetchUserProducts]);


    return <div className="home-view">
        {productsStatus === PRODUCTS_STATUS.LOADED ? <ProductsCardsGrid products={products}/> :
            <p>Loading...</p>}
        <BottomPanel/>
    </div>;
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
