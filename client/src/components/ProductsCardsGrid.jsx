import React from "react";
import ProductCard from "./ProductCard.jsx";

import "./ProductsCardsGrid.scss";

export default function ProductsCardsGrid() {
  return (
    <div className="products-cards-grid">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
