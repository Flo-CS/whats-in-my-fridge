import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, selectFilteredAndSortedProducts} from "../../../features/productSlice.js";
import ThreeDotLoading from "../../ThreeDotLoading";

import "../Views.scss";

import BottomPanel from "./BottomPanel";
import ProductsCardsGrid from "./ProductsCardsGrid";
import SearchBar from "./SearchBar";
import NoProduct from "./NoProduct";

export default function HomeView() {
    const dispatch = useDispatch();
    const transformedProducts = useSelector(selectFilteredAndSortedProducts);
    const isLoading = useSelector(state => state.products.productsIsLoading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    //TODO : Make a loading component
    return <div className="home-view">
        <SearchBar/>
        {!isLoading ?
            transformedProducts.length === 0 ?
                <NoProduct/>
                :
                <ProductsCardsGrid products={transformedProducts}/>
            :
            <ThreeDotLoading/>
        }
        <BottomPanel/>
    </div>;
}


