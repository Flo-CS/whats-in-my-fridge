import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {ReactComponent as MinusIcon} from "../../../assets/icons/minus.svg";

import {ReactComponent as PlusIcon} from "../../../assets/icons/plus.svg";
import {deleteProduct, updateProduct} from "../../../features/productSlice";

import "./ProductCard.scss";

export default function ProductCard({barcode, quantity, productData}) {

    const history = useHistory();
    const dispatch = useDispatch();


    function handleIncreaseQuantityButtonClick() {
        updateProductQuantity(quantity + 1);
    }

    function handleDecreaseQuantityButtonClick() {
        // Verify if the quantity don't go lower or equal than 1 and delete the product if it's the case
        if (quantity - 1 <= -1) {
            if (window.confirm("Voulez vous définitivement supprimer ce produit")) {
                dispatch(deleteProduct({barcode}));
            }
        } else {
            updateProductQuantity(quantity - 1);
        }
    }

    function handleCardClick() {
        history.push(`/products/${barcode}`);
    }

    function updateProductQuantity(newQuantity) {
        dispatch(updateProduct({barcode: barcode, data: {quantity: newQuantity}}));
    }

    const productCardClass = classNames("product-card", {
        "product-card--disabled": quantity <= 0,
    });
    const {image_url, brands_tags = [], product_name} = productData;

    return (
        <div className={productCardClass}>
            <div className="product-card__content" onClick={handleCardClick}
                 onKeyDown={handleCardClick} role="button" tabIndex="0"> {/*role is mandatory to respect a11y*/}
                <div className="product-card__header">
                    <p className="product-card__name">
                        {product_name} - {brands_tags.map(tag => tag.name).join(", ")} - <span
                        className="product-card__name--soft">{barcode}</span>
                    </p>
                </div>
                <div className="product-card__body">
                    <img
                        className="product-card__image"

                        alt="Product"
                        src={image_url}
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

};

