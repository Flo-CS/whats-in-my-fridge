import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {fetchProducts, selectFilteredAndSortedProducts} from "../../features/productSlice.js";


import BottomPanel from "./BottomPanel";
import NoProduct from "./NoProduct";
import ProductsCardsGrid from "./ProductsCardsGrid";
import SearchBar from "./SearchBar";

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
        <BottomPanel/>
    </div>;
}

