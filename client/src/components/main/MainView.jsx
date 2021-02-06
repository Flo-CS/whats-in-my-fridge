import React from "react"
import propTypes from "prop-types"

import "./MainView.scss"

export default function MainView({child}) {
    return <div className="main-view">
        {child}
    </div>
}
MainView.propTypes = {
    child: propTypes.element.isRequired
}

