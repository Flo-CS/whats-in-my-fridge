import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {fetchProducts, selectFilteredAndSortedProducts} from "../../features/productSlice.js";
import NoProduct from "./components/NoProduct";
import ProductsCardsGrid from "./components/ProductsCardsGrid";
import SearchBar from "./components/SearchBar";

import "./HomePage.scss";

export default function HomePage() {
    const dispatch = useDispatch();
    const transformedProducts = useSelector(selectFilteredAndSortedProducts);
    const isLoading = useSelector(state => state.products.productsIsLoading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    //TODO : Make a loading component
    return <div className="home-page">
        <SearchBar/>
        {!isLoading ?
            transformedProducts.length === 0 ?
                <NoProduct/>
                :
                <ProductsCardsGrid products={transformedProducts}/>
            :
            <ThreeDotLoading/>
        }
    </div>;
}


