import React from "react"
import propTypes from "prop-types"

import "./MainView.scss"

export default function MainView({children}) {
    return <div className="main-view">
        {children}
    </div>
}
MainView.propTypes = {
    children: propTypes.element.isRequired
}

