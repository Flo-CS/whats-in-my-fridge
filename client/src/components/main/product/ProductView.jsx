import React, {useEffect} from "react"
import {connect} from "react-redux";
import propTypes from "prop-types";
import {selectOneProduct, selectOneProductStatus} from "../../../features/products/productsSelector";
import {fetchUserProduct} from "../../../features/products/productsThunk";
import {useParams} from "react-router";
import {PRODUCTS_STATUS} from "../../../features/products/productsConstants";


function ProductView({product, productStatus, fetchUserProduct}) {
    const {barcode} = useParams()

    useEffect(() => {
        fetchUserProduct(barcode);
    }, [fetchUserProduct, barcode]);


    if (productStatus === PRODUCTS_STATUS.LOADED) {
        const {name, brands} = product.data
        return <div className="product">
            <h1>
                {name} - {brands} - {product.barcode} - {product.quantity}
            </h1>
        </div>
    } else {
        return <p>Loading...</p>
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

