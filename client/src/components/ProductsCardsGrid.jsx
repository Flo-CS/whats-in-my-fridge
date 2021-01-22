import React from "react";
import propTypes from "prop-types";

import ProductCard from "./ProductCard.jsx";

import "./ProductsCardsGrid.scss";

export default function ProductsCardsGrid({ products }) {
  return (
    <div className="products-cards-grid">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.barcode}
            barcode={product.barcode}
            quantity={product.quantity}
            brands={product.data?.brands}
            name={product.data?.product_name}
            imagUrl={product.data?.image_url}
          />
        );
      })}
    </div>
  );
}

ProductsCardsGrid.propTypes = {
  products: propTypes.array.isRequired,
};
