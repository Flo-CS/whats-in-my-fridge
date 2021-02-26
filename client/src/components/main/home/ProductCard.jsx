import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {ReactComponent as MinusIcon} from "../../../assets/icons/minus.svg";

import {ReactComponent as PlusIcon} from "../../../assets/icons/plus.svg";
import {deleteUserProduct, updateUserProduct,} from "../../../features/products/productsThunk";

import "./ProductCard.scss";

function ProductCard({
                         barcode,
                         quantity,
                         productData,
                         deleteUserProduct,
                         updateUserProduct,
                     }) {

    const history = useHistory();


    function handleIncreaseQuantityButtonClick() {
        updateProductQuantity(quantity + 1);
    }

    function handleDecreaseQuantityButtonClick() {
        // Verify if the quantity don't go lower or equal than 1 and delete the product if it's the case
        if (quantity - 1 <= -1) {
            if (window.confirm("Do you want to definitively delete this product ?")) {
                deleteUserProduct(barcode);
            }
        } else {
            updateProductQuantity(quantity - 1);
        }
    }

    function handleCardClick() {
        history.push(`/products/${barcode}`);
    }

    function updateProductQuantity(newQuantity) {
        updateUserProduct(barcode, {quantity: newQuantity});
    }

    const productCardClass = classNames("product-card", {
        "product-card--disabled": quantity <= 0,
    });
    const {image_url: imageUrl, brands_text: brandsText, name} = productData;

    /* eslint-disable  jsx-a11y/no-noninteractive-element-interactions */
    return (
        <div className={productCardClass}>
            <div className="product-card__content">
                <div className="product-card__header">
                    <p className="product-card__name">
                        {name} - {brandsText} -{" "}
                        <span className="product-card__name--soft">{barcode}</span>
                    </p>
                </div>
                <div className="product-card__body">
                    <img
                        className="product-card__image"
                        onClick={handleCardClick}
                        onKeyDown={handleCardClick}
                        alt="Product"
                        src={imageUrl}
                    />
                </div>
            </div>

            <div className="product-card__controls">
                <button
                    className="product-card__button"
                    onClick={handleIncreaseQuantityButtonClick}
                >
                    <PlusIcon className="product-card__button-icon"/>
                </button>
                <p className="product-card__quantity-indicator">{quantity}</p>
                <button
                    className="product-card__button"
                    onClick={handleDecreaseQuantityButtonClick}
                >
                    <MinusIcon className="product-card__button-icon"/>
                </button>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    barcode: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
    productData: propTypes.object.isRequired,
    deleteUserProduct: propTypes.func.isRequired,
    updateUserProduct: propTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        deleteUserProduct: (barcode) => deleteUserProduct(dispatch, barcode),
        updateUserProduct: (barcode, data) =>
            updateUserProduct(dispatch, barcode, data),
    };
}

export default connect(null, mapDispatchToProps)(ProductCard);
