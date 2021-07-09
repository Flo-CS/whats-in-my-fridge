import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, selectProductsFeatures,} from "../../../features/productSlice.js";
import ThreeDotLoading from "../../ThreeDotLoading";

import "../Views.scss";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";

export default function HomeView() {
    const dispatch = useDispatch();
    const {products, productsIsLoading} = useSelector((state) => selectProductsFeatures(state));

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    //TODO : Make a loading component
    return <div className="home-view">
        {productsIsLoading === false ? <ProductsCardsGrid products={products}/> :
            <ThreeDotLoading/>}
        <BottomPanel/>
    </div>;
}


