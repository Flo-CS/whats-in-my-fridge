import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {fetchActiveProduct, selectActiveProductFeatures} from "../../../features/productSlice";
import ThreeDotLoading from "../../ThreeDotLoading";

import ProductContent from "./ProductContent";
import ProductFooter from "./ProductFooter";
import ProductHeader from "./ProductHeader";


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
                <ProductFooter presences={activeProduct.presences} barcode={barcode}/>
            </> :
            <ThreeDotLoading/>}

    </div>;

}
