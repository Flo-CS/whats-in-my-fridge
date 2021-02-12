import React from "react";
import {useHistory} from "react-router-dom";

import LoginInputs from "../components/auth/login/LoginInputs";

import "./Pages.scss"


export default function LoginPage() {
    const history = useHistory()


    return <div className="login">
        <h1>Login</h1>
        <LoginInputs/>
        <button className="login__go-register-button" onClick={() => history.push("/register")}>Go register</button>
    </div>
}
