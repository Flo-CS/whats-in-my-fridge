import propTypes from "prop-types";
import React from "react";

import "./ProductHeader.scss";

export default function ProductHeader({barcode, productData}) {
    const {image_url: imageUrl, quantity, product_name: name, brands: brandsText} = productData;

    return <div className="product-header">

        <img className="product-header__image" src={imageUrl} alt="product"/>
        <div className="product-header__center">
            <h1 className="product-header__name">
                {name}
            </h1>
            <p className="product-header__barcode">{barcode}</p>
            <h2 className="product-header__brands">{brandsText}</h2>
        </div>

        <p className="product-header__quantity">{quantity}</p>

    </div>;
}

ProductHeader.propTypes = {
    barcode: propTypes.string.isRequired,
    productData: propTypes.object.isRequired,

};