import React from "react";
import propTypes from "prop-types";

import ProductCard from "./ProductCard.jsx";

import "./ProductsCardsGrid.scss";

export default function ProductsCardsGrid({ products }) {
  return (
    <div className="products-cards-grid">
      {products.map((product) => {
        return <ProductCard key={product.barcode} product={product} />;
      })}
    </div>
  );
}

ProductsCardsGrid.propTypes = {
  products: propTypes.array.isRequired,
};
