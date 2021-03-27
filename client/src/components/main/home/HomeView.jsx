import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProducts,
    fetchProductsStats,
    selectProductsFeatures,
    selectProductsStatsFeatures
} from "../../../features/productSlice.js";

import "../Views.scss";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";

export default function HomeView() {
    const dispatch = useDispatch();
    const {products, productsIsLoading} = useSelector((state) => selectProductsFeatures(state));
    const {productsStats} = useSelector(state => selectProductsStatsFeatures(state));

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchProductsStats({startTimestamp: 1616344207, endTimestamp: 1616949007}));
    }, [dispatch]);

    console.log(productsStats);

    return <div className="home-view">
        {productsIsLoading === false ? <ProductsCardsGrid products={products}/> :
            <p>Chargement...</p>}
        <BottomPanel/>
    </div>;
}


