import React, {useState} from "react";
import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";

import {ReactComponent as AddIcon} from "../../../assets/icons/add.svg";
import {addProduct} from "../../../features/productSlice";

import "./BottomPanel.scss";

import Scanner from "./Scanner";

export default function BottomPanel() {
    const [barcode, setBarcode] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    const dispatch = useDispatch();

    function handleAddProductButtonClick() {
        dispatch(addProduct({barcode}));
    }

    function handleScanButtonClick() {
        setIsScanning(true);
    }

    function handleScannerClose() {
        setIsScanning(false);
    }

    function handleBarcodeDetected(result) {
        setIsScanning(false);
        setBarcode(result.codeResult.code);
    }


    return (
        <div className="bottom-panel">
            <div className="bottom-panel__input-group">
                <input
                    className="bottom-panel__barcode-input"
                    type="tel"
                    placeholder="Entrez un code barre"
                    value={barcode}
                    onChange={(e) => {
                        setBarcode(e.target.value.replace(/\D/g, ""))
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddProductButtonClick()
                        }
                    }}
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
                <Scanner onDetected={handleBarcodeDetected} onClose={handleScannerClose}/>,
                document.querySelector("#root")
            )}
        </div>
    );
}




