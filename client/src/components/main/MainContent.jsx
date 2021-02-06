import React from "react"
import propTypes from "prop-types"

import "./MainContent.scss"

export default function MainContent({children}) {
    return <div className="main-content">
        {children}
    </div>
}
MainContent.propTypes = {
    children: propTypes.element.isRequired
}

