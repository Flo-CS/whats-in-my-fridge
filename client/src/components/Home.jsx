import React from "react";

import BottomPanel from "./BottomPanel.jsx";
import ProductsCardsGrid from "./ProductsCardsGrid.jsx";

export default function Home() {
  return (
    <>
      <ProductsCardsGrid />
      <BottomPanel />
    </>
  );
}
