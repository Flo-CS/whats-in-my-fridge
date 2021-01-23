import React, { useEffect, useState } from "react";

import BottomPanel from "./BottomPanel.jsx";
import ProductsCardsGrid from "./ProductsCardsGrid.jsx";

import "./Home.scss";

import Api from "../utils/api.js";

const api = new Api();

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await api.getProducts();
      setProducts(response.data.products);
    } catch (error) {}
  }

  async function addProduct(barcode) {
    try {
      await api.addProduct({ barcode });
      getProducts();
    } catch (error) {}
  }

  async function deleteProduct(barcode) {
    try {
      await api.deleteProduct(barcode);
      getProducts();
    } catch (error) {}
  }
  return (
    <div className="home">
      <ProductsCardsGrid products={products} deleteProduct={deleteProduct} />
      <BottomPanel addProduct={addProduct} />
    </div>
  );
}
