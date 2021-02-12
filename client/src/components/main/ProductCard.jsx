import React from "react";
import classNames from "classnames";
import propTypes from "prop-types";
import {connect} from "react-redux";

import "./ProductCard.scss";

import {ReactComponent as PlusIcon} from "../../assets/icons/plus.svg";
import {ReactComponent as MinusIcon} from "../../assets/icons/minus.svg";
import {deleteUserProduct, updateUserProduct,} from "../../features/products/products.thunk";
import {useHistory} from "react-router-dom";

function ProductCard({
                         barcode,
                         quantity,
                         name,
                         brands,
                         imageUrl,
                         deleteUserProduct,
                         updateUserProduct,
                     }) {

    const history = useHistory()

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
        history.push(`/products/${barcode}`)
    }

    function updateProductQuantity(newQuantity) {
        updateUserProduct(barcode, {quantity: newQuantity});
    }

    const productCardClass = classNames("product-card", {
        "product-card--disabled": quantity <= 0,
    });

    /* eslint-disable  jsx-a11y/no-noninteractive-element-interactions */
    return (
        <div className={productCardClass}>
            <div className="product-card__content">
                <div className="product-card__header">
                    <p className="product-card__name">
                        {name} - {brands} -{" "}
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
    name: propTypes.string,
    brands: propTypes.string,
    imageUrl: propTypes.string,
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
