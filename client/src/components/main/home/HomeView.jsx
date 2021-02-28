import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, selectProductsFeatures} from "../../../features/products/productSlice";

import "../Views.scss";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";

export default function HomeView() {
    const dispatch = useDispatch();
    const {products, productsIsLoading} = useSelector((state) => selectProductsFeatures(state));

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return <div className="home-view">
        {productsIsLoading === false ? <ProductsCardsGrid products={products}/> :
            <p>Loading...</p>}
        <BottomPanel/>
    </div>;
}


