import React, {useCallback, useState} from "react";
import Scanner from "./components/Scanner";
import {useDispatch} from "react-redux";
import {addProduct} from "../../features/productSlice";

import "./AddPage.scss"
import InputWithAdd from "../../components/input/InputWithAdd";

export default function AddPage() {
    const dispatch = useDispatch()
    const [barcode, setBarcode] = useState("");

    const handleBarcodeDetected = useCallback((barcode) => {
        setBarcode(barcode)
    }, [])


    return <div className="add-page">
        <div className="add-page__body">
            <InputWithAdd onInputChange={(barcode) => setBarcode(barcode)} inputValue={barcode}
                          onAddButtonClick={() => dispatch(addProduct({barcode}))}
                          inputPlaceholder="Entrer un code-barre"/>

            <div className="add-page__scanner">
                <Scanner onDetected={handleBarcodeDetected}/>
            </div>
        </div>
    </div>;
}


