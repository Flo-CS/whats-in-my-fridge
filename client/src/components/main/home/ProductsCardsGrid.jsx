import propTypes from "prop-types";
import React from "react";

import ProductCard from "./ProductCard";

import "./ProductsCardsGrid.scss";

export default function ProductsCardsGrid({products}) {
    return (
        <div className="products-cards-grid">

            {products.map((product) => {

                return (
                    <ProductCard
                        key={product.barcode}
                        barcode={product.barcode}
                        quantity={product.quantity}
                        productData={product.data}
                    />
                );
            })}
        </div>
    );
}

ProductsCardsGrid.propTypes = {
    products: propTypes.array.isRequired,
};
