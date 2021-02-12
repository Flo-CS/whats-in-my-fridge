import React, {useState} from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import {connect} from "react-redux";

import "./BottomPanel.scss";

import Scanner from "./Scanner";

import {ReactComponent as AddIcon} from "../../assets/icons/add.svg";
import {addUserProduct} from "../../features/products/products.thunk";

function BottomPanel({addUserProduct}) {
    const [barcode, setBarcode] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    function handleAddProductButtonClick() {
        addUserProduct(barcode);
    }

    function handleScanButtonClick() {
        setIsScanning(true);
    }

    function onBarcodeDetected(result) {
        setBarcode(result.codeResult.code);
        setIsScanning(false);
    }

    return (
        <div className="bottom-panel">
            <div className="bottom-panel__input-group">
                <input
                    className="bottom-panel__barcode-input"
                    type="number"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                />
                <button
                    className="bottom-panel__add-button"
                    onClick={handleAddProductButtonClick}
                >
                    <AddIcon className="bottom-panel__add-icon"/>
                </button>
            </div>
            <button
                className="bottom-panel__scan-button"
                onClick={handleScanButtonClick}
            >
                Scan
            </button>
            {isScanning &&
            ReactDOM.createPortal(
                <Scanner onDetected={onBarcodeDetected}/>,
                document.querySelector("#root")
            )}
        </div>
    );
}

BottomPanel.propTypes = {
    addUserProduct: propTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {addUserProduct: (barcode) => addUserProduct(dispatch, barcode)};
}

export default connect(null, mapDispatchToProps)(BottomPanel);
