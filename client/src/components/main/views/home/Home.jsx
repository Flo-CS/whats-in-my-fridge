import React, {useEffect} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import BottomPanel from "./BottomPanel.jsx";
import ProductsCardsGrid from "./ProductsCardsGrid.jsx";

import {selectProducts} from "../../../../features/products/productsSelector";
import {fetchUserProducts} from "../../../../features/products/productsThunk";



function Home({products, fetchUserProducts}) {
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

Home.propTypes = {
    products: propTypes.array.isRequired,
    fetchUserProducts: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {products: selectProducts(state)};
}

function mapDispatchToProps(dispatch) {
    return {fetchUserProducts: () => fetchUserProducts(dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
