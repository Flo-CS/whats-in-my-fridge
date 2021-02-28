import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useParams} from "react-router";
import {fetchActiveProduct, selectActiveProductFeatures} from "../../../features/products/productSlice";

import ProductContent from "./ProductContent";
import ProductHeader from "./ProductHeader";


export default function ProductView() {
    const dispatch = useDispatch();
    const {barcode} = useParams();
    const {activeProduct, activeProductIsLoading} = useSelector((state) => selectActiveProductFeatures(state));

    useEffect(() => {
        dispatch(fetchActiveProduct({barcode}));
    }, [barcode, dispatch]);

    if (activeProductIsLoading === false) {
        return <div className="product-view">
            <ProductHeader barcode={activeProduct.barcode} productData={activeProduct.data}/>
            <ProductContent productData={activeProduct.data}/>
        </div>;
    } else {
        return <p>Loading...</p>;
    }


}
