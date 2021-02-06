import React from "react"
import propTypes from "prop-types"
import RegisterInputs from "./RegisterInputs";

import "./../Auth.scss"
import {AUTH_VIEWS} from "../../../../utils/constants";

export default function Register({setCurrentView}) {

    function handleLoginLinkClick() {
        setCurrentView(AUTH_VIEWS.LOGIN)
    }

    return <div className="register">
        <h1>Register</h1><RegisterInputs/>
    <button className="register__go-login-button" onClick={handleLoginLinkClick}>Go login</button></div>
}
Register.propTypes = {
    setCurrentView: propTypes.func.isRequired
}