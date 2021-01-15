import React, { useState } from "react";
import propTypes from "prop-types";

import "./ProductCard.scss";

import { ReactComponent as PlusIcon } from "./../assets/icons/plus.svg";
import { ReactComponent as MinusIcon } from "./../assets/icons/minus.svg";

import Api from "../utils/api";

const api = new Api();

export default function ProductCard({ product }) {
  const [productQuantity, setProductQuantity] = useState(product.quantity);

  function handleIncreaseQuantityButtonClick() {
    updateProductQuantity(productQuantity + 1);
  }
  function handleDecreaseQuantityButtonClick() {
    updateProductQuantity(productQuantity - 1);
  }

  async function updateProductQuantity(newQuantity) {
    try {
      await api.updateProduct(
        { data: { quantity: newQuantity } },
        product.barcode
      );

      setProductQuantity((quantity) => newQuantity);
    } catch (error) {}
  }

  return (
    <div className="product-card">
      <div className="product-card__header">
        <img
          className="product-card__image"
          alt="Product"
          src={product.data?.image_url}
        ></img>
        <p className="product-card__name">
          {product.data?.product_name} - {product.data?.brands} -{" "}
          {product.barcode}
        </p>
      </div>

      <div className="product-card__controls">
        <button
          className="product-card__button"
          onClick={handleIncreaseQuantityButtonClick}
        >
          <PlusIcon className="product-card__button-icon" />
        </button>
        <p className="product-card__quantity-indicator">{productQuantity}</p>
        <button
          className="product-card__button"
          onClick={handleDecreaseQuantityButtonClick}
        >
          <MinusIcon className="product-card__button-icon" />
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: propTypes.object.isRequired,
};
