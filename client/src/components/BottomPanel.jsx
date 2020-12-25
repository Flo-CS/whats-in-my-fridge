import React from "react"

import "./BottomPanel.scss"

// Assets
import {ReactComponent as AddIcon} from "./../assets/icons/add.svg"

export default function BottomPanel() {
    return <div className="bottom-panel">
        <div className="bottom-panel__input-group">
            <input className="bottom-panel__barcode-input" type="number"></input>
            <button className="bottom-panel__add-button">
                <AddIcon className="bottom-panel__add-icon"/>
            </button>
        </div>
        <button className="bottom-panel__scan-button">
            Scan
        </button>
    </div>
}