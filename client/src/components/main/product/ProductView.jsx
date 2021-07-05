import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {fetchActiveProduct, selectActiveProductFeatures} from "../../../features/productSlice";

import ProductContent from "./ProductContent";
import ProductHeader from "./ProductHeader";
import ProductFooter from "./ProductFooter";


export default function ProductView() {
    const dispatch = useDispatch();
    const {barcode} = useParams();
    const {activeProduct, activeProductIsLoading} = useSelector((state) => selectActiveProductFeatures(state));


    useEffect(() => {
        dispatch(fetchActiveProduct({barcode}));
    }, [barcode, dispatch]);


    return <div className="product-view">
        {activeProductIsLoading === false ? <>
                <ProductHeader barcode={activeProduct.barcode} productData={activeProduct.data}/>
                <ProductContent productData={activeProduct.data} quantity={activeProduct.quantity} barcode={barcode}/>
                <ProductFooter presences={activeProduct.presences}/>
            </> :
            <p>Chargement...</p>}

    </div>;

}
