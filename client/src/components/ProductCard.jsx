import React, { useEffect, useState } from "react";
import classNames from "classnames";
import propTypes from "prop-types";

import "./ProductCard.scss";

import { ReactComponent as PlusIcon } from "./../assets/icons/plus.svg";
import { ReactComponent as MinusIcon } from "./../assets/icons/minus.svg";

import Api from "../utils/api";

const api = new Api();

export default function ProductCard({
  barcode,
  quantity,
  name,
  brands,
  imagUrl,
  deleteProduct,
}) {
  const [quantity_, setQuantity_] = useState(quantity);

  useEffect(() => {
    setQuantity_(quantity);
  }, [quantity]);

  function handleIncreaseQuantityButtonClick() {
    updateProductQuantity(quantity_ + 1);
  }
  function handleDecreaseQuantityButtonClick() {
    // Verify if the quantity don't go lower or equal than 1 and delete the product if it's the case
    if (quantity_ - 1 <= -1) {
      if (window.confirm("Do you want to definitively delete this product ?")) {
        deleteProduct(barcode);
      }
    } else {
      updateProductQuantity(quantity_ - 1);
    }
  }

  useEffect(() => {}, [quantity_, barcode, deleteProduct]);

  async function updateProductQuantity(newQuantity) {
    try {
      await api.updateProduct({ data: { quantity: newQuantity } }, barcode);

      setQuantity_(newQuantity);
    } catch (error) {}
  }

  const productCardClass = classNames("product-card", {
    "product-card--disabled": quantity_ <= 0,
  });

  return (
    <div className={productCardClass}>
      <div className="product-card__content">
        <div className="product-card__header">
          <p className="product-card__name">
            {name} - {brands} -{" "}
            <span className="product-card__name--soft">{barcode}</span>
          </p>
        </div>
        <div className="product-card__body">
          <img
            className="product-card__image"
            alt="Product"
            src={imagUrl}
          ></img>
        </div>
      </div>

      <div className="product-card__controls">
        <button
          className="product-card__button"
          onClick={handleIncreaseQuantityButtonClick}
        >
          <PlusIcon className="product-card__button-icon" />
        </button>
        <p className="product-card__quantity-indicator">{quantity_}</p>
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
  barcode: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  name: propTypes.string,
  brands: propTypes.string,
  imagUrl: propTypes.string,
  deleteProduct: propTypes.func.isRequired,
};
