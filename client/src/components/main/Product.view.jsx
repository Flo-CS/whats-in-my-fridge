import React, {useEffect} from "react"
import {connect} from "react-redux";
import propTypes from "prop-types";
import {selectProduct} from "../../features/products/products.selector";
import {fetchUserProduct} from "../../features/products/products.thunk";
import {useParams} from "react-router";

function ProductView({product, fetchUserProduct}) {
    const {barcode} = useParams()

    useEffect(() => {
        fetchUserProduct(barcode);
    }, [fetchUserProduct]);

    console.log(product)
    return <div className="product">

    </div>
}

ProductView.propTypes = {
    product: propTypes.object.isRequired,
    fetchUserProduct: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {product: selectProduct(state)};
}

function mapDispatchToProps(dispatch) {
    return {fetchUserProduct: (barcode) => fetchUserProduct(dispatch, barcode)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);

