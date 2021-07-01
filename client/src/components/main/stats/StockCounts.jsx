import propTypes from "prop-types";
import React from "react";

import "./StockCounts.scss";

export default function StockCounts({total, inStock, outOfStock}) {
    return <div className="stock-counts">
        <div className="stock-counts__section">
            <p className="stock-counts__section-name">Produits</p>
            <p className="stock-counts__section-value">{total}</p>
        </div>
        <div className="stock-counts__section">
            <p className="stock-counts__section-name">Produits en stock</p>
            <p className="stock-counts__section-value">{inStock}</p>
        </div>
        <div className="stock-counts__section">
            <p className="stock-counts__section-name">Produits épuisés</p>
            <p className="stock-counts__section-value">{outOfStock}</p>
        </div>
    </div>
}
StockCounts.propTypes = {
    total: propTypes.number,
    inStock: propTypes.number,
    outOfStock: propTypes.number
}