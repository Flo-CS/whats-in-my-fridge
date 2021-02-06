import React from "react";
import propTypes from "prop-types"
import LoginInputs from "./LoginInputs";

import "./../Auth.scss"
import {AUTH_VIEWS} from "../../../../utils/constants";

export default function Login({setCurrentView}) {

    function handleRegisterLinkClick() {
        setCurrentView(AUTH_VIEWS.REGISTER)
    }

    return <div className="login">
        <h1>Login</h1>
        <LoginInputs/>
    <button className="login__go-register-button" onClick={handleRegisterLinkClick}>Go register</button>
    </div>
}
Login.propTypes = {
    setCurrentView: propTypes.func.isRequired
}