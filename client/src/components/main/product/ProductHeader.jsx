import React from "react"
import propTypes from "prop-types"

import "./ProductHeader.scss"

export default function ProductHeader({imageUrl, name, barcode, brands, quantity}) {
    return <div className="product-header">
        <img className="product-header__image" src={imageUrl} alt="product image"/>
        <div className="product-header__center">
            <h1 className="product-header__name">{name}<span className="product-header__barcode">{barcode}</span></h1>
            <h2 className="product-header__brands">{brands}</h2>
        </div>
        <div className="product-header__quantity-circle">
            <p className="product-header__quantity">{quantity}</p>

        </div>

    </div>
}

ProductHeader.propTypes = {
    imageUrl: propTypes.string.isRequired
}