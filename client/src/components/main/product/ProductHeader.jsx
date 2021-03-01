import propTypes from "prop-types";
import React from "react";

import "./ProductHeader.scss";

export default function ProductHeader({barcode, productData}) {
    const {image_url, quantity, product_name, brands_tags = []} = productData;

    return <div className="product-header">

        <img className="product-header__image" src={image_url} alt="product"/>
        <div className="product-header__center">
            <h1 className="product-header__name">
                {product_name}
            </h1>
            <p className="product-header__barcode">{barcode}</p>
            <h2 className="product-header__brands">{brands_tags.map(tag => tag.name).join(", ")}</h2>
        </div>

        <p className="product-header__quantity">{quantity}</p>

    </div>;
}

ProductHeader.propTypes = {
    barcode: propTypes.string.isRequired,
    productData: propTypes.object.isRequired,

};