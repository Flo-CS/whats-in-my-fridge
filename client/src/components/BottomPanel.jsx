import React, { useState } from "react";
import propTypes from "prop-types";

import "./BottomPanel.scss";

// Assets
import { ReactComponent as AddIcon } from "./../assets/icons/add.svg";

export default function BottomPanel({ addProduct }) {
  const [barcode, setBarcode] = useState("");

  function handleAddProductButtonClick() {
    addProduct(barcode);
  }
  return (
    <div className="bottom-panel">
      <div className="bottom-panel__input-group">
        <input
          className="bottom-panel__barcode-input"
          type="number"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        ></input>
        <button
          className="bottom-panel__add-button"
          onClick={handleAddProductButtonClick}
        >
          <AddIcon className="bottom-panel__add-icon" />
        </button>
      </div>
      <button className="bottom-panel__scan-button">Scan</button>
    </div>
  );
}

BottomPanel.propTypes = {
  addProduct: propTypes.func.isRequired,
};
