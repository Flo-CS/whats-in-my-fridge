import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {fetchActiveProduct, selectActiveProduct} from "../../features/productSlice";

import ProductContent from "./ProductContent";
import ProductFooter from "./ProductFooter";
import ProductHeader from "./ProductHeader";


export default function ProductPage() {
    const dispatch = useDispatch();
    const {barcode} = useParams();
    const activeProduct = useSelector(selectActiveProduct);
    const isLoading = useSelector(state => state.products.activeProductIsLoading);


    useEffect(() => {
        dispatch(fetchActiveProduct({barcode}));
    }, [barcode, dispatch]);


    return <div className="product-page">
        {isLoading === false ? <>
                <ProductHeader barcode={activeProduct.barcode} productData={activeProduct.data}/>
                <ProductContent productData={activeProduct.data} quantity={activeProduct.quantity} barcode={barcode}/>
                <ProductFooter presences={activeProduct.presences} barcode={barcode}/>
            </> :
            <ThreeDotLoading/>}

    </div>;

}
