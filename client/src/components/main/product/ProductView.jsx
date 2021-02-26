import propTypes from "prop-types";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router";
import {PRODUCTS_STATUS} from "../../../features/products/productsConstants";
import {selectOneProduct, selectOneProductStatus} from "../../../features/products/productsSelector";
import {fetchUserProduct} from "../../../features/products/productsThunk";
import ProductContent from "./ProductContent";
import ProductHeader from "./ProductHeader";


function ProductView({product, productStatus, fetchUserProduct}) {
    const {barcode} = useParams();

    useEffect(() => {
        fetchUserProduct(barcode);
    }, [fetchUserProduct, barcode]);


    if (productStatus === PRODUCTS_STATUS.LOADED) {


        return <div className="product-view">
            <ProductHeader barcode={product.barcode} productData={product.data}/>
            <ProductContent productData={product.data}/>
        </div>;
    } else {
        return <p>Loading...</p>;
    }


}

ProductView.propTypes = {
    product: propTypes.object.isRequired,
    fetchUserProduct: propTypes.func.isRequired,
    productStatus: propTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        product: selectOneProduct(state),
        productStatus: selectOneProductStatus(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {fetchUserProduct: (barcode) => fetchUserProduct(dispatch, barcode)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);

