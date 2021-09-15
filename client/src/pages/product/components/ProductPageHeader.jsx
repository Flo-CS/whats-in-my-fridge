import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {ReactComponent as BackIcon} from "../../../assets/icons/chevron-back.svg";
import {ReactComponent as MinusIcon} from "../../../assets/icons/minus.svg";
import {ReactComponent as PlusIcon} from "../../../assets/icons/plus.svg";
import {ReactComponent as TrashIcon} from "../../../assets/icons/trash.svg";
import {deleteProduct, updateProductQuantity} from "../../../features/productSlice";
import {PATHS} from "../../../helpers/constants";

import "./ProductPageHeader.scss";

ProductPageHeader.propTypes = {
    barcode: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.object,
    brands: PropTypes.string,
    quantity: PropTypes.number.isRequired
};

export default function ProductPageHeader({barcode, imageUrl, name, quantity, size, brands}) {

    const history = useHistory();
    const dispatch = useDispatch();

    function handleIncreaseQuantity() {
        // run this function from an event handler or an effect to execute scroll
        dispatch(updateProductQuantity({barcode: barcode, quantity: quantity + 1}));
    }

    function handleDecreaseQuantity() {
        dispatch(updateProductQuantity({barcode: barcode, quantity: quantity - 1}));
    }

    function handleDeleteProduct() {
        if (window.confirm("Voulez vous définitivement supprimer ce produit ?")) {
            dispatch(deleteProduct({barcode})).then(() => {
                handleBackButtonClick()
            })

        }
    }

    function handleBackButtonClick() {
        history.push(PATHS.HOME);
    }

    const isDeleteButtonActive = quantity <= 0;
    const downButtonClass = classNames("product-page-header__quantity-button", {"product-page-header__quantity-button--warning": isDeleteButtonActive});

    return <div className="product-page-header">
        <div className="product-page-header__inner">
            <button className="product-page-header__back-button" onClick={handleBackButtonClick}>
                <BackIcon className="product-page-header__back-button-icon"/>
            </button>
            <img className="product-page-header__image" src={imageUrl} alt="product"/>
            <div className="product-page-header__body">
                <h1 className="product-page-header__name">{name}</h1>
                <p className="product-page-header__brands">{brands}</p>
                <p className="product-page-header__barcode">{barcode}</p>
                <p className="product-page-header__size">{size?.value} {size?.unit}</p>
            </div>
            <div className="product-page-header__controls">
                <button className={downButtonClass}
                        onClick={isDeleteButtonActive ? handleDeleteProduct : handleDecreaseQuantity}>
                    {isDeleteButtonActive ? <TrashIcon className="product-page-header__quantity-button-icon"/> :
                        <MinusIcon className="product-page-header__quantity-button-icon"/>}
                </button>
                <p className="product-page-header__quantity">{quantity}</p>
                <button className="product-page-header__quantity-button" onClick={handleIncreaseQuantity}>
                    <PlusIcon className="product-page-header__quantity-button-icon"/>
                </button>

            </div>
        </div>
    </div>;
}

