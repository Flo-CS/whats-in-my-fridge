import React, {useEffect} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";

import {selectProducts} from "../../features/products/productsSelector";
import {fetchUserProducts} from "../../features/products/productsThunk";

import "./Views.scss"

function HomeView({products, fetchUserProducts}) {
    useEffect(() => {
        fetchUserProducts();
    }, [fetchUserProducts]);

    return (
        <div className="home">
            <ProductsCardsGrid products={products}/>
            <BottomPanel/>
        </div>
    );
}

HomeView.propTypes = {
    products: propTypes.array.isRequired,
    fetchUserProducts: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {products: selectProducts(state)};
}

function mapDispatchToProps(dispatch) {
    return {fetchUserProducts: () => fetchUserProducts(dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
