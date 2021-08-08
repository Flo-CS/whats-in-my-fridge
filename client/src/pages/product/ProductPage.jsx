import {capitalize} from "lodash";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {fetchActiveProduct, selectActiveProduct} from "../../features/productSlice";
import {QUANTITY_REGEX} from "../../helpers/constants";
import {formatScore} from "../../helpers/miscellaneous";

import ProductContent from "./ProductContent";
import ProductFooter from "./ProductFooter";
import ProductPageHeader from "./ProductPageHeader";
import ScoresBox from "./ScoresBox";


export default function ProductPage() {
    const dispatch = useDispatch();
    const {barcode} = useParams();

    const product = useSelector(selectActiveProduct);
    const isLoading = useSelector(state => state.products.activeProductIsLoading);


    useEffect(() => {
        dispatch(fetchActiveProduct({barcode}));
    }, [barcode, dispatch]);


    const {
        image_small_url,
        brands_tags = [],
        product_name = "Nom inconnu",
        nutriscore_grade,
        ecoscore_grade,
        nova_group,
        quantity
    } = product.data || {};

    const nutriscore = formatScore(nutriscore_grade, true);
    const ecoscore = formatScore(ecoscore_grade, true);
    const nova = formatScore(nova_group);

    const brands = capitalize(brands_tags.map(tag => tag.name).join(", "));
    const name = capitalize(product_name);

    const cleanedQuantity = quantity?.match(QUANTITY_REGEX)?.[0] || quantity;

    return <div className="product-page">
        {isLoading === false ? <>
                <ProductPageHeader barcode={product.barcode}
                                   name={name}
                                   brands={brands}
                                   quantityInTheProduct={cleanedQuantity}
                                   imageUrl={image_small_url}
                                   quantity={product.quantity}/>
                <ScoresBox nutriscore={nutriscore} ecoscore={ecoscore} nova={nova}/>
                <ProductContent productData={product.data} quantity={product.quantity} barcode={product.barcode}/>
                <ProductFooter presences={product.presences} barcode={product.barcode}/>
            </> :
            <ThreeDotLoading/>}

    </div>;

}
