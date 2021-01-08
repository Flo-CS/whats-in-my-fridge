import React from "react";

import "./ProductCard.scss";

import { ReactComponent as PlusIcon } from "./../assets/icons/plus.svg";
import { ReactComponent as MinusIcon } from "./../assets/icons/minus.svg";
export default function ProductCard() {
  return (
    <div className="product-card">
      <div className="product-card__header">
        <img className="product-card__image" alt="Product"></img>
        <p className="product-card__name">Cereals</p>
      </div>

      <div className="product-card__controls">
        <button className="product-card__button">
          <PlusIcon className="product-card__button-icon" />
        </button>
        <p className="product-card__quantity-indicator">0</p>
        <button className="product-card__button">
          <MinusIcon className="product-card__button-icon" />
        </button>
      </div>
    </div>
  );
}
